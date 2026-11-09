from fastapi import APIRouter, Depends, File, Form, HTTPException, Response, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import get_current_admin
from ..models import Book, Loan
from ..schemas import BookOut
from ..uploads import delete_image, save_image

router = APIRouter(prefix="/books", tags=["books"])


def _to_out(book: Book) -> BookOut:
    return BookOut(
        id=book.id,
        title=book.title,
        author=book.author,
        isbn=book.isbn,
        year=book.year,
        genre=book.genre,
        description=book.description,
        pickup_location=book.pickup_location,
        image_url=book.image_url,
        total_copies=book.total_copies,
        available_copies=book.available_copies,
        available=book.available_copies > 0,
    )


@router.get("", response_model=list[BookOut])
def list_books(db: Session = Depends(get_db)):
    """Catalogo pubblico: `available` è True finché ci sono copie non in prestito."""
    books = db.scalars(select(Book).order_by(Book.title)).all()
    return [_to_out(b) for b in books]


@router.post("", response_model=BookOut, status_code=status.HTTP_201_CREATED)
def create_book(
    title: str = Form(..., min_length=1, max_length=200),
    author: str = Form(..., min_length=1, max_length=120),
    total_copies: int = Form(..., ge=1, le=1000),
    isbn: str | None = Form(None, max_length=20),
    year: int | None = Form(None, ge=0, le=2100),
    genre: str | None = Form(None, max_length=80),
    description: str | None = Form(None),
    pickup_location: str | None = Form(None, max_length=200),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    """Crea un libro. Le copie disponibili partono uguali al totale e scendono a ogni prestito."""
    book = Book(
        title=title,
        author=author,
        isbn=isbn or None,
        year=year,
        genre=genre or None,
        description=description or None,
        pickup_location=pickup_location or None,
        image_url=save_image(image),
        total_copies=total_copies,
        available_copies=total_copies,
    )
    db.add(book)
    db.commit()
    db.refresh(book)
    return _to_out(book)


@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(
    book_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    """Elimina un libro. Non è possibile se il libro ha prestiti, per non perdere lo storico."""
    book = db.get(Book, book_id)
    if book is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Libro non trovato")

    has_loans = db.scalar(select(Loan.id).where(Loan.book_id == book_id).limit(1)) is not None
    if has_loans:
        raise HTTPException(status.HTTP_409_CONFLICT, "Impossibile eliminare: il libro ha prestiti collegati")

    image_url = book.image_url
    db.delete(book)
    db.commit()
    delete_image(image_url)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
