import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Wrapper from "../../components/wrapper/Wrapper";
import books from "../../data/books.json";
import type { FilterCategory } from "../../types/types";
import { useState } from "react";
import "./catalog.css";
import { MdCalendarMonth } from "react-icons/md";
import ActionAdmin from "../../components/actionAdmin/ActionAdmin";
import { FaCirclePlus } from "react-icons/fa6";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<FilterCategory>("all");

  const matchesTerm = (term: string, ...fields: string[]) =>
    term === "" || fields.some((field) => field.toLowerCase().includes(term));

  const term = searchTerm.trim().toLowerCase();

  const visibleBooks =
    category !== "books"
      ? books.filter((book) =>
          matchesTerm(term, book.title, book.author, book.location),
        )
      : [];
  return (
    <div className="catalog">
      <h1 className="catalog-title">
        <span className="catalog-icon">
          <MdCalendarMonth />
        </span>
        Il nostro Catalogo
      </h1>
      <p className="catalog-description">
        Qui puoi vedere tutto il catalogo o aggiungere un nuovo libro.
      </p>
      <div className="catalog-list">
        <Filter
          category={category}
          onCategoryChange={setCategory}
          onSearch={setSearchTerm}
        />
        {visibleBooks.length > 0 && (
          <Wrapper
            title="Libri Disponibili"
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
      <div className="catalog-new">
       <h1 className="catalog-title">
        <span className="catalog-icon">
          <FaCirclePlus />
        </span>
        Aggiungi Libro
      </h1>
        <p className="catalog-description">Compila il modulo sottostante per aggiungere un nuovo libro al catalogo.</p>
        <ActionAdmin
          title="Pubblica nuovo libro!"
          subtitle="Compila i campi richiesti per pubblicare un nuovo libro."
        />
      </div>
    </div>
  );
};

export default Catalog;
