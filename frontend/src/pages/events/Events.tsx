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
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../../i18n/errorMessage";

const Events = () => {
  const { t } = useTranslation("events");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<FilterCategory>("all");

  const loadEvents = useCallback(() => {
    getEvents()
      .then(setEvents)
      .catch((err: Error) => setError(err));
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const [toast, setToast] = useState<
    | { id: number; type: "success"; key: "deleteSuccess" }
    | { id: number; type: "error"; error: ApiError }
    | { id: number; type: "error"; key: "unexpectedError" }
    | null
  >(null);
  const closeToast = useCallback(() => setToast(null), []);

  const handleDelete = async (event: EventItem) => {
    if (!window.confirm(t("deleteConfirm", { title: event.title }))) return;
    try {
      await deleteEvent(event.id);
      loadEvents();
      setToast({ id: Date.now(), type: "success", key: "deleteSuccess" });
    } catch (err) {
      setToast(err instanceof ApiError
        ? { id: Date.now(), type: "error", error: err }
        : { id: Date.now(), type: "error", key: "unexpectedError" });
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
        {t("title")}
      </h1>
      <p className="events-description">
        {t("description")}
      </p>
      {error && <p className="events-description">{t("loadError", { error: getErrorMessage(error) })}</p>}
      <div className="events-list">
        <Filter
          category={category}
          onCategoryChange={setCategory}
          onSearch={setSearchTerm}
        />
        {visibleEvents.length > 0 && (
          <Wrapper
            title={t("availableEvents")}
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
        {t("addEvent")}
      </h1>
        <p className="events-description">{t("addDescription")}</p>
        <ActionAdmin
          kind="event"
          title={t("publishTitle")}
          subtitle={t("publishDescription")}
          onPublished={loadEvents}
        />
      </div>
      {toast && (
        <Toast
          key={toast.id}
          message={"key" in toast ? t(toast.key) : getErrorMessage(toast.error)}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default Events;
