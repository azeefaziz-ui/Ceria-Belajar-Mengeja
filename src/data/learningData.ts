import { LetterItem, PhonicsSoundItem, SyllableWord } from '../types';

export const MASCOT_IMAGE = '/src/assets/images/mascot_ceri_kucing_1790907238508.jpg';
export const BUKU_IMAGE = '/src/assets/images/buku_kartun_1790907253634.jpg';
export const KUDA_IMAGE = '/src/assets/images/kuda_kartun_1790907265550.jpg';
export const BAJU_IMAGE = '/src/assets/images/baju_kartun_1790907277088.jpg';

// MODUL 1: KENALI HURUF (A - Z) - Fonik Bahasa Melayu Malaysia (KSPK Prasekolah)
// Setiap konsonan disebut mengikut kaedah fonetik BM standard: 'B' -> 'be' (bukan 'bi'), 'C' -> 'ce', dsb.
export const ALPHABET_DATA: LetterItem[] = [
  {
    letter: 'A',
    letterLower: 'a',
    phoneticSpelling: 'aa',
    word: 'Ayam',
    meaning: 'Ayam berkokok',
    phonicsIntro: 'Ini huruf aa. Bunyi huruf aa ialah aa! Ayam bermula dengan bunyi aa.',
    emoji: '🐔',
    category: 'vokal',
    color: 'from-amber-400 to-orange-400'
  },
  {
    letter: 'B',
    letterLower: 'b',
    phoneticSpelling: 'be',
    word: 'Bola',
    meaning: 'Bola bulat di padang',
    phonicsIntro: 'Ini huruf be. Bunyi konsonan be ialah be! Bola bermula dengan bunyi be.',
    emoji: '⚽',
    category: 'konsonan',
    color: 'from-sky-400 to-blue-500'
  },
  {
    letter: 'C',
    letterLower: 'c',
    phoneticSpelling: 'ce',
    word: 'Cawan',
    meaning: 'Cawan minuman panas',
    phonicsIntro: 'Ini huruf ce. Bunyi konsonan ce ialah ce! Cawan bermula dengan bunyi ce.',
    emoji: '☕',
    category: 'konsonan',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    letter: 'D',
    letterLower: 'd',
    phoneticSpelling: 'de',
    word: 'Daun',
    meaning: 'Daun hijau di pokok',
    phonicsIntro: 'Ini huruf de. Bunyi konsonan de ialah de! Daun bermula dengan bunyi de.',
    emoji: '🍃',
    category: 'konsonan',
    color: 'from-green-400 to-emerald-600'
  },
  {
    letter: 'E',
    letterLower: 'e',
    phoneticSpelling: 'eh',
    word: 'Emak',
    meaning: 'Emak tersayang',
    phonicsIntro: 'Ini huruf eh. Ada dua bunyi fonik: eh untuk epal, dan e untuk emak.',
    emoji: '👩',
    category: 'vokal',
    color: 'from-purple-400 to-indigo-500'
  },
  {
    letter: 'F',
    letterLower: 'f',
    phoneticSpelling: 'fe',
    word: 'Feri',
    meaning: 'Feri belayar di laut',
    phonicsIntro: 'Ini huruf fe. Bunyi konsonan fe ialah fe! Feri bermula dengan bunyi fe.',
    emoji: '⛴️',
    category: 'konsonan',
    color: 'from-cyan-400 to-blue-600'
  },
  {
    letter: 'G',
    letterLower: 'g',
    phoneticSpelling: 'ge',
    word: 'Gajah',
    meaning: 'Gajah besar ada belalai',
    phonicsIntro: 'Ini huruf ge. Bunyi konsonan ge ialah ge! Gajah bermula dengan bunyi ge.',
    emoji: '🐘',
    category: 'konsonan',
    color: 'from-amber-400 to-yellow-500'
  },
  {
    letter: 'H',
    letterLower: 'h',
    phoneticSpelling: 'he',
    word: 'Harimau',
    meaning: 'Harimau belang gagah',
    phonicsIntro: 'Ini huruf he. Bunyi konsonan he ialah he! Harimau bermula dengan bunyi he.',
    emoji: '🐯',
    category: 'konsonan',
    color: 'from-orange-400 to-red-500'
  },
  {
    letter: 'I',
    letterLower: 'i',
    phoneticSpelling: 'ii',
    word: 'Ikan',
    meaning: 'Ikan berenang dalam air',
    phonicsIntro: 'Ini huruf ii. Bunyi vokal ii ialah ii! Ikan bermula dengan bunyi ii.',
    emoji: '🐟',
    category: 'vokal',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    letter: 'J',
    letterLower: 'j',
    phoneticSpelling: 'je',
    word: 'Jam',
    meaning: 'Jam dinding berdetik',
    phonicsIntro: 'Ini huruf je. Bunyi konsonan je ialah je! Jam bermula dengan bunyi je.',
    emoji: '⏰',
    category: 'konsonan',
    color: 'from-pink-400 to-rose-500'
  },
  {
    letter: 'K',
    letterLower: 'k',
    phoneticSpelling: 'ke',
    word: 'Kuda',
    meaning: 'Kuda berlari pantas',
    phonicsIntro: 'Ini huruf ke. Bunyi konsonan ke ialah ke! Kuda bermula dengan bunyi ke.',
    emoji: '🐴',
    category: 'konsonan',
    color: 'from-amber-500 to-orange-600'
  },
  {
    letter: 'L',
    letterLower: 'l',
    phoneticSpelling: 'le',
    word: 'Lori',
    meaning: 'Lori membawa barang',
    phonicsIntro: 'Ini huruf le. Bunyi konsonan le ialah le! Lori bermula dengan bunyi le.',
    emoji: '🚛',
    category: 'konsonan',
    color: 'from-emerald-400 to-green-600'
  },
  {
    letter: 'M',
    letterLower: 'm',
    phoneticSpelling: 'me',
    word: 'Mata',
    meaning: 'Mata untuk melihat alam',
    phonicsIntro: 'Ini huruf me. Bunyi konsonan me ialah me! Mata bermula dengan bunyi me.',
    emoji: '👀',
    category: 'konsonan',
    color: 'from-violet-400 to-purple-600'
  },
  {
    letter: 'N',
    letterLower: 'n',
    phoneticSpelling: 'ne',
    word: 'Nasi',
    meaning: 'Nasi putih makanan kita',
    phonicsIntro: 'Ini huruf ne. Bunyi konsonan ne ialah ne! Nasi bermula dengan bunyi ne.',
    emoji: '🍚',
    category: 'konsonan',
    color: 'from-lime-400 to-emerald-500'
  },
  {
    letter: 'O',
    letterLower: 'o',
    phoneticSpelling: 'oo',
    word: 'Obor',
    meaning: 'Obor api menyala terang',
    phonicsIntro: 'Ini huruf oo. Bunyi vokal oo ialah oo! Obor bermula dengan bunyi oo.',
    emoji: '🔥',
    category: 'vokal',
    color: 'from-orange-400 to-amber-600'
  },
  {
    letter: 'P',
    letterLower: 'p',
    phoneticSpelling: 'pe',
    word: 'Padi',
    meaning: 'Padi menguning di sawah',
    phonicsIntro: 'Ini huruf pe. Bunyi konsonan pe ialah pe! Padi bermula dengan bunyi pe.',
    emoji: '🌾',
    category: 'konsonan',
    color: 'from-green-500 to-teal-600'
  },
  {
    letter: 'Q',
    letterLower: 'q',
    phoneticSpelling: 'ke',
    word: 'Quran',
    meaning: 'Kitab suci al-Quran',
    phonicsIntro: 'Ini huruf ke. Bunyi huruf ke ialah ke! Quran bermula dengan bunyi ke.',
    emoji: '📖',
    category: 'konsonan',
    color: 'from-teal-400 to-cyan-600'
  },
  {
    letter: 'R',
    letterLower: 'r',
    phoneticSpelling: 're',
    word: 'Roti',
    meaning: 'Roti enak sarapan pagi',
    phonicsIntro: 'Ini huruf re. Bunyi konsonan re ialah re! Roti bermula dengan bunyi re.',
    emoji: '🍞',
    category: 'konsonan',
    color: 'from-amber-400 to-orange-500'
  },
  {
    letter: 'S',
    letterLower: 's',
    phoneticSpelling: 'se',
    word: 'Susu',
    meaning: 'Susu segar sihatkan badan',
    phonicsIntro: 'Ini huruf se. Bunyi konsonan se ialah se! Susu bermula dengan bunyi se.',
    emoji: '🥛',
    category: 'konsonan',
    color: 'from-sky-400 to-blue-600'
  },
  {
    letter: 'T',
    letterLower: 't',
    phoneticSpelling: 'te',
    word: 'Tali',
    meaning: 'Tali untuk lompat tali',
    phonicsIntro: 'Ini huruf te. Bunyi konsonan te ialah te! Tali bermula dengan bunyi te.',
    emoji: '🪢',
    category: 'konsonan',
    color: 'from-rose-400 to-red-500'
  },
  {
    letter: 'U',
    letterLower: 'u',
    phoneticSpelling: 'uu',
    word: 'Ular',
    meaning: 'Ular menjalar panjang',
    phonicsIntro: 'Ini huruf uu. Bunyi vokal uu ialah uu! Ular bermula dengan bunyi uu.',
    emoji: '🐍',
    category: 'vokal',
    color: 'from-purple-400 to-indigo-600'
  },
  {
    letter: 'V',
    letterLower: 'v',
    phoneticSpelling: 've',
    word: 'Van',
    meaning: 'Van sekolah warna jingga',
    phonicsIntro: 'Ini huruf ve. Bunyi konsonan ve ialah ve! Van bermula dengan bunyi ve.',
    emoji: '🚐',
    category: 'konsonan',
    color: 'from-blue-400 to-indigo-600'
  },
  {
    letter: 'W',
    letterLower: 'w',
    phoneticSpelling: 'we',
    word: 'Wau',
    meaning: 'Wau bulan terbang tinggi',
    phonicsIntro: 'Ini huruf we. Bunyi konsonan we ialah we! Wau bermula dengan bunyi we.',
    emoji: '🪁',
    category: 'konsonan',
    color: 'from-pink-400 to-rose-600'
  },
  {
    letter: 'X',
    letterLower: 'x',
    phoneticSpelling: 'eks',
    word: 'Xilofon',
    meaning: 'Alat muzik berbunyi ting-ting',
    phonicsIntro: 'Ini huruf eks. Bunyi huruf eks ialah eks! Xilofon bermula dengan bunyi eks.',
    emoji: '🎹',
    category: 'konsonan',
    color: 'from-teal-400 to-emerald-600'
  },
  {
    letter: 'Y',
    letterLower: 'y',
    phoneticSpelling: 'ye',
    word: 'Yoyo',
    meaning: 'Mainan yoyo turun naik',
    phonicsIntro: 'Ini huruf ye. Bunyi konsonan ye ialah ye! Yoyo bermula dengan bunyi ye.',
    emoji: '🪀',
    category: 'konsonan',
    color: 'from-amber-400 to-orange-500'
  },
  {
    letter: 'Z',
    letterLower: 'z',
    phoneticSpelling: 'ze',
    word: 'Zip',
    meaning: 'Zip baju dan seluar',
    phonicsIntro: 'Ini huruf ze. Bunyi konsonan ze ialah ze! Zip bermula dengan bunyi ze.',
    emoji: '🤐',
    category: 'konsonan',
    color: 'from-indigo-400 to-purple-600'
  }
];

// MODUL 2: BUNYI HURUF (FONIK BAHASA MELAYU MALAYSIA - KAEDAH GABUNG BUNYI)
// Sebutan konsonan mengikut standard BM: B disebut 'be' (bukan 'bi'), C -> 'ce', M -> 'me', dsb.
export const PHONICS_DATA: PhonicsSoundItem[] = [
  {
    id: 'b',
    letter: 'B',
    phoneticSpelling: 'be',
    soundDescription: '/b/ (be)',
    soundSample: 'be',
    tip: 'Rapatkan bibir dan bunyikan konsonan: be! (seperti bola melantun).',
    exampleWord: 'Bola',
    audioPrompt: 'Bunyi konsonan be. Rapatkan bibir dan bunyikan: be! be... be... bola.'
  },
  {
    id: 'm',
    letter: 'M',
    phoneticSpelling: 'me',
    soundDescription: '/m/ (me)',
    soundSample: 'me',
    tip: 'Rapatkan kedua-dua bibir: me! (seperti makanan sedap nyam nyam).',
    exampleWord: 'Mata',
    audioPrompt: 'Bunyi konsonan me. Rapatkan bibir sebut: me! me... me... mata.'
  },
  {
    id: 's',
    letter: 'S',
    phoneticSpelling: 'se',
    soundDescription: '/s/ (se)',
    soundSample: 'se',
    tip: 'Rapatkan gigi dan bunyikan: se! (seperti desisan ular).',
    exampleWord: 'Susu',
    audioPrompt: 'Bunyi konsonan se. Gigi rapat dan sebut: se! se... se... susu.'
  },
  {
    id: 't',
    letter: 'T',
    phoneticSpelling: 'te',
    soundDescription: '/t/ (te)',
    soundSample: 'te',
    tip: 'Hujung lidah ketuk gigi lelangit atas: te! (seperti jam tik-tok).',
    exampleWord: 'Tali',
    audioPrompt: 'Bunyi konsonan te. Hujung lidah ketuk lelangit: te! te... te... tali.'
  },
  {
    id: 'k',
    letter: 'K',
    phoneticSpelling: 'ke',
    soundDescription: '/k/ (ke)',
    soundSample: 'ke',
    tip: 'Bunyi di pangkal tekak kerongkong: ke! (seperti batuk).',
    exampleWord: 'Kuda',
    audioPrompt: 'Bunyi konsonan ke. Bunyi di tekak: ke! ke... ke... kuda.'
  },
  {
    id: 'p',
    letter: 'P',
    phoneticSpelling: 'pe',
    soundDescription: '/p/ (pe)',
    soundSample: 'pe',
    tip: 'Letupkan hembusan udara bibir lembut: pe! (seperti tiup lilin).',
    exampleWord: 'Padi',
    audioPrompt: 'Bunyi konsonan pe. Letupkan angin bibir: pe! pe... pe... padi.'
  },
  {
    id: 'l',
    letter: 'L',
    phoneticSpelling: 'le',
    soundDescription: '/l/ (le)',
    soundSample: 'le',
    tip: 'Hujung lidah naik sentuh lelangit: le! (seperti menyanyi la-la-la).',
    exampleWord: 'Lori',
    audioPrompt: 'Bunyi konsonan le. Lidah di lelangit: le! le... le... lori.'
  },
  {
    id: 'r',
    letter: 'R',
    phoneticSpelling: 're',
    soundDescription: '/r/ (re)',
    soundSample: 're',
    tip: 'Getarkan hujung lidah: re! (seperti enjin motosikal).',
    exampleWord: 'Roti',
    audioPrompt: 'Bunyi konsonan re. Getarkan lidah: re! re... re... roti.'
  },
  {
    id: 'd',
    letter: 'D',
    phoneticSpelling: 'de',
    soundDescription: '/d/ (de)',
    soundSample: 'de',
    tip: 'Hujung lidah ketuk belakang gigi atas: de! (seperti gendang dum-dum).',
    exampleWord: 'Daun',
    audioPrompt: 'Bunyi konsonan de. Hujung lidah ketuk: de! de... de... daun.'
  },
  {
    id: 'n',
    letter: 'N',
    phoneticSpelling: 'ne',
    soundDescription: '/n/ (ne)',
    soundSample: 'ne',
    tip: 'Bunyi dengungan melalui hidung: ne! (seperti kapal terbang).',
    exampleWord: 'Nasi',
    audioPrompt: 'Bunyi konsonan ne. Dengung hidung: ne! ne... ne... nasi.'
  },
  {
    id: 'g',
    letter: 'G',
    phoneticSpelling: 'ge',
    soundDescription: '/g/ (ge)',
    soundSample: 'ge',
    tip: 'Bunyi di kerongkong leher: ge! (seperti minum air guk-guk).',
    exampleWord: 'Gajah',
    audioPrompt: 'Bunyi konsonan ge. Di kerongkong: ge! ge... ge... gajah.'
  },
  {
    id: 'c',
    letter: 'C',
    phoneticSpelling: 'ce',
    soundDescription: '/c/ (ce)',
    soundSample: 'ce',
    tip: 'Rapatkan gigi dan lepaskan angin: ce! (seperti cengkerik).',
    exampleWord: 'Cawan',
    audioPrompt: 'Bunyi konsonan ce. Rapatkan gigi letupkan: ce! ce... ce... cawan.'
  },
  {
    id: 'a',
    letter: 'A',
    phoneticSpelling: 'aa',
    soundDescription: '/a/ (aa)',
    soundSample: 'aa',
    tip: 'Buka mulut luas-luas sebut: aa! (seperti jumpa doktor).',
    exampleWord: 'Ayam',
    audioPrompt: 'Bunyi vokal aa. Buka mulut luas: aa! aa... aa... ayam.'
  },
  {
    id: 'i',
    letter: 'I',
    phoneticSpelling: 'ii',
    soundDescription: '/i/ (ii)',
    soundSample: 'ii',
    tip: 'Senyum manis nampak gigi sebut: ii! (seperti nampak tikus comel).',
    exampleWord: 'Ikan',
    audioPrompt: 'Bunyi vokal ii. Senyum manis nampak gigi: ii! ii... ii... ikan.'
  },
  {
    id: 'u',
    letter: 'U',
    phoneticSpelling: 'uu',
    soundDescription: '/u/ (uu)',
    soundSample: 'uu',
    tip: 'Muncungkan kedua-dua bibir bulat: uu! (seperti burung hantu).',
    exampleWord: 'Ular',
    audioPrompt: 'Bunyi vokal uu. Muncungkan bibir: uu! uu... uu... ular.'
  },
  {
    id: 'e',
    letter: 'E',
    phoneticSpelling: 'eh',
    soundDescription: '/e/ (eh & e)',
    soundSample: 'eh',
    tip: 'E taling berbunyi eh (epal), E pepet berbunyi e (emak).',
    exampleWord: 'Emak',
    audioPrompt: 'Bunyi vokal eh. Ada bunyi eh untuk epal, dan e untuk emak.'
  },
  {
    id: 'o',
    letter: 'O',
    phoneticSpelling: 'oo',
    soundDescription: '/o/ (oo)',
    soundSample: 'oo',
    tip: 'Bentuk mulut bulat sebut: oo! (seperti terpegun kagum).',
    exampleWord: 'Obor',
    audioPrompt: 'Bunyi vokal oo. Bentuk mulut bulat: oo! oo... oo... obor.'
  }
];

// MODUL 3: SUKU KATA ASAS (POLA KV) - Kaedah Fonik Gabung Bunyi (KGB) Malaysia
// Menggunakan sebutan konsonan Melayu ('be', 'me', 'se', 'te', 'ke', 'pe', 'le', 're', 'ne', 'de')
export interface SyllableFamily {
  consonant: string;
  name: string;
  sampleAudio: string;
  items: {
    syllable: string;
    vowel: string;
    audioText: string;
    example: string;
  }[];
}

export const SUKU_KATA_FAMILIES: SyllableFamily[] = [
  {
    consonant: 'B',
    name: 'Keluarga Bunyi /b/ (be)',
    sampleAudio: 'Keluarga bunyi be. Gabung bunyi konsonan be dengan vokal.',
    items: [
      { syllable: 'BA', vowel: 'A', audioText: 'be... aa... ba! Mari sebut ba!', example: 'Baju' },
      { syllable: 'BE', vowel: 'E', audioText: 'be... eh... be! Mari sebut be!', example: 'Beca' },
      { syllable: 'BI', vowel: 'I', audioText: 'be... ii... bi! Mari sebut bi!', example: 'Bibir' },
      { syllable: 'BO', vowel: 'O', audioText: 'be... oo... bo! Mari sebut bo!', example: 'Bola' },
      { syllable: 'BU', vowel: 'U', audioText: 'be... uu... bu! Mari sebut bu!', example: 'Buku' }
    ]
  },
  {
    consonant: 'M',
    name: 'Keluarga Bunyi /m/ (me)',
    sampleAudio: 'Keluarga bunyi me. Gabung bunyi konsonan me dengan vokal.',
    items: [
      { syllable: 'MA', vowel: 'A', audioText: 'me... aa... ma! Mari sebut ma!', example: 'Mata' },
      { syllable: 'ME', vowel: 'E', audioText: 'me... eh... me! Mari sebut me!', example: 'Meja' },
      { syllable: 'MI', vowel: 'I', audioText: 'me... ii... mi! Mari sebut mi!', example: 'Minit' },
      { syllable: 'MO', vowel: 'O', audioText: 'me... oo... mo! Mari sebut mo!', example: 'Motor' },
      { syllable: 'MU', vowel: 'U', audioText: 'me... uu... mu! Mari sebut mu!', example: 'Muka' }
    ]
  },
  {
    consonant: 'S',
    name: 'Keluarga Bunyi /s/ (se)',
    sampleAudio: 'Keluarga bunyi se. Gabung bunyi konsonan se dengan vokal.',
    items: [
      { syllable: 'SA', vowel: 'A', audioText: 'se... aa... sa! Mari sebut sa!', example: 'Saya' },
      { syllable: 'SE', vowel: 'E', audioText: 'se... eh... se! Mari sebut se!', example: 'Sepak' },
      { syllable: 'SI', vowel: 'I', audioText: 'se... ii... si! Mari sebut si!', example: 'Siku' },
      { syllable: 'SO', vowel: 'O', audioText: 'se... oo... so! Mari sebut so!', example: 'Sofa' },
      { syllable: 'SU', vowel: 'U', audioText: 'se... uu... su! Mari sebut su!', example: 'Susu' }
    ]
  },
  {
    consonant: 'T',
    name: 'Keluarga Bunyi /t/ (te)',
    sampleAudio: 'Keluarga bunyi te. Gabung bunyi konsonan te dengan vokal.',
    items: [
      { syllable: 'TA', vowel: 'A', audioText: 'te... aa... ta! Mari sebut ta!', example: 'Tali' },
      { syllable: 'TE', vowel: 'E', audioText: 'te... eh... te! Mari sebut te!', example: 'Teksi' },
      { syllable: 'TI', vowel: 'I', audioText: 'te... ii... ti! Mari sebut ti!', example: 'Tidur' },
      { syllable: 'TO', vowel: 'O', audioText: 'te... oo... to! Mari sebut to!', example: 'Topi' },
      { syllable: 'TU', vowel: 'U', audioText: 'te... uu... tu! Mari sebut tu!', example: 'Tujuh' }
    ]
  },
  {
    consonant: 'K',
    name: 'Keluarga Bunyi /k/ (ke)',
    sampleAudio: 'Keluarga bunyi ke. Gabung bunyi konsonan ke dengan vokal.',
    items: [
      { syllable: 'KA', vowel: 'A', audioText: 'ke... aa... ka! Mari sebut ka!', example: 'Kaki' },
      { syllable: 'KE', vowel: 'E', audioText: 'ke... eh... ke! Mari sebut ke!', example: 'Kera' },
      { syllable: 'KI', vowel: 'I', audioText: 'ke... ii... ki! Mari sebut ki!', example: 'Kipas' },
      { syllable: 'KO', vowel: 'O', audioText: 'ke... oo... ko! Mari sebut ko!', example: 'Kopi' },
      { syllable: 'KU', vowel: 'U', audioText: 'ke... uu... ku! Mari sebut ku!', example: 'Kuda' }
    ]
  },
  {
    consonant: 'P',
    name: 'Keluarga Bunyi /p/ (pe)',
    sampleAudio: 'Keluarga bunyi pe. Gabung bunyi konsonan pe dengan vokal.',
    items: [
      { syllable: 'PA', vowel: 'A', audioText: 'pe... aa... pa! Mari sebut pa!', example: 'Padi' },
      { syllable: 'PE', vowel: 'E', audioText: 'pe... eh... pe! Mari sebut pe!', example: 'Peti' },
      { syllable: 'PI', vowel: 'I', audioText: 'pe... ii... pi! Mari sebut pi!', example: 'Pipi' },
      { syllable: 'PO', vowel: 'O', audioText: 'pe... oo... po! Mari sebut po!', example: 'Polis' },
      { syllable: 'PU', vowel: 'U', audioText: 'pe... uu... pu! Mari sebut pu!', example: 'Pusu' }
    ]
  },
  {
    consonant: 'L',
    name: 'Keluarga Bunyi /l/ (le)',
    sampleAudio: 'Keluarga bunyi le. Gabung bunyi konsonan le dengan vokal.',
    items: [
      { syllable: 'LA', vowel: 'A', audioText: 'le... aa... la! Mari sebut la!', example: 'Lapan' },
      { syllable: 'LE', vowel: 'E', audioText: 'le... eh... le! Mari sebut le!', example: 'Leher' },
      { syllable: 'LI', vowel: 'I', audioText: 'le... ii... li! Mari sebut li!', example: 'Lima' },
      { syllable: 'LO', vowel: 'O', audioText: 'le... oo... lo! Mari sebut lo!', example: 'Lori' },
      { syllable: 'LU', vowel: 'U', audioText: 'le... uu... lu! Mari sebut lu!', example: 'Luka' }
    ]
  },
  {
    consonant: 'R',
    name: 'Keluarga Bunyi /r/ (re)',
    sampleAudio: 'Keluarga bunyi re. Gabung bunyi konsonan re dengan vokal.',
    items: [
      { syllable: 'RA', vowel: 'A', audioText: 're... aa... ra! Mari sebut ra!', example: 'Raga' },
      { syllable: 'RE', vowel: 'E', audioText: 're... eh... re! Mari sebut re!', example: 'Rehat' },
      { syllable: 'RI', vowel: 'I', audioText: 're... ii... ri! Mari sebut ri!', example: 'Ribu' },
      { syllable: 'RO', vowel: 'O', audioText: 're... oo... ro! Mari sebut ro!', example: 'Roti' },
      { syllable: 'RU', vowel: 'U', audioText: 're... uu... ru! Mari sebut ru!', example: 'Rusa' }
    ]
  },
  {
    consonant: 'N',
    name: 'Keluarga Bunyi /n/ (ne)',
    sampleAudio: 'Keluarga bunyi ne. Gabung bunyi konsonan ne dengan vokal.',
    items: [
      { syllable: 'NA', vowel: 'A', audioText: 'ne... aa... na! Mari sebut na!', example: 'Nasi' },
      { syllable: 'NE', vowel: 'E', audioText: 'ne... eh... ne! Mari sebut ne!', example: 'Nenek' },
      { syllable: 'NI', vowel: 'I', audioText: 'ne... ii... ni! Mari sebut ni!', example: 'Nila' },
      { syllable: 'NO', vowel: 'O', audioText: 'ne... oo... no! Mari sebut no!', example: 'Nombor' },
      { syllable: 'NU', vowel: 'U', audioText: 'ne... uu... nu! Mari sebut nu!', example: 'Nusa' }
    ]
  },
  {
    consonant: 'D',
    name: 'Keluarga Bunyi /d/ (de)',
    sampleAudio: 'Keluarga bunyi de. Gabung bunyi konsonan de dengan vokal.',
    items: [
      { syllable: 'DA', vowel: 'A', audioText: 'de... aa... da! Mari sebut da!', example: 'Dada' },
      { syllable: 'DE', vowel: 'E', audioText: 'de... eh... de! Mari sebut de!', example: 'Dua' },
      { syllable: 'DI', vowel: 'I', audioText: 'de... ii... di! Mari sebut di!', example: 'Diri' },
      { syllable: 'DO', vowel: 'O', audioText: 'de... oo... do! Mari sebut do!', example: 'Doktor' },
      { syllable: 'DU', vowel: 'U', audioText: 'de... uu... du! Mari sebut du!', example: 'Duit' }
    ]
  }
];

// MODUL 4, 5 & 6: GABUNG SUKU KATA & BACA & EJA (Fonik Malaysia)
export const CORE_WORDS: SyllableWord[] = [
  {
    id: 'buku',
    word: 'BUKU',
    syllables: ['BU', 'KU'],
    syllableColors: ['#2563eb', '#e11d48'],
    meaning: 'Buku cerita saya suka baca',
    sentence: 'Ini buku cerita adik.',
    image: BUKU_IMAGE,
    emoji: '📚'
  },
  {
    id: 'kuda',
    word: 'KUDA',
    syllables: ['KU', 'DA'],
    syllableColors: ['#d97706', '#059669'],
    meaning: 'Kuda gagah pandai berlari laju',
    sentence: 'Kuda ini lari sangat laju.',
    image: KUDA_IMAGE,
    emoji: '🐴'
  },
  {
    id: 'baju',
    word: 'BAJU',
    syllables: ['BA', 'JU'],
    syllableColors: ['#0284c7', '#7c3aed'],
    meaning: 'Baju baharu warna warni',
    sentence: 'Adik pakai baju cantik.',
    image: BAJU_IMAGE,
    emoji: '👕'
  },
  {
    id: 'bola',
    word: 'BOLA',
    syllables: ['BO', 'LA'],
    syllableColors: ['#2563eb', '#16a34a'],
    meaning: 'Bola bulat sepak di padang',
    sentence: 'Abang sepak bola ke gol.',
    emoji: '⚽'
  },
  {
    id: 'mata',
    word: 'MATA',
    syllables: ['MA', 'TA'],
    syllableColors: ['#db2777', '#0284c7'],
    meaning: 'Mata melihat alam ciptaan tuhan',
    sentence: 'Saya ada dua mata yang comel.',
    emoji: '👀'
  },
  {
    id: 'kaki',
    word: 'KAKI',
    syllables: ['KA', 'KI'],
    syllableColors: ['#d97706', '#2563eb'],
    meaning: 'Kaki untuk berjalan dan melompat',
    sentence: 'Kaki adik kuat melompat tinggi.',
    emoji: '🦶'
  },
  {
    id: 'susu',
    word: 'SUSU',
    syllables: ['SU', 'SU'],
    syllableColors: ['#0284c7', '#ec4899'],
    meaning: 'Susu segar sihatkan badan',
    sentence: 'Setiap pagi adik minum susu.',
    emoji: '🥛'
  },
  {
    id: 'roti',
    word: 'ROTI',
    syllables: ['RO', 'TI'],
    syllableColors: ['#b45309', '#e11d48'],
    meaning: 'Roti bakar enak disapu jem',
    sentence: 'Ibu bakar roti enak untuk sarapan.',
    emoji: '🍞'
  },
  {
    id: 'baca',
    word: 'BACA',
    syllables: ['BA', 'CA'],
    syllableColors: ['#2563eb', '#059669'],
    meaning: 'Membaca buku jambatan ilmu',
    sentence: 'Mari kita baca buku cerita.',
    emoji: '📖'
  },
  {
    id: 'meja',
    word: 'MEJA',
    syllables: ['ME', 'JA'],
    syllableColors: ['#7c3aed', '#d97706'],
    meaning: 'Meja belajar kemas dan bersih',
    sentence: 'Buku tersusun di atas meja.',
    emoji: '🪑'
  },
  {
    id: 'tali',
    word: 'TALI',
    syllables: ['TA', 'LI'],
    syllableColors: ['#e11d48', '#2563eb'],
    meaning: 'Tali skipping bermain petang',
    sentence: 'Kakak main lompat tali di halaman.',
    emoji: '🪢'
  },
  {
    id: 'padi',
    word: 'PADI',
    syllables: ['PA', 'DI'],
    syllableColors: ['#65a30d', '#d97706'],
    meaning: 'Padi kuning keemasan di bendang',
    sentence: 'Pokok padi tumbuh subur di Kedah.',
    emoji: '🌾'
  },
  {
    id: 'gigi',
    word: 'GIGI',
    syllables: ['GI', 'GI'],
    syllableColors: ['#0284c7', '#059669'],
    meaning: 'Gigi putih bersih digosok selalu',
    sentence: 'Gigi adik putih dan bersih.',
    emoji: '🦷'
  },
  {
    id: 'lori',
    word: 'LORI',
    syllables: ['LO', 'RI'],
    syllableColors: ['#e11d48', '#d97706'],
    meaning: 'Lori besar bawa muatan pasir',
    sentence: 'Lori bergerak perlahan di jalan raya.',
    emoji: '🚛'
  }
];

// Assessment Quiz Questions (Modul 8 - Fonik Malaysia)
export interface QuizQuestion {
  id: string;
  type: 'identify_word' | 'missing_syllable' | 'audio_to_picture';
  promptText: string;
  audioPrompt: string;
  targetWord?: string;
  missingPart?: string;
  options: {
    id: string;
    text: string;
    emoji?: string;
    image?: string;
  }[];
  correctOptionId: string;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'identify_word',
    promptText: 'Manakah perkataan bagi gambar ini? 📚',
    audioPrompt: 'Manakah perkataan bagi gambar buku? Bunyikan: be-uu bu, ke-uu ku... buku.',
    options: [
      { id: 'buku', text: 'BUKU' },
      { id: 'baju', text: 'BAJU' },
      { id: 'bola', text: 'BOLA' }
    ],
    correctOptionId: 'buku',
    explanation: 'Tepat! Suku kata bu tambah ku menjadi buku. Bijak adik!'
  },
  {
    id: 'q2',
    type: 'missing_syllable',
    promptText: 'Lengkapkan perkataan untuk gambar 🐴: KU + [ ? ] = KUDA',
    audioPrompt: 'Lengkapkan perkataan kuda. Bunyi ku tambah apa jadi kuda? de-aa da!',
    options: [
      { id: 'da', text: 'DA' },
      { id: 'ta', text: 'TA' },
      { id: 'la', text: 'LA' }
    ],
    correctOptionId: 'da',
    explanation: 'Suku kata ku tambah da menjadi kuda! Pandainya adik!'
  },
  {
    id: 'q3',
    type: 'audio_to_picture',
    promptText: 'Dengar sebutan fonik dan pilih gambar yang betul: "ROTI"',
    audioPrompt: 'Dengar fonik: re-oo ro, te-ii ti... roti. Mana satu gambar roti?',
    options: [
      { id: 'susu', text: 'SUSU', emoji: '🥛' },
      { id: 'roti', text: 'ROTI', emoji: '🍞' },
      { id: 'mata', text: 'MATA', emoji: '👀' }
    ],
    correctOptionId: 'roti',
    explanation: 'Betul, roti bakar yang sedap! Hebat adik!'
  },
  {
    id: 'q4',
    type: 'identify_word',
    promptText: 'Gabungkan suku kata: BO + LA = ?',
    audioPrompt: 'Gabung bunyi: be-oo bo, tambah le-aa la... jadi apa?',
    options: [
      { id: 'baca', text: 'BACA' },
      { id: 'bola', text: 'BOLA' },
      { id: 'baju', text: 'BAJU' }
    ],
    correctOptionId: 'bola',
    explanation: 'Suku kata bo tambah la menjadi bola! Terbaik!'
  },
  {
    id: 'q5',
    type: 'missing_syllable',
    promptText: 'Lengkapkan suku kata untuk gambar 👕: [ ? ] + JU = BAJU',
    audioPrompt: 'Lengkapkan perkataan baju. Suku kata apa tambah ju jadi baju? be-aa ba!',
    options: [
      { id: 'ba', text: 'BA' },
      { id: 'ma', text: 'MA' },
      { id: 'su', text: 'SU' }
    ],
    correctOptionId: 'ba',
    explanation: 'Suku kata ba tambah ju menjadi baju! Tahniah adik bintang suku kata!'
  }
];
