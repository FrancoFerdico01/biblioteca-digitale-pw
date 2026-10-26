import type { WrapperProps } from "../../types/interface";
import "./wrapper.css";

const Wrapper = <T,>({ subtitle, title, description, items, renderItem }: WrapperProps<T>) => {
  return (
    <div className="wrapper-container">
      {subtitle && <span className="wrapper-subtitle">{subtitle}</span>}
      {title && <h1 className="wrapper-title">{title}</h1>}
      {description && <p className="wrapper-description">{description}</p>}
      <div className="wrapper-cards-container">
        {items.map((item) => renderItem(item))}
      </div>
    </div>
  );
};

export default Wrapper;