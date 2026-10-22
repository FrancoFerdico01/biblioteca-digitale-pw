import { useState, type SubmitEvent } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import type { FilterCategory } from "../../types/types";
import type { FilterProps } from "../../types/interface";
import "./filter.css";

const categories: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "Tutti" },
  { value: "events", label: "Eventi" },
  { value: "books", label: "Libri" },
];

const Filter = ({ category, onCategoryChange, onSearch }: FilterProps) => {
  const [inputValue, setInputValue] = useState("");

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
            placeholder="Cerca eventi, visite guidate o titoli di libri..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button className="filter-button" type="submit">
          Cerca
          <FaArrowRightLong size={16} style={{ marginLeft: "5px" }} />
        </button>
      </form>
      <div className="filter-buttons">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`filter-button-list${category === value ? " filter-button-list--active" : ""}`}
            aria-pressed={category === value}
            onClick={() => onCategoryChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;