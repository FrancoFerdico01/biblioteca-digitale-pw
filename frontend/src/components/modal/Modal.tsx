import "./modal.css";
import type { ModalProps } from "../../types/interface";
import Brand from "../brand/Brand";
import { Link } from "react-router-dom";

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
            <Link to="/login">Accedi</Link>
            <Link to="/register">Registrati</Link>
          </div>
          <button onClick={onClose}>Chiudi</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
