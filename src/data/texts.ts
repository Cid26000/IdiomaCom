import { BilingualText } from '../types';
import { generateCurriculumExercises } from './exerciseGenerator';
import { registerVocabulary } from './dictionary';
import { TEXTS_A1 } from './textsA1';
import { TEXTS_B1 } from './textsB1';
import { TEXTS_C1 } from './textsC1';

const RAW_BILINGUAL_TEXTS: any[] = [
  {
    id: 'clockmaker-workshop',
    titleEn: 'The Clockmaker\'s Secret',
    titleFr: 'Le secret de l\'horloger',
    titleAr: 'سِرُّ صَانِعِ السَّاعَات',
    level: 'B1-B2 Intermédiaire',
    topic: 'Artisanat & Philosophie',
    readTime: '3 min',
    summaryFr: 'Dans une ruelle pavée d\'Édimbourg, une étudiante découvre l\'atelier d\'un vieil horloger qui lui enseigne la valeur du temps et de la patience.',
    sentencePairs: [
      {
        id: 'clk-1',
        en: 'Deep inside an old quarter of Edinburgh, hidden behind a quiet cobblestone alley, stood a clockmaker\'s workshop.',
        fr: 'Au cœur d\'un vieux quartier d\'Édimbourg, dissimulé derrière une paisible ruelle pavée, se dressait l\'atelier d\'un horloger.',
        notes: '"stood" (passé de stand) est souvent employé en anglais pour décrire l\'emplacement d\'un bâtiment.',
      },
      {
        id: 'clk-2',
        en: 'Clara, a young architecture student, entered the shop to escape the sudden afternoon rain.',
        fr: 'Clara, une jeune étudiante en architecture, entra dans la boutique pour échapper à la pluie soudaine de l\'après-midi.',
        notes: '"to escape" = infinitif de but (pour échapper à).',
      },
      {
        id: 'clk-3',
        en: 'The room smelled of cedarwood, beeswax, and aged copper.',
        fr: 'La pièce sentait le bois de cèdre, la cire d\'abeille et le cuivre patiné.',
        notes: '"smelled of" = sentait / dégageait l\'odeur de.',
      },
      {
        id: 'clk-4',
        en: 'Everywhere she looked, intricate mechanical gears and brass pendulums ticked in soft harmony.',
        fr: 'Partout où son regard se posait, des engrenages mécaniques minutieux et des balanciers en laiton battaient en douce harmonie.',
        notes: '"ticked" = faisaient entendre leur tic-tac.',
      },
      {
        id: 'clk-5',
        en: 'An elderly artisan with silver hair looked up through magnifying glasses and greeted her warmly.',
        fr: 'Un artisan âgé aux cheveux d\'argent leva les yeux à travers ses verres grossissants et la salua chaleureusement.',
        notes: '"looked up" = leva les yeux.',
      },
      {
        id: 'clk-6',
        en: 'He was carefully restoring a pocket watch crafted in the nineteenth century.',
        fr: 'Il restaurait minutieusement une montre à gousset fabriquée au dix-neuvième siècle.',
        notes: 'Past continuous ("was restoring") pour une action artisanale minutieuse en cours.',
      },
      {
        id: 'clk-7',
        en: 'With steady hands, he placed a tiny sapphire bearing into the delicate mechanism.',
        fr: 'D\'une main ferme, il inséra un minuscule coussinet de saphir dans le mécanisme délicat.',
        notes: '"steady hands" = des mains fermes et stables.',
      },
      {
        id: 'clk-8',
        en: 'A mechanical clock teaches us patience, the craftsman whispered with a gentle smile.',
        fr: 'Une horloge mécanique nous enseigne la patience, murmura l\'artisan avec un doux sourire.',
        notes: '"teaches us patience" : verbe à double complément direct/indirect.',
      },
      {
        id: 'clk-9',
        en: 'Modern devices count seconds quickly, but handcrafted timepieces remind us to cherish each passing moment.',
        fr: 'Les appareils modernes comptent les secondes à toute vitesse, mais les montres artisanales nous rappellent de chérir chaque instant qui passe.',
        notes: '"remind us to" = nous rappellent de.',
      },
      {
        id: 'clk-10',
        en: 'Clara stepped outside into the fresh evening air, inspired by his dedication to precision.',
        fr: 'Clara sortit dans l\'air frais du crépuscule, inspirée par son dévouement envers la précision.',
        notes: '"stepped outside" = franchit le seuil / sortit dehors.',
      },
    ],
    keyVocabulary: [
      { en: 'clockmaker', fr: 'horloger', ar: 'صَانِعُ السَّاعَات', phonetic: '/ˈklɒkˌmeɪ.kər/', type: 'nom' },
      { en: 'workshop', fr: 'atelier', ar: 'وَرْشَة / مَشْغَل', phonetic: '/ˈwɜːrk.ʃɒp/', type: 'nom' },
      { en: 'patience', fr: 'patience', ar: 'صَبْر', phonetic: '/ˈpeɪ.ʃəns/', type: 'nom' },
      { en: 'gears', fr: 'engrenages / rouages', ar: 'تُرُوس', phonetic: '/ɡɪərz/', type: 'nom' },
      { en: 'precision', fr: 'précision', ar: 'دِقَّة', phonetic: '/prɪˈsɪʒ.ən/', type: 'nom' },
      { en: 'cherish', fr: 'chérir / apprécier', ar: 'يَعْتَزُّ بـ / يُقَدِّرُ', phonetic: '/ˈtʃer.ɪʃ/', type: 'verbe' },
    ],
    exercises: {
      cloze: [
        {
          id: 'cloze-clk-1',
          sentenceEn: 'A mechanical clock teaches us _____, the craftsman whispered.',
          targetWord: 'patience',
          sentenceFr: 'Une horloge mécanique nous enseigne la patience, murmura l\'artisan.',
          hintAr: 'الصَّبْر',
          options: ['speed', 'patience', 'noise', 'fear'],
        },
        {
          id: 'cloze-clk-2',
          sentenceEn: 'He placed a tiny _____ bearing into the delicate mechanism.',
          targetWord: 'sapphire',
          sentenceFr: 'Il inséra un minuscule coussinet de saphir dans le mécanisme délicat.',
          hintAr: 'يَاقُوتٌ أَزْرَق',
          options: ['plastic', 'paper', 'sapphire', 'wood'],
        },
      ],
      comprehension: [
        {
          id: 'comp-clk-1',
          questionFr: 'Pourquoi Clara est-elle entrée dans l\'atelier de l\'horloger ?',
          optionsFr: [
            'Pour faire réparer son smartphone',
            'Pour s\'abriter d\'une pluie soudaine l\'après-midi',
            'Pour acheter une montre d\'occasion',
            'Pour chercher son chemin vers la gare',
          ],
          correctIndex: 1,
          explanationFr: 'Le texte précise : "entered the shop to escape the sudden afternoon rain" (pour échapper à la pluie soudaine de l\'après-midi).',
          keywordAr: 'مَطَر (Pluie)',
        },
        {
          id: 'comp-clk-2',
          questionFr: 'Quelle leçon philosophique l\'artisan transmet-il à Clara ?',
          optionsFr: [
            'Que le temps doit être dépensé rapidement',
            'Qu\'une horloge mécanique nous enseigne la patience et la valeur de chaque instant',
            'Que les objets numériques sont supérieurs aux pièces artisanales',
            'Qu\'il faut éviter de voyager sous la pluie',
          ],
          correctIndex: 1,
          explanationFr: 'L\'horloger dit : "A mechanical clock teaches us patience... remind us to cherish each passing moment".',
          keywordAr: 'صَبْر (Patience)',
        },
      ],
      pairs: [
        { id: 'clkp1', en: 'clockmaker', fr: 'horloger', ar: 'صَانِعُ السَّاعَات' },
        { id: 'clkp2', en: 'patience', fr: 'patience', ar: 'صَبْر' },
        { id: 'clkp3', en: 'workshop', fr: 'atelier', ar: 'وَرْشَة' },
        { id: 'clkp4', en: 'precision', fr: 'précision', ar: 'دِقَّة' },
      ],
      scramble: [
        {
          id: 'sc-clk-1',
          fr: 'Une horloge mécanique nous enseigne la patience.',
          enFull: 'A mechanical clock teaches us patience.',
          wordsShuffled: ['patience', 'clock', 'A', 'teaches', 'mechanical', 'us'],
          hintAr: 'السَّاعَةُ الْمِيكَانِيكِيَّةُ تُعَلِّمُنَا الصَّبْر',
        },
      ],
    },
  },
  {
    id: 'london-journey',
    titleEn: 'The First Journey to London',
    titleFr: 'Le premier voyage à Londres',
    titleAr: 'الرِّحْلَةُ الْأُولَى إِلَى لَنْدَن',
    level: 'A1-A2 Débutant',
    topic: 'Voyage & Vie Quotidienne',
    readTime: '3 min',
    summaryFr: 'Un jeune voyageur arrive pour la première fois à la gare Saint-Pancras à Londres et découvre l\'atmosphère de la ville.',
    sentencePairs: [
      {
        id: 'lon-1',
        en: 'Lucas arrived at London St Pancras station on a bright Tuesday morning.',
        fr: 'Lucas est arrivé à la gare de Londres Saint-Pancras un mardi matin ensoleillé.',
        notes: 'Remarquez l\'utilisation de "arrived at" pour un lieu précis.',
      },
      {
        id: 'lon-2',
        en: 'The huge glass roof of the station was filled with golden sunlight.',
        fr: 'L\'immense verrière de la gare était baignée d\'une lumière dorée.',
        notes: '"was filled with" = était remplie de.',
      },
      {
        id: 'lon-3',
        en: 'He pulled his small blue suitcase and looked around with curiosity.',
        fr: 'Il tirait sa petite valise bleue et regardait autour de lui avec curiosité.',
        notes: '"pulled" = tirait, verbe régulier.',
      },
      {
        id: 'lon-4',
        en: 'People were walking quickly, holding cups of hot coffee in their hands.',
        fr: 'Les gens marchaient d\'un pas rapide, tenant des tasses de café chaud à la main.',
        notes: 'Past continuous ("were walking") pour décrire l\'action en cours.',
      },
      {
        id: 'lon-5',
        en: 'Lucas walked outside into the lively street and saw the famous red buses.',
        fr: 'Lucas est sorti dans la rue animée et a aperçu les fameux bus rouges.',
        notes: '"famous red buses" : l\'adjectif précède le nom en anglais.',
      },
      {
        id: 'lon-6',
        en: 'He smiled because he knew this journey would be full of surprises.',
        fr: 'Il a souri car il savait que ce voyage serait plein de surprises.',
        notes: '"would be" = conditionnel de will be.',
      },
      {
        id: 'lon-7',
        en: 'His first goal was to find a quiet bakery for a traditional English breakfast.',
        fr: 'Son premier objectif était de trouver une boulangerie calme pour un petit-déjeuner anglais traditionnel.',
        notes: '"quiet bakery" = boulangerie calme.',
      },
    ],
    keyVocabulary: [
      { en: 'journey', fr: 'voyage / trajet', ar: 'رِحْلَة', phonetic: '/ˈdʒɜːr.ni/', type: 'nom' },
      { en: 'station', fr: 'gare / station', ar: 'مَحَطَّة', phonetic: '/ˈsteɪ.ʃən/', type: 'nom' },
      { en: 'suitcase', fr: 'valise', ar: 'حَقِيبَةُ سَفَر', phonetic: '/ˈsuːt.keɪs/', type: 'nom' },
      { en: 'crowd', fr: 'foule', ar: 'حَشْد / جُمْهُور', phonetic: '/kraʊd/', type: 'nom' },
      { en: 'morning', fr: 'matin', ar: 'صَبَاح', phonetic: '/ˈmɔːr.nɪŋ/', type: 'nom' },
      { en: 'bakery', fr: 'boulangerie', ar: 'مَخْبَز', phonetic: '/ˈbeɪ.kər.i/', type: 'nom' },
    ],
    exercises: {
      cloze: [
        {
          id: 'cloze-lon-1',
          sentenceEn: 'Lucas arrived at London station on a bright _____ morning.',
          targetWord: 'Tuesday',
          sentenceFr: 'Lucas est arrivé à la gare de Londres un mardi matin ensoleillé.',
          hintAr: 'يَوْمُ الثُّلَاثَاءِ',
          options: ['Monday', 'Tuesday', 'Friday', 'Sunday'],
        },
        {
          id: 'cloze-lon-2',
          sentenceEn: 'He pulled his small blue _____ and looked around.',
          targetWord: 'suitcase',
          sentenceFr: 'Il tirait sa petite valise bleue et regardait autour de lui.',
          hintAr: 'حَقِيبَةُ السَّفَر',
          options: ['umbrella', 'suitcase', 'camera', 'coat'],
        },
        {
          id: 'cloze-lon-3',
          sentenceEn: 'People were holding cups of hot _____ in their hands.',
          targetWord: 'coffee',
          sentenceFr: 'Les gens tenaient des tasses de café chaud à la main.',
          hintAr: 'قَهْوَة',
          options: ['tea', 'water', 'coffee', 'juice'],
        },
      ],
      comprehension: [
        {
          id: 'comp-lon-1',
          questionFr: 'Quel moyen de transport emblématique Lucas aperçoit-il en sortant de la gare ?',
          optionsFr: [
            'Les fameux bus rouges londoniens',
            'Des calèches anciennes',
            'Des bateaux sur la Tamise',
            'Un tramway moderne',
          ],
          correctIndex: 0,
          explanationFr: 'Le texte mentionne : "and saw the famous red buses" (et a aperçu les fameux bus rouges).',
          keywordAr: 'حَافِلَة (Bus)',
        },
        {
          id: 'comp-lon-2',
          questionFr: 'Quelle est la première chose que Lucas souhaite faire après son arrivée ?',
          optionsFr: [
            'Acheter une carte SIM',
            'Trouver une boulangerie calme pour prendre un petit-déjeuner',
            'Visiter Big Ben directement',
            'Prendre un taxi noir pour son hôtel',
          ],
          correctIndex: 1,
          explanationFr: 'Il est écrit : "His first goal was to find a quiet bakery for a traditional English breakfast".',
          keywordAr: 'إِفْطَار (Petit-déjeuner)',
        },
      ],
      pairs: [
        { id: 'p1', en: 'journey', fr: 'voyage', ar: 'رِحْلَة' },
        { id: 'p2', en: 'station', fr: 'gare', ar: 'مَحَطَّة' },
        { id: 'p3', en: 'suitcase', fr: 'valise', ar: 'حَقِيبَة' },
        { id: 'p4', en: 'morning', fr: 'matin', ar: 'صَبَاح' },
      ],
      scramble: [
        {
          id: 'sc-1',
          fr: 'Lucas tirait sa petite valise bleue.',
          enFull: 'Lucas pulled his small blue suitcase.',
          wordsShuffled: ['suitcase', 'Lucas', 'blue', 'his', 'pulled', 'small'],
          hintAr: 'سَحَبَ حَقِيبَتَهُ الزَّرْقَاء الصَّغِيرَة',
        },
        {
          id: 'sc-2',
          fr: 'Le soleil brillait sur la gare.',
          enFull: 'The sun was shining on the station.',
          wordsShuffled: ['station', 'The', 'shining', 'was', 'on', 'the', 'sun'],
          hintAr: 'كَانَتِ الشَّمْسُ تُشْرِقُ عَلَى الْمَحَطَّة',
        },
      ],
    },
  },

  {
    id: 'sleep-science',
    titleEn: 'The Secrets of Deep Sleep',
    titleFr: 'Les secrets du sommeil profond',
    titleAr: 'أَسْرَارُ النَّوْمِ الْعَمِيقِ',
    level: 'B1-B2 Intermédiaire',
    topic: 'Santé & Neurosciences',
    readTime: '4 min',
    summaryFr: 'Comprendre comment le sommeil répare nos cellules, consolide la mémoire et préserve notre équilibre mental.',
    sentencePairs: [
      {
        id: 'slp-1',
        en: 'Sleep is not merely a period of inactivity for our body.',
        fr: 'Le sommeil n\'est pas simplement une période d\'inactivité pour notre corps.',
        notes: '"merely" signifie "seulement / simplement".',
      },
      {
        id: 'slp-2',
        en: 'During the night, the human brain performs essential maintenance tasks.',
        fr: 'Durant la nuit, le cerveau humain accomplit des tâches de maintenance indispensables.',
        notes: '"performs" = exécute / accomplit.',
      },
      {
        id: 'slp-3',
        en: 'It cleans cellular waste and strengthens neural connections formed during the day.',
        fr: 'Il élimine les déchets cellulaires et renforce les connexions neuronales formées le jour.',
        notes: '"strengthens" vient de "strength" (la force).',
      },
      {
        id: 'slp-4',
        en: 'Scientists have shown that memories are transferred to long-term storage during deep sleep.',
        fr: 'Les scientifiques ont prouvé que les souvenirs sont transférés vers la mémoire à long terme pendant le sommeil profond.',
        notes: '"have shown" = Present Perfect pour une découverte scientifique.',
      },
      {
        id: 'slp-5',
        en: 'Without sufficient rest, our attention decreases and emotional regulation weakens.',
        fr: 'Sans repos suffisant, notre attention diminue et la régulation émotionnelle s\'affaiblit.',
        notes: '"Without sufficient rest" : expression de condition négative.',
      },
      {
        id: 'slp-6',
        en: 'Maintaining a regular schedule is therefore one of the healthiest habits you can adopt.',
        fr: 'Maintenir un horaire régulier est donc l\'une des habitudes les plus saines que vous puissiez adopter.',
        notes: '"therefore" = donc / par conséquent.',
      },
    ],
    keyVocabulary: [
      { en: 'sleep', fr: 'sommeil / dormir', ar: 'نَوْم', phonetic: '/sliːp/', type: 'nom' },
      { en: 'brain', fr: 'cerveau', ar: 'دِمَاغ', phonetic: '/breɪn/', type: 'nom' },
      { en: 'memory', fr: 'mémoire / souvenir', ar: 'ذَاكِرَة', phonetic: '/ˈmem.ər.i/', type: 'nom' },
      { en: 'healthy', fr: 'en bonne santé / sain', ar: 'صِحِّيّ', phonetic: '/ˈhel.θi/', type: 'adjectif' },
      { en: 'habit', fr: 'habitude', ar: 'عَادَة', phonetic: '/ˈhæb.ɪt/', type: 'nom' },
      { en: 'rest', fr: 'repos / se reposer', ar: 'رَاحَة', phonetic: '/rest/', type: 'nom' },
    ],
    exercises: {
      cloze: [
        {
          id: 'cloze-slp-1',
          sentenceEn: 'During the night, the human _____ performs essential maintenance tasks.',
          targetWord: 'brain',
          sentenceFr: 'Durant la nuit, le cerveau humain accomplit des tâches de maintenance indispensables.',
          hintAr: 'الدِّمَاغ / الْعَقْل',
          options: ['heart', 'brain', 'stomach', 'muscle'],
        },
        {
          id: 'cloze-slp-2',
          sentenceEn: 'Memories are transferred to long-term _____ during deep sleep.',
          targetWord: 'storage',
          sentenceFr: 'Les souvenirs sont transférés vers le stockage à long terme pendant le sommeil profond.',
          hintAr: 'تَخْزِين / حِفْظ',
          options: ['storage', 'speed', 'distance', 'vision'],
        },
      ],
      comprehension: [
        {
          id: 'comp-slp-1',
          questionFr: 'Que fait le cerveau pendant que nous dormons profondément ?',
          optionsFr: [
            'Il s\'éteint complètement comme un ordinateur',
            'Il élimine les déchets cellulaires et consolide la mémoire',
            'Il produit uniquement des rêves aléatoires sans utilité',
            'Il augmente le rythme cardiaque',
          ],
          correctIndex: 1,
          explanationFr: 'Le texte précise : "cleans cellular waste and strengthens neural connections" (nettoie les déchets cellulaires et renforce les connexions).',
          keywordAr: 'ذَاكِرَة (Mémoire)',
        },
      ],
      pairs: [
        { id: 'sp1', en: 'brain', fr: 'cerveau', ar: 'دِمَاغ' },
        { id: 'sp2', en: 'memory', fr: 'mémoire', ar: 'ذَاكِرَة' },
        { id: 'sp3', en: 'sleep', fr: 'sommeil', ar: 'نَوْم' },
        { id: 'sp4', en: 'habit', fr: 'habitude', ar: 'عَادَة' },
      ],
      scramble: [
        {
          id: 'sc-slp-1',
          fr: 'Le sommeil est essentiel pour la mémoire.',
          enFull: 'Sleep is essential for memory.',
          wordsShuffled: ['for', 'essential', 'memory', 'is', 'Sleep'],
          hintAr: 'النَّوْمُ ضَرُورِيٌّ لِلذَّاكِرَة',
        },
      ],
    },
  },

  {
    id: 'old-bakery',
    titleEn: 'A Morning in the Old Bakery',
    titleFr: 'Un matin dans la vieille boulangerie',
    titleAr: 'صَبَاحٌ فِي الْمَخْبَزِ الْقَدِيمِ',
    level: 'A1-A2 Débutant',
    topic: 'Vie Quotidienne & Traditions',
    readTime: '3 min',
    summaryFr: 'L\'odeur du pain chaud et le chant du four au lever du soleil dans un petit village bordé d\'arbres.',
    sentencePairs: [
      {
        id: 'bak-1',
        en: 'At five o’clock before sunrise, Thomas opens the wooden door of his bakery.',
        fr: 'À cinq heures avant le lever du soleil, Thomas ouvre la porte en bois de sa boulangerie.',
        notes: '"o\'clock" s\'emploie pour les heures fixes.',
      },
      {
        id: 'bak-2',
        en: 'The sweet scent of warm flour and melted butter quickly fills the air.',
        fr: 'La douce odeur de farine tiède et de beurre fondu envahit rapidement l\'air.',
        notes: '"scent" = odeur agréable / parfum.',
      },
      {
        id: 'bak-3',
        en: 'He kneads the dough with strong and practiced hands.',
        fr: 'Il pétrit la pâte avec des mains fermes et expérimentées.',
        notes: '"kneads" : le "k" initial est muet en anglais.',
      },
      {
        id: 'bak-4',
        en: 'Golden baguettes and crispy croissants are carefully placed into the stone oven.',
        fr: 'Des baguettes dorées et des croissants croustillants sont délicatement enfournés dans le four en pierre.',
        notes: 'Voix passive au présent ("are carefully placed").',
      },
      {
        id: 'bak-5',
        en: 'Soon, the first villagers arrive to buy their daily bread with a friendly greeting.',
        fr: 'Bientôt, les premiers villageois arrivent pour acheter leur pain quotidien avec une salutation chaleureuse.',
        notes: '"friendly" est un adjectif bien qu\'il se termine par -ly.',
      },
    ],
    keyVocabulary: [
      { en: 'bakery', fr: 'boulangerie', ar: 'مَخْبَز', phonetic: '/ˈbeɪ.kər.i/', type: 'nom' },
      { en: 'bread', fr: 'pain', ar: 'خُبْز', phonetic: '/bred/', type: 'nom' },
      { en: 'sunrise', fr: 'lever de soleil', ar: 'شُرُوقُ الشَّمْس', phonetic: '/ˈsʌn.raɪz/', type: 'nom' },
      { en: 'dough', fr: 'pâte', ar: 'عَجِين', phonetic: '/doʊ/', type: 'nom' },
      { en: 'oven', fr: 'four', ar: 'فُرْن', phonetic: '/ˈʌv.ən/', type: 'nom' },
    ],
    exercises: {
      cloze: [
        {
          id: 'cloze-bak-1',
          sentenceEn: 'Thomas kneads the _____ with strong and practiced hands.',
          targetWord: 'dough',
          sentenceFr: 'Thomas pétrit la pâte avec des mains fermes et expérimentées.',
          hintAr: 'الْعَجِين',
          options: ['water', 'dough', 'salt', 'wood'],
        },
      ],
      comprehension: [
        {
          id: 'comp-bak-1',
          questionFr: 'À quelle heure Thomas commence-t-il sa journée à la boulangerie ?',
          optionsFr: [
            'À cinq heures du matin',
            'À huit heures avec les villageois',
            'À midi juste avant le déjeuner',
            'À minuit pile',
          ],
          correctIndex: 0,
          explanationFr: 'Le texte commence par : "At five o’clock before sunrise".',
          keywordAr: 'وَقْت (Heure / Temps)',
        },
      ],
      pairs: [
        { id: 'bp1', en: 'bread', fr: 'pain', ar: 'خُبْز' },
        { id: 'bp2', en: 'oven', fr: 'four', ar: 'فُرْن' },
        { id: 'bp3', en: 'sunrise', fr: 'lever de soleil', ar: 'شُرُوق' },
      ],
      scramble: [
        {
          id: 'sc-bak-1',
          fr: 'Le pain chaud sent délicieusement bon.',
          enFull: 'The warm bread smells delicious.',
          wordsShuffled: ['bread', 'delicious', 'The', 'smells', 'warm'],
          hintAr: 'الْخُبْزُ الدَّافِئُ رَائِحَتُهُ زَكِيَّة',
        },
      ],
    },
  },

  {
    id: 'ai-future',
    titleEn: 'Artificial Intelligence and Society',
    titleFr: 'L\'Intelligence Artificielle et la Société',
    titleAr: 'الذَّكَاءُ الِاصْطِنَاعِيُّ وَالْمُجْتَمَع',
    level: 'C1 Avancé',
    topic: 'Technologie & Avenir',
    readTime: '5 min',
    summaryFr: 'Une réflexion approfondie sur la révolution de l\'IA générative, ses promesses médicales et ses impératifs éthiques.',
    sentencePairs: [
      {
        id: 'ai-1',
        en: 'The rapid expansion of generative systems marks a defining inflection point in digital civilization.',
        fr: 'L\'expansion fulgurante des systèmes génératifs marque un tournant décisif dans la civilisation numérique.',
        notes: '"inflection point" = tournant ou point d\'inflexion.',
      },
      {
        id: 'ai-2',
        en: 'Algorithms are now capable of analyzing medical scans with astonishing accuracy, detecting illnesses earlier than ever.',
        fr: 'Les algorithmes sont désormais capables d\'analyser des examens médicaux avec une précision stupéfiante, dépistant les maladies plus tôt que jamais.',
        notes: '"astonishing accuracy" = précision stupéfiante.',
      },
      {
        id: 'ai-3',
        en: 'However, this immense power brings profound ethical challenges regarding data ownership and algorithmic bias.',
        fr: 'Toutefois, cette immense puissance soulève de profonds défis éthiques quant à la propriété des données et aux biais algorithmiques.',
        notes: '"ownership" = propriété légale.',
      },
      {
        id: 'ai-4',
        en: 'Human intuition, empathy, and critical thinking remain irreplaceable assets in collaborative environments.',
        fr: 'L\'intuition humaine, l\'empathie et la pensée critique demeurent des atouts irremplaçables dans les environnements collaboratifs.',
        notes: '"irreplaceable assets" = atouts irremplaçables.',
      },
      {
        id: 'ai-5',
        en: 'The true promise lies not in replacing human minds, but in augmenting our collective creative potential.',
        fr: 'La véritable promesse ne réside pas dans le remplacement de l\'esprit humain, mais dans l\'augmentation de notre potentiel créatif collectif.',
        notes: '"lies not in ... but in" = ne réside pas dans ... mais dans.',
      },
    ],
    keyVocabulary: [
      { en: 'intelligence', fr: 'intelligence', ar: 'ذَكَاء', phonetic: '/ɪnˈtel.ɪ.dʒəns/', type: 'nom' },
      { en: 'accuracy', fr: 'précision', ar: 'دِقَّة', phonetic: '/ˈæk.jɚ.ə.si/', type: 'nom' },
      { en: 'ethical', fr: 'éthique / moral', ar: 'أَخْلَاقِيّ', phonetic: '/ˈeθ.ɪ.kəl/', type: 'adjectif' },
      { en: 'empathy', fr: 'empathie', ar: 'تَعَاطُف', phonetic: '/ˈem.pə.θi/', type: 'nom' },
      { en: 'potential', fr: 'potentiel', ar: 'إِمْكَانِيَّة / قُدْرَة', phonetic: '/poʊˈten.ʃəl/', type: 'nom' },
    ],
    exercises: {
      cloze: [
        {
          id: 'cloze-ai-1',
          sentenceEn: 'Human intuition, empathy, and critical _____ remain irreplaceable assets.',
          targetWord: 'thinking',
          sentenceFr: 'L\'intuition humaine, l\'empathie et la pensée critique demeurent des atouts irremplaçables.',
          hintAr: 'تَفْكِير',
          options: ['speed', 'thinking', 'storage', 'energy'],
        },
      ],
      comprehension: [
        {
          id: 'comp-ai-1',
          questionFr: 'Quelle est la véritable promesse de l\'intelligence artificielle selon le texte ?',
          optionsFr: [
            'Remplacer tous les médecins et professeurs d\'ici cinq ans',
            'Augmenter le potentiel créatif humain plutôt que de le remplacer',
            'Éliminer le besoin d\'apprendre de nouvelles langues',
            'Automatiser uniquement les tâches manuelles',
          ],
          correctIndex: 1,
          explanationFr: 'Il est conclu : "The true promise lies not in replacing human minds, but in augmenting our collective creative potential".',
          keywordAr: 'إِبْدَاع (Créativité)',
        },
      ],
      pairs: [
        { id: 'aip1', en: 'intelligence', fr: 'intelligence', ar: 'ذَكَاء' },
        { id: 'aip2', en: 'accuracy', fr: 'précision', ar: 'دِقَّة' },
        { id: 'aip3', en: 'empathy', fr: 'empathie', ar: 'تَعَاطُف' },
        { id: 'aip4', en: 'potential', fr: 'potentiel', ar: 'إِمْكَانِيَّة' },
      ],
      scramble: [
        {
          id: 'sc-ai-1',
          fr: 'L\'empathie humaine demeure un atout irremplaçable.',
          enFull: 'Human empathy remains an irreplaceable asset.',
          wordsShuffled: ['asset', 'empathy', 'Human', 'irreplaceable', 'an', 'remains'],
          hintAr: 'التَّعَاطُفُ الْبَشَرِيُّ يَظَلُّ قُوَّةً لَا عِوَضَ لَهَا',
        },
      ],
    },
  },

  {
    id: 'lighthouse-mystery',
    titleEn: 'The Mystery of the Old Lighthouse',
    titleFr: 'Le mystère du vieux phare abandonné',
    titleAr: 'غُمُوضُ الْمَنَارَةِ الْقَدِيمَة',
    level: 'B1-B2 Intermédiaire',
    topic: 'Aventure & Mystère',
    readTime: '4 min',
    summaryFr: 'Un phare perché sur une falaise rocheuse s\'illumine mystérieusement les nuits d\'orage malgré des décennies d\'abandon.',
    sentencePairs: [
      {
        id: 'lh-1',
        en: 'On the windswept cliffs of Cape Hope stood a stone lighthouse built two centuries ago.',
        fr: 'Sur les falaises balayées par les vents du cap Hope se dressait un phare de pierre érigé deux siècles plus tôt.',
        notes: '"windswept" = balayé par les vents.',
      },
      {
        id: 'lh-2',
        en: 'Although it had been abandoned for fifty years, fishermen reported seeing a strange green light during violent storms.',
        fr: 'Bien qu\'il fût abandonné depuis cinquante ans, des pêcheurs signalaient une étrange lueur verte lors des tempêtes violentes.',
        notes: '"Although" = bien que / quoique.',
      },
      {
        id: 'lh-3',
        en: 'A young marine biologist decided to investigate the mystery with his camera and notebook.',
        fr: 'Un jeune biologiste marin a décidé d\'élucider ce mystère muni de son appareil photo et d\'un carnet de notes.',
        notes: '"investigate" = enquêter / élucider.',
      },
      {
        id: 'lh-4',
        en: 'When he climbed the spiral staircase, he discovered that the light was caused by glowing deep-sea organisms on the glass.',
        fr: 'Lorsqu\'il gravit l\'escalier en colimaçon, il découvrit que la lumière provenait d\'organismes bioluminescents des profondeurs fixés sur le verre.',
        notes: '"spiral staircase" = escalier en colimaçon.',
      },
      {
        id: 'lh-5',
        en: 'Nature had turned an old forgotten tower into an extraordinary natural beacon.',
        fr: 'La nature avait transformé une tour oubliée en une balise naturelle extraordinaire.',
        notes: '"beacon" = balise, phare ou signal lumineux.',
      },
    ],
    keyVocabulary: [
      { en: 'lighthouse', fr: 'phare maritime', ar: 'مَنَارَة', phonetic: '/ˈlaɪt.haʊs/', type: 'nom' },
      { en: 'cliff', fr: 'falaise', ar: 'جُرْفٌ صَخْرِيّ', phonetic: '/klɪf/', type: 'nom' },
      { en: 'storm', fr: 'tempête', ar: 'عَاصِفَة', phonetic: '/stɔːrm/', type: 'nom' },
      { en: 'secret', fr: 'secret', ar: 'سِرّ', phonetic: '/ˈsiː.krət/', type: 'nom' },
      { en: 'tower', fr: 'tour', ar: 'بُرْج', phonetic: '/taʊ.ər/', type: 'nom' },
    ],
    exercises: {
      cloze: [
        {
          id: 'cloze-lh-1',
          sentenceEn: 'Fishermen reported seeing a strange green _____ during storms.',
          targetWord: 'light',
          sentenceFr: 'Les pêcheurs signalaient une étrange lueur verte lors des tempêtes.',
          hintAr: 'ضَوْء / نُور',
          options: ['light', 'shadow', 'boat', 'flag'],
        },
      ],
      comprehension: [
        {
          id: 'comp-lh-1',
          questionFr: 'Quelle était l\'origine réelle de la lueur verte dans le phare ?',
          optionsFr: [
            'Une vieille lampe à huile laissée par le gardien',
            'Des organismes marins bioluminescents déposés sur les vitres',
            'Des reflets de la lune sur des miroirs brisés',
            'Une installation électrique secrète',
          ],
          correctIndex: 1,
          explanationFr: 'Il découvre : "caused by glowing deep-sea organisms on the glass" (organismes marins lumineux).',
          keywordAr: 'طَبِيعَة (Nature)',
        },
      ],
      pairs: [
        { id: 'lhp1', en: 'lighthouse', fr: 'phare', ar: 'مَنَارَة' },
        { id: 'lhp2', en: 'storm', fr: 'tempête', ar: 'عَاصِفَة' },
        { id: 'lhp3', en: 'cliff', fr: 'falaise', ar: 'جُرْف' },
      ],
      scramble: [
        {
          id: 'sc-lh-1',
          fr: 'Le phare est bâti sur une haute falaise.',
          enFull: 'The lighthouse is built on a high cliff.',
          wordsShuffled: ['cliff', 'high', 'The', 'on', 'built', 'is', 'lighthouse', 'a'],
          hintAr: 'الْمَنَارَةُ مَبْنِيَّةٌ عَلَى جُرْفٍ عَالٍ',
        },
      ],
    },
  },

  {
    id: 'green-cities',
    titleEn: 'Sustainable Cities of Tomorrow',
    titleFr: 'Les villes durables de demain',
    titleAr: 'مُدُنُ الْغَدِ الْمُسْتَدَامَة',
    level: 'C1 Avancé',
    topic: 'Écologie & Urbanisme',
    readTime: '4 min',
    summaryFr: 'Comment l\'architecture bioclimatique, les forêts verticales et l\'énergie renouvelable réinventent nos métropoles.',
    sentencePairs: [
      {
        id: 'gc-1',
        en: 'Modern metropolises are undergoing an ecological revolution to combat rising temperatures.',
        fr: 'Les métropoles modernes connaissent une révolution écologique pour lutter contre la hausse des températures.',
        notes: '"undergoing" = traverser / subir une transformation.',
      },
      {
        id: 'gc-2',
        en: 'Architects integrate vertical gardens and solar panels directly into residential facades.',
        fr: 'Les architectes intègrent des jardins verticaux et des panneaux solaires directement aux façades résidentielles.',
        notes: '"facades" se prononce /fəˈsɑːdz/.',
      },
      {
        id: 'gc-3',
        en: 'Rainwater is harvested to cool urban spaces, reducing dependence on artificial air conditioning.',
        fr: 'L\'eau de pluie est collectée pour rafraîchir les espaces urbains, diminuant ainsi la dépendance à la climatisation artificielle.',
        notes: '"harvested" = récoltée / captée.',
      },
      {
        id: 'gc-4',
        en: 'By prioritizing pedestrian zones and public transit, future cities foster stronger communities.',
        fr: 'En donnant la priorité aux zones piétonnes et aux transports publics, les villes de demain renforcent les liens communautaires.',
        notes: '"foster" = encourager, favoriser.',
      },
    ],
    keyVocabulary: [
      { en: 'sustainable', fr: 'durable', ar: 'مُسْتَدَام', phonetic: '/səˈsteɪ.nə.bəl/', type: 'adjectif' },
      { en: 'energy', fr: 'énergie', ar: 'طَاقَة', phonetic: '/ˈen.ər.dʒi/', type: 'nom' },
      { en: 'garden', fr: 'jardin', ar: 'حَدِيقَة', phonetic: '/ˈɡɑːr.dən/', type: 'nom' },
      { en: 'rainwater', fr: 'eau de pluie', ar: 'مِيَاهُ الْأَمْطَار', phonetic: '/ˈreɪnˌwɔː.tər/', type: 'nom' },
      { en: 'community', fr: 'communauté', ar: 'مُجْتَمَع', phonetic: '/kəˈmjuː.nə.ti/', type: 'nom' },
    ],
    exercises: {
      cloze: [
        {
          id: 'cloze-gc-1',
          sentenceEn: 'Architects integrate vertical gardens and _____ panels into facades.',
          targetWord: 'solar',
          sentenceFr: 'Les architectes intègrent des jardins verticaux et des panneaux solaires aux façades.',
          hintAr: 'شَمْسِيّ',
          options: ['solar', 'plastic', 'heavy', 'paper'],
        },
      ],
      comprehension: [
        {
          id: 'comp-gc-1',
          questionFr: 'Quel est l\'un des rôles de l\'eau de pluie collectée dans les villes durables ?',
          optionsFr: [
            'Rafraîchir naturellement les espaces urbains',
            'Alimenter uniquement des fontaines décoratives',
            'Remplacer complètement l\'eau potable',
            'Laver les routes de manière automatisée',
          ],
          correctIndex: 0,
          explanationFr: 'Le texte précise : "Rainwater is harvested to cool urban spaces".',
          keywordAr: 'مَاء (Eau)',
        },
      ],
      pairs: [
        { id: 'gcp1', en: 'sustainable', fr: 'durable', ar: 'مُسْتَدَام' },
        { id: 'gcp2', en: 'energy', fr: 'énergie', ar: 'طَاقَة' },
        { id: 'gcp3', en: 'community', fr: 'communauté', ar: 'مُجْتَمَع' },
      ],
      scramble: [
        {
          id: 'sc-gc-1',
          fr: 'Les villes vertes protègent notre planète.',
          enFull: 'Green cities protect our planet.',
          wordsShuffled: ['protect', 'planet', 'Green', 'our', 'cities'],
          hintAr: 'الْمُدُنُ الْخَضْرَاءُ تَحْمِي كَوْكَبَنَا',
        },
      ],
    },
  },
];

// Aggregate all graded texts (at least 20 texts per level, 50% dialogues, covering actualité)
const ALL_COLLECTED_TEXTS: BilingualText[] = [
  ...RAW_BILINGUAL_TEXTS,
  ...TEXTS_A1,
  ...TEXTS_B1,
  ...TEXTS_C1,
];

export const BILINGUAL_TEXTS: BilingualText[] = ALL_COLLECTED_TEXTS.map((raw) => {
  const generated = generateCurriculumExercises(raw as BilingualText);
  return {
    ...raw,
    exercises: {
      reading: generated.reading,
      listening: generated.listening,
      writing: generated.writing,
      cloze: raw.exercises?.cloze || [],
      comprehension: raw.exercises?.comprehension || [],
      pairs: raw.exercises?.pairs || [],
      scramble: raw.exercises?.scramble || [],
    },
  };
});

// Auto-register all specialized vocabulary terms from all texts into the lookup engine
BILINGUAL_TEXTS.forEach((t) => {
  if (t.keyVocabulary && t.keyVocabulary.length > 0) {
    registerVocabulary(t.keyVocabulary);
  }
});

