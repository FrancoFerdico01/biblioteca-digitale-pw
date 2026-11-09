import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status

UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
MAX_IMAGE_BYTES = 5 * 1024 * 1024
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def save_image(file: UploadFile | None) -> str | None:
    """Salva l'immagine caricata e restituisce il suo URL pubblico, oppure None se non c'è file."""
    if file is None or not file.filename:
        return None

    extension = Path(file.filename).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Formato immagine non supportato")

    content = file.file.read(MAX_IMAGE_BYTES + 1)
    if len(content) > MAX_IMAGE_BYTES:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Immagine troppo grande (massimo 5 MB)")

    UPLOAD_DIR.mkdir(exist_ok=True)
    filename = f"{uuid.uuid4().hex}{extension}"
    (UPLOAD_DIR / filename).write_bytes(content)
    return f"/uploads/{filename}"


def delete_image(image_url: str | None) -> None:
    """Rimuove il file associato a un URL restituito da save_image, se esiste."""
    if not image_url:
        return
    (UPLOAD_DIR / Path(image_url).name).unlink(missing_ok=True)
