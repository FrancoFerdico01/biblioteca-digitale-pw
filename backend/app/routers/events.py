from datetime import date

from fastapi import APIRouter, Depends, File, Form, HTTPException, Response, UploadFile, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import get_current_admin, get_current_user
from ..models import Event, EventBooking, User
from ..schemas import EventBookingOut, EventOut
from ..uploads import delete_image, save_image

router = APIRouter(prefix="/events", tags=["events"])


@router.get("", response_model=list[EventOut])
def list_events(db: Session = Depends(get_db)):
    """Eventi pubblici, dal più vicino nel tempo."""
    return db.scalars(select(Event).order_by(Event.event_date, Event.event_time)).all()


@router.post("", response_model=EventOut, status_code=status.HTTP_201_CREATED)
def create_event(
    title: str = Form(..., min_length=1, max_length=200),
    event_date: date = Form(...),
    event_time: str = Form(..., max_length=10),
    location: str = Form(..., min_length=1, max_length=200),
    total_seats: int = Form(..., ge=1, le=10000),
    description: str | None = Form(None),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    """Crea un evento. I posti disponibili partono uguali al totale."""
    event = Event(
        title=title,
        description=description or None,
        event_date=event_date,
        event_time=event_time,
        location=location,
        image_url=save_image(image),
        total_seats=total_seats,
        available_seats=total_seats,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    """Elimina un evento. Non è possibile se ci sono prenotazioni, per non lasciarle orfane."""
    event = db.get(Event, event_id)
    if event is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Evento non trovato")

    has_bookings = db.scalar(select(EventBooking.id).where(EventBooking.event_id == event_id).limit(1)) is not None
    if has_bookings:
        raise HTTPException(status.HTTP_409_CONFLICT, "Impossibile eliminare: l'evento ha prenotazioni collegate")

    image_url = event.image_url
    db.delete(event)
    db.commit()
    delete_image(image_url)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/bookings", response_model=list[EventBookingOut])
def list_active_bookings(
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    """Tutte le prenotazioni agli eventi, dalla più recente."""
    stmt = select(EventBooking).order_by(EventBooking.created_at.desc())
    return db.scalars(stmt).all()


@router.get("/bookings/count")
def count_bookings(
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    """Numero totale di prenotazioni agli eventi, per la dashboard."""
    total = db.scalar(select(func.count(EventBooking.id))) or 0
    return {"total": total}


@router.post("/{event_id}/bookings", status_code=status.HTTP_201_CREATED)
def book_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Prenota un posto per l'utente loggato: un solo posto a persona per evento."""
    event = db.get(Event, event_id)
    if event is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Evento non trovato")

    already_booked = db.scalar(
        select(EventBooking).where(
            EventBooking.user_id == current_user.id,
            EventBooking.event_id == event_id,
        )
    )
    if already_booked is not None:
        raise HTTPException(status.HTTP_409_CONFLICT, "Hai già prenotato un posto per questo evento")

    if event.available_seats <= 0:
        raise HTTPException(status.HTTP_409_CONFLICT, "Nessun posto disponibile")

    event.available_seats -= 1
    db.add(EventBooking(user_id=current_user.id, event_id=event_id, seats=1))
    db.commit()
    return {"event_id": event_id, "seats": 1}
