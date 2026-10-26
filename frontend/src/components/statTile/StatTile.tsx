import type { StatTileProps } from '../../types/interface';
import "./statTile.css";

const StatTile = ({ title, value, description, icon }: StatTileProps) => {
  return (
    <div className="statTile">
      <div className="statTile-header">
      <h3 className="statTile-title">{title}</h3>
      <span className="statTile-icon">{icon}</span>
      </div>
      <p className="statTile-value">{value}</p>
      <p className="statTile-description">{description}</p>
    </div>
  );
};

export default StatTile;