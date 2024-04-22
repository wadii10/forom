# Laravel/ReactJS Forum Multimedia

## Introduction

Bienvenue sur l'application de forum multimedia, une plateforme communautaire dédiée au partage et à la discussion de votre sujet préférée. Cette application permet aux utilisateurs de créer des discussions, d'explorer différentes catégories, de rechercher des sujets spécifiques et de gérer leurs activités via des tableaux de bord personnalisés.

![mockup-0](https://github.com/aldiandarwin/forum-app/assets/70283015/ca0a4718-149e-4651-9237-dd5cb1bb1e69)

## Fonctionnalités

### 1. Partage de Discussions

- Créez et partagez des discussions pour parler de votre sujet préféré.

### 2. Catégories

- Les discussions sont organisées en catégories pour une navigation facile.
- Explorez les discussions en fonction des sujets spécifiques.

### 3. Recherche

- Utilisez la fonction de recherche pour trouver des discussions ou des sujets rapidement.
- Améliorez votre expérience en trouvant facilement du contenu pertinent.

### 4. Tableau de Bord Personnalisé

- Gérez vos activités sur le forum grâce à de tableau de bord personnalisé.
- Suivez facilement vos discussions, vos réponses et vos engagements.

## Installation

Voici les étapes à suivre pour configurer l'application Forum Multimedia :

### **Clone the repository:**

```bash
git clone <https://github.com/wadii10/forom.git>
```

Install dependencies:

bash

```Copier le code
- composer install
```

Configuration des variables d'environnement :

- Dupliquer le fichier .env.example vers .env.
- Mettre à jour les paramètres de connexion à la base de données et les autres configurations dans le fichier.

Générer la clé d'application :

bash

```Copier le code
php artisan key:generate
```

Exécutez des migrations et lancez la base de données:

bash

```Copier le code
php artisan migrate --seed
```

Démarrez le serveur de développement:

bash

```Copier code
php artisan serve
```

Visitez l'application dans votre navigateur à <http://localhost:8000> ou sur le port spécifié.