from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# Il file del DB sta nella cartella backend/, a prescindere da dove avvii il server
DB_PATH = Path(__file__).resolve().parent.parent / "biblioteca.db"

# check_same_thread=False: FastAPI può usare la connessione da thread diversi
engine = create_engine(
    f"sqlite:///{DB_PATH}", connect_args={"check_same_thread": False}
)

# Ogni richiesta HTTP userà una propria sessione
SessionLocal = sessionmaker(bind=engine, autoflush=False)


class Base(DeclarativeBase):
    """Classe madre di tutti i modelli (le tabelle)."""


def get_db():
    """Fornisce una sessione alla richiesta e la chiude sempre alla fine."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
