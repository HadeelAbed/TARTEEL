import React, { useState } from 'react';
import {
  ThemeMode,
  UserPersona,
  TextDirection,
  ViewportMode,
  ScreenId,
} from './types';
import { SCREENS_LIST } from './data/quranData';
import { Header } from './components/common/Header';
import { DeviceFrame } from './components/common/DeviceFrame';
import { SpecOverviewTab } from './components/spec/SpecOverviewTab';
import { ScreensExplorerModal } from './components/common/ScreensExplorerModal';
import { CodeExportModal } from './components/common/CodeExportModal';

// 15 Interactive Screens
import { Screen01Welcome } from './components/screens/Screen01Welcome';
import { Screen02Auth } from './components/screens/Screen02Auth';
import { Screen03WebDashboard } from './components/screens/Screen03WebDashboard';
import { Screen04MobileHome } from './components/screens/Screen04MobileHome';
import { Screen05QuranBrowser } from './components/screens/Screen05QuranBrowser';
import { Screen06VerseReading } from './components/screens/Screen06VerseReading';
import { Screen07AudioDock } from './components/screens/Screen07AudioDock';
import { Screen08VoiceRecording } from './components/screens/Screen08VoiceRecording';
import { Screen09RecitationDiff } from './components/screens/Screen09RecitationDiff';
import { Screen10Challenges } from './components/screens/Screen10Challenges';
import { Screen11Achievements } from './components/screens/Screen11Achievements';
import { Screen12Planner } from './components/screens/Screen12Planner';
import { Screen13Analytics } from './components/screens/Screen13Analytics';
import { Screen14Settings } from './components/screens/Screen14Settings';
import { Screen15EdgeStates } from './components/screens/Screen15EdgeStates';
import { KidsCompanionCanvas } from './components/kids/KidsCompanionCanvas';

import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkles,
  Smartphone,
  Monitor,
  Code2,
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [persona, setPersona] = useState<UserPersona>('adult');
  const [direction, setDirection] = useState<TextDirection>('rtl');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('web');
  const [activeScreen, setActiveScreen] = useState<ScreenId>(3); // Default to Dashboard (Screen 3)
  const [isScreensModalOpen, setIsScreensModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [showKidsStudio, setShowKidsStudio] = useState(false);

  const currentScreenMeta =
    SCREENS_LIST.find((s) => s.id === activeScreen) || SCREENS_LIST[0];

  const handleNextScreen = () => {
    setActiveScreen((prev) => ((prev % 15) + 1) as ScreenId);
  };

  const handlePrevScreen = () => {
    setActiveScreen((prev) => (prev === 1 ? 15 : ((prev - 1) as ScreenId)));
  };

  const handleThemeCycle = () => {
    setTheme((prev) => (prev === 'dark' ? 'sepia' : prev === 'sepia' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const appBackground = isDark
    ? 'bg-[#0B0F17] text-slate-100 theme-dark'
    : isSepia
    ? 'bg-[#181411] text-[#F3EBDD] theme-sepia'
    : 'bg-[#F8F7F2] text-slate-900 theme-light';

  const brandGold = isDark ? '#E5C378' : isSepia ? '#E2B86E' : '#96742E';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 relative theme-${theme} ${appBackground}`}
      dir={direction}
      data-theme={theme}
    >
      {/* Subtle Atmospheric Radial Ambient Glow for Eye Comfort */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-400/[0.03] blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-sky-400/[0.03] blur-[140px]" />
        </div>
      )}

      {/* Universal Clean Header Navigation */}
      <Header
        theme={theme}
        onThemeCycle={handleThemeCycle}
        persona={persona}
        onPersonaToggle={() =>
          setPersona(persona === 'adult' ? 'child' : 'adult')
        }
        direction={direction}
        onDirectionToggle={() =>
          setDirection(direction === 'rtl' ? 'ltr' : 'rtl')
        }
        activeScreen={activeScreen}
        onScreenChange={(id) => {
          setActiveScreen(id);
          setShowKidsStudio(false);
        }}
        onOpenScreensModal={() => setIsScreensModalOpen(true)}
        showKidsStudio={showKidsStudio}
        onToggleKidsStudio={() => {
          const next = !showKidsStudio;
          setShowKidsStudio(next);
          if (next) setPersona('child');
        }}
        viewportMode={viewportMode}
        onViewportModeChange={(m) => {
          setViewportMode(m);
          if (m === 'mobile' && activeScreen === 3) setActiveScreen(4);
          if (m === 'web' && activeScreen === 4) setActiveScreen(3);
        }}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full flex flex-col justify-start relative z-10 pb-16">
        <DeviceFrame
          mode={viewportMode}
          onModeChange={setViewportMode}
          theme={theme}
          activeScreen={activeScreen}
          onScreenChange={setActiveScreen}
          showKidsStudio={showKidsStudio}
          onToggleKidsStudio={() => {
            const next = !showKidsStudio;
            setShowKidsStudio(next);
            if (next) setPersona('child');
          }}
          onOpenCodeModal={() => setIsCodeModalOpen(true)}
          specDrawerContent={
            <SpecOverviewTab
              theme={theme}
              persona={persona}
              onClose={() => setViewportMode('web')}
            />
          }
        >
          {/* Interactive Kids Companion Studio View or Screen 1..15 */}
          {showKidsStudio ? (
            <KidsCompanionCanvas
              theme={theme}
              onSwitchToAdult={() => {
                setPersona('adult');
                setShowKidsStudio(false);
              }}
              onNavigateReading={() => {
                setShowKidsStudio(false);
                setActiveScreen(6);
              }}
            />
          ) : (
            <>
              {activeScreen === 1 && (
                <Screen01Welcome
                  theme={theme}
                  persona={persona}
                  onPersonaChange={setPersona}
                  onNavigateNext={() => setActiveScreen(2)}
                />
              )}

              {activeScreen === 2 && (
                <Screen02Auth
                  theme={theme}
                  persona={persona}
                  onSuccess={() => setActiveScreen(3)}
                />
              )}

              {activeScreen === 3 && (
                <Screen03WebDashboard
                  theme={theme}
                  persona={persona}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                  onOpenKidsStudio={() => {
                    setShowKidsStudio(true);
                    setPersona('child');
                  }}
                />
              )}

              {activeScreen === 4 && (
                <Screen04MobileHome
                  theme={theme}
                  persona={persona}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                  onOpenKidsStudio={() => {
                    setShowKidsStudio(true);
                    setPersona('child');
                  }}
                />
              )}

              {activeScreen === 5 && (
                <Screen05QuranBrowser
                  theme={theme}
                  persona={persona}
                  onSelectSurah={(_surahId) => {
                    setActiveScreen(6);
                  }}
                />
              )}

              {activeScreen === 6 && (
                <Screen06VerseReading
                  theme={theme}
                  persona={persona}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                  onOpenAudioDock={() => setActiveScreen(7)}
                  onOpenMicRecording={() => setActiveScreen(8)}
                />
              )}

              {activeScreen === 7 && (
                <Screen07AudioDock
                  theme={theme}
                  persona={persona}
                  onClose={() => setActiveScreen(6)}
                  onNavigateScreen={(id: ScreenId) => setActiveScreen(id)}
                />
              )}

              {activeScreen === 8 && (
                <Screen08VoiceRecording
                  theme={theme}
                  persona={persona}
                  onFinishedRecording={() => setActiveScreen(9)}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                />
              )}

              {activeScreen === 9 && (
                <Screen09RecitationDiff
                  theme={theme}
                  persona={persona}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                  onRetryRecording={() => setActiveScreen(8)}
                />
              )}

              {activeScreen === 10 && (
                <Screen10Challenges
                  theme={theme}
                  persona={persona}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                />
              )}

              {activeScreen === 11 && (
                <Screen11Achievements
                  theme={theme}
                  persona={persona}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                />
              )}

              {activeScreen === 12 && (
                <Screen12Planner
                  theme={theme}
                  persona={persona}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                />
              )}

              {activeScreen === 13 && (
                <Screen13Analytics
                  theme={theme}
                  persona={persona}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                />
              )}

              {activeScreen === 14 && (
                <Screen14Settings
                  theme={theme}
                  persona={persona}
                  onThemeToggle={handleThemeCycle}
                  onPersonaChange={setPersona}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                />
              )}

              {activeScreen === 15 && (
                <Screen15EdgeStates
                  theme={theme}
                  persona={persona}
                  onNavigateScreen={(id) => setActiveScreen(id)}
                />
              )}
            </>
          )}
        </DeviceFrame>
      </main>

      {/* Floating Bottom Minimalist Screen Navigator Bar */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 backdrop-blur-xl px-4 py-2 rounded-2xl border shadow-xl flex items-center gap-2 font-ar select-none"
        style={{
          backgroundColor: isDark
            ? 'rgba(11, 15, 23, 0.90)'
            : isSepia
            ? 'rgba(24, 20, 17, 0.92)'
            : 'rgba(255, 255, 255, 0.92)',
          borderColor: isDark
            ? 'rgba(255, 255, 255, 0.12)'
            : isSepia
            ? 'rgba(226, 184, 110, 0.25)'
            : 'rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Prev Screen Button */}
        <button
          type="button"
          onClick={handlePrevScreen}
          className="p-1.5 rounded-xl bg-slate-800/40 hover:bg-slate-700/60 text-slate-300 transition-colors cursor-pointer smooth-press"
          title="الشاشة السابقة"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Central Screen Status Pill */}
        <button
          type="button"
          onClick={() => setIsScreensModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-xs font-semibold text-amber-500 dark:text-amber-300 transition-all cursor-pointer"
          title="فتح فهرس الشاشات"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-nums font-bold">#{activeScreen}</span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-200">
            {showKidsStudio ? 'استوديو سِراج للأطفال 🎮' : currentScreenMeta.titleAr}
          </span>
        </button>

        {/* Next Screen Button */}
        <button
          type="button"
          onClick={handleNextScreen}
          className="p-1.5 rounded-xl bg-slate-800/40 hover:bg-slate-700/60 text-slate-300 transition-colors cursor-pointer smooth-press"
          title="الشاشة التالية"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Viewport Quick Switcher */}
        <div className="h-4 w-[1px] bg-white/10 dark:bg-slate-700 mx-0.5" />
        <button
          type="button"
          onClick={() => {
            const nextMode = viewportMode === 'web' ? 'mobile' : 'web';
            setViewportMode(nextMode);
            if (nextMode === 'mobile' && activeScreen === 3) setActiveScreen(4);
            if (nextMode === 'web' && activeScreen === 4) setActiveScreen(3);
          }}
          className="p-1.5 rounded-xl bg-slate-800/40 hover:bg-slate-700/60 text-slate-300 transition-colors cursor-pointer smooth-press"
          title={viewportMode === 'web' ? 'معاينة شاشة الجوال' : 'معاينة سطح المكتب'}
        >
          {viewportMode === 'web' ? (
            <Smartphone className="w-4 h-4 text-emerald-400" />
          ) : (
            <Monitor className="w-4 h-4 text-sky-400" />
          )}
        </button>

        {/* Code Exporter Quick Button */}
        <button
          type="button"
          onClick={() => setIsCodeModalOpen(true)}
          className="p-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 transition-colors cursor-pointer smooth-press border border-purple-500/20"
          title="مُستكشف ونسخ أكواد الأقسام"
        >
          <Code2 className="w-4 h-4" />
        </button>
      </div>

      {/* Screen Explorer Modal */}
      <ScreensExplorerModal
        isOpen={isScreensModalOpen}
        onClose={() => setIsScreensModalOpen(false)}
        activeScreen={activeScreen}
        onSelectScreen={(id) => {
          setActiveScreen(id);
          setShowKidsStudio(false);
        }}
        viewportMode={viewportMode}
        onViewportModeChange={setViewportMode}
        theme={theme}
        persona={persona}
        onOpenKidsStudio={() => {
          setShowKidsStudio(true);
          setPersona('child');
        }}
      />

      {/* Code Export Modal */}
      <CodeExportModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        theme={theme}
        onSwitchViewport={setViewportMode}
      />
    </div>
  );
}
