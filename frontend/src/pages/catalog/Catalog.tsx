import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Wrapper from "../../components/wrapper/Wrapper";
import { ApiError, API_URL, deleteBook, getBooks, type BookItem } from "../../services/api";
import Toast from "../../components/toast/Toast";
import type { FilterCategory } from "../../types/types";
import { useCallback, useEffect, useState } from "react";
import "./catalog.css";
import { MdCalendarMonth } from "react-icons/md";
import ActionAdmin from "../../components/actionAdmin/ActionAdmin";
import { FaCirclePlus } from "react-icons/fa6";

const Catalog = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<FilterCategory>("all");

  const loadBooks = useCallback(() => {
    getBooks()
      .then(setBooks)
      .catch((err: Error) => setError(err.message));
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const [toast, setToast] = useState<{ id: number; type: "success" | "error"; text: string } | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  const handleDelete = async (book: BookItem) => {
    if (!window.confirm(`Eliminare il libro "${book.title}"?`)) return;
    try {
      await deleteBook(book.id);
      loadBooks();
      setToast({ id: Date.now(), type: "success", text: "Libro eliminato con successo!" });
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

  const visibleBooks =
    category !== "books"
      ? books.filter((book) =>
          matchesTerm(term, book.title, book.author, book.pickup_location ?? ""),
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
      {error && <p className="catalog-description">Impossibile caricare il catalogo: {error}</p>}
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
                image={book.image_url ? `${API_URL}${book.image_url}` : ""}
                duration={book.genre ?? ""}
                title={book.title}
                description={book.author}
                available_books={book.available_copies}
                location={book.pickup_location ?? ""}
                onDelete={() => handleDelete(book)}
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
          onPublished={loadBooks}
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

export default Catalog;
