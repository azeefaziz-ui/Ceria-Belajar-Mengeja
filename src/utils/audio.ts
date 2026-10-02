// Audio synthesis and sound effects using Web Audio API and Web Speech API (Bahasa Melayu Malaysia)

class SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Cheerful tactile pop for clicking letters & syllables
  playPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // ignore audio errors
    }
  }

  // Balloon pop sound
  playBalloonPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // ignore
    }
  }

  // Joyful ascending chime for correct answers: C5, E5, G5, C6
  playSuccess() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch {
      // ignore
    }
  }

  // Syllable blend magnet slide chime
  playBlend() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.25);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // ignore
    }
  }

  // Star celebration sparkle
  playStarEarned() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [659.25, 830.61, 987.77, 1318.51];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(start);
        osc.stop(start + 0.36);
      });
    } catch {
      // ignore
    }
  }

  // Fanfare for module completion
  playFanfare() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [
        { f: 523.25, t: 0, d: 0.15 },
        { f: 523.25, t: 0.15, d: 0.15 },
        { f: 523.25, t: 0.30, d: 0.15 },
        { f: 659.25, t: 0.45, d: 0.35 },
        { f: 783.99, t: 0.80, d: 0.45 },
      ];
      const now = this.ctx.currentTime;

      notes.forEach(({ f, t, d }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = now + t;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.3, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, start + d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(start);
        osc.stop(start + d + 0.05);
      });
    } catch {
      // ignore
    }
  }
}

export const sounds = new SoundEngine();

// Peta Sebutan Fonik Bahasa Melayu Standard (KSPK / Kaedah Fonik Gabung Bunyi)
// 'B' disebut sebagai bunyi konsonan 'be' bukan 'bi', 'C' -> 'ce', 'D' -> 'de', dsb.
export const MALAY_PHONETIC_LETTER_MAP: Record<string, string> = {
  B: 'be',
  b: 'be',
  C: 'ce',
  c: 'ce',
  D: 'de',
  d: 'de',
  F: 'fe',
  f: 'fe',
  G: 'ge',
  g: 'ge',
  H: 'he',
  h: 'he',
  J: 'je',
  j: 'je',
  K: 'ke',
  k: 'ke',
  L: 'le',
  l: 'le',
  M: 'me',
  m: 'me',
  N: 'ne',
  n: 'ne',
  P: 'pe',
  p: 'pe',
  Q: 'ke',
  q: 'ke',
  R: 're',
  r: 're',
  S: 'se',
  s: 'se',
  T: 'te',
  t: 'te',
  V: 've',
  v: 've',
  W: 'we',
  w: 'we',
  X: 'eks',
  x: 'eks',
  Y: 'ye',
  y: 'ye',
  Z: 'ze',
  z: 'ze',
  A: 'aa',
  a: 'aa',
  I: 'ii',
  i: 'ii',
  U: 'uu',
  u: 'uu',
  E: 'eh',
  e: 'eh',
  O: 'oo',
  o: 'oo'
};

export function getMalayLetterSound(letter: string): string {
  return MALAY_PHONETIC_LETTER_MAP[letter] || letter.toLowerCase();
}

// Convert text to authentic Malay phonics speech string
// Ensures standalone capital letters like 'B', 'M', 'S' are pronounced as 'be', 'me', 'se' (NOT 'bi', 'em', 'es')
// And uppercase words like 'BUKU' become lowercase 'buku' so speech synthesis reads as words instead of spelling
export function formatMalayPhonetics(rawText: string): string {
  let text = rawText;

  // Replace phrases like "huruf B", "bunyi B", "keluarga B", "sebut B", "huruf [A-Z]"
  text = text.replace(/\b([A-Z])\s*\+\s*([A-Z])\s*=\s*([A-Za-z]+)/g, (_, c, v, res) => {
    const cSound = MALAY_PHONETIC_LETTER_MAP[c] || c.toLowerCase();
    const vSound = MALAY_PHONETIC_LETTER_MAP[v] || v.toLowerCase();
    return `${cSound}, ${vSound}, ${res.toLowerCase()}`;
  });

  // Standalone single capital letters (e.g. " B ", " B.", " B,", "huruf B")
  // Replace with phonetic sound e.g. 'be', 'ce', 'de', 'aa'
  text = text.replace(/(?:^|\s|\b)([B-DF-HJ-NP-TV-Z])(?:\b|\s|[.,!?]|$)/g, (match, letter) => {
    const sound = MALAY_PHONETIC_LETTER_MAP[letter];
    return sound ? match.replace(letter, sound) : match;
  });

  // Convert standalone vowels A, I, U, O, E when isolated to phonetic vowels
  text = text.replace(/(?:^|\s|\b)([AIUOE])(?:\b|\s|[.,!?]|$)/g, (match, vowel) => {
    const sound = MALAY_PHONETIC_LETTER_MAP[vowel];
    return sound ? match.replace(vowel, sound) : match;
  });

  // Convert ALL-CAPS words of 2+ letters (e.g. BUKU, BOLA, BACA, BA, BE, BI) to lowercase
  // so SpeechSynthesis pronounces them smoothly as Malay syllables/words instead of spelling
  text = text.replace(/\b[A-Z]{2,}\b/g, (match) => match.toLowerCase());

  return text;
}

// Web Speech API for Bahasa Melayu Malaysia voice synthesis
export function speakMalay(text: string, options?: { speed?: 'slow' | 'normal'; onEnd?: () => void }) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (options?.onEnd) options.onEnd();
    return;
  }

  // Cancel any running speech
  window.speechSynthesis.cancel();

  // Preprocess text to ensure authentic Malaysian phonetics
  const phoneticText = formatMalayPhonetics(text);

  const utterance = new SpeechSynthesisUtterance(phoneticText);
  
  // Prioritize Malaysian Malay (ms-MY) first, then generic Malay (ms), then fallback
  const voices = window.speechSynthesis.getVoices();
  const malayVoice =
    voices.find(v => v.lang === 'ms-MY' || v.lang === 'ms_MY') ||
    voices.find(v => v.lang.startsWith('ms')) ||
    voices.find(v => v.name.toLowerCase().includes('malaysia') || v.name.toLowerCase().includes('melayu')) ||
    voices.find(v => v.lang.startsWith('id') || v.name.toLowerCase().includes('indonesia'));

  if (malayVoice) {
    utterance.voice = malayVoice;
    utterance.lang = malayVoice.lang;
  } else {
    utterance.lang = 'ms-MY';
  }

  // Speed tuned for Malaysian preschool clarity (KSPK 5-6 years)
  utterance.rate = options?.speed === 'slow' ? 0.70 : 0.82;
  utterance.pitch = 1.12; // warm, friendly tone for children

  if (options?.onEnd) {
    utterance.onend = () => {
      options.onEnd?.();
    };
    utterance.onerror = () => {
      options.onEnd?.();
    };
  }

  window.speechSynthesis.speak(utterance);
}

// Dedicated helper to pronounce a single letter phonetically in Bahasa Melayu Malaysia
export function speakMalayLetterSound(letter: string, wordExample?: string) {
  const sound = getMalayLetterSound(letter);
  if (wordExample) {
    speakMalay(`Huruf ${sound}... ${sound}... ${wordExample.toLowerCase()}!`);
  } else {
    speakMalay(`Huruf ${sound}... ${sound}!`);
  }
}

// Dedicated helper to pronounce a syllable phonetically
export function speakMalaySyllable(syllable: string) {
  speakMalay(syllable.toLowerCase());
}

// Stop current speech
export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Browser speech recognition check
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

// Speech recognition helper for "Cuba Sebut" in Bahasa Melayu Malaysia
export function startVoiceRecognition(
  expectedPhrase: string,
  onResult: (heard: string, isMatch: boolean) => void,
  onError: (error: string) => void,
  onListeningStateChange?: (isListening: boolean) => void
): () => void {
  if (!isSpeechRecognitionSupported()) {
    onError('Pelayar anda tidak menyokong pengecaman suara.');
    return () => {};
  }

  const SpeechRecognitionConstructor =
    (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

  const recognition = new SpeechRecognitionConstructor();
  recognition.lang = 'ms-MY'; // Strictly Malaysian Malay
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;

  let stopped = false;

  recognition.onstart = () => {
    if (onListeningStateChange) onListeningStateChange(true);
  };

  recognition.onresult = (event: any) => {
    if (onListeningStateChange) onListeningStateChange(false);
    const results = event.results[0];
    const heard = results[0].transcript.toLowerCase().trim();
    const expected = expectedPhrase.toLowerCase().trim();
    const expectedSound = getMalayLetterSound(expectedPhrase).toLowerCase();

    // Check exact or partial phonetic match in BM
    const isMatch =
      heard === expected ||
      heard === expectedSound ||
      heard.includes(expected) ||
      heard.includes(expectedSound) ||
      expected.includes(heard) ||
      heard.replace(/\s+/g, '') === expected.replace(/\s+/g, '');

    onResult(heard, isMatch);
  };

  recognition.onerror = (event: any) => {
    if (onListeningStateChange) onListeningStateChange(false);
    if (!stopped) {
      onError(event.error || 'Tidak dapat mendengar suara.');
    }
  };

  recognition.onend = () => {
    if (onListeningStateChange) onListeningStateChange(false);
  };

  try {
    recognition.start();
  } catch (err: any) {
    onError(err.message || 'Gagal memulakan mikrofon.');
  }

  return () => {
    stopped = true;
    try {
      recognition.stop();
    } catch {
      // ignore
    }
  };
}
