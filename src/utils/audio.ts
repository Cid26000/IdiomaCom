/**
 * Web Speech API helper for crystal clear native pronunciation
 */

let synth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

export function speakText(
  text: string,
  lang: 'en-US' | 'en-GB' | 'fr-FR' = 'en-US',
  rate: number = 0.95
): Promise<void> {
  return new Promise((resolve) => {
    if (!synth) {
      console.warn('Speech synthesis not supported in this browser.');
      resolve();
      return;
    }

    try {
      synth.cancel(); // Stop any active speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;

      // Select high quality voice if available
      const voices = synth.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.startsWith(lang.slice(0, 2)) && (v.name.includes('Natural') || v.name.includes('Google') || v.default)
      ) || voices.find((v) => v.lang.startsWith(lang.slice(0, 2)));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      synth.speak(utterance);
    } catch {
      resolve();
    }
  });
}

export function stopSpeech(): void {
  if (synth) {
    synth.cancel();
  }
}
