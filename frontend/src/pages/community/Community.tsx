import InfoTable from "../../components/infoTable/InfoTable";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUsers, type User } from "../../services/api";
import "./community.css";

const Community = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="community">
      <h1 className="community-title">
        <span className="community-icon"><FaUsers /></span>
        La nostra Community
        </h1>
      <p className="community-description">Qui puoi vedere tutti gli utenti registrati.</p>
      <div>
        {loading && <p>Caricamento utenti...</p>}
        {error && <p>Impossibile caricare gli utenti: {error}</p>}
        {!loading && !error && (
          <InfoTable
            caption={`Utenti registrati (${users.length})`}
            headers={["ID", "Nome", "Email", "Telefono", "Iscritto da"]}
            rows={users.map((user, index) => [
              index + 1,
              `${user.first_name} ${user.last_name}`,
              user.email,
              user.phone ?? "-",
              new Date(user.created_at).toLocaleDateString("it-IT"),
            ])}
          />
        )}
      </div>
    </div>
  );
};

export default Community;
