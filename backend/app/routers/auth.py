from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import get_current_user
from ..models import User
from ..schemas import Token, UserCreate, UserLogin, UserOut
from ..security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

# Hash finto: serve a impiegare lo stesso tempo anche quando l'email non esiste
_DUMMY_HASH = hash_password("password-finta")


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(data: UserCreate, db: Session = Depends(get_db)):
    if db.scalar(select(User).where(User.email == data.email)):
        raise HTTPException(status.HTTP_409_CONFLICT, "Email già registrata")

    user = User(
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        phone=data.phone,
        hashed_password=hash_password(data.password),
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        # Due richieste simultanee con la stessa email: il vincolo UNIQUE del DB ci protegge
        db.rollback()
        raise HTTPException(status.HTTP_409_CONFLICT, "Email già registrata")
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == data.email))
    stored_hash = user.hashed_password if user else _DUMMY_HASH
    password_ok = verify_password(data.password, stored_hash)

    # Stesso messaggio per email inesistente e password errata: non riveliamo quali email sono registrate
    if user is None or not password_ok:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Credenziali non valide")
    return Token(access_token=create_access_token(user.id))


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user
