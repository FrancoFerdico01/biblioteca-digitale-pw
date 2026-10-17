import { IoSearchOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import "./filter.css";

const Filter = () => {
  return (
    <div className="filter">
      <div className="filter-input-container">
        <div className="filter-input-content">
          <IoSearchOutline size={20} />
          <input
            className="filter-input"
            type="text"
            placeholder="Cerca eventi, visite guidate o titoli di libri..."
          />
        </div>
        <button className="filter-button" type="button">
          Cerca
          <FaArrowRightLong size={16} style={{ marginLeft: "5px" }} />
        </button>
      </div>
      <div className="filter-buttons">
        <button className="filter-button-list">Tutti</button>
        <button className="filter-button-list">Eventi</button>
        <button className="filter-button-list">Libri</button>
      </div>
    </div>
  );
};

export default Filter;