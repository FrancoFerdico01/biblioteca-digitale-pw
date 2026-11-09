import { useState, type SubmitEvent } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import type { FilterCategory } from "../../types/types";
import type { FilterProps } from "../../types/interface";
import {useLocation} from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./filter.css";

const categories: FilterCategory[] = ["all", "events", "books"];

const Filter = ({ category, onCategoryChange, onSearch }: FilterProps) => {
  const { t } = useTranslation("filter");
  const [inputValue, setInputValue] = useState("");

  const location = useLocation();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className="filter">
      <form className="filter-input-container" onSubmit={handleSubmit}>
        <div className="filter-input-content">
          <IoSearchOutline size={20} />
          <input
            className="filter-input"
            type="text"
            placeholder={t("placeholder")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button className="filter-button" type="submit">
          {t("search")}
          <FaArrowRightLong size={16} style={{ marginLeft: "5px" }} />
        </button>
      </form>
      {location.pathname === "/" ? (
         <div className="filter-buttons">
        {categories.map((value) => (
          <button
            key={value}
            type="button"
            className={`filter-button-list${category === value ? " filter-button-list--active" : ""}`}
            aria-pressed={category === value}
            onClick={() => onCategoryChange(value)}
          >
            {t(value)}
          </button>
        ))}
      </div>
      ) : (
        null
      )}
     
    </div>
  );
};

export default Filter;