# API Open Food Facts

> **⚠️ MEMBRES DU GROUPE :**
> - ATALLAH Joud
> - HDILOU Walid


---

## 1. Présentation du Projet
*Décrivez ici en quelques lignes le but de votre application.*
*Exemple : Ce projet est une stack permettant de gérer une liste de tâches (TodoList) avec une interface web et une base de données, le tout monitoré via Portainer.*

**Fonctionnalités principales :**
* Fonctionnalité 1
* Fonctionnalité 2

**Lien accessible (si tunnel actif) :** [https://votre-url-random.trycloudflare.com](https://votre-url-random.trycloudflare.com)

**Screenshot de l'application déployée** : ![](screenshot.jpg)
## 2. Architecture Technique

### Schéma d'infrastructure
*Ce schéma est généré dynamiquement à partir du fichier `architecture.puml` présent dans ce dépôt.*

![Architecture du Projet](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/VOTRE_USERNAME_GITHUB/NOM_DU_REPO/main/architecture.puml)

*(Note aux étudiants : Pour que l'image ci-dessus s'affiche :*
1. *Créez un fichier `architecture.puml` à la racine de votre repo.*
2. *Mettez votre code PlantUML dedans.*
3. *Remplacez `VOTRE_USERNAME_GITHUB` et `NOM_DU_REPO` dans l'URL ci-dessus par les vôtres.*
4. *Assurez-vous que votre repo est Public.)*

### Description des services
| Service | Image Docker | Rôle | Port Interne |
| :--- | :--- | :--- | :--- |
| **Proxy** | `caddy:latest` | Reverse Proxy & Routing | 80 |
| **App** | `wordpress` | CMS | 80 |
| **DB** | `mysql:5.7` | Base de données | 3306 |
| **Tunnel** | `cloudflared` | Exposition Internet | N/A |

## 3. Guide d'installation

Pour lancer le projet localement :

1.  Cloner le dépôt :
    ```bash
    git clone [https://github.com/votre-user/votre-repo.git](https://github.com/votre-user/votre-repo.git)
    cd votre-repo
    ```

2.  Lancer la stack :
    ```bash
    docker compose up -d
    ```

3.  Accéder aux services :
    * Web : `http://localhost`
    * Admin : `http://localhost/adminer` (exemple)

4.  Obtenir l'URL publique :
    ```bash
    docker compose logs -f tunnel
    ```

## 4. Méthodologie & Transparence IA

### Organisation
*Expliquez rapidement comment vous avez travaillé (Pair programming, répartition des tâches...)*

### Utilisation de l'IA (Copilot, ChatGPT, Cursor...)
*Soyez honnêtes, c'est valorisé !*

* **Outils utilisés :** (Ex: ChatGPT 4, GitHub Copilot)
* **Usage :**
    * *Génération de code :* (Ex: "Nous avons utilisé Copilot pour générer le boilerplate du Docker Compose")
    * *Débuggage :* (Ex: "ChatGPT nous a aidé à comprendre l'erreur 502 Bad Gateway")
    * *Documentation :* (Ex: "Nous avons reformulé l'intro avec l'IA")
* **Apprentissage :** (Ce que l'IA a fait vs ce que vous avez compris).

## 5. Difficultés rencontrées & Solutions
* *Problème 1 :* La base de données ne gardait pas les données.
* *Solution :* Ajout d'un volume nommé dans le docker-compose.