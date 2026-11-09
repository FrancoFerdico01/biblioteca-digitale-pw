import type { CardProps } from "../../types/interface";
import { FaLocationDot, FaTrashCan, FaUsers } from "react-icons/fa6";
import { PiBookOpenText } from "react-icons/pi";
import { PiBookmarksBold } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { useTranslation } from "react-i18next";
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
  onBtnClick,
  secondBtnTextCard,
  onSecondBtnClick,
  onDelete,
}: CardProps) => {
  const { t } = useTranslation("card");
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
        {onDelete && (
          <button
            type="button"
            className="card-delete-button"
            title={t("delete")}
            aria-label={t("deleteTitle", { title })}
            onClick={onDelete}
          >
            <FaTrashCan size={14} />
          </button>
        )}
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="card-meta">
          {available_books !== undefined ? (
            <span className="card-availability">
              <PiBookOpenText aria-hidden="true" />
              {t("availableCopies", { count: available_books })}
            </span>
          ) : (
            <span className="card-availability">
              <FaUsers aria-hidden="true" />
              {t("availableSeats", { count: available_places })}
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
        {btnTextCard && (
          <button className="card-booking-button" onClick={onBtnClick}>
            <PiBookmarksBold size={14} />
            {btnTextCard}
          </button>
        )}
        {secondBtnTextCard && (
          <div className="card-booking-availability-container">
            <div className="card-booking-availability">
              <TbPointFilled size={14} />
              {secondBtnTextCard}
            </div>
            <button
              className="card-booking-availability-button"
              title={t("availableForLoan")}
              onClick={onSecondBtnClick}
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
