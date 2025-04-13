
# 🎓 Online Course Management System

Ce projet est une application complète de gestion de cours en ligne, développée dans le cadre de l’évaluation de stage full-stack chez **TeamElGhazi**.

🛠️ Réalisé en seulement **4 jours** (étude + application) avec une approche pratique et agile.

---

## 🧰 Stack Technique

- **Frontend:** React.js (JavaScript) ,Tailwind (css)
- **Backend:** Node.js, Express.js
- **Base de données:** MySQL (via Sequelize)
- **Authentification:** JWT
- **ORM:** Sequelize

---

## ✨ Fonctionnalités principales

- Authentification des utilisateurs (inscription / connexion)
- Gestion des cours
- Inscription des utilisateurs aux cours
- Affichage des cours auxquels un utilisateur est inscrit
- Suivi de progression pour chaque cours ✅
- API sécurisée avec JWT

---

## ⚙️ Installation & Lancement du Projet

### 1. Prérequis

- Node.js
- MySQL
- Git

---

### 2. Installer et configurer MySQL

- Assurez-vous que MySQL est installé et en cours d’exécution
- Créez une base de données, par exemple : `course_management_db`
- Mettez à jour les identifiants de connexion dans le fichier `.env` du dossier `backend` :
  - Vous y trouverez un fichier nommé **`.env.exemple`**. Renommez-le en `.env` et mettez à jour les informations de connexion à la base de données comme suit :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=course_management_db
JWT_SECRET=your_jwt_secret
```

---

### 3. Cloner le projet

Clonez le projet depuis GitHub en utilisant la commande suivante :

```bash
git clone https://github.com/ismailbaoud/systeme_de_gestion_de_cours_TEAMELGAHZI.git
cd systeme_de_gestion_de_cours_TEAMELGAHZI
```

---

### 4. Lancer le backend

1. Allez dans le dossier `backend` :
   
```bash
cd backend
```

2. Installez les dépendances :
   
```bash
npm install
```

3. Configurez la base de données avec Sequelize :

```bash
npm run setup      # Crée les tables avec Sequelize
```

4. Démarrez le serveur backend :

```bash
npm run start      # Démarre le serveur backend
```

Le backend sera accessible sur `http://localhost:5000`.

---

### 5. Lancer le frontend (dans un nouvel onglet ou terminal)

1. Allez dans le dossier `frontend` :

```bash
cd frontend
```

2. Installez les dépendances :

```bash
npm install
```

3. Démarrez le frontend :

```bash
npm run setup      # Installe les dépendances si besoin
npm run dev        # Démarre le frontend sur localhost
```

Le frontend sera accessible sur `http://localhost:3000`.

---

## 📂 Structure du projet

```
online-course-management/
│
├── backend/          # API Express avec Sequelize
│
└── frontend/         # Interface utilisateur React
```

---

## 📫 Contact

Développé par **Ismail Baoud**  
📧 ismailbaoud04@gmail.com  
📍 Essaouira, Maroc
