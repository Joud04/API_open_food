## 🎓 Projet Final : Architecture Micro-Services & Déploiement

### 1. Contexte & Objectifs

Vous êtes une équipe d'ingénieurs DevOps chargée de concevoir, conteneuriser et déployer une solution web robuste. Le sujet est **libre** (site e-commerce, dashboard IoT, blog perso, outil de gestion de collection, etc.), mais l'architecture technique est **imposée**.

L'objectif n'est pas de coder l'application du siècle, mais de construire l'infrastructure qui l'héberge de manière professionnelle.

### 2. Modalités de Rendu

- **Groupe :** 1 à 3 personnes maximum.
    
- **Livrable :** Un lien vers un dépôt **GitHub Public**.
    
- **Date limite :** [Insérer Date/Heure]
    
- **⚠️ CRITÈRE ÉLIMINATOIRE :**
    
    - Le fichier `README.md` doit être présent à la racine.
        
    - Il doit contenir **clairement** les **Nom(s) et Prénom(s)** de chaque membre du groupe en haut de page.
        
    - _Sans ces informations, le projet est considéré comme "Non Rendu" (0/20)._
        

### 3. Spécifications Techniques (Le Cahier des Charges)

Votre dépôt doit contenir un `docker-compose.yml` fonctionnel respectant les contraintes suivantes :

1. **Services Web (Min. 2) :**
    
    - Au moins deux services applicatifs distincts (ex: un Frontend + une API, ou un WordPress + un Wiki, ou une App Custom + un outil de Chat).
        
2. **Service de Données (Min. 1) :**
    
    - Une base de données (MySQL, Postgres, Mongo, Redis...) avec **persistance des données** (Volumes Docker).
        
3. **Service de Gestion/Admin :**
    
    - Une interface pour gérer l'infra ou les données (ex: _Portainer_, _Adminer_, _PhpMyAdmin_, ou un dashboard de monitoring).
        
4. **Reverse Proxy & Réseau :**
    
    - Utilisation de **Caddy** (ou Traefik) comme point d'entrée unique.
        
    - Pas d'exposition directe des ports de BDD ou d'API sur internet.
        
5. **Accessibilité Internet :**
    
    - Mise en place d'un tunnel **Cloudflare** (`cloudflared`) pour rendre le projet accessible publiquement via HTTPS.
        
6. **Robustesse :**
    
    - Politiques de redémarrage (`restart: always` ou `unless-stopped`).
        
    - Utilisation de `healthcheck` est un plus.
        

### 4. Le Rapport (README.md)

Le code ne suffit pas. Votre `README.md` servira de rapport de projet. Il doit expliquer :

- Ce que fait votre projet.
    
- L'architecture technique (Schéma UML obligatoire).
    
- Comment le lancer.
    
- Votre méthodologie (Organisation, Outils).
    
- **Transparence IA :** Une section dédiée expliquant quels outils d'IA (ChatGPT, Copilot, Cursor...) vous avez utilisés, pour quelles tâches (génération de code, débug, écriture) et votre retour d'expérience dessus.
