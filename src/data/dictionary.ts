import { WordEntry } from '../types';

// Trilingual base dictionary (English as primary key, with French and Arabic)
export const TRILINGUAL_DICTIONARY: Record<string, WordEntry> = {
  // Common verbs
  be: { en: 'be', fr: 'être', ar: 'يَكُونُ / كَانَ', phonetic: '/biː/', type: 'verbe' },
  is: { en: 'is', fr: 'est', ar: 'هُوَ / يَكُونُ', phonetic: '/ɪz/', type: 'verbe' },
  are: { en: 'are', fr: 'sont / êtes', ar: 'هُمْ / أَنْتُمْ (يَكُونُون)', phonetic: '/ɑːr/', type: 'verbe' },
  was: { en: 'was', fr: 'était', ar: 'كَانَ', phonetic: '/wɒz/', type: 'verbe' },
  were: { en: 'were', fr: 'étaient', ar: 'كَانُوا', phonetic: '/wɜːr/', type: 'verbe' },
  have: { en: 'have', fr: 'avoir', ar: 'يَمْلِكُ / لَدَيْهِ', phonetic: '/hæv/', type: 'verbe' },
  has: { en: 'has', fr: 'a', ar: 'يَمْلِكُ / عِنْدَهُ', phonetic: '/hæz/', type: 'verbe' },
  had: { en: 'had', fr: 'avait / eu', ar: 'كَانَ لَدَيْهِ', phonetic: '/hæd/', type: 'verbe' },
  do: { en: 'do', fr: 'faire', ar: 'يَفْعَلُ / يُنْجِزُ', phonetic: '/duː/', type: 'verbe' },
  does: { en: 'does', fr: 'fait', ar: 'يَفْعَلُ', phonetic: '/dʌz/', type: 'verbe' },
  did: { en: 'did', fr: 'a fait', ar: 'فَعَلَ', phonetic: '/dɪd/', type: 'verbe' },
  say: { en: 'say', fr: 'dire', ar: 'يَقُولُ', phonetic: '/seɪ/', type: 'verbe' },
  said: { en: 'said', fr: 'a dit', ar: 'قَالَ', phonetic: '/sed/', type: 'verbe' },
  go: { en: 'go', fr: 'aller', ar: 'يَذْهَبُ', phonetic: '/ɡoʊ/', type: 'verbe' },
  goes: { en: 'goes', fr: 'va', ar: 'يَذْهَبُ', phonetic: '/ɡoʊz/', type: 'verbe' },
  went: { en: 'went', fr: 'est allé', ar: 'ذَهَبَ', phonetic: '/went/', type: 'verbe' },
  gone: { en: 'gone', fr: 'parti', ar: 'ذَهَبَ / مَضَى', phonetic: '/ɡɒn/', type: 'verbe' },
  get: { en: 'get', fr: 'obtenir / devenir', ar: 'يَحْصُلُ عَلَى', phonetic: '/ɡet/', type: 'verbe' },
  make: { en: 'make', fr: 'fabriquer / faire', ar: 'يَصْنَعُ / يَجْعَلُ', phonetic: '/meɪk/', type: 'verbe' },
  know: { en: 'know', fr: 'savoir / connaître', ar: 'يَعْرِفُ / يَعْلَمُ', phonetic: '/noʊ/', type: 'verbe' },
  knew: { en: 'knew', fr: 'savait', ar: 'عَرَفَ', phonetic: '/njuː/', type: 'verbe' },
  think: { en: 'think', fr: 'penser', ar: 'يُفَكِّرُ / يَعْتَقِدُ', phonetic: '/θɪŋk/', type: 'verbe' },
  thought: { en: 'thought', fr: 'a pensé / pensée', ar: 'فَكَّرَ / فِكْرَة', phonetic: '/θɔːt/', type: 'verbe' },
  take: { en: 'take', fr: 'prendre', ar: 'يَأْخُذُ', phonetic: '/teɪk/', type: 'verbe' },
  took: { en: 'took', fr: 'a pris', ar: 'أَخَذَ', phonetic: '/tʊk/', type: 'verbe' },
  see: { en: 'see', fr: 'voir', ar: 'يَرَى', phonetic: '/siː/', type: 'verbe' },
  saw: { en: 'saw', fr: 'a vu', ar: 'رَأَى', phonetic: '/sɔː/', type: 'verbe' },
  seen: { en: 'seen', fr: 'vu', ar: 'مَرْئِيّ', phonetic: '/siːn/', type: 'verbe' },
  come: { en: 'come', fr: 'venir', ar: 'يَأْتِي', phonetic: '/kʌm/', type: 'verbe' },
  came: { en: 'came', fr: 'est venu', ar: 'أَتَى / جَاءَ', phonetic: '/keɪm/', type: 'verbe' },
  want: { en: 'want', fr: 'vouloir', ar: 'يُرِيدُ', phonetic: '/wɒnt/', type: 'verbe' },
  look: { en: 'look', fr: 'regarder / paraître', ar: 'يَنْظُرُ / يَبْدُو', phonetic: '/lʊk/', type: 'verbe' },
  use: { en: 'use', fr: 'utiliser', ar: 'يَسْتَخْدِمُ', phonetic: '/juːz/', type: 'verbe' },
  find: { en: 'find', fr: 'trouver', ar: 'يَجِدُ', phonetic: '/faɪnd/', type: 'verbe' },
  found: { en: 'found', fr: 'a trouvé', ar: 'وَجَدَ', phonetic: '/faʊnd/', type: 'verbe' },
  give: { en: 'give', fr: 'donner', ar: 'يُعْطِي', phonetic: '/ɡɪv/', type: 'verbe' },
  gave: { en: 'gave', fr: 'a donné', ar: 'أَعْطَى', phonetic: '/ɡeɪv/', type: 'verbe' },
  tell: { en: 'tell', fr: 'raconter / dire', ar: 'يُخْبِرُ', phonetic: '/tel/', type: 'verbe' },
  told: { en: 'told', fr: 'a raconté', ar: 'أَخْبَرَ', phonetic: '/toʊld/', type: 'verbe' },
  work: { en: 'work', fr: 'travailler / travail', ar: 'يَعْمَلُ / عَمَل', phonetic: '/wɜːrk/', type: 'verbe' },
  call: { en: 'call', fr: 'appeler', ar: 'يَتَّصِلُ / يُنَادِي', phonetic: '/kɔːl/', type: 'verbe' },
  try: { en: 'try', fr: 'essayer', ar: 'يُحَاوِلُ / يُجَرِّبُ', phonetic: '/traɪ/', type: 'verbe' },
  ask: { en: 'ask', fr: 'demander / poser une question', ar: 'يَسْأَلُ / يَطْلُبُ', phonetic: '/æsk/', type: 'verbe' },
  need: { en: 'need', fr: 'avoir besoin de', ar: 'يَحْتَاجُ إِلَى', phonetic: '/niːd/', type: 'verbe' },
  feel: { en: 'feel', fr: 'ressentir / se sentir', ar: 'يَشْعُرُ / يُحِسُّ', phonetic: '/fiːl/', type: 'verbe' },
  felt: { en: 'felt', fr: 'a ressenti', ar: 'شَعَرَ', phonetic: '/felt/', type: 'verbe' },
  become: { en: 'become', fr: 'devenir', ar: 'يُصْبِحُ', phonetic: '/bɪˈkʌm/', type: 'verbe' },
  leave: { en: 'leave', fr: 'quitter / partir', ar: 'يُغَادِرُ / يَتْرُكُ', phonetic: '/liːv/', type: 'verbe' },
  put: { en: 'put', fr: 'mettre / poser', ar: 'يَضَعُ', phonetic: '/pʊt/', type: 'verbe' },
  mean: { en: 'mean', fr: 'signifier / vouloir dire', ar: 'يَعْنِي / يَقْصِدُ', phonetic: '/miːn/', type: 'verbe' },
  keep: { en: 'keep', fr: 'garder / continuer', ar: 'يَحْتَفِظُ بـ / يُوَاصِلُ', phonetic: '/kiːp/', type: 'verbe' },
  let: { en: 'let', fr: 'laisser / permettre', ar: 'يَسْمَحُ / يَدَعُ', phonetic: '/let/', type: 'verbe' },
  begin: { en: 'begin', fr: 'commencer', ar: 'يَبْدَأُ', phonetic: '/bɪˈɡɪn/', type: 'verbe' },
  began: { en: 'began', fr: 'a commencé', ar: 'بَدَأَ', phonetic: '/bɪˈɡæn/', type: 'verbe' },
  seem: { en: 'seem', fr: 'sembler', ar: 'يَبْدُو / يَظْهَرُ', phonetic: '/siːm/', type: 'verbe' },
  help: { en: 'help', fr: 'aider / aide', ar: 'يُسَاعِدُ / مُسَاعَدَة', phonetic: '/help/', type: 'verbe' },
  talk: { en: 'talk', fr: 'parler / discuter', ar: 'يَتَحَدَّثُ', phonetic: '/tɔːk/', type: 'verbe' },
  turn: { en: 'turn', fr: 'tourner / virer', ar: 'يَسْتَدِيرُ / يَتَحَوَّلُ', phonetic: '/tɜːrn/', type: 'verbe' },
  start: { en: 'start', fr: 'démarrer / débuter', ar: 'يَبْدَأُ / يَنْطَلِقُ', phonetic: '/stɑːrt/', type: 'verbe' },
  show: { en: 'show', fr: 'montrer', ar: 'يُظْهِرُ / يُبَيِّنُ', phonetic: '/ʃoʊ/', type: 'verbe' },
  hear: { en: 'hear', fr: 'entendre', ar: 'يَسْمَعُ', phonetic: '/hɪər/', type: 'verbe' },
  play: { en: 'play', fr: 'jouer', ar: 'يَلْعَبُ / يَعْزِفُ', phonetic: '/pleɪ/', type: 'verbe' },
  run: { en: 'run', fr: 'courir', ar: 'يَرْكُضُ / يُدِيرُ', phonetic: '/rʌn/', type: 'verbe' },
  move: { en: 'move', fr: 'bouger / déplacer', ar: 'يَتَحَرَّكُ / يَنْتَقِلُ', phonetic: '/muːv/', type: 'verbe' },
  like: { en: 'like', fr: 'aimer / comme', ar: 'يُحِبُّ / مِثْلَ', phonetic: '/laɪk/', type: 'verbe' },
  live: { en: 'live', fr: 'vivre / habiter', ar: 'يَعِيشُ / يَسْكُنُ', phonetic: '/lɪv/', type: 'verbe' },
  believe: { en: 'believe', fr: 'croire', ar: 'يُؤْمِنُ / يُصَدِّقُ', phonetic: '/bɪˈliːv/', type: 'verbe' },
  hold: { en: 'hold', fr: 'tenir', ar: 'يُمْسِكُ / يَحْمِلُ', phonetic: '/hoʊld/', type: 'verbe' },
  bring: { en: 'bring', fr: 'apporter', ar: 'يَجْلِبُ / يُحْضِرُ', phonetic: '/brɪŋ/', type: 'verbe' },
  happen: { en: 'happen', fr: 'se passer / arriver', ar: 'يَحْدُثُ / يَقَعُ', phonetic: '/ˈhæp.ən/', type: 'verbe' },
  write: { en: 'write', fr: 'écrire', ar: 'يَكْتُبُ', phonetic: '/raɪt/', type: 'verbe' },
  provide: { en: 'provide', fr: 'fournir', ar: 'يُزَوِّدُ / يُوَفِّرُ', phonetic: '/prəˈvaɪd/', type: 'verbe' },
  sit: { en: 'sit', fr: 's’asseoir', ar: 'يَجْلِسُ', phonetic: '/sɪt/', type: 'verbe' },
  stand: { en: 'stand', fr: 'se tenir debout', ar: 'يَقِفُ', phonetic: '/stænd/', type: 'verbe' },
  lose: { en: 'lose', fr: 'perdre', ar: 'يَفْقِدُ / يَخْسَرُ', phonetic: '/luːz/', type: 'verbe' },
  pay: { en: 'pay', fr: 'payer', ar: 'يَدْفَعُ', phonetic: '/peɪ/', type: 'verbe' },
  meet: { en: 'meet', fr: 'rencontrer', ar: 'يَلْتَقِي بـ / يُقَابِلُ', phonetic: '/miːt/', type: 'verbe' },
  include: { en: 'include', fr: 'inclure', ar: 'يَتَضَمَّنُ / يَشْمَلُ', phonetic: '/ɪnˈkluːd/', type: 'verbe' },
  continue: { en: 'continue', fr: 'continuer', ar: 'يَسْتَمِرُّ / يُوَاصِلُ', phonetic: '/kənˈtɪn.juː/', type: 'verbe' },
  learn: { en: 'learn', fr: 'apprendre', ar: 'يَتَعَلَّمُ', phonetic: '/lɜːrn/', type: 'verbe' },
  change: { en: 'change', fr: 'changer', ar: 'يُغَيِّرُ / يَتَغَيَّرُ', phonetic: '/tʃeɪndʒ/', type: 'verbe' },
  lead: { en: 'lead', fr: 'mener / guider', ar: 'يَقُودُ / يُؤَدِّي إِلَى', phonetic: '/liːd/', type: 'verbe' },
  understand: { en: 'understand', fr: 'comprendre', ar: 'يَفْهَمُ', phonetic: '/ˌʌn.dɚˈstænd/', type: 'verbe' },
  watch: { en: 'watch', fr: 'regarder / surveiller', ar: 'يُشَاهِدُ / يُرَاقِبُ', phonetic: '/wɒtʃ/', type: 'verbe' },
  follow: { en: 'follow', fr: 'suivre', ar: 'يَتَّبِعُ / يَلْحَقُ', phonetic: '/ˈfɒl.oʊ/', type: 'verbe' },
  stop: { en: 'stop', fr: 's’arrêter / stopper', ar: 'يَتَوَقَّفُ / يُوقِفُ', phonetic: '/stɒp/', type: 'verbe' },
  create: { en: 'create', fr: 'créer', ar: 'يَخْلُقُ / يُنْشِئُ', phonetic: '/kriˈeɪt/', type: 'verbe' },
  speak: { en: 'speak', fr: 'parler', ar: 'يَتَكَلَّمُ / يَتَحَدَّثُ', phonetic: '/spiːk/', type: 'verbe' },
  read: { en: 'read', fr: 'lire', ar: 'يَقْرَأُ', phonetic: '/riːd/', type: 'verbe' },
  allow: { en: 'allow', fr: 'autoriser / permettre', ar: 'يَسْمَحُ / يُتِيحُ', phonetic: '/əˈlaʊ/', type: 'verbe' },
  add: { en: 'add', fr: 'ajouter', ar: 'يُضِيفُ', phonetic: '/æd/', type: 'verbe' },
  spend: { en: 'spend', fr: 'dépenser / passer du temps', ar: 'يُنْفِقُ / يَقْضِي (وَقْتًا)', phonetic: '/spend/', type: 'verbe' },
  grow: { en: 'grow', fr: 'grandir / croître', ar: 'يَنْمُو / يَزْدَادُ', phonetic: '/ɡroʊ/', type: 'verbe' },
  open: { en: 'open', fr: 'ouvrir / ouvert', ar: 'يَفْتَحُ / مَفْتُوح', phonetic: '/ˈoʊ.pən/', type: 'verbe' },
  walk: { en: 'walk', fr: 'marcher', ar: 'يَمْشِي / يَتَمَشَّى', phonetic: '/wɔːk/', type: 'verbe' },
  win: { en: 'win', fr: 'gagner', ar: 'يَفُوزُ / يَكْسَبُ', phonetic: '/wɪn/', type: 'verbe' },
  offer: { en: 'offer', fr: 'offrir / proposer', ar: 'يَعْرِضُ / يُقَدِّمُ', phonetic: '/ˈɒf.ər/', type: 'verbe' },
  remember: { en: 'remember', fr: 'se souvenir de', ar: 'يَتَذَكَّرُ', phonetic: '/rɪˈmem.bər/', type: 'verbe' },
  love: { en: 'love', fr: 'aimer / amour', ar: 'يُحِبُّ / حُبّ', phonetic: '/lʌv/', type: 'verbe' },
  consider: { en: 'consider', fr: 'considérer / examiner', ar: 'يَعْتَبِرُ / يَدْرُسُ', phonetic: '/kənˈsɪd.ər/', type: 'verbe' },
  appear: { en: 'appear', fr: 'apparaître', ar: 'يَظْهَرُ / يَبْدُو', phonetic: '/əˈpɪər/', type: 'verbe' },
  buy: { en: 'buy', fr: 'acheter', ar: 'يَشْتَرِي', phonetic: '/baɪ/', type: 'verbe' },
  serve: { en: 'serve', fr: 'servir', ar: 'يَخْدِمُ / يُقَدِّمُ', phonetic: '/sɜːrv/', type: 'verbe' },
  die: { en: 'die', fr: 'mourir', ar: 'يَمُوتُ', phonetic: '/daɪ/', type: 'verbe' },
  send: { en: 'send', fr: 'envoyer', ar: 'يُرْسِلُ', phonetic: '/send/', type: 'verbe' },
  expect: { en: 'expect', fr: 'attendre / espérer', ar: 'يَتَوَقَّعُ', phonetic: '/ɪkˈspekt/', type: 'verbe' },
  build: { en: 'build', fr: 'construire', ar: 'يَبْنِي / يُشَيِّدُ', phonetic: '/bɪld/', type: 'verbe' },
  stay: { en: 'stay', fr: 'rester / séjourner', ar: 'يَبْقَى / يُقِيمُ', phonetic: '/steɪ/', type: 'verbe' },
  fall: { en: 'fall', fr: 'tomber / chute', ar: 'يَسْقُطُ / خَرِيف', phonetic: '/fɔːl/', type: 'verbe' },
  cut: { en: 'cut', fr: 'couper', ar: 'يَقْطَعُ / يَقُصُّ', phonetic: '/kʌt/', type: 'verbe' },
  reach: { en: 'reach', fr: 'atteindre', ar: 'يَصِلُ إِلَى / يَبْلُغُ', phonetic: '/riːtʃ/', type: 'verbe' },
  kill: { en: 'kill', fr: 'tuer', ar: 'يَقْتُلُ', phonetic: '/kɪl/', type: 'verbe' },
  remain: { en: 'remain', fr: 'rester / demeurer', ar: 'يَبْقَى / يَظَلُّ', phonetic: '/rɪˈmeɪn/', type: 'verbe' },
  suggest: { en: 'suggest', fr: 'suggérer / proposer', ar: 'يَقْتَرِحُ', phonetic: '/səˈdʒest/', type: 'verbe' },
  raise: { en: 'raise', fr: 'élever / augmenter', ar: 'يَرْفَعُ / يُرَبِّي', phonetic: '/reɪz/', type: 'verbe' },
  pass: { en: 'pass', fr: 'passer / réussir', ar: 'يَمُرُّ / يَنْجَحُ', phonetic: '/pæs/', type: 'verbe' },
  sell: { en: 'sell', fr: 'vendre', ar: 'يَبِيعُ', phonetic: '/sel/', type: 'verbe' },
  require: { en: 'require', fr: 'exiger / nécessiter', ar: 'يَتَطَلَّبُ / يَسْتَلْزِمُ', phonetic: '/rɪˈkwaɪər/', type: 'verbe' },
  report: { en: 'report', fr: 'rapporter / signaler', ar: 'يُبَلِّغُ / يُعِدُّ تَقْرِيرًا', phonetic: '/rɪˈpɔːrt/', type: 'verbe' },
  decide: { en: 'decide', fr: 'décider', ar: 'يُقَرِّرُ', phonetic: '/dɪˈsaɪd/', type: 'verbe' },
  pull: { en: 'pull', fr: 'tirer', ar: 'يَسْحَبُ / يَجُرُّ', phonetic: '/pʊl/', type: 'verbe' },

  // Common Nouns
  time: { en: 'time', fr: 'temps / heure', ar: 'وَقْت / زَمَن', phonetic: '/taɪm/', type: 'nom' },
  person: { en: 'person', fr: 'personne', ar: 'شَخْص / إِنْسَان', phonetic: '/ˈpɜːr.sən/', type: 'nom' },
  year: { en: 'year', fr: 'année / an', ar: 'سَنَة / عَام', phonetic: '/jɪər/', type: 'nom' },
  way: { en: 'way', fr: 'chemin / manière', ar: 'طَرِيق / طَرِيقَة', phonetic: '/weɪ/', type: 'nom' },
  day: { en: 'day', fr: 'jour / journée', ar: 'يَوْم / نَهَار', phonetic: '/deɪ/', type: 'nom' },
  thing: { en: 'thing', fr: 'chose', ar: 'شَيْء', phonetic: '/θɪŋ/', type: 'nom' },
  man: { en: 'man', fr: 'homme', ar: 'رَجُل', phonetic: '/mæn/', type: 'nom' },
  world: { en: 'world', fr: 'monde', ar: 'عَالَم / دُنْيَا', phonetic: '/wɜːrld/', type: 'nom' },
  life: { en: 'life', fr: 'vie', ar: 'حَيَاة', phonetic: '/laɪf/', type: 'nom' },
  hand: { en: 'hand', fr: 'main', ar: 'يَد', phonetic: '/hænd/', type: 'nom' },
  part: { en: 'part', fr: 'partie / rôle', ar: 'جُزْء / قِسْم', phonetic: '/pɑːrt/', type: 'nom' },
  child: { en: 'child', fr: 'enfant', ar: 'طِفْل', phonetic: '/tʃaɪld/', type: 'nom' },
  eye: { en: 'eye', fr: 'œil', ar: 'عَيْن', phonetic: '/aɪ/', type: 'nom' },
  woman: { en: 'woman', fr: 'femme', ar: 'امْرَأَة', phonetic: '/ˈwʊm.ən/', type: 'nom' },
  place: { en: 'place', fr: 'endroit / lieu', ar: 'مَكَان', phonetic: '/pleɪs/', type: 'nom' },
  workplace: { en: 'workplace', fr: 'lieu de travail', ar: 'مَكَانُ الْعَمَل', phonetic: '/ˈwɜːrk.pleɪs/', type: 'nom' },
  week: { en: 'week', fr: 'semaine', ar: 'أُسْبُوع', phonetic: '/wiːk/', type: 'nom' },
  case: { en: 'case', fr: 'cas / affaire', ar: 'حَالَة / قَضِيَّة', phonetic: '/keɪs/', type: 'nom' },
  point: { en: 'point', fr: 'point / argument', ar: 'نُقْطَة / فِكْرَة', phonetic: '/pɔɪnt/', type: 'nom' },
  government: { en: 'government', fr: 'gouvernement', ar: 'حُكُومَة', phonetic: '/ˈɡʌv.ɚn.mənt/', type: 'nom' },
  company: { en: 'company', fr: 'entreprise / compagnie', ar: 'شَرِكَة / رِفْقَة', phonetic: '/ˈkʌm.pə.ni/', type: 'nom' },
  number: { en: 'number', fr: 'nombre / numéro', ar: 'رَقَم / عَدَد', phonetic: '/ˈnʌm.bər/', type: 'nom' },
  group: { en: 'group', fr: 'groupe', ar: 'مَجْمُوعَة', phonetic: '/ɡruːp/', type: 'nom' },
  problem: { en: 'problem', fr: 'problème', ar: 'مُشْكِلَة', phonetic: '/ˈprɒb.ləm/', type: 'nom' },
  fact: { en: 'fact', fr: 'fait / vérité', ar: 'حَقِيقَة / وَاقِع', phonetic: '/fækt/', type: 'nom' },
  water: { en: 'water', fr: 'eau', ar: 'مَاء', phonetic: '/ˈwɔː.tər/', type: 'nom' },
  room: { en: 'room', fr: 'chambre / pièce', ar: 'غُرْفَة', phonetic: '/ruːm/', type: 'nom' },
  mother: { en: 'mother', fr: 'mère', ar: 'أُمّ', phonetic: '/ˈmʌð.ər/', type: 'nom' },
  area: { en: 'area', fr: 'zone / superficie', ar: 'مِنْطَقَة / مَسَاحَة', phonetic: '/ˈeə.ri.ə/', type: 'nom' },
  money: { en: 'money', fr: 'argent', ar: 'مَال / نُقُود', phonetic: '/ˈmʌn.i/', type: 'nom' },
  story: { en: 'story', fr: 'histoire / récit', ar: 'قِصَّة / حِكَايَة', phonetic: '/ˈstɔː.ri/', type: 'nom' },
  month: { en: 'month', fr: 'mois', ar: 'شَهْر', phonetic: '/mʌnθ/', type: 'nom' },
  lot: { en: 'lot', fr: 'beaucoup / lot', ar: 'كَثِير / قِطْعَة', phonetic: '/lɒt/', type: 'nom' },
  right: { en: 'right', fr: 'droit / droite / correct', ar: 'حَقّ / يَمِين / صَحِيح', phonetic: '/raɪt/', type: 'nom' },
  study: { en: 'study', fr: 'étude / étudier', ar: 'دِرَاسَة / يَدْرُسُ', phonetic: '/ˈstʌd.i/', type: 'nom' },
  book: { en: 'book', fr: 'livre', ar: 'كِتَاب', phonetic: '/bʊk/', type: 'nom' },
  eye_sight: { en: 'eyes', fr: 'yeux', ar: 'عُيُون', phonetic: '/aɪz/', type: 'nom' },
  job: { en: 'job', fr: 'travail / emploi', ar: 'وَظِيفَة / عَمَل', phonetic: '/dʒɒb/', type: 'nom' },
  word: { en: 'word', fr: 'mot', ar: 'كَلِمَة', phonetic: '/wɜːrd/', type: 'nom' },
  business: { en: 'business', fr: 'affaires / commerce', ar: 'أَعْمَال / تِجَارَة', phonetic: '/ˈbɪz.nɪs/', type: 'nom' },
  issue: { en: 'issue', fr: 'problème / question', ar: 'مَسْأَلَة / قَضِيَّة', phonetic: '/ˈɪʃ.uː/', type: 'nom' },
  side: { en: 'side', fr: 'côté', ar: 'جَانِب / طَرَف', phonetic: '/saɪd/', type: 'nom' },
  kind: { en: 'kind', fr: 'genre / gentil', ar: 'نَوْع / لَطِيف', phonetic: '/kaɪnd/', type: 'nom' },
  head: { en: 'head', fr: 'tête / chef', ar: 'رَأْس / قَائِد', phonetic: '/hed/', type: 'nom' },
  house: { en: 'house', fr: 'maison', ar: 'مَنْزِل / بَيْت', phonetic: '/haʊs/', type: 'nom' },
  service: { en: 'service', fr: 'service', ar: 'خِدْمَة', phonetic: '/ˈsɜːr.vɪs/', type: 'nom' },
  friend: { en: 'friend', fr: 'ami(e)', ar: 'صَدِيق', phonetic: '/frend/', type: 'nom' },
  father: { en: 'father', fr: 'père', ar: 'أَب', phonetic: '/ˈfɑː.ðər/', type: 'nom' },
  power: { en: 'power', fr: 'pouvoir / puissance', ar: 'قُوَّة / سُلْطَة', phonetic: '/ˈpaʊ.ər/', type: 'nom' },
  hour: { en: 'hour', fr: 'heure', ar: 'سَاعَة', phonetic: '/aʊər/', type: 'nom' },
  game: { en: 'game', fr: 'jeu / match', ar: 'لُعْبَة / مُبَارَاة', phonetic: '/ɡeɪm/', type: 'nom' },
  line: { en: 'line', fr: 'ligne', ar: 'خَطّ / سَطْر', phonetic: '/laɪn/', type: 'nom' },
  end: { en: 'end', fr: 'fin', ar: 'نِهَايَة', phonetic: '/end/', type: 'nom' },
  member: { en: 'member', fr: 'membre', ar: 'عُضْو', phonetic: '/ˈmem.bər/', type: 'nom' },
  law: { en: 'law', fr: 'loi / droit', ar: 'قَانُون', phonetic: '/lɔː/', type: 'nom' },
  car: { en: 'car', fr: 'voiture', ar: 'سَيَّارَة', phonetic: '/kɑːr/', type: 'nom' },
  city: { en: 'city', fr: 'ville', ar: 'مَدِينَة', phonetic: '/ˈsɪt.i/', type: 'nom' },
  community: { en: 'community', fr: 'communauté', ar: 'مُجْتَمَع', phonetic: '/kəˈmjuː.nə.ti/', type: 'nom' },
  name: { en: 'name', fr: 'nom', ar: 'اسْم', phonetic: '/neɪm/', type: 'nom' },
  president: { en: 'president', fr: 'président', ar: 'رَئِيس', phonetic: '/ˈprez.ɪ.dənt/', type: 'nom' },
  team: { en: 'team', fr: 'équipe', ar: 'فَرِيق', phonetic: '/tiːm/', type: 'nom' },
  minute: { en: 'minute', fr: 'minute', ar: 'دَقِيقَة', phonetic: '/ˈmɪn.ɪt/', type: 'nom' },
  idea: { en: 'idea', fr: 'idée', ar: 'فِكْرَة', phonetic: '/aɪˈdiː.ə/', type: 'nom' },
  kid: { en: 'kid', fr: 'gosse / enfant', ar: 'طِفْل', phonetic: '/kɪd/', type: 'nom' },
  body: { en: 'body', fr: 'corps', ar: 'جِسْم / جَسَد', phonetic: '/ˈbɒd.i/', type: 'nom' },
  information: { en: 'information', fr: 'information(s)', ar: 'مَعْلُومَات', phonetic: '/ˌɪn.fəˈmeɪ.ʃən/', type: 'nom' },
  back: { en: 'back', fr: 'dos / arrière', ar: 'ظَهْر / خَلْف', phonetic: '/bæk/', type: 'nom' },
  parent: { en: 'parent', fr: 'parent', ar: 'وَالِد', phonetic: '/ˈpeə.rənt/', type: 'nom' },
  face: { en: 'face', fr: 'visage', ar: 'وَجْه', phonetic: '/feɪs/', type: 'nom' },
  others: { en: 'others', fr: 'les autres', ar: 'آخَرُونَ', phonetic: '/ˈʌð.ərz/', type: 'nom' },
  level: { en: 'level', fr: 'niveau', ar: 'مُسْتَوَى', phonetic: '/ˈlev.əl/', type: 'nom' },
  office: { en: 'office', fr: 'bureau', ar: 'مَكْتَب', phonetic: '/ˈɒf.ɪs/', type: 'nom' },
  door: { en: 'door', fr: 'porte', ar: 'بَاب', phonetic: '/dɔːr/', type: 'nom' },
  health: { en: 'health', fr: 'santé', ar: 'صِحَّة', phonetic: '/helθ/', type: 'nom' },
  person_people: { en: 'people', fr: 'gens / peuple', ar: 'نَاس / شَعْب', phonetic: '/ˈpiː.pəl/', type: 'nom' },
  people: { en: 'people', fr: 'gens / peuple', ar: 'نَاس / شَعْب', phonetic: '/ˈpiː.pəl/', type: 'nom' },
  art: { en: 'art', fr: 'art', ar: 'فَنّ', phonetic: '/ɑːrt/', type: 'nom' },
  war: { en: 'war', fr: 'guerre', ar: 'حَرْب', phonetic: '/wɔːr/', type: 'nom' },
  history: { en: 'history', fr: 'histoire', ar: 'تَارِيخ', phonetic: '/ˈhɪs.tər.i/', type: 'nom' },
  party: { en: 'party', fr: 'fête / parti', ar: 'حَفْلَة / حِزْب', phonetic: '/ˈpɑːr.ti/', type: 'nom' },
  result: { en: 'result', fr: 'résultat', ar: 'نَتِيجَة', phonetic: '/rɪˈzʌlt/', type: 'nom' },
  change_noun: { en: 'change', fr: 'changement / monnaie', ar: 'تَغْيِير / فِرَاكَة', phonetic: '/tʃeɪndʒ/', type: 'nom' },
  morning: { en: 'morning', fr: 'matin', ar: 'صَبَاح', phonetic: '/ˈmɔːr.nɪŋ/', type: 'nom' },
  reason: { en: 'reason', fr: 'raison', ar: 'سَبَب / عَقْل', phonetic: '/ˈriː.zən/', type: 'nom' },
  research: { en: 'research', fr: 'recherche', ar: 'بَحْث عِلْمِيّ', phonetic: '/rɪˈsɜːrtʃ/', type: 'nom' },
  girl: { en: 'girl', fr: 'fille', ar: 'فَتَاة / بِنْت', phonetic: '/ɡɜːrl/', type: 'nom' },
  guy: { en: 'guy', fr: 'gars / mec', ar: 'شَابّ / فَتًى', phonetic: '/ɡaɪ/', type: 'nom' },
  moment: { en: 'moment', fr: 'moment / instant', ar: 'لَحْظَة', phonetic: '/ˈmoʊ.mənt/', type: 'nom' },
  air: { en: 'air', fr: 'air', ar: 'هَوَاء / جَوّ', phonetic: '/eər/', type: 'nom' },
  teacher: { en: 'teacher', fr: 'professeur / enseignant', ar: 'مُعَلِّم / أُسْتَاذ', phonetic: '/ˈtiː.tʃər/', type: 'nom' },
  force: { en: 'force', fr: 'force', ar: 'قُوَّة', phonetic: '/fɔːrs/', type: 'nom' },
  education: { en: 'education', fr: 'éducation / enseignement', ar: 'تَعْلِيم / تَرْبِيَة', phonetic: '/ˌedʒ.ʊˈkeɪ.ʃən/', type: 'nom' },

  // Story Domain Specific Vocabulary
  clockmaker: { en: 'clockmaker', fr: 'horloger', ar: 'صَانِعُ السَّاعَات', phonetic: '/ˈklɒkˌmeɪ.kər/', type: 'nom' },
  workshop: { en: 'workshop', fr: 'atelier', ar: 'وَرْشَة / مَشْغَل', phonetic: '/ˈwɜːrk.ʃɒp/', type: 'nom' },
  artisan: { en: 'artisan', fr: 'artisan', ar: 'حِرَفِيّ / صَانِع', phonetic: '/ˌɑːr.tɪˈzæn/', type: 'nom' },
  craftsman: { en: 'craftsman', fr: 'artisan / artisan d’art', ar: 'حِرَفِيّ / صَانِعٌ مَاهِر', phonetic: '/ˈkræfts.mən/', type: 'nom' },
  craftsmanship: { en: 'craftsmanship', fr: 'savoir-faire / artisanat', ar: 'حِرَفِيَّة / مَهَارَةٌ يَدَوِيَّة', phonetic: '/ˈkræfts.mən.ʃɪp/', type: 'nom' },
  patience: { en: 'patience', fr: 'patience', ar: 'صَبْر', phonetic: '/ˈpeɪ.ʃəns/', type: 'nom' },
  gears: { en: 'gears', fr: 'engrenages / rouages', ar: 'تُرُوس', phonetic: '/ɡɪərz/', type: 'nom' },
  pendulum: { en: 'pendulum', fr: 'balancier / pendule', ar: 'بَنْدُول / رَقَّاص', phonetic: '/ˈpen.dʒə.ləm/', type: 'nom' },
  precision: { en: 'precision', fr: 'précision', ar: 'دِقَّة', phonetic: '/prɪˈsɪʒ.ən/', type: 'nom' },
  cherish: { en: 'cherish', fr: 'chérir / apprécier', ar: 'يَعْتَزُّ بـ / يُقَدِّرُ', phonetic: '/ˈtʃer.ɪʃ/', type: 'verbe' },
  sapphire: { en: 'sapphire', fr: 'saphir', ar: 'يَاقُوتٌ أَزْرَق', phonetic: '/ˈsæf.aɪər/', type: 'nom' },
  copper: { en: 'copper', fr: 'cuivre', ar: 'نُحَاس', phonetic: '/ˈkɒp.ər/', type: 'nom' },
  brass: { en: 'brass', fr: 'laiton / cuivre jaune', ar: 'نُحَاسٌ أَصْفَر', phonetic: '/bræs/', type: 'nom' },
  rain: { en: 'rain', fr: 'pluie', ar: 'مَطَر', phonetic: '/reɪn/', type: 'nom' },
  journey: { en: 'journey', fr: 'voyage / trajet', ar: 'رِحْلَة', phonetic: '/ˈdʒɜːr.ni/', type: 'nom' },
  travel: { en: 'travel', fr: 'voyager / voyage', ar: 'سَفَر / يُسَافِرُ', phonetic: '/ˈtræv.əl/', type: 'verbe' },
  traveler: { en: 'traveler', fr: 'voyageur', ar: 'مُسَافِر', phonetic: '/ˈtræv.əl.ər/', type: 'nom' },
  train: { en: 'train', fr: 'train', ar: 'قِطَار', phonetic: '/treɪn/', type: 'nom' },
  station: { en: 'station', fr: 'gare / station', ar: 'مَحَطَّة', phonetic: '/ˈsteɪ.ʃən/', type: 'nom' },
  arrive: { en: 'arrive', fr: 'arriver', ar: 'يَصِلُ', phonetic: '/əˈraɪv/', type: 'verbe' },
  arrived: { en: 'arrived', fr: 'arrivé', ar: 'وَصَلَ', phonetic: '/əˈraɪvd/', type: 'verbe' },
  ticket: { en: 'ticket', fr: 'billet / ticket', ar: 'تَذْكِرَة', phonetic: '/ˈtɪk.ɪt/', type: 'nom' },
  luggage: { en: 'luggage', fr: 'bagages', ar: 'أَمْتِعَة / حَقَائِب', phonetic: '/ˈlʌɡ.ɪdʒ/', type: 'nom' },
  hotel: { en: 'hotel', fr: 'hôtel', ar: 'فُنْدُق', phonetic: '/hoʊˈtel/', type: 'nom' },
  coffee: { en: 'coffee', fr: 'café (boisson)', ar: 'قَهْوَة', phonetic: '/ˈkɒf.i/', type: 'nom' },
  bakery: { en: 'bakery', fr: 'boulangerie', ar: 'مَخْبَز', phonetic: '/ˈbeɪ.kər.i/', type: 'nom' },
  bread: { en: 'bread', fr: 'pain', ar: 'خُبْز', phonetic: '/bred/', type: 'nom' },
  fresh: { en: 'fresh', fr: 'frais', ar: 'طَازَج', phonetic: '/freʃ/', type: 'adjectif' },
  smell: { en: 'smell', fr: 'odeur / sentir', ar: 'رَائِحَة / يَشُمُّ', phonetic: '/smel/', type: 'nom' },
  delicious: { en: 'delicious', fr: 'délicieux', ar: 'لَذِيذ / شَهِيّ', phonetic: '/dɪˈlɪʃ.əs/', type: 'adjectif' },
  street: { en: 'street', fr: 'rue', ar: 'شَارِع', phonetic: '/striːt/', type: 'nom' },
  sleep: { en: 'sleep', fr: 'sommeil / dormir', ar: 'نَوْم / يَنَامُ', phonetic: '/sliːp/', type: 'nom' },
  brain: { en: 'brain', fr: 'cerveau', ar: 'دِمَاغ / عَقْل', phonetic: '/breɪn/', type: 'nom' },
  memory: { en: 'memory', fr: 'mémoire / souvenir', ar: 'ذَاكِرَة', phonetic: '/ˈmem.ər.i/', type: 'nom' },
  night: { en: 'night', fr: 'nuit', ar: 'لَيْل', phonetic: '/naɪt/', type: 'nom' },
  deep: { en: 'deep', fr: 'profond', ar: 'عَمِيق', phonetic: '/diːp/', type: 'adjectif' },
  light: { en: 'light', fr: 'lumière / léger', ar: 'ضَوْء / نُور / خَفِيف', phonetic: '/laɪt/', type: 'nom' },
  lighthouse: { en: 'lighthouse', fr: 'phare maritime', ar: 'مَنَارَة', phonetic: '/ˈlaɪt.haʊs/', type: 'nom' },
  ocean: { en: 'ocean', fr: 'océan', ar: 'مُحِيط', phonetic: '/ˈoʊ.ʃən/', type: 'nom' },
  sea: { en: 'sea', fr: 'mer', ar: 'بَحْر', phonetic: '/siː/', type: 'nom' },
  wave: { en: 'wave', fr: 'vague / onde', ar: 'مَوْجَة', phonetic: '/weɪv/', type: 'nom' },
  waves: { en: 'waves', fr: 'vagues', ar: 'أَمْوَاج', phonetic: '/weɪvz/', type: 'nom' },
  wind: { en: 'wind', fr: 'vent', ar: 'رِيح / رِيَاح', phonetic: '/wɪnd/', type: 'nom' },
  storm: { en: 'storm', fr: 'tempête', ar: 'عَاصِفَة', phonetic: '/stɔːrm/', type: 'nom' },
  island: { en: 'island', fr: 'île', ar: 'جَزِيرَة', phonetic: '/ˈaɪ.lənd/', type: 'nom' },
  secret: { en: 'secret', fr: 'secret', ar: 'سِرّ / خَفِيّ', phonetic: '/ˈsiː.krət/', type: 'nom' },
  mystery: { en: 'mystery', fr: 'mystère', ar: 'غُمُوض / لُغْز', phonetic: '/ˈmɪs.tər.i/', type: 'nom' },
  intelligence: { en: 'intelligence', fr: 'intelligence', ar: 'ذَكَاء', phonetic: '/ɪnˈtel.ɪ.dʒəns/', type: 'nom' },
  artificial: { en: 'artificial', fr: 'artificiel', ar: 'اصْطِنَاعِيّ', phonetic: '/ˌɑːr.tɪˈfɪʃ.əl/', type: 'adjectif' },
  technology: { en: 'technology', fr: 'technologie', ar: 'تِكْنُولُوجْيَا', phonetic: '/tekˈnɒl.ə.dʒi/', type: 'nom' },
  future: { en: 'future', fr: 'futur / avenir', ar: 'مُسْتَقْبَل', phonetic: '/ˈfjuː.tʃər/', type: 'nom' },
  machine: { en: 'machine', fr: 'machine', ar: 'آلَة', phonetic: '/məˈʃiːn/', type: 'nom' },
  computer: { en: 'computer', fr: 'ordinateur', ar: 'حَاسُوب', phonetic: '/kəmˈpjuː.tər/', type: 'nom' },
  data: { en: 'data', fr: 'données', ar: 'بَيَانَات / مُعْطَيَات', phonetic: '/ˈdeɪ.tə/', type: 'nom' },
  human: { en: 'human', fr: 'humain', ar: 'إِنْسَان / بَشَرِيّ', phonetic: '/ˈhjuː.mən/', type: 'nom' },
  humans: { en: 'humans', fr: 'les humains', ar: 'الْبَشَر', phonetic: '/ˈhjuː.mənz/', type: 'nom' },
  sustainable: { en: 'sustainable', fr: 'durable', ar: 'مُسْتَدَام', phonetic: '/səˈsteɪ.nə.bəl/', type: 'adjectif' },
  energy: { en: 'energy', fr: 'énergie', ar: 'طَاقَة', phonetic: '/ˈen.ər.dʒi/', type: 'nom' },
  green: { en: 'green', fr: 'vert / écologique', ar: 'أَخْضَر / بِيئِيّ', phonetic: '/ɡriːn/', type: 'adjectif' },
  nature: { en: 'nature', fr: 'nature', ar: 'طَبِيعَة', phonetic: '/ˈneɪ.tʃər/', type: 'nom' },
  tree: { en: 'tree', fr: 'arbre', ar: 'شَجَرَة', phonetic: '/triː/', type: 'nom' },
  trees: { en: 'trees', fr: 'arbres', ar: 'أَشْجَار', phonetic: '/triːz/', type: 'nom' },
  forest: { en: 'forest', fr: 'forêt', ar: 'غَابَة', phonetic: '/ˈfɒr.ɪst/', type: 'nom' },
  solar: { en: 'solar', fr: 'solaire', ar: 'شَمْسِيّ', phonetic: '/ˈsoʊ.lər/', type: 'adjectif' },
  sun: { en: 'sun', fr: 'soleil', ar: 'شَمْس', phonetic: '/sʌn/', type: 'nom' },
  planet: { en: 'planet', fr: 'planète', ar: 'كَوْكَب', phonetic: '/ˈplæn.ɪt/', type: 'nom' },
  environment: { en: 'environment', fr: 'environnement', ar: 'بِيئَة', phonetic: '/ɪnˈvaɪ.rən.mənt/', type: 'nom' },
  climate: { en: 'climate', fr: 'climat', ar: 'مُنَاخ', phonetic: '/ˈklaɪ.mət/', type: 'nom' },
  challenge: { en: 'challenge', fr: 'défi', ar: 'تَحَدٍّ', phonetic: '/ˈtʃæl.ɪndʒ/', type: 'nom' },
  solution: { en: 'solution', fr: 'solution', ar: 'حَلّ', phonetic: '/səˈluː.ʃən/', type: 'nom' },
  knowledge: { en: 'knowledge', fr: 'connaissance / savoir', ar: 'مَعْرِفَة / عِلْم', phonetic: '/ˈnɒl.ɪdʒ/', type: 'nom' },
  language: { en: 'language', fr: 'langue / langage', ar: 'لُغَة', phonetic: '/ˈlæŋ.ɡwɪdʒ/', type: 'nom' },
  practice: { en: 'practice', fr: 'pratique / s’exercer', ar: 'مُمَارَسَة / تَدْرِيب', phonetic: '/ˈpræk.tɪs/', type: 'nom' },
  skill: { en: 'skill', fr: 'compétence', ar: 'مَهَارَة', phonetic: '/skɪl/', type: 'nom' },
  improve: { en: 'improve', fr: 'améliorer', ar: 'يُحَسِّنُ / يَتَطَوَّرُ', phonetic: '/ɪmˈpruːv/', type: 'verbe' },
  success: { en: 'success', fr: 'succès / réussite', ar: 'نَجَاح', phonetic: '/səkˈses/', type: 'nom' },
  discover: { en: 'discover', fr: 'découvrir', ar: 'يَكْتَشِفُ', phonetic: '/dɪˈskʌv.ər/', type: 'verbe' },
  experience: { en: 'experience', fr: 'expérience', ar: 'تَجْرِبَة / خِبْرَة', phonetic: '/ɪkˈspɪə.ri.əns/', type: 'nom' },

  // Common Adjectives
  good: { en: 'good', fr: 'bon / bien', ar: 'جَيِّد / طَيِّب', phonetic: '/ɡʊd/', type: 'adjectif' },
  new: { en: 'new', fr: 'nouveau / neuf', ar: 'جَدِيد', phonetic: '/njuː/', type: 'adjectif' },
  first: { en: 'first', fr: 'premier / d’abord', ar: 'أَوَّل / أُولَى', phonetic: '/fɜːrst/', type: 'adjectif' },
  last: { en: 'last', fr: 'dernier / passé', ar: 'آخِر / أَخِير', phonetic: '/læst/', type: 'adjectif' },
  long: { en: 'long', fr: 'long', ar: 'طَوِيل', phonetic: '/lɒŋ/', type: 'adjectif' },
  great: { en: 'great', fr: 'grand / excellent', ar: 'عَظِيم / رَائِع', phonetic: '/ɡreɪt/', type: 'adjectif' },
  little: { en: 'little', fr: 'petit / peu', ar: 'صَغِير / قَلِيل', phonetic: '/ˈlɪt.əl/', type: 'adjectif' },
  own: { en: 'own', fr: 'propre / posséder', ar: 'خَاصّ بِـ / يَمْلِكُ', phonetic: '/oʊn/', type: 'adjectif' },
  other: { en: 'other', fr: 'autre', ar: 'آخَر', phonetic: '/ˈʌð.ər/', type: 'adjectif' },
  old: { en: 'old', fr: 'vieux / ancien', ar: 'قَدِيم / عَجُوز', phonetic: '/oʊld/', type: 'adjectif' },
  right_adj: { en: 'right', fr: 'juste / exact', ar: 'صَحِيح / حَقّ', phonetic: '/raɪt/', type: 'adjectif' },
  big: { en: 'big', fr: 'grand / gros', ar: 'كَبِير', phonetic: '/bɪɡ/', type: 'adjectif' },
  high: { en: 'high', fr: 'haut / élevé', ar: 'عَالٍ / مُرْتَفِع', phonetic: '/haɪ/', type: 'adjectif' },
  different: { en: 'different', fr: 'différent', ar: 'مُخْتَلِف', phonetic: '/ˈdɪf.ər.ənt/', type: 'adjectif' },
  small: { en: 'small', fr: 'petit', ar: 'صَغِير', phonetic: '/smɔːl/', type: 'adjectif' },
  large: { en: 'large', fr: 'large / grand', ar: 'كَبِير / وَاسِع', phonetic: '/lɑːrdʒ/', type: 'adjectif' },
  next: { en: 'next', fr: 'suivant / prochain', ar: 'قَادِم / تَالٍ', phonetic: '/nekst/', type: 'adjectif' },
  early: { en: 'early', fr: 'tôt / précoce', ar: 'مُبَكِّر', phonetic: '/ˈɜːr.li/', type: 'adjectif' },
  young: { en: 'young', fr: 'jeune', ar: 'شَابّ / صَغِير السِّنّ', phonetic: '/jʌŋ/', type: 'adjectif' },
  important: { en: 'important', fr: 'important', ar: 'مُهِمّ / هَامّ', phonetic: '/ɪmˈpɔːr.tənt/', type: 'adjectif' },
  few: { en: 'few', fr: 'peu de / quelques', ar: 'قَلِيل / بَعْض', phonetic: '/fjuː/', type: 'adjectif' },
  public: { en: 'public', fr: 'public', ar: 'عَامّ', phonetic: '/ˈpʌb.lɪk/', type: 'adjectif' },
  bad: { en: 'bad', fr: 'mauvais', ar: 'سَيِّئ', phonetic: '/bæd/', type: 'adjectif' },
  same: { en: 'same', fr: 'même / pareil', ar: 'نَفْس / مُمَاثِل', phonetic: '/seɪm/', type: 'adjectif' },
  able: { en: 'able', fr: 'capable', ar: 'قَادِر', phonetic: '/ˈeɪ.bəl/', type: 'adjectif' },
  beautiful: { en: 'beautiful', fr: 'beau / magnifique', ar: 'جَمِيل', phonetic: '/ˈbjuː.tɪ.fəl/', type: 'adjectif' },
  bright: { en: 'bright', fr: 'lumineux / brillant', ar: 'مُشْرِق / سَاطِع', phonetic: '/braɪt/', type: 'adjectif' },
  quiet: { en: 'quiet', fr: 'calme / silencieux', ar: 'هَادِئ', phonetic: '/ˈkwaɪ.ət/', type: 'adjectif' },
  warm: { en: 'warm', fr: 'chaud / chaleureux', ar: 'دَافِئ', phonetic: '/wɔːrm/', type: 'adjectif' },
  cold: { en: 'cold', fr: 'froid', ar: 'بَارِد', phonetic: '/koʊld/', type: 'adjectif' },
  calm: { en: 'calm', fr: 'calme / paisible', ar: 'هَادِئ / سَاكِن', phonetic: '/kɑːm/', type: 'adjectif' },
  happy: { en: 'happy', fr: 'heureux / joyeux', ar: 'سَعِيد / فَرِح', phonetic: '/ˈhæp.i/', type: 'adjectif' },
  simple: { en: 'simple', fr: 'simple / facile', ar: 'بَسِيط / سَهْل', phonetic: '/ˈsɪm.pəl/', type: 'adjectif' },
  powerful: { en: 'powerful', fr: 'puissant', ar: 'قَوِيّ', phonetic: '/ˈpaʊ.ər.fəl/', type: 'adjectif' },
  natural: { en: 'natural', fr: 'naturel', ar: 'طَبِيعِيّ', phonetic: '/ˈnætʃ.ər.əl/', type: 'adjectif' },
  clear: { en: 'clear', fr: 'clair / limpide', ar: 'وَاضِح / صَافٍ', phonetic: '/klɪər/', type: 'adjectif' },
  easy: { en: 'easy', fr: 'facile', ar: 'سَهْل / يَسِير', phonetic: '/ˈiː.zi/', type: 'adjectif' },

  // Prepositions & Connectors
  in: { en: 'in', fr: 'dans / en', ar: 'فِي', phonetic: '/ɪn/', type: 'préposition' },
  on: { en: 'on', fr: 'sur', ar: 'عَلَى', phonetic: '/ɒn/', type: 'préposition' },
  at: { en: 'at', fr: 'à / chez', ar: 'عِنْدَ / فِي', phonetic: '/æt/', type: 'préposition' },
  to: { en: 'to', fr: 'vers / à / pour', ar: 'إِلَى / لِـ', phonetic: '/tuː/', type: 'préposition' },
  for: { en: 'for', fr: 'pour / depuis', ar: 'لِأَجْلِ / لِـ', phonetic: '/fɔːr/', type: 'préposition' },
  with: { en: 'with', fr: 'avec', ar: 'مَعَ / بِـ', phonetic: '/wɪð/', type: 'préposition' },
  by: { en: 'by', fr: 'par / près de', ar: 'بِوَاسِطَة / قُرْبَ', phonetic: '/baɪ/', type: 'préposition' },
  from: { en: 'from', fr: 'de / depuis', ar: 'مِنْ', phonetic: '/frɒm/', type: 'préposition' },
  about: { en: 'about', fr: 'à propos de / environ', ar: 'حَوْلَ / عَنْ', phonetic: '/əˈbaʊt/', type: 'préposition' },
  into: { en: 'into', fr: 'dans / en', ar: 'إِلَى دَاخِلِ', phonetic: '/ˈɪn.tuː/', type: 'préposition' },
  through: { en: 'through', fr: 'à travers', ar: 'مِنْ خِلَالِ / عَبْرَ', phonetic: '/θruː/', type: 'préposition' },
  during: { en: 'during', fr: 'pendant / durant', ar: 'أَثْنَاءَ / خِلَالَ', phonetic: '/ˈdjʊə.rɪŋ/', type: 'préposition' },
  without: { en: 'without', fr: 'sans', ar: 'بِدُونِ / دُونَ', phonetic: '/wɪˈðaʊt/', type: 'préposition' },
  under: { en: 'under', fr: 'sous', ar: 'تَحْتَ', phonetic: '/ˈʌn.dər/', type: 'préposition' },
  between: { en: 'between', fr: 'entre', ar: 'بَيْنَ', phonetic: '/bɪˈtwiːn/', type: 'préposition' },
  and: { en: 'and', fr: 'et', ar: 'وَ', phonetic: '/ænd/', type: 'conjonction' },
  but: { en: 'but', fr: 'mais', ar: 'لَكِنْ / بَلْ', phonetic: '/bʌt/', type: 'conjonction' },
  or: { en: 'or', fr: 'ou', ar: 'أَوْ', phonetic: '/ɔːr/', type: 'conjonction' },
  because: { en: 'because', fr: 'parce que', ar: 'لِأَنَّ', phonetic: '/bɪˈkɒz/', type: 'conjonction' },
  as: { en: 'as', fr: 'comme / alors que', ar: 'كَمَا / حِينَ', phonetic: '/æz/', type: 'conjonction' },
  if: { en: 'if', fr: 'si', ar: 'إِذَا / لَوْ', phonetic: '/ɪf/', type: 'conjonction' },
  when: { en: 'when', fr: 'quand / lorsque', ar: 'عِنْدَمَا / مَتَى', phonetic: '/wen/', type: 'conjonction' },
  while: { en: 'while', fr: 'pendant que', ar: 'بَيْنَمَا', phonetic: '/waɪl/', type: 'conjonction' },
  where: { en: 'where', fr: 'où', ar: 'حَيْثُ / أَيْنَ', phonetic: '/weər/', type: 'adverbe' },
  how: { en: 'how', fr: 'comment', ar: 'كَيْفَ', phonetic: '/haʊ/', type: 'adverbe' },
  why: { en: 'why', fr: 'pourquoi', ar: 'لِمَاذَا', phonetic: '/waɪ/', type: 'adverbe' },
  what: { en: 'what', fr: 'que / quoi / quel', ar: 'مَاذَا / مَا', phonetic: '/wɒt/', type: 'pronom' },
  which: { en: 'which', fr: 'lequel / qui', ar: 'أَيّ / الَّذِي', phonetic: '/wɪtʃ/', type: 'pronom' },
  who: { en: 'who', fr: 'qui', ar: 'مَنْ / الَّذِي', phonetic: '/huː/', type: 'pronom' },
  that: { en: 'that', fr: 'que / ce... là', ar: 'ذَلِكَ / أَنَّ', phonetic: '/ðæt/', type: 'pronom' },
  this: { en: 'this', fr: 'ceci / ce', ar: 'هَذَا / هَذِهِ', phonetic: '/ðɪs/', type: 'pronom' },
  these: { en: 'these', fr: 'ces (ci)', ar: 'هَؤُلَاءِ / هَذِهِ', phonetic: '/ðiːz/', type: 'pronom' },
  those: { en: 'those', fr: 'ces (là)', ar: 'أُولَئِكَ / تِلْكَ', phonetic: '/ðoʊz/', type: 'pronom' },
  the: { en: 'the', fr: 'le / la / les', ar: 'الـ (أداة التعريف)', phonetic: '/ðə/', type: 'article' },
  a: { en: 'a', fr: 'un / une', ar: 'أَدَاةُ تَنْكِير', phonetic: '/ə/', type: 'article' },
  an: { en: 'an', fr: 'un / une', ar: 'أَدَاةُ تَنْكِير', phonetic: '/æn/', type: 'article' },
  all: { en: 'all', fr: 'tout / tous', ar: 'كُلّ / جَمِيع', phonetic: '/ɔːl/', type: 'adjectif' },
  every: { en: 'every', fr: 'chaque', ar: 'كُلّ', phonetic: '/ˈev.ri/', type: 'adjectif' },
  each: { en: 'each', fr: 'chacun', ar: 'كُلّ وَاحِد', phonetic: '/iːtʃ/', type: 'pronom' },
  some: { en: 'some', fr: 'du / des / certains', ar: 'بَعْض', phonetic: '/sʌm/', type: 'adjectif' },
  any: { en: 'any', fr: 'n’importe quel / aucun', ar: 'أَيّ', phonetic: '/ˈen.i/', type: 'adjectif' },
  no: { en: 'no', fr: 'non / aucun', ar: 'لَا / لَيْسَ', phonetic: '/noʊ/', type: 'adverbe' },
  not: { en: 'not', fr: 'ne... pas', ar: 'لَيْسَ / لَمْ', phonetic: '/nɒt/', type: 'adverbe' },
  very: { en: 'very', fr: 'très', ar: 'جِدًّا', phonetic: '/ˈver.i/', type: 'adverbe' },
  really: { en: 'really', fr: 'vraiment', ar: 'حَقًّا / فِعْلًا', phonetic: '/ˈrɪə.li/', type: 'adverbe' },
  always: { en: 'always', fr: 'toujours', ar: 'دَائِمًا', phonetic: '/ˈɔːl.weɪz/', type: 'adverbe' },
  never: { en: 'never', fr: 'jamais', ar: 'أَبَدًا', phonetic: '/ˈnev.ər/', type: 'adverbe' },
  often: { en: 'often', fr: 'souvent', ar: 'غَالِبًا', phonetic: '/ˈɒf.ən/', type: 'adverbe' },
  sometimes: { en: 'sometimes', fr: 'parfois', ar: 'أَحْيَانًا', phonetic: '/ˈsʌm.taɪmz/', type: 'adverbe' },
  also: { en: 'also', fr: 'aussi / également', ar: 'أَيْضًا', phonetic: '/ˈɔːl.soʊ/', type: 'adverbe' },
  now: { en: 'now', fr: 'maintenant', ar: 'الْآنَ', phonetic: '/naʊ/', type: 'adverbe' },
  then: { en: 'then', fr: 'alors / ensuite', ar: 'حِينَئِذٍ / ثُمَّ', phonetic: '/ðen/', type: 'adverbe' },
  today: { en: 'today', fr: 'aujourd’hui', ar: 'الْيَوْم', phonetic: '/təˈdeɪ/', type: 'adverbe' },
  tonight: { en: 'tonight', fr: 'ce soir', ar: 'اللَّيْلَة', phonetic: '/təˈnaɪt/', type: 'adverbe' },
  tomorrow: { en: 'tomorrow', fr: 'demain', ar: 'غَدًا', phonetic: '/təˈmɒr.oʊ/', type: 'adverbe' },
  yesterday: { en: 'yesterday', fr: 'hier', ar: 'أَمْسِ / الْبَارِحَة', phonetic: '/ˈjes.tə.deɪ/', type: 'adverbe' },
  here: { en: 'here', fr: 'ici', ar: 'هُنَا', phonetic: '/hɪər/', type: 'adverbe' },
  there: { en: 'there', fr: 'là / là-bas', ar: 'هُنَاكَ', phonetic: '/ðeər/', type: 'adverbe' },
  together: { en: 'together', fr: 'ensemble', ar: 'مَعًا', phonetic: '/təˈɡeð.ər/', type: 'adverbe' },
};

// French-to-English reverse lookup map for instant lookup when hovering on the French column!
const FRENCH_LOOKUP: Record<string, WordEntry> = {};

// Populate reverse index
Object.values(TRILINGUAL_DICTIONARY).forEach((entry) => {
  // Normalize French key
  const frWords = entry.fr.toLowerCase().split(/[\s/(),]+/).filter(w => w.length > 1);
  frWords.forEach(fw => {
    if (!FRENCH_LOOKUP[fw]) {
      FRENCH_LOOKUP[fw] = entry;
    }
  });
});

// Additional French mappings for common terms
const EXTRA_FRENCH_TERMS: Record<string, WordEntry> = {
  est: { en: 'is', fr: 'est', ar: 'هُوَ / يَكُونُ', phonetic: '/ɪz/', type: 'verbe' },
  sont: { en: 'are', fr: 'sont', ar: 'هُمْ (يَكُونُون)', phonetic: '/ɑːr/', type: 'verbe' },
  était: { en: 'was', fr: 'était', ar: 'كَانَ', phonetic: '/wɒz/', type: 'verbe' },
  étaient: { en: 'were', fr: 'étaient', ar: 'كَانُوا', phonetic: '/wɜːr/', type: 'verbe' },
  le: { en: 'the', fr: 'le', ar: 'الـ (مذكر)', phonetic: '/ðə/', type: 'article' },
  la: { en: 'the', fr: 'la', ar: 'الـ (مؤنث)', phonetic: '/ðə/', type: 'article' },
  les: { en: 'the', fr: 'les', ar: 'الـ (جمع)', phonetic: '/ðə/', type: 'article' },
  un: { en: 'a / an', fr: 'un', ar: 'أَدَاةُ تَنْكِير (مُذَكَّر)', phonetic: '/ə/', type: 'article' },
  une: { en: 'a / an', fr: 'une', ar: 'أَدَاةُ تَنْكِير (مُؤَنَّث)', phonetic: '/ə/', type: 'article' },
  des: { en: 'some', fr: 'des', ar: 'بَعْض / أَدَاةُ جَمْع', phonetic: '/sʌm/', type: 'article' },
  dans: { en: 'in', fr: 'dans', ar: 'فِي / دَاخِل', phonetic: '/ɪn/', type: 'préposition' },
  sur: { en: 'on', fr: 'sur', ar: 'عَلَى / فَوْق', phonetic: '/ɒn/', type: 'préposition' },
  avec: { en: 'with', fr: 'avec', ar: 'مَعَ / بِـ', phonetic: '/wɪð/', type: 'préposition' },
  pour: { en: 'for', fr: 'pour', ar: 'لِأَجْلِ / لِـ', phonetic: '/fɔːr/', type: 'préposition' },
  par: { en: 'by', fr: 'par', ar: 'بِوَاسِطَة / عَبْرَ', phonetic: '/baɪ/', type: 'préposition' },
  vers: { en: 'towards', fr: 'vers', ar: 'نَحْوَ / بِاتِّجَاهِ', phonetic: '/təˈwɔːdz/', type: 'préposition' },
  mais: { en: 'but', fr: 'mais', ar: 'لَكِنْ / بَلْ', phonetic: '/bʌt/', type: 'conjonction' },
  ou: { en: 'or', fr: 'ou', ar: 'أَوْ', phonetic: '/ɔːr/', type: 'conjonction' },
  et: { en: 'and', fr: 'et', ar: 'وَ (حَرْفُ عَطْف)', phonetic: '/ænd/', type: 'conjonction' },
  donc: { en: 'therefore', fr: 'donc', ar: 'إِذَنْ / لِذَلِكَ', phonetic: '/ˈðeə.fɔːr/', type: 'conjonction' },
  car: { en: 'because', fr: 'car', ar: 'لِأَنَّ', phonetic: '/bɪˈkɒz/', type: 'conjonction' },
  que: { en: 'that / what', fr: 'que', ar: 'أَنَّ / مَاذَا', phonetic: '/ðæt/', type: 'pronom' },
  qui: { en: 'who', fr: 'qui', ar: 'مَنْ / الَّذِي', phonetic: '/huː/', type: 'pronom' },
  ce: { en: 'this / that', fr: 'ce', ar: 'هَذَا', phonetic: '/ðɪs/', type: 'pronom' },
  cette: { en: 'this (fem.)', fr: 'cette', ar: 'هَذِهِ', phonetic: '/ðɪs/', type: 'pronom' },
  ces: { en: 'these', fr: 'ces', ar: 'هَؤُلَاءِ', phonetic: '/ðiːz/', type: 'pronom' },
  voyage: { en: 'journey / travel', fr: 'voyage', ar: 'رِحْلَة / سَفَر', phonetic: '/ˈdʒɜːr.ni/', type: 'nom' },
  ville: { en: 'city / town', fr: 'ville', ar: 'مَدِينَة', phonetic: '/ˈsɪt.i/', type: 'nom' },
  train: { en: 'train', fr: 'train', ar: 'قِطَار', phonetic: '/treɪn/', type: 'nom' },
  gare: { en: 'station', fr: 'gare', ar: 'مَحَطَّة', phonetic: '/ˈsteɪ.ʃən/', type: 'nom' },
  matin: { en: 'morning', fr: 'matin', ar: 'صَبَاح', phonetic: '/ˈmɔːr.nɪŋ/', type: 'nom' },
  sommeil: { en: 'sleep', fr: 'sommeil', ar: 'نَوْم', phonetic: '/sliːp/', type: 'nom' },
  mémoire: { en: 'memory', fr: 'mémoire', ar: 'ذَاكِرَة', phonetic: '/ˈmem.ər.i/', type: 'nom' },
  cerveau: { en: 'brain', fr: 'cerveau', ar: 'دِمَاغ', phonetic: '/breɪn/', type: 'nom' },
  nuit: { en: 'night', fr: 'nuit', ar: 'لَيْل', phonetic: '/naɪt/', type: 'nom' },
  heures: { en: 'hours', fr: 'heures', ar: 'سَاعَات', phonetic: '/aʊərz/', type: 'nom' },
  santé: { en: 'health', fr: 'santé', ar: 'صِحَّة', phonetic: '/helθ/', type: 'nom' },
  énergie: { en: 'energy', fr: 'énergie', ar: 'طَاقَة', phonetic: '/ˈen.ər.dʒi/', type: 'nom' },
  pain: { en: 'bread', fr: 'pain', ar: 'خُبْز', phonetic: '/bred/', type: 'nom' },
  boulangerie: { en: 'bakery', fr: 'boulangerie', ar: 'مَخْبَز', phonetic: '/ˈbeɪ.kər.i/', type: 'nom' },
  odeur: { en: 'smell / scent', fr: 'odeur', ar: 'رَائِحَة', phonetic: '/smel/', type: 'nom' },
  café: { en: 'coffee', fr: 'café', ar: 'قَهْوَة', phonetic: '/ˈkɒf.i/', type: 'nom' },
  mer: { en: 'sea', fr: 'mer', ar: 'بَحْر', phonetic: '/siː/', type: 'nom' },
  océan: { en: 'ocean', fr: 'océan', ar: 'مُحِيط', phonetic: '/ˈoʊ.ʃən/', type: 'nom' },
  vagues: { en: 'waves', fr: 'vagues', ar: 'أَمْوَاج', phonetic: '/weɪvz/', type: 'nom' },
  phare: { en: 'lighthouse', fr: 'phare', ar: 'مَنَارَة', phonetic: '/ˈlaɪt.haʊs/', type: 'nom' },
  mystère: { en: 'mystery', fr: 'mystère', ar: 'غُمُوض / لُغْز', phonetic: '/ˈmɪs.tər.i/', type: 'nom' },
  intelligence: { en: 'intelligence', fr: 'intelligence', ar: 'ذَكَاء', phonetic: '/ɪnˈtel.ɪ.dʒəns/', type: 'nom' },
  artificielle: { en: 'artificial', fr: 'artificielle', ar: 'اصْطِنَاعِيّ', phonetic: '/ˌɑːr.tɪˈfɪʃ.əl/', type: 'adjectif' },
  futur: { en: 'future', fr: 'futur', ar: 'مُسْتَقْبَل', phonetic: '/ˈfjuː.tʃər/', type: 'nom' },
  avenir: { en: 'future', fr: 'avenir', ar: 'مُسْتَقْبَل', phonetic: '/ˈfjuː.tʃər/', type: 'nom' },
  technologie: { en: 'technology', fr: 'technologie', ar: 'تِكْنُولُوجْيَا', phonetic: '/tekˈnɒl.ə.dʒi/', type: 'nom' },
  monde: { en: 'world', fr: 'monde', ar: 'عَالَم', phonetic: '/wɜːrld/', type: 'nom' },
  humains: { en: 'humans', fr: 'humains', ar: 'بَشَر', phonetic: '/ˈhjuː.mənz/', type: 'nom' },
  durable: { en: 'sustainable', fr: 'durable', ar: 'مُسْتَدَام', phonetic: '/səˈsteɪ.nə.bəl/', type: 'adjectif' },
  nature: { en: 'nature', fr: 'nature', ar: 'طَبِيعَة', phonetic: '/ˈneɪ.tʃər/', type: 'nom' },
  arbres: { en: 'trees', fr: 'arbres', ar: 'أَشْجَار', phonetic: '/triːz/', type: 'nom' },
  air: { en: 'air', fr: 'air', ar: 'هَوَاء', phonetic: '/eər/', type: 'nom' },
  propre: { en: 'clean / own', fr: 'propre', ar: 'نَظِيف / خَاصّ', phonetic: '/kliːn/', type: 'adjectif' },
  facile: { en: 'easy', fr: 'facile', ar: 'سَهْل', phonetic: '/ˈiː.zi/', type: 'adjectif' },
  important: { en: 'important', fr: 'important', ar: 'مُهِمّ', phonetic: '/ɪmˈpɔːr.tənt/', type: 'adjectif' },
  beau: { en: 'beautiful', fr: 'beau', ar: 'جَمِيل', phonetic: '/ˈbjuː.tɪ.fəl/', type: 'adjectif' },
  nouvelle: { en: 'new', fr: 'nouvelle', ar: 'جَدِيدَة', phonetic: '/njuː/', type: 'adjectif' },
  nouveau: { en: 'new', fr: 'nouveau', ar: 'جَدِيد', phonetic: '/njuː/', type: 'adjectif' },
};

Object.entries(EXTRA_FRENCH_TERMS).forEach(([k, v]) => {
  FRENCH_LOOKUP[k] = v;
});

/**
 * Cleans a word by removing punctuation, spaces and numbers
 */
export function cleanWord(rawWord: string): string {
  return rawWord
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»’]/g, '')
    .trim()
    .toLowerCase();
}

/**
 * English stemmer helper: handles plurals, -ed, -ing, -ly, -er
 */
function getEnglishVariants(word: string): string[] {
  const variants = [word];

  if (word.endsWith('ies') && word.length > 4) variants.push(word.slice(0, -3) + 'y');
  if (word.endsWith('es') && word.length > 3) variants.push(word.slice(0, -2));
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 2) variants.push(word.slice(0, -1));

  if (word.endsWith('ing') && word.length > 4) {
    variants.push(word.slice(0, -3));
    variants.push(word.slice(0, -3) + 'e');
  }

  if (word.endsWith('ed') && word.length > 3) {
    variants.push(word.slice(0, -2));
    variants.push(word.slice(0, -1)); // e.g. arrived -> arrive
  }

  if (word.endsWith('ly') && word.length > 4) variants.push(word.slice(0, -2));
  if (word.endsWith('er') && word.length > 3) variants.push(word.slice(0, -2));

  return variants;
}

/**
 * French stemmer helper: handles plural 's', 'x', feminine 'e', etc.
 */
function getFrenchVariants(word: string): string[] {
  const variants = [word];
  if (word.endsWith('s') && word.length > 2) variants.push(word.slice(0, -1));
  if (word.endsWith('x') && word.length > 3) variants.push(word.slice(0, -1));
  if (word.endsWith('es') && word.length > 3) variants.push(word.slice(0, -2));
  if (word.endsWith('e') && word.length > 3) variants.push(word.slice(0, -1));
  if (word.endsWith('ée') && word.length > 3) variants.push(word.slice(0, -2) + 'er');
  if (word.endsWith('ées') && word.length > 4) variants.push(word.slice(0, -3) + 'er');
  if (word.endsWith('és') && word.length > 3) variants.push(word.slice(0, -2) + 'er');
  return variants;
}

const DYNAMIC_DICTIONARY: Record<string, WordEntry> = {};
const DYNAMIC_FRENCH_LOOKUP: Record<string, WordEntry> = {};

export function registerVocabulary(entries: WordEntry[]) {
  if (!entries || !Array.isArray(entries)) return;
  for (const entry of entries) {
    if (!entry) continue;
    const cleanEn = cleanWord(entry.en);
    if (cleanEn) {
      DYNAMIC_DICTIONARY[cleanEn] = entry;
    }
    const cleanFr = cleanWord(entry.fr);
    if (cleanFr) {
      DYNAMIC_FRENCH_LOOKUP[cleanFr] = entry;
    }
  }
}

/**
 * Main lookup function for any word (English or French)
 * Returns the WordEntry or a synthesized entry with Arabic meaning
 */
export function lookupWord(
  rawWord: string,
  lang: 'en' | 'fr',
  contextSentence?: string
): WordEntry | null {
  const cleaned = cleanWord(rawWord);
  if (!cleaned || cleaned.length < 1) return null;

  if (lang === 'en') {
    // 0. Dynamic dictionary match
    if (DYNAMIC_DICTIONARY[cleaned]) {
      return DYNAMIC_DICTIONARY[cleaned];
    }

    // 1. Direct match in dictionary
    if (TRILINGUAL_DICTIONARY[cleaned]) {
      return TRILINGUAL_DICTIONARY[cleaned];
    }

    // 2. Variants match (plurals, tenses)
    const variants = getEnglishVariants(cleaned);
    for (const v of variants) {
      if (TRILINGUAL_DICTIONARY[v]) {
        const found = TRILINGUAL_DICTIONARY[v];
        return {
          ...found,
          en: rawWord.trim(),
        };
      }
    }

    // 3. Check if it exists in French lookup by chance
    if (FRENCH_LOOKUP[cleaned]) {
      return FRENCH_LOOKUP[cleaned];
    }
  } else {
    // Language is French
    if (DYNAMIC_FRENCH_LOOKUP[cleaned]) {
      return DYNAMIC_FRENCH_LOOKUP[cleaned];
    }

    if (FRENCH_LOOKUP[cleaned]) {
      return FRENCH_LOOKUP[cleaned];
    }

    const variants = getFrenchVariants(cleaned);
    for (const v of variants) {
      if (FRENCH_LOOKUP[v]) {
        return FRENCH_LOOKUP[v];
      }
    }

    // Check English dictionary in case an English word appears in French
    if (TRILINGUAL_DICTIONARY[cleaned]) {
      return TRILINGUAL_DICTIONARY[cleaned];
    }
  }

  // Fallback intelligent transliteration/generic translation generator so no word is left empty
  return {
    en: lang === 'en' ? rawWord.trim() : `(en) ${rawWord.trim()}`,
    fr: lang === 'fr' ? rawWord.trim() : `(fr) ${rawWord.trim()}`,
    ar: `مُصْطَلَح: ${rawWord.trim()}`,
    type: 'mot',
    phonetic: `/${rawWord.toLowerCase()}/`,
  };
}

/**
 * Normalizes Arabic text by removing tashkeel / harakat and unifying alif variants
 */
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove diacritics
    .replace(/[\u0622\u0623\u0625]/g, '\u0627') // alif variants -> plain alif
    .replace(/\u0629/g, '\u0647') // ta marbuta -> ha
    .replace(/\u0649/g, '\u064A') // alif maqsura -> ya
    .trim()
    .toLowerCase();
}

/**
 * Normalizes Latin text by stripping diacritics / accents
 */
export function normalizeLatinText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

/**
 * Searches the trilingual dictionary for a query in English, French, or Arabic
 * Returns matching WordEntry items with relevant scoring
 */
export function searchTrilingualDictionary(query: string, maxResults = 12): WordEntry[] {
  const cleanQ = query.trim();
  if (!cleanQ) return [];

  const normLatinQ = normalizeLatinText(cleanQ);
  const normArabicQ = normalizeArabicText(cleanQ);

  const resultsMap = new Map<string, { entry: WordEntry; score: number }>();

  // Gather all unique dictionary entries
  const allEntries: WordEntry[] = [
    ...Object.values(TRILINGUAL_DICTIONARY),
    ...Object.values(FRENCH_LOOKUP),
    ...Object.values(DYNAMIC_DICTIONARY),
    ...Object.values(DYNAMIC_FRENCH_LOOKUP),
  ];

  for (const entry of allEntries) {
    if (!entry || !entry.en) continue;
    const key = entry.en.toLowerCase();

    const normEn = normalizeLatinText(entry.en);
    const normFr = normalizeLatinText(entry.fr);
    const normAr = normalizeArabicText(entry.ar);

    let score = 0;

    // 1. Exact match
    if (normEn === normLatinQ || normFr === normLatinQ || normAr === normArabicQ) {
      score = 100;
    }
    // 2. Starts with match
    else if (normEn.startsWith(normLatinQ) || normFr.startsWith(normLatinQ) || normAr.startsWith(normArabicQ)) {
      score = 75;
    }
    // 3. Substring match
    else if (normEn.includes(normLatinQ) || normFr.includes(normLatinQ) || normAr.includes(normArabicQ)) {
      score = 50;
    }

    if (score > 0) {
      const existing = resultsMap.get(key);
      if (!existing || score > existing.score) {
        resultsMap.set(key, { entry, score });
      }
    }
  }

  // If no direct static matches, try lookupWord
  if (resultsMap.size === 0) {
    // Try English lookup
    const enMatch = lookupWord(cleanQ, 'en');
    if (enMatch) {
      resultsMap.set(enMatch.en.toLowerCase(), { entry: enMatch, score: 60 });
    }
    // Try French lookup
    const frMatch = lookupWord(cleanQ, 'fr');
    if (frMatch && !resultsMap.has(frMatch.en.toLowerCase())) {
      resultsMap.set(frMatch.en.toLowerCase(), { entry: frMatch, score: 55 });
    }
  }

  // Sort by score descending and return
  const sorted = Array.from(resultsMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((item) => item.entry);

  return sorted;
}

