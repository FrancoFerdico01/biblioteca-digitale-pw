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
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../../i18n/errorMessage";

const Catalog = () => {
  const { t } = useTranslation("catalog");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<FilterCategory>("all");

  const loadBooks = useCallback(() => {
    getBooks()
      .then(setBooks)
      .catch((err: Error) => setError(err));
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const [toast, setToast] = useState<
    | { id: number; type: "success"; key: "deleteSuccess" }
    | { id: number; type: "error"; error: ApiError }
    | { id: number; type: "error"; key: "unexpectedError" }
    | null
  >(null);
  const closeToast = useCallback(() => setToast(null), []);

  const handleDelete = async (book: BookItem) => {
    if (!window.confirm(t("deleteConfirm", { title: book.title }))) return;
    try {
      await deleteBook(book.id);
      loadBooks();
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
        {t("title")}
      </h1>
      <p className="catalog-description">
        {t("description")}
      </p>
      {error && <p className="catalog-description">{t("loadError", { error: getErrorMessage(error) })}</p>}
      <div className="catalog-list">
        <Filter
          category={category}
          onCategoryChange={setCategory}
          onSearch={setSearchTerm}
        />
        {visibleBooks.length > 0 && (
          <Wrapper
            title={t("availableBooks")}
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
        {t("addBook")}
      </h1>
        <p className="catalog-description">{t("addDescription")}</p>
        <ActionAdmin
          kind="book"
          title={t("publishTitle")}
          subtitle={t("publishDescription")}
          onPublished={loadBooks}
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

export default Catalog;
