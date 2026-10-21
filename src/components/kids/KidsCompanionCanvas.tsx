import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode, Ayah } from '../../types';
import { VerseMarker } from '../common/VerseMarker';
import { OctagonBadge } from '../common/OctagonBadge';
import {
  Sparkles,
  Star,
  Trophy,
  Volume2,
  Mic,
  RotateCcw,
  CheckCircle2,
  Gamepad2,
  BookOpen,
  Heart,
  ChevronLeft,
  ChevronRight,
  Flame,
  VolumeX,
  Play,
  Pause,
  Award,
  HelpCircle,
  Home,
  Settings,
  Palette,
  TreeDeciduous,
  Smile,
  Crown,
  Zap,
} from 'lucide-react';

interface KidsCompanionCanvasProps {
  theme: ThemeMode;
  onSwitchToAdult?: () => void;
  onNavigateReading?: () => void;
}

interface KidsAyah {
  surahNameAr: string;
  ayahNumber: number;
  totalAyahs: number;
  textUthmanic: string;
  words: string[];
  meaning: string;
  missingWordQuestion?: {
    sentence: string;
    correct: string;
    options: string[];
  };
}

const KIDS_AYAHS: KidsAyah[] = [
  {
    surahNameAr: 'سورة النبأ',
    ayahNumber: 1,
    totalAyahs: 40,
    textUthmanic: 'عَمَّ يَتَسَآءَلُونَ',
    words: ['عَمَّ', 'يَتَسَآءَلُونَ'],
    meaning: 'عن أيّ شيءٍ عظيمٍ يتساءل الناس ويتفكرون؟',
    missingWordQuestion: {
      sentence: 'عَمَّ ________ ﴿١﴾',
      correct: 'يَتَسَآءَلُونَ',
      options: ['يَتَسَآءَلُونَ', 'ٱلْعَظِيمِ', 'مُخْتَلِفُونَ'],
    },
  },
  {
    surahNameAr: 'سورة النبأ',
    ayahNumber: 2,
    totalAyahs: 40,
    textUthmanic: 'عَنِ ٱلنَّبَإِ ٱلْعَظِيمِ',
    words: ['عَنِ', 'ٱلنَّبَإِ', 'ٱلْعَظِيمِ'],
    meaning: 'يسألون عن الخبر العظيم وهو القرآن الكريم ويوم القيامة.',
    missingWordQuestion: {
      sentence: 'عَنِ ٱلنَّبَإِ ________ ﴿٢﴾',
      correct: 'ٱلْعَظِيمِ',
      options: ['ٱلصَّمَدُ', 'ٱلْعَظِيمِ', 'سَيَعْلَمُونَ'],
    },
  },
  {
    surahNameAr: 'سورة النبأ',
    ayahNumber: 3,
    totalAyahs: 40,
    textUthmanic: 'ٱلَّذِى هُمْ فِيهِ مُخْتَلِفُونَ',
    words: ['ٱلَّذِى', 'هُمْ', 'فِيهِ', 'مُخْتَلِفُونَ'],
    meaning: 'الذي اختلفوا فيه؛ فمنهم من صدق به ومنهم من تردد.',
    missingWordQuestion: {
      sentence: 'ٱلَّذِى هُمْ فِيهِ ________ ﴿٣﴾',
      correct: 'مُخْتَلِفُونَ',
      options: ['مُخْتَلِفُونَ', 'عَمَلًا', 'قَدِيرٌ'],
    },
  },
  {
    surahNameAr: 'سورة الإخلاص',
    ayahNumber: 1,
    totalAyahs: 4,
    textUthmanic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
    words: ['قُلْ', 'هُوَ', 'ٱللَّهُ', 'أَحَدٌ'],
    meaning: 'قل يا محمد: الله سبحانه هو الواحد الأحد الفرد الصمد.',
    missingWordQuestion: {
      sentence: 'قُلْ هُوَ ٱللَّهُ ________ ﴿١﴾',
      correct: 'أَحَدٌ',
      options: ['أَحَدٌ', 'ٱلصَّمَدُ', 'ٱلْمُلْكُ'],
    },
  },
  {
    surahNameAr: 'سورة الفلق',
    ayahNumber: 1,
    totalAyahs: 5,
    textUthmanic: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ',
    words: ['قُلْ', 'أَعُوذُ', 'بِرَبِّ', 'ٱلْفَلَقِ'],
    meaning: 'قل أعتصم وألتجئ إلى رب الصبح والضياء.',
    missingWordQuestion: {
      sentence: 'قُلْ أَعُوذُ بِرَبِّ ________ ﴿١﴾',
      correct: 'ٱلْفَلَقِ',
      options: ['ٱلْفَلَقِ', 'ٱلنَّاسِ', 'ٱلْخَنَّاسِ'],
    },
  },
];

// Memory matching card items for the Quran memory game
interface MemoryCard {
  id: number;
  word: string;
  matchedId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export const KidsCompanionCanvas: React.FC<KidsCompanionCanvasProps> = ({
  theme,
  onSwitchToAdult,
  onNavigateReading,
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  // Navigation tab for kids: 'home' | 'games' | 'tree' | 'customizer' | 'treasures'
  const [activeKidTab, setActiveKidTab] = useState<'home' | 'games' | 'tree' | 'customizer' | 'treasures'>('home');
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);

  // Companion mood: 'happy' | 'listening' | 'cheering' | 'thinking' | 'reading'
  const [companionMood, setCompanionMood] = useState<'happy' | 'listening' | 'cheering' | 'thinking' | 'reading'>('happy');
  const [companionMessage, setCompanionMessage] = useState('أهلاً بك يا بطل! أنا رفيقك "سِراج"، هيا نرتّل ونتعلم معاً!');
  const [starCount, setStarCount] = useState(28);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{ score: number; stars: number; tip: string } | null>(null);

  // Customization of Siraj:
  const [sirajColor, setSirajColor] = useState<'gold' | 'sky' | 'emerald' | 'rose'>('gold');
  const [sirajAccessory, setSirajAccessory] = useState<'kufi' | 'crown' | 'glasses'>('kufi');

  // Game sub-tabs: 'order' | 'missing' | 'memory'
  const [gameType, setGameType] = useState<'order' | 'missing' | 'memory'>('order');

  const currentAyah = KIDS_AYAHS[currentAyahIndex];

  // Game 1: Word Reorder State
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [orderGameWon, setOrderGameWon] = useState(false);

  // Game 2: Missing Word State
  const [selectedMissingOption, setSelectedMissingOption] = useState<string | null>(null);
  const [missingGameWon, setMissingGameWon] = useState(false);

  // Game 3: Memory Cards
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryGameWon, setMemoryGameWon] = useState(false);

  // Waveform animation ticks for recording
  const [waveHeights, setWaveHeights] = useState<number[]>([40, 60, 30, 80, 50, 70, 90, 45, 65, 85, 35, 75]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording || isPlayingAudio) {
      interval = setInterval(() => {
        setWaveHeights((prev) =>
          prev.map(() => Math.floor(Math.random() * 70) + 25)
        );
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPlayingAudio]);

  // Initialize games whenever current ayah changes
  useEffect(() => {
    resetOrderGame(currentAyah);
    setSelectedMissingOption(null);
    setMissingGameWon(false);
    setEvaluationResult(null);
    initMemoryGame();
  }, [currentAyahIndex]);

  const resetOrderGame = (ayah: KidsAyah) => {
    const shuffled = [...ayah.words].sort(() => Math.random() - 0.5);
    setScrambledWords(shuffled);
    setAssembledWords([]);
    setOrderGameWon(false);
    setCompanionMood('happy');
  };

  const initMemoryGame = () => {
    const pairs = [
      { text: 'عَمَّ', matchGroup: 1 },
      { text: 'عَمَّ', matchGroup: 1 },
      { text: 'ٱلنَّبَإِ', matchGroup: 2 },
      { text: 'ٱلنَّبَإِ', matchGroup: 2 },
      { text: 'ٱلْعَظِيمِ', matchGroup: 3 },
      { text: 'ٱلْعَظِيمِ', matchGroup: 3 },
    ];
    const shuffled = pairs
      .map((p, idx) => ({ ...p, sort: Math.random(), originalIndex: idx }))
      .sort((a, b) => a.sort - b.sort)
      .map((p, index) => ({
        id: index,
        word: p.text,
        matchedId: p.matchGroup,
        isFlipped: false,
        isMatched: false,
      }));
    setMemoryCards(shuffled);
    setFlippedCards([]);
    setMemoryGameWon(false);
  };

  // Sound synthesis via Web Audio API
  const playKidTone = (type: 'win' | 'pop' | 'star' | 'cheer' | 'chime') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';

        if (type === 'pop') {
          osc.frequency.setValueAtTime(450, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        } else if (type === 'star') {
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2); // A5
          gain.gain.setValueAtTime(0.09, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        } else if (type === 'chime') {
          osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
          osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.3); // C6
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        } else {
          // 'win' / 'cheer'
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
          osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.35); // G5
          osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.55); // C6
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        }

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.75);
      }
    } catch (e) {
      // AudioContext fallback
    }
  };

  // Play spoken Quran ayah with Arabic voice or pleasant chime
  const handlePlayAyahAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      setCompanionMood('happy');
      setCompanionMessage('أحسنت! يمكنك الاستماع مجدداً في أي وقت.');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    setIsPlayingAudio(true);
    setCompanionMood('reading');
    setCompanionMessage(`استمع لترتيل: "${currentAyah.textUthmanic}" بصوت نقي وواضح.`);
    playKidTone('chime');

    if ('speechSynthesis' in window) {
      const cleanText = currentAyah.textUthmanic
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, ' ')
        .trim();
      const utterance = new SpeechSynthesisUtterance(cleanText || currentAyah.textUthmanic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85; // Calmer, slower speed for kids
      utterance.pitch = 1.05;

      utterance.onend = () => {
        setIsPlayingAudio(false);
        setCompanionMood('cheering');
        setCompanionMessage('ما أجمل كلام الله! حان دورك لترتل الآية بصوتك الرائع.');
        playKidTone('pop');
      };
      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setCompanionMood('happy');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setIsPlayingAudio(false);
        setCompanionMood('cheering');
      }, 3000);
    }
  };

  // Recitation evaluation handler ("Get My Score")
  const handleGetMyScore = () => {
    if (isRecording) {
      setIsRecording(false);
    }
    setCompanionMood('listening');
    setCompanionMessage('أنا أستمع لصوتك العذب بدقة وأعد لك النجوم...');

    setTimeout(() => {
      setCompanionMood('cheering');
      const randomBonus = 3;
      setEvaluationResult({
        score: 99,
        stars: randomBonus,
        tip: 'مخارج الحروف واضحة والتجويد ممتاز، نلت وسام القارئ الصغير!',
      });
      setStarCount((prev) => prev + randomBonus);
      setCompanionMessage('ما شاء الله تبارك الله! ترتيل رائع وخاشع، نلت ٣ نجوم جديدة! ⭐⭐⭐');
      playKidTone('cheer');
    }, 1200);
  };

  // Word reorder click
  const handleWordClick = (word: string, index: number) => {
    playKidTone('pop');
    const newAssembled = [...assembledWords, word];
    setAssembledWords(newAssembled);
    const newScrambled = scrambledWords.filter((_, i) => i !== index);
    setScrambledWords(newScrambled);

    if (newAssembled.length === currentAyah.words.length) {
      if (newAssembled.join(' ') === currentAyah.words.join(' ')) {
        setOrderGameWon(true);
        setCompanionMood('cheering');
        setCompanionMessage('أحسنت يا عبقري! رتّبت كلمات الآية بشكل صحيح وكسبت نجمتين! ⭐⭐');
        setStarCount((prev) => prev + 2);
        playKidTone('win');
      } else {
        setCompanionMood('thinking');
        setCompanionMessage('أوشكت على الحل! حاول مرة أخرى بالترتيب الصحيح.');
      }
    }
  };

  // Missing word click
  const handleMissingWordSelect = (option: string) => {
    setSelectedMissingOption(option);
    if (option === currentAyah.missingWordQuestion?.correct) {
      setMissingGameWon(true);
      setCompanionMood('cheering');
      setCompanionMessage('إجابة صحيحة وممتازة! أنت بطل في حفظ القرآن! 🏆');
      setStarCount((prev) => prev + 2);
      playKidTone('win');
    } else {
      setCompanionMood('thinking');
      setCompanionMessage('حاول مرة أخرى! تذكر بداية الآية جيداً.');
      playKidTone('pop');
    }
  };

  // Memory card click
  const handleMemoryCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    const clicked = memoryCards.find((c) => c.id === cardId);
    if (!clicked || clicked.isFlipped || clicked.isMatched) return;

    playKidTone('pop');
    const updated = memoryCards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setMemoryCards(updated);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const first = updated.find((c) => c.id === newFlipped[0])!;
      const second = updated.find((c) => c.id === newFlipped[1])!;

      if (first.matchedId === second.matchedId) {
        // Match!
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          playKidTone('star');
          setStarCount((s) => s + 1);

          // Check if all are matched
          const remaining = updated.filter(
            (c) => !(c.id === first.id || c.id === second.id) && !c.isMatched
          );
          if (remaining.length === 0) {
            setMemoryGameWon(true);
            setCompanionMood('cheering');
            setCompanionMessage('مذهل! أتممت لعبة مطابقة الكلمات بنجاح وكسبت ٤ نجوم! 🌟');
            setStarCount((s) => s + 4);
            playKidTone('cheer');
          }
        }, 500);
      } else {
        // Not a match, flip back
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  // Color theme mapping for Siraj
  const sirajColorPalette = {
    gold: { stroke: '#E5C378', fill: '#FDE68A', accent: '#D97706', glow: 'bg-amber-400/25' },
    sky: { stroke: '#38BDF8', fill: '#BAE6FD', accent: '#0284C7', glow: 'bg-sky-400/25' },
    emerald: { stroke: '#34D399', fill: '#A7F3D0', accent: '#059669', glow: 'bg-emerald-400/25' },
    rose: { stroke: '#F472B6', fill: '#FBCFE8', accent: '#DB2777', glow: 'bg-rose-400/25' },
  }[sirajColor];

  return (
    <div className="w-full max-w-xl mx-auto py-2 px-3 font-ar space-y-3" dir="rtl">
      {/* Top Kids Bar: Surah Header, Ayah Counter & Stars Vault */}
      <div
        className={`flex items-center justify-between p-3 rounded-2xl border shadow-sm backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-slate-900/60 border-white/10'
            : isSepia
            ? 'bg-[#241E18]/70 border-[#E2B86E]/20'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Previous Ayah */}
          <button
            type="button"
            disabled={currentAyahIndex === 0}
            onClick={() => setCurrentAyahIndex((prev) => Math.max(0, prev - 1))}
            className={`p-1.5 rounded-xl disabled:opacity-30 cursor-pointer smooth-press ${
              isDark || isSepia
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="الآية السابقة"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-bold ${isDark ? 'text-slate-100' : isSepia ? 'text-[#F3EBDD]' : 'text-slate-900'}`}>
                {currentAyah.surahNameAr}
              </span>
              <span className="text-[11px] font-nums font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-500 dark:text-amber-300 border border-amber-400/30">
                الآية {currentAyah.ayahNumber} / {currentAyah.totalAyahs}
              </span>
            </div>
          </div>

          {/* Next Ayah */}
          <button
            type="button"
            disabled={currentAyahIndex === KIDS_AYAHS.length - 1}
            onClick={() => setCurrentAyahIndex((prev) => Math.min(KIDS_AYAHS.length - 1, prev + 1))}
            className={`p-1.5 rounded-xl disabled:opacity-30 cursor-pointer smooth-press ${
              isDark || isSepia
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="الآية التالية"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Tabs to Star Garden & Collected Stars */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveKidTab('tree')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all hover:bg-emerald-500/30 cursor-pointer smooth-press"
            title="افتح شجرة الحفظ التفاعلية"
          >
            <TreeDeciduous className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">شجرة الحفظ</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/40 text-xs font-bold font-nums shadow-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-spin duration-3000" />
            <span>{starCount} نجمة</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div
        className={`p-5 rounded-3xl border transition-all flex flex-col items-center justify-between relative min-h-[530px] ${
          isDark
            ? 'glass-obsidian border-white/10'
            : isSepia
            ? 'glass-sepia border-amber-500/20'
            : 'surface-alabaster border-slate-200'
        }`}
      >
        {/* Ayah Card Display with Recite and Listen Buttons */}
        <div
          className={`w-full p-4 rounded-2xl text-center relative overflow-hidden transition-colors border ${
            isDark
              ? 'bg-slate-950/70 border-white/10 shadow-xl'
              : isSepia
              ? 'bg-[#241E18]/80 border-[#E2B86E]/20 shadow-xl'
              : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <div className="flex items-center justify-between text-[11px] font-nums mb-1">
            <span className="text-amber-500 font-semibold">{currentAyah.surahNameAr}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePlayAyahAudio}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-sky-500 text-slate-950 animate-pulse'
                    : 'bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-400/30 hover:bg-sky-500/30'
                }`}
                title="استمع للترتيل بصوت عذب"
              >
                {isPlayingAudio ? <Pause className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                <span>{isPlayingAudio ? 'إيقاف' : 'اسمع الترتيل'}</span>
              </button>
            </div>
          </div>

          {/* Quranic Text with Medina Uthmanic Font & Warm Light */}
          <div
            className={`font-quran text-2xl sm:text-3xl leading-relaxed py-2 select-text ${
              isDark ? 'text-slate-100' : isSepia ? 'text-[#F3EBDD]' : 'text-slate-900'
            }`}
          >
            <span>{currentAyah.textUthmanic}</span>
            <VerseMarker numeral={currentAyah.ayahNumber.toString()} theme={theme} size="md" isActive={true} />
          </div>

          <p className={`text-[11px] font-ar mt-0.5 leading-relaxed ${isDark ? 'text-slate-400' : isSepia ? 'text-[#B8A896]' : 'text-slate-600'}`}>
            {currentAyah.meaning}
          </p>
        </div>

        {/* Central Companion Avatar Stage: "سِراج" The Quran Companion */}
        <div className="my-3 flex flex-col items-center justify-center relative select-none">
          {/* Soft Pulsing Ambient Glow */}
          <div
            className={`absolute w-52 h-52 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
              companionMood === 'listening'
                ? 'bg-sky-400/20 scale-125 animate-pulse'
                : companionMood === 'cheering'
                ? 'bg-amber-400/30 scale-135'
                : sirajColorPalette.glow
            }`}
          />

          {/* Interactive Cheering / Speech Bubble */}
          <div
            className="mb-2 px-3.5 py-2 rounded-2xl max-w-xs text-center shadow-lg border relative transition-all duration-300 animate-in fade-in"
            style={{
              backgroundColor: isDark ? 'rgba(20, 28, 44, 0.95)' : isSepia ? 'rgba(36, 30, 24, 0.95)' : '#FFFFFF',
              borderColor: companionMood === 'cheering' ? '#F59E0B' : isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-slate-100' : isSepia ? 'text-[#F3EBDD]' : 'text-slate-900'}`}>
              {companionMessage}
            </p>
            {/* Bubble Tail */}
            <div
              className="w-2.5 h-2.5 rotate-45 mx-auto -mb-3 mt-1 border-r border-b"
              style={{
                backgroundColor: isDark ? 'rgba(20, 28, 44, 0.95)' : isSepia ? 'rgba(36, 30, 24, 0.95)' : '#FFFFFF',
                borderColor: companionMood === 'cheering' ? '#F59E0B' : isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          {/* Interactive Little Quran Learner Character "سِراج" (Vector SVG) */}
          <div className="relative group cursor-pointer" onClick={() => playKidTone('star')}>
            <svg
              viewBox="0 0 160 200"
              className={`w-32 h-40 drop-shadow-2xl transition-transform duration-300 ${
                companionMood === 'cheering' ? 'scale-110 -translate-y-2' : 'hover:scale-105'
              }`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Thobe Body with Custom Color Accent */}
              <ellipse cx="80" cy="155" rx="34" ry="40" fill="#F8FAFC" />
              <path d="M60 135 L80 196 L100 135 Z" fill="#F1F5F9" />
              <rect x="78" y="130" width="4" height="60" fill={sirajColorPalette.stroke} rx="2" />

              {/* Head & Neck */}
              <rect x="74" y="112" width="12" height="15" fill="#FED7AA" rx="4" />
              <circle cx="80" cy="80" r="38" fill="#FDBA74" />

              {/* Accessory: Kufi / Crown / Glasses */}
              {sirajAccessory === 'crown' ? (
                /* Golden Crown of the Little Hafiz */
                <g>
                  <path d="M45 65 L52 40 L65 52 L80 34 L95 52 L108 40 L115 65 Z" fill="#F59E0B" stroke="#FDE68A" strokeWidth="2" />
                  <circle cx="80" cy="45" r="4" fill="#38BDF8" />
                  <circle cx="55" cy="50" r="3" fill="#F43F5E" />
                  <circle cx="105" cy="50" r="3" fill="#10B981" />
                  <rect x="44" y="63" width="72" height="6" rx="2" fill="#D97706" />
                </g>
              ) : (
                /* Classic White Kufi / Prayer Cap with selected trim */
                <g>
                  <path d="M46 68 C46 36, 114 36, 114 68 Z" fill="#FFFFFF" />
                  <rect x="45" y="65" width="70" height="6" rx="3" fill={sirajColorPalette.stroke} />
                </g>
              )}

              {/* Smart Glasses Accessory */}
              {sirajAccessory === 'glasses' && (
                <g>
                  <circle cx="66" cy="80" r="10" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
                  <circle cx="94" cy="80" r="10" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
                  <line x1="76" y1="80" x2="84" y2="80" stroke="#38BDF8" strokeWidth="2.5" />
                </g>
              )}

              {/* Ears */}
              <circle cx="42" cy="82" r="7" fill="#FDBA74" />
              <circle cx="118" cy="82" r="7" fill="#FDBA74" />

              {/* Cheerful Friendly Eyes */}
              {companionMood === 'listening' ? (
                <>
                  <path d="M60 80 Q66 85 72 80" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                  <path d="M88 80 Q94 85 100 80" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                </>
              ) : companionMood === 'cheering' ? (
                <>
                  <ellipse cx="66" cy="78" rx="6" ry="8" fill="#0F172A" />
                  <circle cx="64" cy="75" r="2.5" fill="#FFFFFF" />
                  <ellipse cx="94" cy="78" rx="6" ry="8" fill="#0F172A" />
                  <circle cx="92" cy="75" r="2.5" fill="#FFFFFF" />
                </>
              ) : (
                <>
                  <ellipse cx="66" cy="80" rx="5" ry="6" fill="#1E293B" />
                  <circle cx="64" cy="78" r="2" fill="#FFFFFF" />
                  <ellipse cx="94" cy="80" rx="5" ry="6" fill="#1E293B" />
                  <circle cx="92" cy="78" r="2" fill="#FFFFFF" />
                </>
              )}

              {/* Rosy Cheeks */}
              <circle cx="56" cy="88" r="6" fill="#F43F5E" fillOpacity="0.25" />
              <circle cx="104" cy="88" r="6" fill="#F43F5E" fillOpacity="0.25" />

              {/* Gentle Smile */}
              <path
                d={companionMood === 'cheering' ? 'M70 94 Q80 108 90 94 Z' : 'M72 94 Q80 102 88 94'}
                fill={companionMood === 'cheering' ? '#E11D48' : 'none'}
                stroke={companionMood === 'cheering' ? 'none' : '#1E293B'}
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Glowing Headphones in Listening Mode */}
              {companionMood === 'listening' && (
                <g>
                  <path d="M42 80 C42 45, 118 45, 118 80" stroke="#38BDF8" strokeWidth="5" fill="none" />
                  <rect x="37" y="70" width="10" height="20" rx="5" fill="#0284C7" />
                  <rect x="113" y="70" width="10" height="20" rx="5" fill="#0284C7" />
                </g>
              )}

              {/* Floating Star of Mastery in Hand */}
              <g className="animate-bounce" style={{ transformOrigin: '125px 140px' }}>
                <polygon
                  points="125,130 128,137 135,138 130,143 131,150 125,146 119,150 120,143 115,138 122,137"
                  fill="#F59E0B"
                  stroke="#FDE68A"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          </div>

          {/* Real-time Simulated Waveform when Recording or Listening */}
          {(isRecording || isPlayingAudio) && (
            <div className="flex items-center gap-1 mt-2 h-7 px-3 rounded-full bg-slate-900/80 border border-sky-400/40 animate-in fade-in">
              {waveHeights.map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-sky-400 transition-all duration-100"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Zone Depending on Selected Tab */}

        {/* TAB 1: HOME / RECITATION MODE */}
        {activeKidTab === 'home' && (
          <div className="w-full flex flex-col items-center gap-3">
            {/* Live Score Reveal Card */}
            {evaluationResult && (
              <div className="flex flex-col items-center gap-1 p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-nums animate-in zoom-in-95 w-full max-w-sm text-center">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>إتقان التلاوة: {evaluationResult.score}٪ (+{evaluationResult.stars} نجوم ⭐)</span>
                </div>
                <p className="text-[11px] text-emerald-200/90 font-normal">{evaluationResult.tip}</p>
              </div>
            )}

            {/* Action Buttons: Try Again & Get My Score */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {/* Try Again Button */}
              <button
                type="button"
                onClick={() => {
                  setCompanionMood('listening');
                  setCompanionMessage('رتّل الآية الآن بصوتك العذب وسأستمع لك باهتمام!');
                  setIsRecording(true);
                  playKidTone('pop');
                }}
                className={`h-13 rounded-2xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer smooth-press ${
                  isRecording
                    ? 'bg-amber-500 animate-pulse ring-2 ring-amber-300'
                    : 'bg-rose-500/85 hover:bg-rose-500'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isRecording ? 'جاري الاستماع...' : 'أعد الترتيل (Try Again)'}</span>
              </button>

              {/* Get My Score Button with Star Icon */}
              <button
                type="button"
                onClick={handleGetMyScore}
                className="h-13 rounded-2xl bg-emerald-500/85 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer smooth-press"
              >
                <Star className="w-4 h-4 fill-current text-amber-200" />
                <span>قيّم تلاوتي (Get My Score)</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: GAMES (Word Order, Missing Word & Memory Matching) */}
        {activeKidTab === 'games' && (
          <div className="w-full flex flex-col items-center gap-3">
            {/* Game Sub-type Selector */}
            <div className="flex p-1 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setGameType('order')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  gameType === 'order' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                ترتيب الكلمات
              </button>
              <button
                type="button"
                onClick={() => setGameType('missing')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  gameType === 'missing' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                الكلمة المفقودة
              </button>
              <button
                type="button"
                onClick={() => setGameType('memory')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  gameType === 'memory' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                مطابقة الذاكرة
              </button>
            </div>

            {gameType === 'order' && (
              <div className="w-full flex flex-col items-center gap-2.5">
                {/* Assembled Slot Area */}
                <div className="w-full min-h-[50px] p-2 rounded-2xl bg-slate-900/60 border border-amber-400/30 flex items-center justify-center gap-2 flex-wrap">
                  {assembledWords.length === 0 ? (
                    <span className="text-xs text-slate-500 font-medium">
                      اضغط على الكلمات بالأسفل لترتيب الآية...
                    </span>
                  ) : (
                    assembledWords.map((word, i) => (
                      <span
                        key={i}
                        className="font-quran text-xl px-3 py-1 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm animate-in zoom-in-95"
                      >
                        {word}
                      </span>
                    ))
                  )}
                </div>

                {/* Scrambled Word Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {scrambledWords.map((word, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleWordClick(word, i)}
                      className="font-quran text-xl px-4 py-2 rounded-2xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-100 border border-white/10 transition-all cursor-pointer smooth-press shadow-md"
                    >
                      {word}
                    </button>
                  ))}

                  {orderGameWon && (
                    <button
                      type="button"
                      onClick={() => resetOrderGame(currentAyah)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>إعادة التحدي</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {gameType === 'missing' && (
              <div className="w-full flex flex-col items-center gap-2.5">
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 text-center font-quran text-xl text-slate-200">
                  {currentAyah.missingWordQuestion?.sentence}
                </div>

                <div className="grid grid-cols-3 gap-2 w-full">
                  {currentAyah.missingWordQuestion?.options.map((opt, i) => {
                    const isCorrect = opt === currentAyah.missingWordQuestion?.correct;
                    const isSelected = selectedMissingOption === opt;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleMissingWordSelect(opt)}
                        className={`font-quran text-lg p-2.5 rounded-2xl border transition-all cursor-pointer smooth-press ${
                          isSelected && isCorrect
                            ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md'
                            : isSelected && !isCorrect
                            ? 'bg-rose-500/30 text-rose-200 border-rose-500'
                            : 'bg-slate-800 hover:bg-amber-400/20 text-slate-200 border-white/10'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {gameType === 'memory' && (
              <div className="w-full flex flex-col items-center gap-2">
                <p className="text-[11px] text-slate-400">اطوِ البطاقات واعثر على الكلمات المتطابقة:</p>
                <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
                  {memoryCards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleMemoryCardClick(card.id)}
                      className={`h-16 rounded-2xl border flex items-center justify-center transition-all cursor-pointer smooth-press font-quran text-lg ${
                        card.isFlipped || card.isMatched
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200 shadow-md'
                          : 'bg-slate-800/80 border-white/10 text-transparent hover:bg-slate-700/80'
                      }`}
                    >
                      {card.isFlipped || card.isMatched ? card.word : '❓'}
                    </button>
                  ))}
                </div>
                {memoryGameWon && (
                  <button
                    type="button"
                    onClick={initMemoryGame}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>لعب جولة جديدة</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: STAR TREE & MEMORIZATION GARDEN */}
        {activeKidTab === 'tree' && (
          <div className="w-full flex flex-col items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-emerald-500/20 w-full text-center">
              <h4 className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5 mb-1">
                <TreeDeciduous className="w-4 h-4" />
                <span>شجرة القرآن العظيمة (Star Garden)</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                كل ٣ نجوم تكسبها في الترتيل تنبت ورقة ذهبية أو قنديلاً منيراً على شجرتك المباركة!
              </p>
            </div>

            {/* Visual Interactive Tree Graphic */}
            <div className="relative w-full max-w-xs h-36 flex items-center justify-center bg-slate-950/40 rounded-2xl border border-white/5 p-2 overflow-hidden">
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                  {[...Array(6)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition-all ${
                        starCount >= (i + 1) * 5
                          ? 'bg-amber-400 text-slate-950 shadow-lg ring-2 ring-amber-300'
                          : 'bg-slate-800/60 text-slate-500 border border-white/5'
                      }`}
                      title={`مرحلة ${(i + 1) * 5} نجوم`}
                    >
                      {starCount >= (i + 1) * 5 ? '🍃' : '🌱'}
                    </span>
                  ))}
                </div>
                <div className="pt-2 text-xs font-bold text-amber-300 font-nums">
                  رتبتك الحالية: برعم الحفظ المتميز ({starCount} نجوم مسجلة)
                </div>
                <div className="text-[10px] text-slate-400">
                  المستوى القادم: بطل السورة (متبقي {Math.max(0, 35 - starCount)} نجمة)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMPANION CUSTOMIZER */}
        {activeKidTab === 'customizer' && (
          <div className="w-full flex flex-col items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 w-full">
              <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-amber-400" />
                <span>اختر زيّ رفيقك سِراج:</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { id: 'gold', name: 'ذهبي', color: 'bg-amber-400' },
                  { id: 'sky', name: 'سماوي', color: 'bg-sky-400' },
                  { id: 'emerald', name: 'زمردي', color: 'bg-emerald-400' },
                  { id: 'rose', name: 'وردي', color: 'bg-rose-400' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSirajColor(item.id as any);
                      playKidTone('pop');
                    }}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      sirajColor === item.id
                        ? 'border-white bg-white/10 font-bold'
                        : 'border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-5 h-5 mx-auto rounded-full ${item.color} mb-1`} />
                    <span className="text-[10px] text-slate-300">{item.name}</span>
                  </button>
                ))}
              </div>

              <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>التاج أو الإكسسوار:</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'kufi', label: 'طاقية بيضاء' },
                  { id: 'crown', label: 'تاج الحافظ 👑' },
                  { id: 'glasses', label: 'نظارة ذكية 👓' },
                ].map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      setSirajAccessory(acc.id as any);
                      playKidTone('pop');
                    }}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                      sirajAccessory === acc.id
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                        : 'bg-slate-800 text-slate-300 border-white/5 hover:bg-slate-700'
                    }`}
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TREASURES (Medals & Star Vault) */}
        {activeKidTab === 'treasures' && (
          <div className="w-full grid grid-cols-3 gap-2.5">
            {[
              { id: 't1', title: 'وسام سِراج النبأ', level: 1, unlocked: true },
              { id: 't2', title: 'نجم التجويد الذهبي', level: 2, unlocked: true },
              { id: 't3', title: 'تاج الاستمرار', level: 3, unlocked: starCount >= 30 },
            ].map((badge) => (
              <div
                key={badge.id}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center ${
                  badge.unlocked ? 'bg-amber-400/10 border-amber-400/30' : 'bg-slate-900/30 border-white/5 opacity-60'
                }`}
              >
                <OctagonBadge size={52} theme={theme} level={badge.level} unlocked={badge.unlocked} />
                <span className="text-[11px] font-bold text-slate-200 mt-2 block">
                  {badge.title}
                </span>
                <span className="text-[10px] text-amber-400 font-nums">
                  {badge.unlocked ? 'مفتوح ⭐' : 'يتطلب ٣٠ نجمة'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Kids Navigation Bar: 5 Tabs */}
        <div
          className={`w-full mt-4 pt-3 border-t grid grid-cols-5 gap-1 text-center font-ar transition-colors ${
            isDark ? 'border-white/10' : isSepia ? 'border-[#E2B86E]/20' : 'border-slate-200'
          }`}
        >
          {[
            { id: 'home', label: 'الرئيسية', icon: Home },
            { id: 'games', label: 'الألعاب', icon: Gamepad2 },
            { id: 'tree', label: 'الشجرة', icon: TreeDeciduous },
            { id: 'customizer', label: 'سِراج', icon: Smile },
            { id: 'treasures', label: 'الكنوز', icon: Trophy },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeKidTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveKidTab(item.id as any);
                  playKidTone('pop');
                }}
                className={`py-2 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer smooth-press ${
                  isActive
                    ? 'text-amber-500 bg-amber-400/15 font-bold shadow-xs'
                    : isDark || isSepia
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
