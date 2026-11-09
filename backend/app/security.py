import base64
import hashlib
import hmac
import os
import secrets
from datetime import datetime, timedelta, timezone

import jwt

# Chiave per firmare i token. In produzione va impostata come variabile d'ambiente;
# se manca ne usiamo una casuale (i token si invalidano a ogni riavvio del server).
SECRET_KEY = os.environ.get("SECRET_KEY") or secrets.token_urlsafe(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_MINUTES = 60

# Parametri scrypt (N, r, p): costo di CPU/memoria contro attacchi brute-force
_N, _R, _P = 2**14, 8, 1


def hash_password(password: str) -> str:
    salt = os.urandom(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=_N, r=_R, p=_P)
    return "scrypt${}${}".format(
        base64.b64encode(salt).decode(), base64.b64encode(digest).decode()
    )


def verify_password(password: str, stored: str) -> bool:
    try:
        _, salt_b64, digest_b64 = stored.split("$")
        salt = base64.b64decode(salt_b64)
        expected = base64.b64decode(digest_b64)
    except ValueError:
        return False
    digest = hashlib.scrypt(password.encode(), salt=salt, n=_N, r=_R, p=_P)
    return hmac.compare_digest(digest, expected)


def create_access_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_MINUTES),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> int | None:
    """Restituisce l'id utente, oppure None se il token non è valido o è scaduto."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return int(payload["sub"])
    except (jwt.PyJWTError, KeyError, ValueError):
        return None
