import { useEffect } from "react";
import { MdCheckCircle, MdClose, MdErrorOutline } from "react-icons/md";
import type { ToastProps } from "../../types/interface";
import "./toast.css";

const Toast = ({ message, type = "success", icon, duration = 4000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const DefaultIcon = type === "success" ? MdCheckCircle : MdErrorOutline;

  return (
    <div className={`toast toast--${type}`} role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">
        {icon ?? <DefaultIcon />}
      </span>
      <p className="toast-message">{message}</p>
      <button className="toast-close" type="button" onClick={onClose} aria-label="Chiudi notifica">
        <MdClose aria-hidden="true" />
      </button>
    </div>
  );
};

export default Toast;
