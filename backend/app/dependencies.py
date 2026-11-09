from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from .database import get_db
from .models import User
from .security import decode_access_token

bearer_scheme = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Legge il token dall'header Authorization e restituisce l'utente corrispondente."""
    user_id = decode_access_token(credentials.credentials)
    user = db.get(User, user_id) if user_id is not None else None
    if user is None:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            "Token non valido o scaduto",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def get_current_admin(user: User = Depends(get_current_user)) -> User:
    """Come get_current_user, ma accetta solo l'amministratore."""
    if not user.is_admin:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Operazione riservata all'amministratore")
    return user
