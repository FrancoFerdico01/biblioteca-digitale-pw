from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class UserCreate(BaseModel):
    """Dati che il client invia per registrarsi."""

    first_name: str = Field(min_length=1, max_length=50)
    last_name: str = Field(min_length=1, max_length=50)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=20)
    password: str = Field(min_length=8, max_length=128)

    @field_validator("first_name", "last_name", "phone")
    @classmethod
    def not_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Il campo non può essere vuoto")
        return v

    @field_validator("email")
    @classmethod
    def lowercase_email(cls, v: str) -> str:
        return v.lower()


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(max_length=128)

    @field_validator("email")
    @classmethod
    def lowercase_email(cls, v: str) -> str:
        return v.lower()


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    """Dati restituiti al client: niente password."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str
    email: EmailStr
    phone: str | None = None
    is_admin: bool
    created_at: datetime


class BookOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    author: str
    isbn: str | None = None
    year: int | None = None
    genre: str | None = None
    description: str | None = None
    pickup_location: str | None = None
    image_url: str | None = None
    total_copies: int
    available_copies: int
    available: bool


class EventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str | None = None
    event_date: date
    event_time: str
    location: str
    image_url: str | None = None
    total_seats: int
    available_seats: int


class LoanCreate(BaseModel):
    book_id: int


class BookingUserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    first_name: str
    last_name: str
    email: str


class BookingEventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    event_date: date


class EventBookingOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user: BookingUserOut
    event: BookingEventOut
    seats: int
    created_at: datetime


class LoanBookOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    author: str


class LoanOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    book: LoanBookOut
    start_date: date
    due_date: date
    returned_at: datetime | None = None


class LoanAdminOut(LoanOut):
    user: BookingUserOut
