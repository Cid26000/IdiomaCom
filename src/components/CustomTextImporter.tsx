import React, { useState } from 'react';
import { FileUp, Sparkles, Check, ArrowRight, BookOpen } from 'lucide-react';
import { BilingualText, Level } from '../types';
import { generateCurriculumExercises } from '../data/exerciseGenerator';

interface CustomTextImporterProps {
  onImportText: (text: BilingualText) => void;
  onBackToReader: () => void;
}

export const CustomTextImporter: React.FC<CustomTextImporterProps> = ({
  onImportText,
  onBackToReader,
}) => {
  const [titleEn, setTitleEn] = useState('');
  const [titleFr, setTitleFr] = useState('');
  const [level, setLevel] = useState<Level>('B1-B2 Intermédiaire');
  const [textEn, setTextEn] = useState('');
  const [textFr, setTextFr] = useState('');

  // Sample templates for quick test
  const handleLoadSample = (type: 'travel' | 'tech') => {
    if (type === 'travel') {
      setTitleEn('A Walk Through Central Park');
      setTitleFr('Une promenade dans Central Park');
      setTextEn(
        `On a crisp autumn afternoon, Sarah decided to take a long walk through Central Park.
Golden leaves were slowly falling from the tall trees onto the stone pathways.
She paused near the famous fountain to watch a violinist playing a gentle melody.
The air was filled with the fresh smell of roasted nuts from a nearby vendor.
She realized that in the heart of this busy city, one could always find a peaceful oasis.`
      );
      setTextFr(
        `Par un après-midi d'automne vivifiant, Sarah décida de faire une longue promenade dans Central Park.
Des feuilles dorées tombaient lentement des grands arbres sur les allées de pierre.
Elle s'arrêta près de la célèbre fontaine pour regarder un violoniste jouer une douce mélodie.
L'air était empli de la bonne odeur de marrons chauds provenant d'un vendeur voisin.
Elle comprit qu'au cœur de cette ville trépidante, on pouvait toujours trouver une oasis de paix.`
      );
    } else {
      setTitleEn('The Power of Clean Energy');
      setTitleFr('La puissance de l\'énergie propre');
      setTextEn(
        `Renewable energy sources are transforming the way our modern world powers its industries.
Wind turbines stand proudly against the horizon, generating clean electricity day and night.
Solar panels on rooftops absorb sunlight and convert it into abundant electrical power.
Engineers are developing new battery technologies to store energy more efficiently for cloudy days.
Every step towards sustainability creates a cleaner and healthier future for future generations.`
      );
      setTextFr(
        `Les sources d'énergie renouvelable transforment la façon dont notre monde moderne alimente ses industries.
Des éoliennes se dressent fièrement à l'horizon, produisant de l'électricité propre jour et nuit.
Les panneaux solaires sur les toits absorbent la lumière du soleil et la convertissent en énergie abondante.
Les ingénieurs développent de nouvelles technologies de batteries pour stocker l'énergie plus efficacement.
Chaque avancée vers la durabilité façonne un avenir plus pur et plus sain pour les générations futures.`
      );
    }
  };

  const handleProcessImport = () => {
    if (!textEn.trim()) return;

    // Split English sentences
    const sentencesEn = textEn
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    // Split French sentences
    const sentencesFr = textFr
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const sentencePairs = sentencesEn.map((enSentence, idx) => {
      const frSentence = sentencesFr[idx] || enSentence;
      return {
        id: `custom-${Date.now()}-${idx}`,
        en: enSentence,
        fr: frSentence,
      };
    });

    const initialText: BilingualText = {
      id: `imported-${Date.now()}`,
      titleEn: titleEn.trim() || 'Texte Personnalisé',
      titleFr: titleFr.trim() || 'Texte Personnalisé',
      titleAr: 'نَصٌّ مُخَصَّصٌ لِلْقِرَاءَة',
      level,
      topic: 'Texte Importé',
      readTime: `${Math.max(1, Math.round(sentencesEn.length / 3))} min`,
      summaryFr: 'Texte importé par l\'utilisateur pour pratiquer la lecture bilingue avec infobulles arabes.',
      sentencePairs,
      keyVocabulary: [],
      exercises: {
        reading: [],
        listening: [],
        writing: [],
        cloze: [],
        comprehension: [],
        pairs: [],
        scramble: [],
      },
    };

    const curriculum = generateCurriculumExercises(initialText);
    const newText: BilingualText = {
      ...initialText,
      exercises: {
        ...initialText.exercises,
        reading: curriculum.reading,
        listening: curriculum.listening,
        writing: curriculum.writing,
      },
    };

    onImportText(newText);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col flex-1">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Personnalisation</span>
              <span aria-hidden="true">·</span>
              <span>Importez vos propres textes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileUp className="w-5 h-5 text-blue-600" />
              <span>Importer un Texte Bilingue</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLoadSample('travel')}
              className="text-xs px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
            >
              Exemple : Parc (A2)
            </button>
            <button
              onClick={() => handleLoadSample('tech')}
              className="text-xs px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
            >
              Exemple : Énergie (B2)
            </button>
            <button
              onClick={onBackToReader}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Retour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Title & Level Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Titre en Anglais
            </label>
            <input
              type="text"
              placeholder="ex: The Secret Garden"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Titre en Français
            </label>
            <input
              type="text"
              placeholder="ex: Le Jardin Secret"
              value={titleFr}
              onChange={(e) => setTitleFr(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Niveau estimé
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="A1-A2 Débutant">A1-A2 Débutant</option>
              <option value="B1-B2 Intermédiaire">B1-B2 Intermédiaire</option>
              <option value="C1 Avancé">C1 Avancé</option>
            </select>
          </div>
        </div>

        {/* Parallel Textareas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-blue-700 mb-1.5 flex items-center justify-between">
              <span>Colonne 1 : Texte en Anglais (1 phrase par ligne)</span>
              <span className="text-[11px] text-slate-400 font-normal">Requis</span>
            </label>
            <textarea
              rows={8}
              placeholder="Collez ici les phrases en anglais...&#10;Chaque nouvelle ligne correspondra à une phrase alignée avec la colonne française."
              value={textEn}
              onChange={(e) => setTextEn(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 font-reading leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-700 mb-1.5 flex items-center justify-between">
              <span>Colonne 2 : Texte en Français (1 phrase par ligne)</span>
              <span className="text-[11px] text-slate-400 font-normal">Miroir</span>
            </label>
            <textarea
              rows={8}
              placeholder="Collez ici les phrases équivalentes en français...&#10;Une phrase par ligne pour assurer l'alignement parfait."
              value={textFr}
              onChange={(e) => setTextFr(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 font-reading leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Dès l'importation, chaque mot survolé disposera instantanément de sa traduction en arabe.
          </p>

          <button
            disabled={!textEn.trim()}
            onClick={handleProcessImport}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <span>Ouvrir en Lecture Bilingue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
