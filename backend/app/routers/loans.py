from datetime import date, datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import get_current_admin, get_current_user
from ..models import Book, Loan, User
from ..schemas import LoanAdminOut, LoanCreate, LoanOut

router = APIRouter(prefix="/loans", tags=["loans"])

LOAN_DAYS = 31
MAX_ACTIVE_LOANS = 1


@router.post("", response_model=LoanOut, status_code=status.HTTP_201_CREATED)
def create_loan(
    data: LoanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Prenota e ritira il libro in un solo passaggio: il prestito parte oggi."""
    book = db.get(Book, data.book_id)
    if book is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Libro non trovato")

    active_for_user = db.scalar(
        select(Loan).where(Loan.user_id == current_user.id, Loan.returned_at.is_(None))
    )
    if active_for_user is not None:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            f"Hai già {MAX_ACTIVE_LOANS} prestito attivo: restituiscilo prima di prenderne un altro",
        )

    if book.available_copies <= 0:
        raise HTTPException(status.HTTP_409_CONFLICT, "Nessuna copia disponibile")

    start = date.today()
    loan = Loan(
        user_id=current_user.id,
        book_id=book.id,
        start_date=start,
        due_date=start + timedelta(days=LOAN_DAYS),
    )
    book.available_copies -= 1
    db.add(loan)
    db.commit()
    db.refresh(loan)
    return loan


@router.get("", response_model=list[LoanAdminOut])
def list_active_loans(
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    """Prestiti ancora in corso (non restituiti), dalla scadenza più vicina."""
    return db.scalars(
        select(Loan).where(Loan.returned_at.is_(None)).order_by(Loan.due_date)
    ).all()


@router.get("/me", response_model=list[LoanOut])
def my_loans(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Prestiti dell'utente loggato, dal più recente."""
    return db.scalars(
        select(Loan).where(Loan.user_id == current_user.id).order_by(Loan.id.desc())
    ).all()


@router.post("/{loan_id}/return", response_model=LoanOut)
def return_loan(
    loan_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    """Registra la restituzione del libro: operazione riservata all'admin."""
    loan = db.get(Loan, loan_id)
    if loan is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Prestito non trovato")
    if loan.returned_at is not None:
        raise HTTPException(status.HTTP_409_CONFLICT, "Prestito già restituito")
    loan.returned_at = datetime.now(timezone.utc)
    loan.book.available_copies += 1
    db.commit()
    db.refresh(loan)
    return loan
