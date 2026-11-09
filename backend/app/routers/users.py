from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import get_current_admin
from ..models import User
from ..schemas import UserOut

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserOut])
def list_users(
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    """Elenco degli utenti registrati, escluso l'admin (solo admin)."""
    return db.scalars(
        select(User).where(User.is_admin.is_(False)).order_by(User.id)
    ).all()
