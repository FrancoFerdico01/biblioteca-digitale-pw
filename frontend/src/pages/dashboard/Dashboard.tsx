import Wrapper from "../../components/wrapper/Wrapper";
import StatTile from "../../components/statTile/StatTile";
import "./dashboard.css";
import { FaBook, FaCalendarAlt } from "react-icons/fa";
import { PiBookmarksBold } from "react-icons/pi";
import { MdOutlineTableChart, MdPeople } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import ActionAdmin from "../../components/actionAdmin/ActionAdmin";
import InfoTable from "../../components/infoTable/InfoTable";
import { IoIosFlash } from "react-icons/io";

const stats = [
  {
    id: 1,
    title: "Libri Prestati",
    value: 39,
    description: "tanti libri prestati",
    icon: <FaBook />,
  },
  {
    id: 2,
    title: "Prenotazioni",
    value: 62,
    description: "tante prenotazioni",
    icon: <PiBookmarksBold />,
  },
  {
    id: 3,
    title: "Eventi a calendario",
    value: 15,
    description: "tanti eventi",
    icon: <FaCalendarAlt />,
  },
  {
    id: 4,
    title: "Utenti Registrati",
    value: 120,
    description: "tanti utenti registrati",
    icon: <MdPeople />,
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-user">CIAO FRANCESCO</h1>
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div className="dashboard-section-title">
            <span className="dashboard-section-icon">
              <ImStatsBars size={24} />
            </span>
            <h2>1. Panoramica Generale</h2>
          </div>
          <p className="dashboard-section-description">
            Qui puoi vedere una panoramica generale delle tue statistiche
            principali.
          </p>
        </div>

        <div className="dashboard-wrapper">
          <Wrapper
            items={stats}
            renderItem={(item) => (
              <StatTile
                key={item.id}
                title={item.title}
                value={item.value}
                description={item.description}
                icon={item.icon}
              />
            )}
          />
        </div>
      </div>
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div className="dashboard-section-title">
            <span className="dashboard-section-icon">
              <IoIosFlash size={24} />
            </span>
            <h2>2. Azioni rapide</h2>
          </div>
          <p className="dashboard-section-description">
            Qui puoi eseguire rapidamente alcune azioni come pubblicare nuovi
            eventi o libri.
          </p>
        </div>

        <div className="dashboard-actions">
          <ActionAdmin
            title="Pubblica nuovo evento!"
            subtitle="Compila i campi richiesti per pubblicare un nuovo evento."
          />
          <ActionAdmin
            title="Pubblica nuovo libro!"
            subtitle="Compila i campi richiesti per pubblicare un nuovo libro."
          />
        </div>
      </div>
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div className="dashboard-section-title">
            <span className="dashboard-section-icon">
              <MdOutlineTableChart size={24} />
            </span>
            <h2>3. Gestione Operativa</h2>
          </div>
          <p className="dashboard-section-description">
            Qui puoi gestire le operazioni attive come prestiti e eventi.
          </p>
        </div>

        <div className="dashboard-operations">
          <InfoTable
            caption="Prestiti attivi"
            headers={["Titolo", "Utente", "Data prestito", "Scadenza", "Stato"]}
            rows={[
              [
                "Il nome della rosa",
                "Mario Rossi",
                "01/10/2026",
                "15/10/2026",
                "In corso",
              ],
              [
                "I Fratelli Karamazov",
                "Luigi Bianchi",
                "02/10/2026",
                "16/10/2026",
                "In corso",
              ],
              [
                "Il Gattopardo",
                "Giuseppe Verdi",
                "03/10/2026",
                "17/10/2026",
                "In corso",
              ],
            ]}
          />
          <InfoTable
            caption="Prenotazioni agli eventi"
            headers={["Utente", "Evento", "Data", "Posti", "Prenotato"]}
            rows={[
              ["Mario Rossi", "123456", "05/10/2026", "2", "Sì"],
              ["Luigi Bianchi", "654321", "06/10/2026", "3", "Sì"],
              ["Giuseppe Verdi", "789012", "07/10/2026", "1", "Sì"],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
