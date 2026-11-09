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
import "./home.css";

const matchesTerm = (term: string, ...fields: string[]) =>
  term === "" || fields.some((field) => field.toLowerCase().includes(term));

const formatDate = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const Home = () => {
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
      setToast({ id: Date.now(), type: "success", text: `Prenotazione confermata per "${eventToBook.title}"!` });
    } catch (err) {
      setToast({
        id: Date.now(),
        type: "error",
        text: err instanceof ApiError ? err.message : "Errore imprevisto",
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
        text: `Prestito confermato per "${bookToLoan.title}". Restituzione entro il ${new Date(`${loan.due_date}T00:00:00`).toLocaleDateString("it-IT")}.`,
      });
    } catch (err) {
      setToast({
        id: Date.now(),
        type: "error",
        text: err instanceof ApiError ? err.message : "Errore imprevisto",
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
          title="Prenotazione"
          paragraph="Per prenotare devi effettuare l'accesso."
          actionLabel="Accedi"
          actionTo="/login"
        />
      )}
      {selectedEvent && (
        <Modal
          onClose={() => setSelectedEvent(null)}
          title="Conferma prenotazione"
          paragraph={`Vuoi prenotare un posto per "${selectedEvent.title}"?`}
          details={
            <div className="modal-event-details">
              <span>
                <FaCalendarDays aria-hidden="true" /> {formatDate(selectedEvent.event_date)}
              </span>
              <span>
                <FaClock aria-hidden="true" /> {selectedEvent.event_time}
              </span>
              <span>
                <FaLocationDot aria-hidden="true" /> {selectedEvent.location}
              </span>
              <span>
                <FaUsers aria-hidden="true" /> {selectedEvent.available_seats} posti disponibili
              </span>
            </div>
          }
          onConfirm={confirmBooking}
          confirmLabel="Conferma"
          confirmDisabled={booking || selectedEvent.available_seats <= 0}
        />
      )}
      {selectedBook && (
        <Modal
          onClose={() => setSelectedBook(null)}
          title="Conferma prestito"
          paragraph={`Vuoi prendere in prestito "${selectedBook.title}"?`}
          details={
            <div className="modal-event-details">
              <span>
                <FaBookOpen aria-hidden="true" /> {selectedBook.author}
              </span>
              <span>
                <FaCalendarDays aria-hidden="true" /> Durata del prestito: 31 giorni
              </span>
              <span>
                <FaLocationDot aria-hidden="true" /> {selectedBook.pickup_location ?? "Banco prestito"}
              </span>
              <span>
                <FaUsers aria-hidden="true" /> {selectedBook.available_copies} copie disponibili
              </span>
            </div>
          }
          onConfirm={confirmLoan}
          confirmLabel="Conferma"
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
        {error && <p className="home-empty">Impossibile caricare il catalogo: {error}</p>}
        {loaded && !error && visibleEvents.length === 0 && visibleBooks.length === 0 && (
          <p className="home-empty">
            Nessun risultato{searchTerm.trim() && ` per "${searchTerm.trim()}"`}.
          </p>
        )}
        {visibleEvents.length > 0 && (
          <section id="events">
            <Wrapper
              subtitle="Calendario culturale aperto"
              title="Eventi e Visite Disponibili"
              description="Prenotazione online immediata e gratuita per tutti gli eventi e le visite disponibili."
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
                  btnTextCard="Prenota Posto"
                  onBtnClick={() => handleBooking(event)}
                />
              )}
            />
          </section>
        )}
        {visibleBooks.length > 0 && (
          <Wrapper
            subtitle="Prestiti immediati - sede centrale"
            title="In Evidenza dal Catalogo"
            description="Titoli più richiesti della settimana, ritirabili al banco prestito in giornata."
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
                secondBtnTextCard="Disponibile al prestito"
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
