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
import { useEffect, useState } from "react";
import { getActiveBookings, getActiveLoans, getBookingsCount, getEvents, getUsers, type EventBookingItem, type LoanItem } from "../../services/api";

const formatDate = (value: string) =>
  new Date(value.length === 10 ? `${value}T00:00:00` : value).toLocaleDateString("it-IT");

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [activeBookings, setActiveBookings] = useState<EventBookingItem[]>([]);
  const [activeLoans, setActiveLoans] = useState<LoanItem[]>([]);

  useEffect(() => {
    getActiveBookings()
      .then(setActiveBookings)
      .catch(() => setActiveBookings([]));
  }, []);

  useEffect(() => {
    getActiveLoans()
      .then(setActiveLoans)
      .catch(() => setActiveLoans([]));
  }, []);

  useEffect(() => {
    getUsers()
      .then((users) => setUserCount(users.length))
      .catch(() => setUserCount(0));
  }, []);

  useEffect(() => {
    getEvents()
      .then((events) => setEventCount(events.length))
      .catch(() => setEventCount(0));
  }, []);

  useEffect(() => {
    getBookingsCount()
      .then((data) => setBookingCount(data.total))
      .catch(() => setBookingCount(0));
  }, []);

  const statItems = [
    {
      id: 1,
      title: "Libri Prestati",
      value: activeLoans.length,
      description: `Ci sono attualmente ${activeLoans.length} libri in prestito`,
      icon: <FaBook />,
    },
    {
      id: 3,
      title: "Prenotazioni",
      value: bookingCount,
      description: `Ci sono attualmente ${bookingCount} prenotazioni`,
      icon: <PiBookmarksBold />,
    },
    {
      id: 4,
      title: "Utenti Registrati",
      value: userCount,
      description: `Ci sono attualmente ${userCount} utenti registrati`,
      icon: <MdPeople />,
    },
    {
      id: 5,
      title: "Eventi in Calendario",
      value: eventCount,
      description: `Ci sono attualmente ${eventCount} eventi`,
      icon: <FaCalendarAlt />,
    },
  ];

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
            items={statItems}
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
            rows={activeLoans.map((loan) => {
              const overdue = new Date(`${loan.due_date}T00:00:00`) < new Date(new Date().toDateString());
              return [
                loan.book.title,
                `${loan.user.first_name} ${loan.user.last_name}`,
                formatDate(loan.start_date),
                formatDate(loan.due_date),
                overdue ? "In ritardo" : "In corso",
              ];
            })}
          />
          <InfoTable
            caption="Prenotazioni agli eventi"
            headers={["Utente", "Evento", "Data", "Posti", "Prenotato"]}
            rows={activeBookings.map((booking) => [
              `${booking.user.first_name} ${booking.user.last_name}`,
              booking.event.title,
              formatDate(booking.event.event_date),
              booking.seats,
              formatDate(booking.created_at),
            ])}
          />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
