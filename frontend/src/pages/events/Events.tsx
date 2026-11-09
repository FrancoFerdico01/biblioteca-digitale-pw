import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Wrapper from "../../components/wrapper/Wrapper";
import { ApiError, API_URL, deleteEvent, getEvents, type EventItem } from "../../services/api";
import Toast from "../../components/toast/Toast";
import type { FilterCategory } from "../../types/types";
import { useCallback, useEffect, useState } from "react";
import "./events.css";
import { MdCalendarMonth } from "react-icons/md";
import ActionAdmin from "../../components/actionAdmin/ActionAdmin";
import { FaCirclePlus } from "react-icons/fa6";

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<FilterCategory>("all");

  const loadEvents = useCallback(() => {
    getEvents()
      .then(setEvents)
      .catch((err: Error) => setError(err.message));
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const [toast, setToast] = useState<{ id: number; type: "success" | "error"; text: string } | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  const handleDelete = async (event: EventItem) => {
    if (!window.confirm(`Eliminare l'evento "${event.title}"?`)) return;
    try {
      await deleteEvent(event.id);
      loadEvents();
      setToast({ id: Date.now(), type: "success", text: "Evento eliminato con successo!" });
    } catch (err) {
      setToast({
        id: Date.now(),
        type: "error",
        text: err instanceof ApiError ? err.message : "Errore imprevisto",
      });
    }
  };

  const matchesTerm = (term: string, ...fields: string[]) =>
    term === "" || fields.some((field) => field.toLowerCase().includes(term));

  const term = searchTerm.trim().toLowerCase();

  const visibleEvents =
    category !== "books"
      ? events.filter((event) =>
          matchesTerm(term, event.title, event.description ?? "", event.location),
        )
      : [];
  return (
    <div className="events">
      <h1 className="events-title">
        <span className="events-icon">
          <MdCalendarMonth />
        </span>
        I nostri Eventi
      </h1>
      <p className="events-description">
        Qui puoi vedere tutti gli eventi disponibili. o aggiungerne di nuovi.
      </p>
      {error && <p className="events-description">Impossibile caricare gli eventi: {error}</p>}
      <div className="events-list">
        <Filter
          category={category}
          onCategoryChange={setCategory}
          onSearch={setSearchTerm}
        />
        {visibleEvents.length > 0 && (
          <Wrapper
            title="Eventi e Visite Disponibili"
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
                onDelete={() => handleDelete(event)}
              />
            )}
          />
        )}
      </div>
      <div className="events-new">
       <h1 className="events-title">
        <span className="events-icon">
          <FaCirclePlus />
        </span>
        Aggiungi Evento
      </h1>
        <p className="events-description">Compila il modulo sottostante per aggiungere un nuovo evento alla lista.</p>
        <ActionAdmin
          title="Pubblica nuovo evento!"
          subtitle="Compila i campi richiesti per pubblicare un nuovo evento."
          onPublished={loadEvents}
        />
      </div>
      {toast && (
        <Toast
          key={toast.id}
          message={toast.text}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default Events;
