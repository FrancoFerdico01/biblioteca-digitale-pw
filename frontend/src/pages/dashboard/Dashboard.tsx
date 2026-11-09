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
import { useTranslation } from "react-i18next";

const formatDate = (value: string, locale: string) =>
  new Date(value.length === 10 ? `${value}T00:00:00` : value).toLocaleDateString(locale);

const Dashboard = () => {
  const { t, i18n } = useTranslation("dashboard");
  const dateLocale = i18n.resolvedLanguage === "en" ? "en-GB" : "it-IT";
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
      title: t("loanedBooks"),
      value: activeLoans.length,
      description: t("loanedBooksDescription", { number: activeLoans.length }),
      icon: <FaBook />,
    },
    {
      id: 3,
      title: t("bookings"),
      value: bookingCount,
      description: t("bookingsDescription", { number: bookingCount }),
      icon: <PiBookmarksBold />,
    },
    {
      id: 4,
      title: t("registeredUsers"),
      value: userCount,
      description: t("registeredUsersDescription", { number: userCount }),
      icon: <MdPeople />,
    },
    {
      id: 5,
      title: t("scheduledEvents"),
      value: eventCount,
      description: t("scheduledEventsDescription", { number: eventCount }),
      icon: <FaCalendarAlt />,
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-user">{t("greeting")}</h1>
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div className="dashboard-section-title">
            <span className="dashboard-section-icon">
              <ImStatsBars size={24} />
            </span>
            <h2>{t("overview")}</h2>
          </div>
          <p className="dashboard-section-description">
            {t("overviewDescription")}
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
            <h2>{t("quickActions")}</h2>
          </div>
          <p className="dashboard-section-description">
            {t("quickActionsDescription")}
          </p>
        </div>

        <div className="dashboard-actions">
          <ActionAdmin
            kind="event"
            title={t("events:publishTitle")}
            subtitle={t("events:publishDescription")}
          />
          <ActionAdmin
            kind="book"
            title={t("catalog:publishTitle")}
            subtitle={t("catalog:publishDescription")}
          />
        </div>
      </div>
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div className="dashboard-section-title">
            <span className="dashboard-section-icon">
              <MdOutlineTableChart size={24} />
            </span>
            <h2>{t("operations")}</h2>
          </div>
          <p className="dashboard-section-description">
            {t("operationsDescription")}
          </p>
        </div>

        <div className="dashboard-operations">
          <InfoTable
            caption={t("activeLoans")}
            headers={[t("title"), t("user"), t("loanDate"), t("dueDate"), t("status")]}
            rows={activeLoans.map((loan) => {
              const overdue = new Date(`${loan.due_date}T00:00:00`) < new Date(new Date().toDateString());
              return [
                loan.book.title,
                `${loan.user.first_name} ${loan.user.last_name}`,
                formatDate(loan.start_date, dateLocale),
                formatDate(loan.due_date, dateLocale),
                overdue ? t("overdue") : t("inProgress"),
              ];
            })}
          />
          <InfoTable
            caption={t("eventBookings")}
            headers={[t("user"), t("event"), t("date"), t("seats"), t("booked")]}
            rows={activeBookings.map((booking) => [
              `${booking.user.first_name} ${booking.user.last_name}`,
              booking.event.title,
              formatDate(booking.event.event_date, dateLocale),
              booking.seats,
              formatDate(booking.created_at, dateLocale),
            ])}
          />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
