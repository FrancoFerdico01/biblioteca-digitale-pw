import InputCustom from "../inputCustom/InputCustom";
import CustomButton from "../customButton/CustomButton";
import "./actionAdmin.css";

const ActionAdmin = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="actionAdmin">
      <div className="actionAdmin-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <form className="actionAdmin-form">
        {title === "Pubblica nuovo evento!" ? (
          <>
            <div className="actionAdmin-form-row">
              <InputCustom label="Titolo Evento" type="text" />
              <InputCustom label="Descrizione Evento" type="text" />
            </div>
            <div className="actionAdmin-form-row">
            <InputCustom label="Ora Evento" type="time" />
            <InputCustom label="Luogo Evento" type="text" />
            </div>
            <div className="actionAdmin-form-row">
            <InputCustom label="Numero Partecipanti" type="number" />
            <InputCustom label="Data Evento" type="date" />
            </div>
            <CustomButton onClick={() => {}}>Pubblica Evento</CustomButton>
          </>
        ) : (
          <>
          <div className="actionAdmin-form-row">
            <InputCustom label="Titolo Libro" type="text" />
            <InputCustom label="Descrizione Libro" type="text" />
          </div>
          <div className="actionAdmin-form-row">
            <InputCustom label="Autore" type="text" />
            <InputCustom label="Genere" type="text" />
          </div>
          <div className="actionAdmin-form-row">
            <InputCustom label="Copie disponibili" type="number" />
            <InputCustom label="Luogo del ritiro" type="text" />
          </div>
          <CustomButton onClick={() => {}}>Pubblica Libro</CustomButton>
          </>
        )}
      </form>
    </div>
  );
};

export default ActionAdmin;
