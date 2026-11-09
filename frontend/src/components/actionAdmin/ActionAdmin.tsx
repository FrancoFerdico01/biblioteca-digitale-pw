import { useCallback, useState, type FormEvent } from "react";
import InputCustom from "../inputCustom/InputCustom";
import CustomButton from "../customButton/CustomButton";
import Toast from "../toast/Toast";
import { ApiError, createBook, createEvent } from "../../services/api";
import { FaCalendarAlt } from "react-icons/fa";
import { PiBookOpenText } from "react-icons/pi";
import "./actionAdmin.css";

// Ogni campo del form ha un name univoco nella pagina; qui si mappa al nome atteso dal backend
const EVENT_FIELDS: [string, string][] = [
  ["evento_titolo", "title"],
  ["evento_descrizione", "description"],
  ["evento_ora", "event_time"],
  ["evento_luogo", "location"],
  ["evento_partecipanti", "total_seats"],
  ["evento_data", "event_date"],
  ["immagine_evento", "image"],
];

const BOOK_FIELDS: [string, string][] = [
  ["libro_titolo", "title"],
  ["libro_descrizione", "description"],
  ["libro_autore", "author"],
  ["libro_genere", "genre"],
  ["libro_copie", "total_copies"],
  ["libro_ritiro", "pickup_location"],
  ["immagine_libro", "image"],
];

const ActionAdmin = ({
  title,
  subtitle,
  onPublished,
}: {
  title: string;
  subtitle: string;
  onPublished?: () => void;
}) => {
  const isEvent = title === "Pubblica nuovo evento!";
  const [toast, setToast] = useState<{ id: number; type: "success" | "error"; text: string } | null>(null);
  const [sending, setSending] = useState(false);
  const closeToast = useCallback(() => setToast(null), []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    // e.currentTarget non è più disponibile dopo un await: lo salvo subito
    const form = e.currentTarget;
    const source = new FormData(form);
    const payload = new FormData();
    for (const [from, to] of isEvent ? EVENT_FIELDS : BOOK_FIELDS) {
      const value = source.get(from);
      if (value !== null) payload.append(to, value);
    }

    setSending(true);
    setToast(null);
    try {
      if (isEvent) await createEvent(payload);
      else await createBook(payload);
      form.reset();
      onPublished?.();
      setToast({
        id: Date.now(),
        type: "success",
        text: isEvent ? "Evento pubblicato con successo!" : "Libro pubblicato con successo!",
      });
    } catch (err) {
      setToast({
        id: Date.now(),
        type: "error",
        text: err instanceof ApiError ? err.message : "Errore imprevisto",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="actionAdmin">
      <div className="actionAdmin-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <form className="actionAdmin-form" onSubmit={handleSubmit}>
        {title === "Pubblica nuovo evento!" ? (
          <>
            <div className="actionAdmin-form-row">
              <InputCustom label="Titolo Evento" type="text" name="evento_titolo" required />
              <InputCustom label="Descrizione Evento" type="text" name="evento_descrizione" />
            </div>
            <div className="actionAdmin-form-row">
            <InputCustom label="Ora Evento" type="time" name="evento_ora" required />
            <InputCustom label="Luogo Evento" type="text" name="evento_luogo" required />
            </div>
            <div className="actionAdmin-form-row">
            <InputCustom label="Numero Partecipanti" type="number" name="evento_partecipanti" required />
            <InputCustom label="Data Evento" type="date" name="evento_data" required />
            </div>
            <div className="actionAdmin-form-row">
            <InputCustom label="Immagine Evento" type="file" name="immagine_evento" accept="image/*" />
            </div>
            <CustomButton onClick={() => {}} disabled={sending}>Pubblica Evento</CustomButton>
          </>
        ) : (
          <>
          <div className="actionAdmin-form-row">
            <InputCustom label="Titolo Libro" type="text" name="libro_titolo" required />
            <InputCustom label="Descrizione Libro" type="text" name="libro_descrizione" />
          </div>
          <div className="actionAdmin-form-row">
            <InputCustom label="Autore" type="text" name="libro_autore" required />
            <InputCustom label="Genere" type="text" name="libro_genere" />
          </div>
          <div className="actionAdmin-form-row">
            <InputCustom label="Copie disponibili" type="number" name="libro_copie" required />
            <InputCustom label="Luogo del ritiro" type="text" name="libro_ritiro" />
          </div>
          <div className="actionAdmin-form-row">
            <InputCustom label="Immagine Libro" type="file" name="immagine_libro" accept="image/*" />
          </div>
          <CustomButton onClick={() => {}} disabled={sending}>Pubblica Libro</CustomButton>
          </>
        )}
      </form>
      {toast && (
        <Toast
          key={toast.id}
          message={toast.text}
          type={toast.type}
          icon={isEvent ? <FaCalendarAlt /> : <PiBookOpenText />}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default ActionAdmin;
