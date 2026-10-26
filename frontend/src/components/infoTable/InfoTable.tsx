
import type { InfoTableProps } from "../../types/interface";
import "./infoTable.css";

const InfoTable = ({ caption, headers, rows }: InfoTableProps) => {
  return (
    <div className="info-table-wrapper">
      <table className="info-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;