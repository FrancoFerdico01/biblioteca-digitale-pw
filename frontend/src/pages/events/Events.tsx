import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Wrapper from "../../components/wrapper/Wrapper";
import events from "../../data/events.json";
import type { FilterCategory } from "../../types/types";
import { useState } from "react";
import "./events.css";
import { MdCalendarMonth } from "react-icons/md";
import ActionAdmin from "../../components/actionAdmin/ActionAdmin";
import { FaCirclePlus } from "react-icons/fa6";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<FilterCategory>("all");

  const matchesTerm = (term: string, ...fields: string[]) =>
    term === "" || fields.some((field) => field.toLowerCase().includes(term));

  const term = searchTerm.trim().toLowerCase();

  const visibleEvents =
    category !== "books"
      ? events.filter((event) =>
          matchesTerm(term, event.title, event.description, event.location),
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
                image={event.image}
                duration={event.durations}
                title={event.title}
                available_places={event.available_places}
                location={event.location}
                date={event.date}
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
        />
      </div>
    </div>
  );
};

export default Events;
