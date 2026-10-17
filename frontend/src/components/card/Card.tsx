import type { CardProps } from "../../types/interface";
import { FaLocationDot, FaUsers } from "react-icons/fa6";
import { PiBookOpenText } from "react-icons/pi";
import { PiBookmarksBold } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import "./card.css";

const Card = ({
  image,
  duration,
  title,
  description,
  available_places,
  available_books,
  location,
  date,
  btnTextCard,
}: CardProps) => {
  return (
    <article className="card">
      <div className="card-media">
        <div className="card-placeholder" aria-hidden="true">
          <PiBookOpenText size={38} />
        </div>
        <img
          src={image}
          alt={title}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <span className="card-duration">{duration}</span>
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="card-meta">
          {available_books ? (
            <span className="card-availability">
              <PiBookOpenText aria-hidden="true" />
              {available_books} copie disponibili
            </span>
          ) : (
            <span className="card-availability">
              <FaUsers aria-hidden="true" />
              {available_places} posti disponibili
            </span>
          )}
          <span className="card-location">
            <FaLocationDot aria-hidden="true" />
            {location}
          </span>
          {date && (
            <span className="card-location">
              <FaCalendarAlt aria-hidden="true" />
              {date}
            </span>
          )}
        </div>
        {btnTextCard ? (
          <button className="card-booking-button">
            <PiBookmarksBold size={14} />
            {btnTextCard}
          </button>
        ) : (
          <div className="card-booking-availability-container">
            <div className="card-booking-availability">
              <TbPointFilled size={14} />
              Disponibile al prestito
            </div>
            <button
              className="card-booking-availability-button"
              title="Disponibile al prestito"
            >
              <FaRegBookmark size={14} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default Card;
