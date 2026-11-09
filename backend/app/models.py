from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(20), nullable=True)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    hashed_password = Column(String, nullable=False)
    is_admin = Column(Boolean, nullable=False, default=False)


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    author = Column(String(120), nullable=False)
    isbn = Column(String(20), nullable=True)
    year = Column(Integer, nullable=True)
    genre = Column(String(80), nullable=True)
    description = Column(Text, nullable=True)
    pickup_location = Column(String(200), nullable=True)
    image_url = Column(String(255), nullable=True)
    total_copies = Column(Integer, nullable=False, default=1)
    available_copies = Column(Integer, nullable=False, default=1)


class Loan(Base):
    """Prenotazione e prestito coincidono: il prestito è attivo finché returned_at è vuoto."""

    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False, index=True)
    start_date = Column(Date, nullable=False)
    due_date = Column(Date, nullable=False)
    returned_at = Column(DateTime, nullable=True)

    book = relationship("Book")
    user = relationship("User")


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    event_date = Column(Date, nullable=False)
    event_time = Column(String(10), nullable=False)
    location = Column(String(200), nullable=False)
    image_url = Column(String(255), nullable=True)
    total_seats = Column(Integer, nullable=False)
    available_seats = Column(Integer, nullable=False)


class EventBooking(Base):
    __tablename__ = "event_bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False, index=True)
    seats = Column(Integer, nullable=False, default=1)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))

    event = relationship("Event")
    user = relationship("User")
