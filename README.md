# WANTED_DB - PROJECT_TRINITY_RED

## 📋 Description
Une application web cyberpunk interactive présentant une base de données "WANTED" avec une esthétique dystopique inspirée de l'univers de One Piece. Le site propose une expérience immersive avec des animations GSAP, des effets 3D et un système de curseur personnalisé.

## 🎯 Fonctionnalités principales
- **Écran d'introduction** - Transition cinématique avant l'accès au contenu
- **Curseur personnalisé** - Système de réticule tactique avec modes veille/verrouillage
- **Effet d'inclinaison 3D** - Parallaxe 3D au survol des cartes
- **Profils de personnages** - Base de données avec histoires et visuels
- **Modal d'histoires** - Affichage des récits avec animation de dactylographie
- **Animations GSAP** - Transitions fluides et effets de scroll
- **Responsive design** - Adapté aux appareils tactiles et desktop

## 📁 Structure du projet

```
Most Wanted - Tenkai RP EQUIPAGE/
├── index.html                 # Fichier principal HTML
├── css/
│   └── styles.css            # Styles CSS globaux
├── js/
│   └── script.js             # Logique JavaScript
├── assets/
│   ├── images/               # Images du projet
│   ├── icons/                # Icônes personnalisées
│   └── fonts/                # Polices locales (optionnel)
├── README.md                 # Documentation du projet
└── .gitignore               # Fichiers à ignorer en Git

```

## 🛠️ Technologies utilisées

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Styles avancés avec variables CSS, animations, Grid/Flexbox
- **JavaScript (Vanilla)** - Interactivité et animations
- **Tailwind CSS** - Framework CSS utilitaire (CDN)

### Bibliothèques externes
- **GSAP (GreenSock Animation Platform)** - Animations fluides et scroll triggers
- **Lucide Icons** - Icônes vectorielles modernes
- **Split Type** - Animations de texte caractère par caractère
- **SplitType.js** - Segmentation de texte pour animations

### Services externes
- **Google Fonts** - Polices web (Wallpoet, Pirata One, Rubik Glitch, Share Tech Mono, Syncopate)
- **Unsplash API** - Images HD pour les profils

## 🎨 Palette de couleurs

```
--trinity-red:  #ff003c (rouge principal)
--deep-red:     #2a000a (rouge foncé)
--chrome:       #e0e0e0 (gris clair)
--void:         #030303 (noir profond)
--grid:         rgba(255, 255, 255, 0.03) (grille)
```

## 📲 Points d'entrée

### Écran d'introduction
- Bouton "DÉCROCHER" pour répondre à l'appel
- Animation de transition cinématique vers le contenu principal

### Section Wanted List
- Affichage de 5 personnages principaux en grille asymétrique
- Survolez les cartes pour activer les effets 3D et marquee
- Cliquez pour ouvrir la modal d'histoire

### Section Logs
- Tableau de logs système avec événements
- Chaque entrée ouvre une histoire spécifique
- Design terminal avec effet de saisie en direct


## 🚀 Démarrage rapide

### Pré-requis
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- Connexion Internet (pour les CDN)

### Installation
1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans un navigateur
3. Cliquez sur "DÉCROCHER" pour commencer

## 📝 Configuration

### Modifier l'apparence
- **Couleurs** - Mettez à jour les variables CSS dans `css/styles.css`
- **Polices** - Modifiez les imports Google Fonts dans `index.html`
- **Contenus** - Éditez la base de données `database` dans `js/script.js`

### Ajouter de nouveaux personnages
1. Ajoutez une entrée dans l'objet `database` dans `js/script.js`
2. Créez un nouvel élément HTML cliquable qui appelle `openStory(id)`
3. Fournissez une image et un texte d'histoire

## 🎬 Animations principales

### Curseur personnalisé
- Système de réticule fixe au curseur
- Mode verrouillage au survol des éléments interactifs
- Effet d'agrandissement et changement de couleur

### Effets 3D
- Rotation 3D au survol basée sur la position de la souris
- Perspective 1000px pour profondeur
- Transformation lisse avec easing cubic-bezier

### Animations de scroll
- Fade-in et slide-up des sections
- Déclenchement au passage à 80% du viewport
- Stagger entre les enfants pour effet en cascade

### Transition écran d'accueil
1. Secousse violente de l'élément intro
2. Réduction verticale (effet TV éteindre)
3. Fermeture horizontale
4. Flash et apparition du contenu principal
5. Animation de chaque caractère H1

## 🔧 Développement

### Ajouter des styles
Éditez `css/styles.css` et utilisez les variables CSS prédéfinies.

### Développer des fonctionnalités
Tous les scripts se trouvent dans `js/script.js`. Utilisez des commentaires pour organiser le code.

### Déboguer
- Utilisez les DevTools (F12) pour inspecter les éléments
- Vérifiez la console pour les erreurs JavaScript
- Utilisez les DevTools de réseau pour contrôler les ressources externes

## 📱 Support mobile

Le projet inclut:
- Masquage du curseur personnalisé sur mobiles
- Désactivation des effets 3D au survol sur tactiles
- Layout responsive avec breakpoints Tailwind
- Scroll tactile amélioré avec `-webkit-overflow-scrolling: touch`

## 🐛 Dépannage

### Animations ne fonctionnent pas
- Vérifiez que GSAP est chargé correctement
- Vérifiez la connexion Internet pour les CDN
- Ouvrez la console pour les erreurs

### Curseur ne s'affiche pas
- Vérifiez que vous n'êtes pas sur un appareil tactile
- Le CSS peut être bloqué par une extension (vérifiez les DevTools)

### Images ne chargent pas
- Vérifiez la connexion Internet
- Unsplash peut avoir des limites de débit - attendez quelques secondes
- Vérifiez les URL d'images dans la base de données

## 📄 Licence
Ce projet est fourni à titre informatif.

## 👤 Auteur
Tenkai RP - Project Trinity Red

---

**Dernière mise à jour**: Février 2026
