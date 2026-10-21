import React, { useState } from 'react';
import { ThemeMode, UserPersona, LaravelApiEndpoint } from '../../types';
import { LARAVEL_API_SPEC } from '../../data/quranData';
import { Code2, Palette, Type, Layers, Database, Smartphone, Check, Copy, Terminal, ExternalLink } from 'lucide-react';

interface SpecOverviewTabProps {
  theme: ThemeMode;
  persona: UserPersona;
  onClose?: () => void;
}

export const SpecOverviewTab: React.FC<SpecOverviewTabProps> = ({
  theme,
  persona,
  onClose,
}) => {
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState<'architecture' | 'tokens' | 'typography' | 'states' | 'laravel'>('architecture');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const goldPrimary = isDark ? '#E5C378' : '#96742E';
  const skyColor = isDark ? '#38BDF8' : '#0284C7';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="w-full font-ar text-right" dir="rtl">
      {/* Specification Modal Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              مواصفات نظام تصميم "ترتيل" والهندسة البرمجية
            </h2>
            <p className="text-xs text-slate-400">
              TARTEEL Production Design System & Multi-Platform Specification (Web · Mobile Expo · Laravel REST)
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            إغلاق
          </button>
        )}
      </div>

      {/* Sub-nav switcher */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 rounded-xl bg-slate-900/50 border border-white/5">
        {[
          { id: 'architecture', label: 'المعمارية المشتركة (Architecture)', icon: Layers },
          { id: 'tokens', label: 'رموز الألوان والزجاج (Tokens)', icon: Palette },
          { id: 'typography', label: 'الخط والرسم العثماني (Typography)', icon: Type },
          { id: 'states', label: 'مصفوفة حالات المكونات (States)', icon: Smartphone },
          { id: 'laravel', label: 'عقود Laravel Sanctum & MySQL', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-slate-800 text-[#E5C378] shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content 1: Multi-Platform Architecture */}
      {activeSection === 'architecture' && (
        <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5C378]" />
              <span>1. استراتيجية المنصات الموحدة (Cross-Platform Strategy)</span>
            </h3>
            <p>
              صُممت منصة <strong>ترتيل</strong> وفق مبدأ <em>Single Source of Truth</em> حيث يتقاسم الويب وتطبيقات الموبايل نفس عقود البيانات والواجهات البرمجية:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-nums">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="font-bold text-sky-400 block mb-1 font-ar">Web Client</span>
                <span className="text-[11px] text-slate-400">React + TypeScript + Tailwind CSS (Vite SPA). متجاوب بالكامل لشاشات سطح المكتب والتابلت مع baseline 1440px.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="font-bold text-sky-400 block mb-1 font-ar">Mobile Client</span>
                <span className="text-[11px] text-slate-400">React Native + Expo (iOS & Android). تجربة أصلية تعتمد مناطق الإبهام الطبيعية وواجهات زجاجية عائمة.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="font-bold text-sky-400 block mb-1 font-ar">Shared Backend</span>
                <span className="text-[11px] text-slate-400">Unified Laravel REST API + MySQL + Redis Queues. مصادقة موحدة بـ Sanctum وWebSockets لمعالجة الصوت.</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>2. هندسة التعريب الصارم (RTL-Native First Architecture)</span>
            </h3>
            <p>
              الواجهة مبنية بالكامل على الخصائص المنطقية <code>CSS Logical Properties</code> (مثل <code>margin-inline-start</code> و <code>padding-inline-end</code>) لضمان المحاذاة الدقيقة للنصوص العربية دون كسر التجاوب، مع سهولة التحويل المستقبلي للإنجليزية (LTR) بتبديل سمة <code>dir="ltr"</code> فقط.
            </p>
          </div>
        </div>
      )}

      {/* Content 2: Tokens */}
      {activeSection === 'tokens' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100">
                جدول رموز الألوان الدقيقة (Color Token Palette)
              </h3>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    JSON.stringify(
                      {
                        obsidian: '#0B0F17',
                        slateGlass: 'rgba(20, 28, 44, 0.65)',
                        brassChampagne: '#E5C378',
                        skyRecite: '#38BDF8',
                        quranDarkText: '#F8FAFC',
                        alabasterBg: '#F6F4EE',
                        alabasterCard: '#FFFFFF',
                        antiqueBrass: '#96742E',
                        oceanicRecite: '#0284C7',
                        quranLightText: '#0F172A',
                      },
                      null,
                      2
                    ),
                    'tokens-json'
                  )
                }
                className="flex items-center gap-1 text-[11px] text-sky-400 hover:underline cursor-pointer"
              >
                {copiedKey === 'tokens-json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>نسخ الرموز بصيغة JSON</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-nums">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-bold text-[#E5C378] font-ar block">1. نمط الأوبسيديان الليلي (Dark Obsidian)</span>
                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex justify-between items-center">
                    <span>Canvas / Background:</span>
                    <span className="font-mono text-[#E5C378]">#0B0F17</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Slate Glass Surface:</span>
                    <span className="font-mono text-slate-400">rgba(20, 28, 44, 0.65)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Primary Brass Accent:</span>
                    <span className="font-mono text-[#E5C378]">#E5C378</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Audio / Mic Accent:</span>
                    <span className="font-mono text-sky-400">#38BDF8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Uthmanic Hafs Text:</span>
                    <span className="font-mono text-slate-100">#F8FAFC</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <span className="font-bold text-[#96742E] font-ar block">2. نمط الألباستر الدافئ (Warm Alabaster)</span>
                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex justify-between items-center">
                    <span>Canvas / Archival Paper:</span>
                    <span className="font-mono text-amber-200">#F6F4EE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pure Crisp White Card:</span>
                    <span className="font-mono text-slate-400">#FFFFFF</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Antique Brass Accent:</span>
                    <span className="font-mono text-[#96742E]">#96742E</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Oceanic Audio Accent:</span>
                    <span className="font-mono text-sky-500">#0284C7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Charcoal Quran Ink:</span>
                    <span className="font-mono text-slate-200">#0F172A</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content 3: Typography */}
      {activeSection === 'typography' && (
        <div className="space-y-6 text-xs text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-100">
              نظام الطباعة ثلاثي المستويات (Tri-Layer Typography System)
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#E5C378] text-sm">١. خط المصحف الشريف (Medina Uthmanic Hafs)</span>
                  <span className="text-[11px] font-mono text-slate-400">Amiri Quran / Medina Hafs</span>
                </div>
                <p className="text-xs text-slate-400">
                  الضبط: <code>line-height: 2.5</code> و <code>word-spacing: 0.22em</code> مع فواصل الآيات الدائرية النحاسية والأرقام المشرقية.
                </p>
                <div className="font-quran text-2xl text-slate-100 text-center py-2 bg-slate-900/40 rounded-lg">
                  تَبَـٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌ ﴿١﴾
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sky-400 text-sm">٢. واجهة المستخدم والعناوين (Contemporary Arabic Sans)</span>
                  <span className="text-[11px] font-mono text-slate-400">Alexandria & Tajawal</span>
                </div>
                <p className="text-xs text-slate-400">
                  خط هندسي عربي معاصر بأوزان صلبة واضحة ومحاذاة بصرية نظيفة تناسب الشاشات عالية الكثافة Retina.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-300 text-sm">٣. الأرقام والجداول والبيانات (Tabular Numerals)</span>
                  <span className="text-[11px] font-mono text-slate-400">Plus Jakarta Sans (tabular-nums)</span>
                </div>
                <p className="text-xs text-slate-400">
                  أرقام جدولية تضمن التراصف الرأسي الدقيق في لوحات التحكم، نسب الإتقان، وساعات الترتيل.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content 4: Component States Matrix */}
      {activeSection === 'states' && (
        <div className="space-y-6 text-xs text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-100">
              مصفوفة حالات عناصر الواجهة التفاعلية (State Annotation Matrix)
            </h3>
            <p className="text-slate-400">
              تلتزم كل أزرار وحقول وبطاقات المنصة بالحالات الست الإلزامية:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-nums">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 text-center space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-ar">Default State</span>
                <button type="button" className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#E5C378] text-slate-950">
                  زر افتراضي
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 text-center space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-ar">Hover State</span>
                <button type="button" className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#E5C378]/90 text-slate-950 ring-2 ring-[#E5C378]/40 shadow-lg">
                  تمرير الفأرة
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 text-center space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-ar">Active / Press</span>
                <button type="button" className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#C4A255] text-slate-950 scale-95 transition-transform">
                  حالة النقر
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 text-center space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-ar">Focus Ring (A11y)</span>
                <button type="button" className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-100 ring-2 ring-sky-400 ring-offset-2 ring-offset-slate-900">
                  تركيز لوحة المفاتيح
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 text-center space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-ar">Loading Skeleton</span>
                <div className="w-24 h-8 mx-auto rounded-lg bg-slate-800/80 animate-pulse" />
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 text-center space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-ar">Disabled</span>
                <button type="button" disabled className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800/40 text-slate-500 cursor-not-allowed">
                  معطل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content 5: Laravel API Contracts & MySQL Schemas */}
      {activeSection === 'laravel' && (
        <div className="space-y-6 text-xs text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>عقود واجهات Laravel Sanctum REST API الموحدة</span>
            </h3>

            <div className="space-y-3 font-mono" dir="ltr">
              {LARAVEL_API_SPEC.map((api, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/60 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${api.method === 'POST' ? 'bg-sky-500/20 text-sky-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {api.method}
                      </span>
                      <span className="text-slate-200">{api.path}</span>
                    </div>
                    <span className="text-[11px] text-amber-400/90">{api.auth}</span>
                  </div>
                  <p className="text-[11px] font-sans text-slate-400 text-right" dir="rtl">
                    {api.descriptionAr}
                  </p>
                </div>
              ))}
            </div>

            {/* MySQL DDL preview */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-200 mb-2 font-mono" dir="ltr">
                // MySQL 8.0 Schema DDL (Relational State Core)
              </h4>
              <pre className="p-3.5 rounded-xl bg-black/70 border border-white/5 text-[11px] font-mono text-slate-300 overflow-x-auto text-left" dir="ltr">
{`CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    persona ENUM('adult', 'child') DEFAULT 'adult',
    parent_guardian_id BIGINT UNSIGNED NULL,
    current_streak_days INT UNSIGNED DEFAULT 0,
    total_xp_points BIGINT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

CREATE TABLE spaced_repetition_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    surah_number SMALLINT UNSIGNED NOT NULL,
    ayah_start SMALLINT UNSIGNED NOT NULL,
    ayah_end SMALLINT UNSIGNED NOT NULL,
    interval_days DECIMAL(6,2) DEFAULT 1.0,
    repetition_count INT UNSIGNED DEFAULT 0,
    retention_score DECIMAL(5,2) DEFAULT 100.0,
    due_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
