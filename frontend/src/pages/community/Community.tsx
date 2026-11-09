import InfoTable from "../../components/infoTable/InfoTable";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUsers, type User } from "../../services/api";
import { getErrorMessage } from "../../i18n/errorMessage";
import { useTranslation } from "react-i18next";
import "./community.css";

const Community = () => {
  const { t, i18n } = useTranslation("community");
  const dateLocale = i18n.resolvedLanguage === "en" ? "en-GB" : "it-IT";
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="community">
      <h1 className="community-title">
        <span className="community-icon"><FaUsers /></span>
        {t("title")}
        </h1>
      <p className="community-description">{t("description")}</p>
      <div>
        {loading && <p>{t("loading")}</p>}
        {error && <p>{t("loadError", { error: getErrorMessage(error) })}</p>}
        {!loading && !error && (
          <InfoTable
            caption={t("users", { number: users.length })}
            headers={[t("id"), t("name"), t("email"), t("phone"), t("registeredSince")]}
            rows={users.map((user, index) => [
              index + 1,
              `${user.first_name} ${user.last_name}`,
              user.email,
              user.phone ?? "-",
              new Date(user.created_at).toLocaleDateString(dateLocale),
            ])}
          />
        )}
      </div>
    </div>
  );
};

export default Community;
