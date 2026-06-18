import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";

function Livres() {
  const [livres, setLivres] = useState([]);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/livres`, { timeout: 90000 })
      .then((res) => {
        setLivres(res.data);
      })
      .catch(() => {
        setErreur(
          "Impossible de charger les livres. L'API Render peut mettre jusqu'à 1 minute à démarrer. Réessayez dans quelques secondes."
        );
      })
      .finally(() => {
        setChargement(false);
      });
  }, []);

  return (
    <>
      <h1>Livres disponibles</h1>

      {chargement && <p>Chargement des livres depuis l'API...</p>}
      {erreur && <p>{erreur}</p>}

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Auteur</th>
          </tr>
        </thead>

        <tbody>
          {livres.map((livre) => (
            <tr key={livre.id_livre}>
              <td>{livre.id_livre}</td>
              <td>{livre.titre}</td>
              <td>{livre.auteur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Livres;
