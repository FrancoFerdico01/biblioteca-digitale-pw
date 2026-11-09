"""Importa libri ed eventi di esempio dai JSON del frontend nel database.

Viene eseguito all'avvio del backend. Se il database contiene già libri o eventi,
oppure i file JSON non sono presenti, non importa nulla.
"""

import json
from datetime import date, datetime
from pathlib import Path

from sqlalchemy import func, select

from .database import SessionLocal
from .models import Book, Event

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "frontend" / "src" / "data"


def fix_text(value: str) -> str:
    """Sostituisce il carattere rovinato (�) nel JSON con un trattino."""
    return value.replace("\ufffd", "-").replace("°", "-")


def load(name: str) -> list[dict]:
    return json.loads((DATA_DIR / name).read_text(encoding="utf-8"))


def to_24h(value: str) -> str:
    """Converte '4:00 PM' in '16:00'."""
    return datetime.strptime(value.strip(), "%I:%M %p").strftime("%H:%M")


def seed_catalog() -> str:
    books_file, events_file = DATA_DIR / "books.json", DATA_DIR / "events.json"
    if not (books_file.exists() and events_file.exists()):
        return "File JSON del catalogo non trovati: nessuna importazione."

    books = load("books.json")
    events = load("events.json")

    with SessionLocal() as db:
        already = db.scalar(select(func.count(Book.id))) or db.scalar(select(func.count(Event.id)))
        if already:
            return "Il database contiene già libri o eventi: nessuna importazione."

        for item in books:
            copies = int(item["available_books"])
            db.add(
                Book(
                    title=fix_text(item["title"]),
                    author=fix_text(item["author"]),
                    genre=fix_text(item["genre"]),
                    pickup_location=fix_text(item["location"]),
                    total_copies=copies,
                    available_copies=copies,
                )
            )

        for item in events:
            seats = int(item["available_places"])
            db.add(
                Event(
                    title=fix_text(item["title"]),
                    description=fix_text(item["description"]),
                    event_date=date.fromisoformat(item["date"]),
                    event_time=to_24h(item["time"]),
                    location=fix_text(item["location"]),
                    total_seats=seats,
                    available_seats=seats,
                )
            )

        db.commit()
    return f"Importati {len(books)} libri e {len(events)} eventi."
