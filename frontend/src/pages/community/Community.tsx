import InfoTable from "../../components/infoTable/InfoTable";
import { FaUsers } from "react-icons/fa";
import users from "../../data/users.json";
import "./community.css";

const Community = () => {
 

  return (
    <div className="community">
      <h1 className="community-title">
        <span className="community-icon"><FaUsers /></span>
        La nostra Community
        </h1>
      <p className="community-description">Qui puoi vedere tutti gli utenti registrati.</p>
      <div>
        <InfoTable
          caption="Utenti registrati"
          headers={["ID", "Name", "Email", "numero", "Iscritto da"]}
          rows={users.map((user : { id: number; name: string; email: string; numero: string; iscritto_da: string }) => [
            user.id,
            user.name,
            user.email,
            user.numero,
            user.iscritto_da,
          ])}
        />
      </div>
    </div>
  );
};

export default Community;
