import { useState } from "react";
import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Wrapper from "../../components/wrapper/Wrapper";
import events from "../../data/events.json";
import books from "../../data/books.json";
import type { FilterCategory } from "../../types/types";
import "./home.css";

const matchesTerm = (term: string, ...fields: string[]) =>
  term === "" || fields.some((field) => field.toLowerCase().includes(term));

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<FilterCategory>("all");

  const term = searchTerm.trim().toLowerCase();

  const visibleEvents =
    category !== "books"
      ? events.filter((event) =>
          matchesTerm(term, event.title, event.description, event.location)
        )
      : [];

  const visibleBooks =
    category !== "events"
      ? books.filter((book) =>
          matchesTerm(term, book.title, book.author, book.genre)
        )
      : [];

  return (
    <div className="home">
      <div className="home-container">
        <Filter
          category={category}
          onCategoryChange={setCategory}
          onSearch={setSearchTerm}
        />
        {visibleEvents.length === 0 && visibleBooks.length === 0 && (
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
                  image={event.image}
                  duration={event.durations}
                  title={event.title}
                  description={event.description}
                  available_places={event.available_places}
                  location={event.location}
                  date={event.date}
                  btnTextCard="Prenota Posto"
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
                image={book.image}
                duration={book.genre}
                title={book.title}
                description={book.author}
                available_books={book.available_books}
                location={book.location}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
