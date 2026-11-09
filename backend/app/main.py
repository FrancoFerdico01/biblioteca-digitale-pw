import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import select

# Va caricato prima degli import dei moduli che leggono le variabili (es. SECRET_KEY in security.py)
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

from . import models  # noqa: F401  (serve per registrare le tabelle su Base)
from .database import Base, SessionLocal, engine
from .models import User
from .routers import auth, books, events, loans, users
from .security import hash_password
from .catalog_seed import seed_catalog
from .uploads import UPLOAD_DIR

# Crea le tabelle mancanti nel DB all'avvio
Base.metadata.create_all(bind=engine)


def ensure_admin():
    """Crea o aggiorna l'unico account admin usando ADMIN_EMAIL e ADMIN_PASSWORD dal .env."""
    email = os.environ.get("ADMIN_EMAIL", "").strip().lower()
    password = os.environ.get("ADMIN_PASSWORD", "")
    if not email or not password:
        return
    with SessionLocal() as db:
        admin = db.scalar(select(User).where(User.email == email))
        if admin is None:
            admin = User(first_name="Amministratore", last_name="Biblioteca", email=email)
            db.add(admin)
        admin.hashed_password = hash_password(password)
        admin.is_admin = True
        db.commit()


ensure_admin()
seed_catalog()

app = FastAPI(title="Biblioteca Digitale API")

# Origini del front-end (Vite) autorizzate a chiamare l'API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://biblioteca-digitale-pw.vercel.app",
    ],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(auth.router)
app.include_router(books.router)
app.include_router(events.router)
app.include_router(loans.router)
app.include_router(users.router)

UPLOAD_DIR.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


@app.get("/health")
def health():
    return {"status": "ok"}
