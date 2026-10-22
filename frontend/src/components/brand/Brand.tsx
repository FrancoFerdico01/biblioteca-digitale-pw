import { FaBookOpenReader } from "react-icons/fa6";
import "./brand.css";
const Brand = () => {
  return (
    <div className="brand">
      <FaBookOpenReader className="brand-icon" />
      <span className="brand-title">BiblioHub</span>
    </div>
  );
};

export default Brand;
