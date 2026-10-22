import "./modal.css";
import type { ModalProps } from "../../types/interface";
import Brand from "../brand/Brand";

const Modal = ({ onClose, title, paragraph }: ModalProps) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Brand />
        <div className="modal-text">
          <h2>{title}</h2>
          <p>{paragraph}</p>
        </div>
        <div className="modal-actions">
          <div className="modal-links">
            <a href="/login">Accedi</a>
            <a href="/register">Registrati</a>
          </div>
          <button onClick={onClose}>Chiudi</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
