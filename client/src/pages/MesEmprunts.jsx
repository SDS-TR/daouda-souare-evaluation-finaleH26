import { useState } from "react";
import axios from "axios";
import API_URL from "../config/api";

function MesEmprunts() {

    const [email, setEmail] = useState("");
    const [emprunts, setEmprunts] = useState([]);
    const [rechercheEffectuee, setRechercheEffectuee] = useState(false);
    const [loading, setLoading] = useState(false);

    const chercherEmprunts = () => {

        if (!email) {
            alert("Veuillez entrer un email");
            return;
        }

        setLoading(true);

        axios
        .get(`${API_URL}/api/emprunts`, {
            params: { email }
        })
        .then(res => {
            setEmprunts(res.data);
            setRechercheEffectuee(true);
        })
        .catch(err => {
            console.log("Erreur API :", err);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div>
            <h1>Mes emprunts</h1>

            {/* FORMULAIRE */}
            <input
                type="email"
                placeholder="Entrer votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={chercherEmprunts}>
                Voir mes emprunts
            </button>

            {/* LOADING */}
            {loading && <p>Chargement...</p>}

            <hr />

            {/* AFFICHAGE */}
            {rechercheEffectuee && emprunts.length === 0 && (
                <p>Aucun emprunt trouvé</p>
            )}

            {emprunts.map((e) => (
                <div key={e.id_livre} style={{ marginBottom: "10px" }}>
                    <h3>{e.titre}</h3>
                    <p>Auteur : {e.auteur}</p>
                    <p>📅 Emprunt : {e.date_emprunt}</p>
                    <p>📆 Retour prévu : {e.date_retour_prevue}</p>
                </div>
            ))}
        </div>
    );
}

export default MesEmprunts;
