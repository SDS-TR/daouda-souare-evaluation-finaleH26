# Bibliothèque numérique — Souare Daouda

Application web full-stack pour consulter les livres disponibles et afficher les emprunts d'un utilisateur à partir de son adresse courriel.

## Technologies

| Couche | Technologies |
|--------|-------------|
| Frontend | React, Vite, React Router, Axios |
| Backend | Node.js, Express |
| Base de données | MySQL |
| Tests unitaires | Jest, Supertest |
| Tests E2E | Cypress |

## Structure du projet

```
bibliotheque/
├── client/                 # Application React (Vite)
│   ├── cypress/            # Tests E2E Cypress
│   └── src/
│       ├── pages/          # Livres.jsx, MesEmprunts.jsx
│       └── config/         # Configuration de l'URL API
└── server/                 # API Express
    ├── config/             # Connexion MySQL
    ├── controllers/        # Logique métier
    ├── routes/             # Routes API
    └── tests/              # Tests Jest
```

## Prérequis

- [Node.js](https://nodejs.org/) (v18 ou plus récent)
- Une base de données MySQL accessible (locale ou cloud, ex. Railway)

## Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-depot>
cd bibliotheque
```

### 2. Installer les dépendances du serveur

```bash
cd server
npm install
```

### 3. Installer les dépendances du client

```bash
cd ../client
npm install
```

## Configuration

Créez un fichier `server/.env` à partir du modèle ci-dessous :

```env
DB_HOST=votre-hote-mysql
DB_USER=votre-utilisateur
DB_PASSWORD=votre-mot-de-passe
DB_NAME=votre-base
DB_PORT=3306

PORT=5000
```

> **Important :** `DB_PORT` est le port MySQL (ex. `41790` sur Railway). `PORT` est le port du serveur Express en local.

## Démarrage en local

Ouvrez **deux terminaux**.

**Terminal 1 — API :**

```bash
cd server
npm start
```

Le serveur démarre sur `http://localhost:5000`.

**Terminal 2 — Client React :**

```bash
cd client
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

## Fonctionnalités

- **Page d'accueil (`/`)** — Liste des livres disponibles (ID, titre, auteur)
- **Mes emprunts (`/emprunts`)** — Recherche des emprunts en cours par adresse courriel

## API

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/livres` | Retourne les livres disponibles |
| `GET` | `/api/livres/emprunts?email=` | Retourne les emprunts actifs d'un utilisateur |

### Exemples

```bash
curl http://localhost:5000/api/livres
curl "http://localhost:5000/api/livres/emprunts?email=user@mail.com"
```

## Tests

### Tests unitaires (Jest)

```bash
cd server
npm test
```

Les tests vérifient :
- `GET /api/livres` renvoie un tableau
- `GET /api/livres/emprunts` sans email renvoie une erreur 400
- `GET /api/livres/emprunts` avec email renvoie un tableau

### Tests E2E (Cypress)

1. Démarrez le client : `npm run dev` (dans `client`)
2. Lancez Cypress :

```bash
cd client
npm run test:e2e
```

3. Sélectionnez le fichier `emprunts.cy.js`

Le scénario E2E :
- Ouvre `/emprunts`
- Remplit le formulaire avec un email
- Soumet et vérifie l'affichage des emprunts (titre, auteur, dates)

## Déploiement sur Render

### Paramètres du service

| Paramètre | Valeur |
|-----------|--------|
| Root Directory | `server` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |

### Variables d'environnement obligatoires

| Variable | Exemple | Description |
|----------|---------|-------------|
| `DB_HOST` | `xxx.proxy.rlwy.net` | Hôte MySQL Railway |
| `DB_USER` | `root` | Utilisateur MySQL |
| `DB_PASSWORD` | `***` | Mot de passe MySQL |
| `DB_NAME` | `railway` | Nom de la base |
| `DB_PORT` | `41790` | **Port MySQL Railway (obligatoire)** |

> Ne confondez pas `DB_PORT` (MySQL) avec `PORT` (Express). Render définit `PORT` automatiquement.

### Vérification après déploiement

1. `https://votre-app.onrender.com/` → doit afficher l'application React
2. `https://votre-app.onrender.com/api/health` → doit retourner `{ "status": "ok" }`
3. `https://votre-app.onrender.com/api/livres` → doit retourner un tableau de livres

Si vous voyez seulement un JSON avec `"message": "API Bibliothèque numérique"`, le build du client a échoué : vérifiez les logs Render.

Si `/api/livres` retourne `{"fatal":true}`, la connexion MySQL est incorrecte : vérifiez `DB_PORT` et les autres variables.

## Auteur

**Souare Daouda**
