import { PiBookOpenText } from "react-icons/pi";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-icon-text">
            <PiBookOpenText size={16} />
            <p>Patrimonio Culturale & Servizi al cittadino</p>
          </div>
          <h1>Esplora la Biblioteca & Polo Culturale</h1>
          <p className="header-paragraph">
            Accedi a migliaia di volumi, prenota visite guidate agli archivi
            storici e partecipa agli incontri culturali del nostro ateneo e
            della rete civica.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
