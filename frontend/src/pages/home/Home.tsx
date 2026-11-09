import { useCallback, useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Wrapper from "../../components/wrapper/Wrapper";
import Modal from "../../components/modal/Modal";
import Toast from "../../components/toast/Toast";
import type { FilterCategory } from "../../types/types";
import {
  ApiError,
  API_URL,
  bookEvent,
  createLoan,
  getBooks,
  getEvents,
  getToken,
  type BookItem,
  type EventItem,
} from "../../services/api";
import { FaBookOpen, FaCalendarDays, FaClock, FaLocationDot, FaUsers } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import "./home.css";

const matchesTerm = (term: string, ...fields: string[]) =>
  term === "" || fields.some((field) => field.toLowerCase().includes(term));

const formatDate = (isoDate: string, locale: string) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const Home = () => {
  const { t, i18n } = useTranslation("home");
  const dateLocale = i18n.resolvedLanguage === "en" ? "en-GB" : "it-IT";
  const [events, setEvents] = useState<EventItem[]>([]);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<FilterCategory>("all");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [booking, setBooking] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [loaning, setLoaning] = useState(false);
  const [toast, setToast] = useState<{ id: number; type: "success" | "error"; text: string } | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    Promise.all([getEvents(), getBooks()])
      .then(([eventsData, booksData]) => {
        setEvents(eventsData);
        setBooks(booksData);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoaded(true));
  }, []);

  const term = searchTerm.trim().toLowerCase();

  // Prenotazione riservata agli utenti loggati: per ora gli ospiti vedono la modale di accesso
  const handleBooking = (event: EventItem) => {
    if (getToken() === null) {
      setLoginModalOpen(true);
      return;
    }
    setSelectedEvent(event);
  };

  const confirmBooking = async () => {
    if (!selectedEvent || booking) return;
    const eventToBook = selectedEvent;
    setBooking(true);
    try {
      await bookEvent(eventToBook.id);
      // Aggiorno il posto disponibile localmente, senza ricaricare tutta la lista
      setEvents((prev) =>
        prev.map((item) =>
          item.id === eventToBook.id ? { ...item, available_seats: item.available_seats - 1 } : item
        )
      );
      setToast({ id: Date.now(), type: "success", text: t("bookingSuccess", { title: eventToBook.title }) });
    } catch (err) {
      setToast({
        id: Date.now(),
        type: "error",
        text: err instanceof ApiError ? err.message : t("unexpectedError"),
      });
    } finally {
      setBooking(false);
      setSelectedEvent(null);
    }
  };
  // Prestito riservato agli utenti loggati, stessa logica della prenotazione evento
  const handleLoan = (book: BookItem) => {
    if (getToken() === null) {
      setLoginModalOpen(true);
      return;
    }
    setSelectedBook(book);
  };

  const confirmLoan = async () => {
    if (!selectedBook || loaning) return;
    const bookToLoan = selectedBook;
    setLoaning(true);
    try {
      const loan = await createLoan(bookToLoan.id);
      setBooks((prev) =>
        prev.map((item) =>
          item.id === bookToLoan.id ? { ...item, available_copies: item.available_copies - 1 } : item
        )
      );
      setToast({
        id: Date.now(),
        type: "success",
        text: t("loanSuccess", { title: bookToLoan.title, date: new Date(`${loan.due_date}T00:00:00`).toLocaleDateString(dateLocale) }),
      });
    } catch (err) {
      setToast({
        id: Date.now(),
        type: "error",
        text: err instanceof ApiError ? err.message : t("unexpectedError"),
      });
    } finally {
      setLoaning(false);
      setSelectedBook(null);
    }
  };

  const visibleEvents =
    category !== "books"
      ? events.filter((event) =>
          matchesTerm(term, event.title, event.description ?? "", event.location)
        )
      : [];

  const visibleBooks =
    category !== "events"
      ? books.filter((book) =>
          matchesTerm(term, book.title, book.author, book.genre ?? "")
        )
      : [];

  return (
    <div className="home">
      {loginModalOpen && (
        <Modal
          onClose={() => setLoginModalOpen(false)}
          title={t("bookingTitle")}
          paragraph={t("loginRequired")}
          actionLabel={t("login")}
          actionTo="/login"
        />
      )}
      {selectedEvent && (
        <Modal
          onClose={() => setSelectedEvent(null)}
          title={t("confirmBooking")}
          paragraph={t("bookingQuestion", { title: selectedEvent.title })}
          details={
            <div className="modal-event-details">
              <span>
                <FaCalendarDays aria-hidden="true" /> {formatDate(selectedEvent.event_date, dateLocale)}
              </span>
              <span>
                <FaClock aria-hidden="true" /> {selectedEvent.event_time}
              </span>
              <span>
                <FaLocationDot aria-hidden="true" /> {selectedEvent.location}
              </span>
              <span>
                <FaUsers aria-hidden="true" /> {t("availableSeats", { count: selectedEvent.available_seats })}
              </span>
            </div>
          }
          onConfirm={confirmBooking}
          confirmLabel={t("confirm")}
          confirmDisabled={booking || selectedEvent.available_seats <= 0}
        />
      )}
      {selectedBook && (
        <Modal
          onClose={() => setSelectedBook(null)}
          title={t("confirmLoan")}
          paragraph={t("loanQuestion", { title: selectedBook.title })}
          details={
            <div className="modal-event-details">
              <span>
                <FaBookOpen aria-hidden="true" /> {selectedBook.author}
              </span>
              <span>
                <FaCalendarDays aria-hidden="true" /> {t("loanDuration")}
              </span>
              <span>
                <FaLocationDot aria-hidden="true" /> {selectedBook.pickup_location ?? t("pickupLocation")}
              </span>
              <span>
                <FaUsers aria-hidden="true" /> {t("availableCopies", { count: selectedBook.available_copies })}
              </span>
            </div>
          }
          onConfirm={confirmLoan}
          confirmLabel={t("confirm")}
          confirmDisabled={loaning || selectedBook.available_copies <= 0}
        />
      )}
      {toast && (
        <Toast
          key={toast.id}
          message={toast.text}
          type={toast.type}
          onClose={closeToast}
        />
      )}
      <div className="home-container">
        <Filter
          category={category}
          onCategoryChange={setCategory}
          onSearch={setSearchTerm}
        />
        {error && <p className="home-empty">{t("loadError", { error })}</p>}
        {loaded && !error && visibleEvents.length === 0 && visibleBooks.length === 0 && (
          <p className="home-empty">
            {searchTerm.trim() ? t("noResultsFor", { term: searchTerm.trim() }) : t("noResults")}
          </p>
        )}
        {visibleEvents.length > 0 && (
          <section id="events">
            <Wrapper
              subtitle={t("eventsSubtitle")}
              title={t("eventsTitle")}
              description={t("eventsDescription")}
              items={visibleEvents}
              renderItem={(event) => (
                <Card
                  key={event.id}
                  image={event.image_url ? `${API_URL}${event.image_url}` : ""}
                  duration={event.event_time}
                  title={event.title}
                  description={event.description ?? undefined}
                  available_places={event.available_seats}
                  location={event.location}
                  date={event.event_date}
                  btnTextCard={t("bookSeat")}
                  onBtnClick={() => handleBooking(event)}
                />
              )}
            />
          </section>
        )}
        {visibleBooks.length > 0 && (
          <Wrapper
            subtitle={t("booksSubtitle")}
            title={t("booksTitle")}
            description={t("booksDescription")}
            items={visibleBooks}
            renderItem={(book) => (
              <Card
                key={book.id}
                image={book.image_url ? `${API_URL}${book.image_url}` : ""}
                duration={book.genre ?? ""}
                title={book.title}
                description={book.author}
                available_books={book.available_copies}
                location={book.pickup_location ?? ""}
                secondBtnTextCard={t("availableForLoan")}
                onSecondBtnClick={() => handleLoan(book)}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
