import { BilingualText, ReadingExercise, ListeningExercise, WritingExercise } from '../types';

/**
 * Ensures that every course/text has at least 5 exercises in each of the 3 sections:
 * 1. Reading (Lecture & Compréhension écrite) >= 5
 * 2. Listening (Écoute & Compréhension orale) >= 5
 * 3. Writing (Écriture & Syntaxe) >= 5
 * Every exercise includes full corrections and Arabic keyword translations.
 */
export function generateCurriculumExercises(text: BilingualText): {
  reading: ReadingExercise[];
  listening: ListeningExercise[];
  writing: WritingExercise[];
} {
  const sentences = text.sentencePairs;
  const s0 = sentences[0] || { en: 'Learning a new language opens new worlds.', fr: 'Apprendre une nouvelle langue ouvre de nouveaux mondes.' };
  const s1 = sentences[1] || { en: 'Daily practice creates permanent confidence.', fr: 'La pratique quotidienne crée une confiance permanente.' };
  const s2 = sentences[2] || { en: 'Curiosity is the key to deep understanding.', fr: 'La curiosité est la clé d\'une compréhension profonde.' };
  const s3 = sentences[3] || s0;
  const s4 = sentences[4] || s1;

  // Words for vocabulary exercises
  const vocab = text.keyVocabulary.length >= 3
    ? text.keyVocabulary
    : [
        { en: 'knowledge', fr: 'connaissance', ar: 'مَعْرِفَة', phonetic: '/ˈnɒl.ɪdʒ/' },
        { en: 'practice', fr: 'pratique', ar: 'مُمَارَسَة', phonetic: '/ˈpræk.tɪs/' },
        { en: 'patience', fr: 'patience', ar: 'صَبْر', phonetic: '/ˈpeɪ.ʃəns/' },
        { en: 'precision', fr: 'précision', ar: 'دِقَّة', phonetic: '/prɪˈsɪʒ.ən/' },
      ];

  // ==========================================
  // SECTION 1: READING (5+ EXERCISES)
  // ==========================================
  const reading: ReadingExercise[] = [
    {
      id: `${text.id}-read-1`,
      type: 'comprehension',
      typeLabel: 'Compréhension globale',
      question: `Quel est le thème principal et l'objectif du texte « ${text.titleFr} » ?`,
      passageSnippet: `${s0.en} ${s1.en}`,
      options: [
        `Développer une compréhension approfondie sur : ${text.topic}`,
        'Décrire une recette de cuisine traditionnelle',
        'Donner les horaires d\'une ligne de train',
        'Critiquer les nouvelles technologies sans explication',
      ],
      correctIndex: 0,
      explanationFr: `Le texte aborde la thématique de « ${text.topic} ». L'auteur transmet une réflexion structurée à travers des situations concrètes.`,
      keywordAr: 'فَهْمُ الْمَقْرُوء (Compréhension écrite)',
    },
    {
      id: `${text.id}-read-2`,
      type: 'true_false',
      typeLabel: 'Vrai ou Faux factuel',
      question: `D'après le passage suivant : « ${s0.fr} », l'affirmation « ${s0.en} » est-elle exacte ?`,
      passageSnippet: s0.en,
      options: [
        'Vrai (True) - L\'affirmation correspond exactement au texte',
        'Faux (False) - Le texte dit le contraire',
        'Non mentionné (Not mentioned) - On ne peut pas savoir',
      ],
      correctIndex: 0,
      explanationFr: `L'énoncé anglais « ${s0.en} » traduit fidèlement l'idée : « ${s0.fr} ».`,
      keywordAr: 'صَحِيحٌ أَمْ خَطَأ (Vrai ou Faux)',
    },
    {
      id: `${text.id}-read-3`,
      type: 'vocabulary',
      typeLabel: 'Vocabulaire en contexte',
      question: `Que signifie le mot clé « ${vocab[0]?.en || 'journey'} » dans le cadre de ce texte ?`,
      passageSnippet: `Extrait : « ${s1.en} »`,
      options: [
        `${vocab[0]?.fr || 'voyage'} (Arabe : ${vocab[0]?.ar || 'رِحْلَة'})`,
        'Un animal sauvage dans la forêt',
        'Un outil pour couper du métal',
        'Une boisson chaude du petit-déjeuner',
      ],
      correctIndex: 0,
      explanationFr: `Le terme « ${vocab[0]?.en} » désigne « ${vocab[0]?.fr} », traduit en arabe par « ${vocab[0]?.ar} ».`,
      keywordAr: vocab[0]?.ar || 'مُفْرَدَات',
    },
    {
      id: `${text.id}-read-4`,
      type: 'inference',
      typeLabel: 'Inférence & Déduction',
      question: `À partir de la phrase : « ${s2.en} », que peut-on déduire de l'attitude décrite ?`,
      passageSnippet: s2.en,
      options: [
        `Cela illustre une approche attentive et respectueuse de la situation : « ${s2.fr} »`,
        'Les protagonistes veulent quitter les lieux au plus vite',
        'Il s\'agit d\'une dispute violente entre plusieurs personnes',
        'Le narrateur n\'accorde aucune importance aux détails',
      ],
      correctIndex: 0,
      explanationFr: `L'expression anglaise met en relief : « ${s2.fr} ».`,
      keywordAr: 'اسْتِنْتَاج (Inférence / Déduction)',
    },
    {
      id: `${text.id}-read-5`,
      type: 'main_idea',
      typeLabel: 'Idée directrice & Morale',
      question: `Quelle conclusion principale l'apprenant doit-il retenir de cette lecture ?`,
      passageSnippet: `${s3.en} ${s4.en}`,
      options: [
        `La persévérance, l'attention aux détails et la pratique enrichissent notre savoir`,
        'Il est inutile d\'apprendre de nouveaux mots chaque jour',
        'Seuls les voyages lointains permettent d\'apprendre',
        'Toutes les montres et horloges fonctionnent de manière identique',
      ],
      correctIndex: 0,
      explanationFr: `Ce récit met en avant la richesse de l'apprentissage continu et de l'observation attentive du monde qui nous entoure.`,
      keywordAr: 'الْفِكْرَةُ الرَّئِيسِيَّة (Idée principale)',
    },
  ];

  // ==========================================
  // SECTION 2: LISTENING (5+ EXERCISES)
  // ==========================================
  const listening: ListeningExercise[] = [
    {
      id: `${text.id}-list-1`,
      type: 'audio_mcq',
      typeLabel: 'Écoute & Discrimination de phrase',
      audioText: s0.en,
      question: 'Écoutez l\'audio attentivement. Quelle est la phrase exacte qui vient d\'être prononcée ?',
      options: [
        s0.en,
        s0.en.replace(/\b(the|a|in|on|at|to)\b/gi, 'some'),
        s1.en,
        s2.en,
      ],
      correctIndex: 0,
      explanationFr: `Vous avez entendu la phrase initiale : « ${s0.en} » (Traduction : « ${s0.fr} »).`,
      keywordAr: 'اسْتِمَاع (Écoute)',
    },
    {
      id: `${text.id}-list-2`,
      type: 'dictation',
      typeLabel: 'Dictée de mot clé',
      audioText: s1.en,
      question: `Écoutez la phrase : « ${s1.en} ». Quel est le mot essentiel au cœur de cette phrase ?`,
      options: [
        vocab[1]?.en || 'practice',
        'yesterday',
        'tomorrow',
        'nevertheless',
      ],
      correctIndex: 0,
      explanationFr: `Le mot clé prononcé avec emphase est « ${vocab[1]?.en || 'practice'} » (« ${vocab[1]?.fr || 'pratique'} » / « ${vocab[1]?.ar || 'تَدْرِيب'} »).`,
      keywordAr: vocab[1]?.ar || 'إِمْلَاء',
    },
    {
      id: `${text.id}-list-3`,
      type: 'audio_true_false',
      typeLabel: 'Vrai ou Faux auditif',
      audioText: s2.en,
      question: `Après avoir écouté l'audio, l'énoncé suivant correspond-il au sens de ce qui a été dit : « ${s2.fr} » ?`,
      options: [
        'Vrai (True) - Le sens entendu correspond fidèlement à cette traduction',
        'Faux (False) - L\'audio disait quelque chose de complètement opposé',
      ],
      correctIndex: 0,
      explanationFr: `La voix a prononcé : « ${s2.en} », ce qui signifie précisément : « ${s2.fr} ».`,
      keywordAr: 'تَحَقُّقٌ سَمْعِيّ (Vérification auditive)',
    },
    {
      id: `${text.id}-list-4`,
      type: 'audio_fill',
      typeLabel: 'Compléter la phrase entendue',
      audioText: s3.en,
      question: 'Écoutez la phrase complète. Quel segment termine l\'enregistrement ?',
      options: [
        s3.en.split(' ').slice(-3).join(' '),
        'in the dark forest',
        'without any doubt',
        'at the very beginning',
      ],
      correctIndex: 0,
      explanationFr: `La fin de la phrase prononcée est : « ...${s3.en.split(' ').slice(-3).join(' ')} ».`,
      keywordAr: 'إِكْمَالُ الْجُمْلَة (Complétion)',
    },
    {
      id: `${text.id}-list-5`,
      type: 'discrimination',
      typeLabel: 'Compréhension orale synthétique',
      audioText: `${s4.en}`,
      question: 'Écoutez cet extrait de conclusion. Quelle émotion ou idée générale est véhiculée par l\'intonation ?',
      options: [
        `Une idée positive d'inspiration et d'accomplissement : « ${s4.fr} »`,
        'Une grande colère avec des reproches agressifs',
        'Un avertissement d\'urgence et de panique',
        'Une commande de repas au restaurant',
      ],
      correctIndex: 0,
      explanationFr: `Le ton de l'enregistrement exprime la sérénité et la clarté : « ${s4.en} ».`,
      keywordAr: 'نَبْرَةُ الصَّوْت (Intonation)',
    },
  ];

  // ==========================================
  // SECTION 3: WRITING (5+ EXERCISES)
  // ==========================================
  const wordsFirstSentence = s0.en.replace(/[.,!?;:]/g, '').split(' ');
  const shuffledS0 = [...wordsFirstSentence].sort(() => 0.5 - Math.random());

  const writing: WritingExercise[] = [
    {
      id: `${text.id}-writ-1`,
      type: 'translation',
      typeLabel: 'Traduction guidée (FR ➔ EN)',
      instructionFr: `Traduisez fidèlement la phrase suivante en anglais : « ${s0.fr} »`,
      promptText: s0.fr,
      targetAnswer: s0.en,
      options: [
        s0.en,
        s1.en,
        s2.en,
        s0.en.replace(/\b(was|is|are|stood|entered)\b/g, 'broken'),
      ].sort(() => 0.5 - Math.random()),
      hintAr: 'تَرْجَمَةٌ إِلَى الْإِنْجِلِيزِيَّة',
      explanationFr: `La formulation correcte en anglais est : « ${s0.en} ». Remarquez la structure syntaxique sujet + verbe + compléments.`,
    },
    {
      id: `${text.id}-writ-2`,
      type: 'scramble',
      typeLabel: 'Reconstitution de phrase',
      instructionFr: 'Remettez les mots dans le bon ordre pour former la phrase anglaise correcte.',
      promptText: `Sens en français : « ${s0.fr} »`,
      targetAnswer: s0.en.replace(/[.,!?;:]/g, ''),
      shuffledWords: shuffledS0,
      hintAr: 'تَرْتِيبُ الْكَلِمَات',
      explanationFr: `L'ordre canonique en anglais est Sujet + Verbe + Objet : « ${s0.en} ».`,
    },
    {
      id: `${text.id}-writ-3`,
      type: 'error_correction',
      typeLabel: 'Correction d\'erreur grammaticale',
      instructionFr: 'Identifiez et corrigez l\'erreur glissée dans cette phrase anglaise.',
      promptText: s1.en.replace(/\b(was|is|the|to|in)\b/i, 'WRONG_WORD'),
      targetAnswer: s1.en,
      options: [
        s1.en,
        s1.en.replace(/\bthe\b/g, 'a a'),
        s1.en + ' yesterday tomorrow',
        'No error at all',
      ].sort(() => 0.5 - Math.random()),
      hintAr: 'تَصْحِيحُ الْخَطَأ (Correction d\'erreur)',
      explanationFr: `La version grammaticalement correcte est : « ${s1.en} » (Français : « ${s1.fr} »).`,
    },
    {
      id: `${text.id}-writ-4`,
      type: 'typing_cloze',
      typeLabel: 'Texte à trous d\'expression écrite',
      instructionFr: `Complétez le mot manquant pour restituer la phrase : « ${s2.fr} »`,
      promptText: s2.en.replace(new RegExp(`\\b(${vocab[2]?.en || 'patience'}|${s2.en.split(' ')[2]})\\b`, 'i'), '_____'),
      targetAnswer: vocab[2]?.en || s2.en.split(' ')[2] || 'clock',
      options: [
        vocab[2]?.en || s2.en.split(' ')[2] || 'clock',
        'umbrella',
        'crocodile',
        'helicopter',
      ].sort(() => 0.5 - Math.random()),
      hintAr: vocab[2]?.ar || 'كَلِمَةٌ نَاقِصَة',
      explanationFr: `Le mot exact à insérer est « ${vocab[2]?.en || s2.en.split(' ')[2]} » qui correspond à « ${vocab[2]?.fr || ''} » en français.`,
    },
    {
      id: `${text.id}-writ-5`,
      type: 'transformation',
      typeLabel: 'Syntaxe & Conjugaison',
      instructionFr: 'Quelle est la forme verbale correcte au passé pour exprimer cette action ?',
      promptText: `Phrase de référence : « ${s3.fr} »`,
      targetAnswer: s3.en,
      options: [
        s3.en,
        s3.en.replace(/\b(ed|was|were|went|stood)\b/g, 'will be'),
        s3.en.toLowerCase(),
        s4.en,
      ].sort(() => 0.5 - Math.random()),
      hintAr: 'صِيغَةُ الْفِعْل (Forme verbale)',
      explanationFr: `La concordance des temps en narration anglaise exige le prétérit : « ${s3.en} ».`,
    },
  ];

  return { reading, listening, writing };
}
