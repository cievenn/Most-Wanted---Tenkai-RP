# 📚 Guide de l'Arborescence du Projet

## Vue d'ensemble

```
Most Wanted - Tenkai RP EQUIPAGE/
│
├── 📄 index.html                  ← Point d'entrée principal
├── 📄 README.md                   ← Documentation générale
├── 📄 .gitignore                  ← Fichiers à ignorer en Git
│
├── 📁 css/                        ← Styles CSS
│   └── styles.css                 ← Styles globaux extraits de l'HTML
│
├── 📁 js/                         ← Scripts JavaScript
│   └── script.js                  ← Logique interactif extraite de l'HTML
│
└── 📁 assets/                     ← Ressources multimédias
    ├── 📁 images/                 ← Images (à ajouter localement)
    │   ├── character_1.jpg
    │   ├── character_2.jpg
    │   └── ...
    ├── 📁 icons/                  ← Icônes personnalisées (optionnel)
    │   ├── logo.svg
    │   └── ...
    └── 📁 fonts/                  ← Polices locales (optionnel)
        ├── wallpoet.woff2
        └── ...
```

## 📖 Description des dossiers

### 🏠 Racine du projet
- **index.html** : Fichier HTML principal structurant l'ensemble du site
- **README.md** : Documentation complète en français
- **.gitignore** : Configuration pour ignorer les fichiers temporaires en Git

### 🎨 Dossier `css/`
Contient toutes les feuilles de style CSS:
- **styles.css** : CSS globale (extracted des balises `<style>` du HTML)
  - Variables de couleur (--trinity-red, --void, etc.)
  - Animations GSAP (@keyframes)
  - Styles du curseur personnalisé
  - Styles des effets 3D (tilt, glitch)
  - Styles responsifs (@media queries)

### ⚙️ Dossier `js/`
Contient toute la logique JavaScript:
- **script.js** : Code JavaScript interactif (extracted du HTML)
  - Base de données des personnages (`database`)
  - Système de curseur personnalisé (`initCustomCursor()`)
  - Effets 3D (`init3DTilt()`)
  - Logique des modales (`openStory()`, `closeStory()`)
  - Animations de transition (`answerCall()`)
  - Animations de scroll GSAP
  - Génération du fond ASCII

### 📦 Dossier `assets/`
Ressources multimédias du projet:

#### 📷 `assets/images/`
Destiné aux images locales du projet:
- Images des personnages
- Images de fond
- Screenshots
- Autres visuels

#### 🎯 `assets/icons/`
Icônes et ressources graphiques personnalisées:
- Logo du projet
- Icônes spécifiques
- Éléments graphiques vectoriels

#### 🔤 `assets/fonts/`
Polices web locales (si vous souhaitez les servir localement):
- Wallpoet
- Pirata One
- Rubik Glitch
- Share Tech Mono
- Syncopate

## 🔄 Flux de chargement

```
navigateur
    ↓
index.html
    ├─→ CDN: Tailwind CSS
    ├─→ CDN: Google Fonts
    ├─→ CDN: GSAP + ScrollTrigger
    ├─→ CDN: Lucide Icons
    ├─→ CDN: SplitType
    ├─→ css/styles.css ← Styles locaux
    └─→ js/script.js ← Logique locale
        ↓
    Initialisation du contenu interactif
```

## 💡 Bonnes pratiques

### Organisation du code
- ✅ CSS séparé dans `css/styles.css`
- ✅ JavaScript séparé dans `js/script.js`
- ✅ HTML propre et sémantique
- ✅ Assets organisés par type

### Performance
- 📦 Utiliser CDN pour les dépendances lourdes
- 🎯 Fichiers CSS/JS minifiés en production
- 📷 Images optimisées dans assets/images/
- 🔄 Cache busting pour les mises à jour

### Formation de fichiers futurs
Respecter la structure pour:
- Ajouter des sections HTML → sections dans index.html
- Ajouter des styles → ajouter aux classes dans css/styles.css
- Ajouter de la logique → ajouter des fonctions dans js/script.js
- Ajouter de la musique → créer `assets/audio/`
- Ajouter des vidéos → créer `assets/videos/`

## 🔗 Relations entre fichiers

```
index.html
    ├── lien vers → css/styles.css
    ├── lien vers → js/script.js
    └── références images → assets/images/
        (actuellement: URLs Unsplash externes)

js/script.js
    ├── utilise → database (données internes)
    ├── accède à → éléments du DOM (index.html)
    └── applique → classes de css/styles.css

css/styles.css
    ├── définit → animations keyframes
    ├── variables CSS → utilisées dans html/js
    └── media queries → responsive design
```

## 📝 Ajouter de nouveaux contenus

### Ajouter une image
1. Téléchargez l'image dans `assets/images/`
2. Mettez à jour le chemin dans la base de données `js/script.js`
3. Ou mettez à jour directement le `src` de l'image en HTML

### Ajouter un personnage
1. Ajoutez une entrée dans `database` dans `js/script.js`
2. Fournissez: `name`, `subtitle`, `img`, `story`
3. Créez un élément HTML qui appelle `openStory(id)`

### Ajouter un style
1. Modifiez ou ajoutez les règles CSS dans `css/styles.css`
2. Créez des classes correspondantes dans le HTML
3. Testez la responsivité

### Ajouter de la logique
1. Ajoutez des fonctions dans `js/script.js`
2. Nommez les fonctions clairement
3. Commentez le code complexe
4. Appelez les fonctions depuis le HTML (onclick, event listeners)

## 🚀 Recommandations futures

- [ ] Ajouter un dossier `data/` pour les fichiers JSON (personnages)
- [ ] Créer `js/database.js` séparé pour la gestion des données
- [ ] Créer `js/animations.js` séparé pour les animations complexes
- [ ] Minifier CSS/JS en production
- [ ] Ajouter un build tool (Webpack, Vite)
- [ ] Serveur local pour développement (live server)
- [ ] Tests automatisés
- [ ] Accessibilité (ARIA labels, keyboard navigation)
- [ ] Manifest PWA pour installation

## ❓ Questions fréquentes

**Q: Où ajouter mes propres images?**
R: Dans `assets/images/` et mettez à jour les références dans `js/script.js` ou l'HTML

**Q: Comment modifier les couleurs?**
R: Mettez à jour les variables CSS dans `css/styles.css` 
```css
:root {
    --trinity-red: #votre-couleur;
}
```

**Q: Où modifier les textes des personnages?**
R: Dans l'objet `database` dans `js/script.js`

**Q: Comment ajouter une nouvelle section?**
R: Ajoutez le HTML dans `index.html`, les styles dans `css/styles.css`, et la logique dans `js/script.js`

---

**Dernière mise à jour**: Février 2026
