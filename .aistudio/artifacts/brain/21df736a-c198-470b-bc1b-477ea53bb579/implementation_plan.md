# Plateforme Bilingue d'Apprentissage de l'Anglais (Bilingual English-French Reader with Arabic Tooltips)

Plateforme interactive dédiée à l'apprentissage de l'anglais pour les francophones et arabophones, articulée autour d'une lecture synchronisée en deux colonnes (anglais et français), d'un dictionnaire contextuel instantané en arabe au survol de chaque mot, et d'un ensemble d'exercices interactifs progressifs.

## User Review & Critical Decisions

> [!IMPORTANT]
> Voici l'architecture et les choix retenus pour répondre précisément à vos exigences :
> 1. **Affichage bilingue en 2 colonnes verticales** : Texte anglais à gauche, traduction française correspondante en vis-à-vis à droite, avec synchronisation visuelle (surlignage des phrases miroirs au survol ou au clic).
> 2. **Infobulle arabe instantanée au curseur** : Survoler n'importe quel mot (anglais ou français) fait apparaître immédiatement près du curseur la traduction en arabe (avec calligraphie arabe soignée RTL, prononciation audio vocale et nature grammaticale).
> 3. **Exercices interactifs variés** :
>    - Quiz de compréhension basé sur le texte bilingue
>    - Textes à trous (Fill-in-the-blank / Cloze)
>    - Association de paires de vocabulaire (Anglais - Français - Arabe)
>    - Reconstruction de phrases (Word Scramble)
> 4. **Bibliothèque de textes & Import personnalisé** : Textes intégrés par niveaux (Débutant, Intermédiaire, Avancé) ainsi qu'un outil pour coller et pratiquer sur ses propres textes.

---

## 1. Overview & Core Concept

- **Objectif principal** : Permettre d'acquérir du vocabulaire et de la grammaire anglaise de manière intuitive grâce au texte miroir en français et à l'appui d'une troisième langue (l'arabe) au survol de chaque mot.
- **Public cible** : Apprenants francophones et/ou arabophones souhaitant maîtriser l'anglais à travers la lecture comparative et la pratique interactive active.
- **Valeur clé** : Élimine la friction de devoir chercher des mots dans un dictionnaire externe : tout est affiché instantanément en contexte bilingue et trilingue avec synthèse vocale intégrée.

---

## 2. User Experience & Visual Design

### Parcours Utilisateur
1. **En-tête & Sélection de contenu** : Choix du niveau (A1-A2 Débutant, B1-B2 Intermédiaire, C1 Avancé), sélection du texte thématique (ex: Voyage, Technologie, Vie quotidienne, Récit littéraire) ou saisie d'un texte libre.
2. **Espace de Lecture Bilingue (Double Colonne)** :
   - Colonne gauche : Texte en **Anglais** (langue cible).
   - Colonne droite : Même texte en **Français** (langue de référence), rigoureusement aligné paragraphe par paragraphe et phrase par phrase.
   - Synchronisation visuelle : survoler ou cliquer sur une phrase éclaire simultanément son équivalent dans l'autre colonne.
3. **Curseur Interactif & Infobulle Arabe (Floating Tooltip)** :
   - Au survol de n'importe quel mot : une infobulle fluide suit le curseur avec la traduction exacte en arabe (police arabe Noto Sans Arabic / Amiri élégante), l'API Web Speech pour écouter la prononciation anglaise, et un bouton pour l'enregistrer dans son carnet personnel.
4. **Module d'Exercices Interactifs** (Onglet ou panneau inférieur) :
   - **Mode Compréhension** : QCM ciblés sur le texte avec explications détaillées.
   - **Mode Cloze (Texte à trous)** : Compléter les mots anglais manquants en s'aidant du texte français et des indices arabes.
   - **Mode Paires de mots** : Relier le mot anglais à sa traduction française et arabe correspondante.
   - **Mode Réorganisation** : Remettre les mots anglais dans le bon ordre syntaxique.
5. **Carnet de Vocabulaire & Flashcards** : Révision rapide des mots consultés avec répétition espacée.

### Direction Artistique & Style
- **Aesthetic Direction** : Interface éducative haut de gamme, moderne et typographique, inspirée des meilleurs outils de philologie et d'apprentissage des langues (esprit Notion / Duolingo élégant / DeepL).
- **Palette chromatique (Discipline 60-30-10)** :
  - *Canvas (60%)* : Fond neutre apaisant, blanc doux `#FAFAFA` et ardoise claire, mode sombre chaleureux `#0F172A`.
  - *Structure (30%)* : Bordures délicates `#E2E8F0`, cartes de lecture surélevées en blanc pur avec bordure fine.
  - *Accents (10%)* : Bleu azur saphir `#2563EB` pour l'anglais, vert émeraude `#059669` pour le français, et doré ambre doux `#D97706` pour les annotations arabes.
- **Typographie** :
  - Titres et interface : `Plus Jakarta Sans`
  - Textes de lecture : Typographie serif hautement lisible `Source Serif 4` / `Merriweather` pour le confort de lecture prolongée
  - Écriture arabe : Typographie arabe dédiée (`system-ui, "Traditional Arabic", "Amiri", sans-serif`) avec support natif `dir="rtl"` et diacritiques clairs.

---

## 3. Key Product Decisions & Trade-Offs

- **Dictionnaire trilingue contextuel & Moteur lemmatisé** :
  - *Choix* : Base de données lexicale trilingue exhaustive intégrée (avec correspondance lemmatisée, formes plurielles, verbes conjugués) combinée à un système d'analyse lexicale instantanée pour garantir que chaque mot survolé affiche immédiatement une traduction arabe précise sans délai ni latence réseau.
  - *Bénéfice* : Expérience instantanée à 60 FPS sans spinner de chargement au survol du curseur.
- **Synthèse vocale native (Web Speech API)** :
  - *Choix* : Utilisation de `window.speechSynthesis` avec voix anglaises (US/UK) pour prononcer chaque mot ou phrase sur demande.
  - *Bénéfice* : Gratuit, instantané, sans clé API requise, fonctionne hors-ligne.
- **Alignement bilingue phrase par phrase (Sentence-level mirroring)** :
  - *Choix* : Découpage sémantique des paragraphes en segments de phrases appariés avec identifiants partagés.
  - *Bénéfice* : L'œil de l'apprenant ne se perd jamais entre la colonne anglaise et la colonne française.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│  [LinguaDuo EN-FR-AR]   ·   [Textes]   [Exercices]   [Mon Carnet]      │
└────────────────────────────────────────────────────────────────────────┘
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼                                               ▼
┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│     Colonne 1 : English         │   │     Colonne 2 : Français        │
│  (Target Language - Audio)      │   │  (Reference Language)           │
│                                 │   │                                 │
│  Sentence A1 [Word 1][Word 2]...│───│  Phrase A1 [Mot 1][Mot 2]...    │
│  Sentence A2 [Word 3]...        │───│  Phrase A2 [Mot 3]...           │
└─────────────────────────────────┘   └─────────────────────────────────┘
                 │                                     │
                 └──────────────┬──────────────────────┘
                                ▼
         ┌───────────────────────────────────────────────┐
         │     Floating Cursor Tooltip (Hover Engine)    │
         │  Word: "Knowledge" / "Connaissance"           │
         │  Arabe (العربية): "مَعْرِفَة" (Nom fém.)     │
         │  Audio Pronunciation 🔊  ·  Save Word ⭐      │
         └───────────────────────────────────────────────┘
                                │
         ┌──────────────────────┴───────────────────────┐
         ▼                                              ▼
┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│    Interactive Exercises Hub    │   │      Saved Vocabulary Deck      │
│  • Fill-in-the-blanks (Cloze)   │   │  • Flashcards with Spaced Rep   │
│  • Reading Comprehension Quiz   │   │  • Pronunciation Trainer        │
│  • Word-Matching pairs          │   │  • Word Mastery Progress        │
│  • Sentence Builder             │   │                                 │
└─────────────────────────────────┘   └─────────────────────────────────┘
```

### Plan de Déploiement & Étapes :
1. **Configuration & Métadonnées** : Configuration du titre et métadonnées dans `metadata.json` et `index.html`.
2. **Moteur Lexical Trilingue (EN-FR-AR)** : Dictionnaire de vocabulaire étendu avec traductions en arabe, prononciation phonétique, classes grammaticales et exemples.
3. **Composant Bilingue Synchronisé (`DualColumnReader`)** :
   - Deux colonnes côte à côte avec scroll synchronisé ou indépendant au choix.
   - Découpage par mot et phrase avec détection du survol.
   - Infobulle flottante fluide ancrée dynamiquement à la position du curseur (`x, y`), évitant les débordements d'écran.
4. **Moteur d'Exercices Interactifs (`ExerciseHub`)** :
   - Cloze / Texte à trous avec validation instantanée.
   - Quiz de compréhension avec feedback pédagogique.
   - Association de paires (Match words).
   - Puzzle de syntaxe / Sentence builder.
5. **Gestionnaire de textes & Carnet de vocabulaire** :
   - Sélection parmi 6 textes bilingues riches (A1 à C1).
   - Mode importation libre pour ajouter ses propres textes.
   - Système de favoris / mots à réviser avec flashcards interactives.
