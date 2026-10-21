import React, { useState } from 'react';
import { ThemeMode, UserPersona } from '../../types';
import { KeyRound, Mail, Lock, CheckCircle2, Shield, Eye, EyeOff, Sparkles, Terminal } from 'lucide-react';

interface Screen02AuthProps {
  theme: ThemeMode;
  persona: UserPersona;
  onSuccess: () => void;
}

export const Screen02Auth: React.FC<Screen02AuthProps> = ({
  theme,
  persona,
  onSuccess,
}) => {
  const isDark = theme === 'dark';
  const isChild = persona === 'child';

  const [authMethod, setAuthMethod] = useState<'email' | 'pin'>(isChild ? 'pin' : 'email');
  const [pinDigits, setPinDigits] = useState<string[]>(['', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [inputStateTest, setInputStateTest] = useState<'default' | 'error' | 'disabled'>('default');
  const [showApiTokenPayload, setShowApiTokenPayload] = useState(false);

  const goldPrimary = isDark ? '#E5C378' : '#96742E';

  const handlePinInput = (digit: string) => {
    const nextEmptyIdx = pinDigits.findIndex((d) => d === '');
    if (nextEmptyIdx !== -1) {
      const updated = [...pinDigits];
      updated[nextEmptyIdx] = digit;
      setPinDigits(updated);
      if (nextEmptyIdx === 3) {
        // PIN Complete auto-trigger
        setTimeout(onSuccess, 450);
      }
    }
  };

  const handlePinBackspace = () => {
    const filledIdxs = pinDigits.map((d, i) => (d !== '' ? i : -1)).filter((i) => i !== -1);
    if (filledIdxs.length > 0) {
      const lastFilled = filledIdxs[filledIdxs.length - 1];
      const updated = [...pinDigits];
      updated[lastFilled] = '';
      setPinDigits(updated);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-6 px-4 font-ar" dir="rtl">
      {/* Auth Card Container */}
      <div
        className={`p-6 sm:p-8 rounded-3xl transition-all relative ${
          isDark ? 'glass-obsidian' : 'surface-alabaster'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-amber-400/10 border border-amber-400/20 text-[#E5C378]">
            {authMethod === 'pin' ? <KeyRound className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}>
            {authMethod === 'pin' ? 'تسجيل الدخول السريع برمز PIN' : 'تسجيل الدخول ومزامنة الحفظ'}
          </h2>
          <p className="text-xs text-slate-400">
            {authMethod === 'pin'
              ? 'رمز خاص وممتع للأبطال الصغار بدون الحاجة لكتابة بريد أو كلمات مرور معقدة.'
              : 'مصادقة متوافقة مع Laravel Sanctum تضمن مزامنة الجلسات عبر جميع أجهزتك.'}
          </p>
        </div>

        {/* Tab Switcher: Sanctum Email vs Kids PIN */}
        <div className="flex p-1 rounded-xl bg-slate-900/40 dark:bg-slate-900/60 border border-white/5 mb-6">
          <button
            type="button"
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              authMethod === 'email'
                ? 'bg-slate-800 text-[#E5C378] shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            البريد الشخصي (Sanctum Auth)
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('pin')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMethod === 'pin'
                ? 'bg-slate-800 text-amber-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>رمز PIN للبراعم</span>
          </button>
        </div>

        {authMethod === 'email' ? (
          /* Email / Password Form (Sanctum Ready) */
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSuccess();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  defaultValue="quran.learner@tarteel.app"
                  disabled={inputStateTest === 'disabled'}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all text-slate-100 bg-slate-900/50 border focus:outline-none ${
                    inputStateTest === 'error'
                      ? 'border-red-500/80 focus:border-red-400'
                      : 'border-white/10 focus:border-[#E5C378]'
                  }`}
                  placeholder="name@example.com"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  كلمة المرور
                </label>
                <button
                  type="button"
                  className="text-[11px] text-[#E5C378] hover:underline cursor-pointer"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  defaultValue="••••••••••••"
                  disabled={inputStateTest === 'disabled'}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm transition-all text-slate-100 bg-slate-900/50 border border-white/10 focus:border-[#E5C378] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Test States Selector for Design System Review */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>اختبار حالات الحقول:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInputStateTest('default')}
                  className={`px-2 py-0.5 rounded ${inputStateTest === 'default' ? 'bg-[#E5C378]/20 text-[#E5C378]' : 'text-slate-400'}`}
                >
                  Default
                </button>
                <button
                  type="button"
                  onClick={() => setInputStateTest('error')}
                  className={`px-2 py-0.5 rounded ${inputStateTest === 'error' ? 'bg-red-500/20 text-red-400' : 'text-slate-400'}`}
                >
                  Error
                </button>
                <button
                  type="button"
                  onClick={() => setInputStateTest('disabled')}
                  className={`px-2 py-0.5 rounded ${inputStateTest === 'disabled' ? 'bg-slate-700 text-slate-300' : 'text-slate-400'}`}
                >
                  Disabled
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={inputStateTest === 'disabled'}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-md mt-4 cursor-pointer"
              style={{
                backgroundColor: isDark ? '#E5C378' : '#96742E',
                color: isDark ? '#0B0F17' : '#FFFFFF',
              }}
            >
              دخول واسترجاع جلسات الترتيل
            </button>
          </form>
        ) : (
          /* Kids PIN Authentication */
          <div className="space-y-6">
            {/* 4-Digit PIN Boxes */}
            <div className="flex justify-center gap-4 py-2" dir="ltr">
              {pinDigits.map((digit, idx) => (
                <div
                  key={idx}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-nums font-bold text-2xl transition-all border ${
                    digit !== ''
                      ? 'border-[#E5C378] bg-[#E5C378]/15 text-[#E5C378]'
                      : 'border-white/10 bg-slate-900/40 text-slate-500'
                  }`}
                >
                  {digit !== '' ? '•' : ''}
                </div>
              ))}
            </div>

            {/* Virtual Number Keypad */}
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto" dir="ltr">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'backspace'].map((key, i) => {
                if (key === '') {
                  return <div key={i} />;
                }
                if (key === 'backspace') {
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={handlePinBackspace}
                      className="h-12 rounded-xl flex items-center justify-center bg-slate-800/40 hover:bg-slate-700/50 text-slate-400 text-xs font-semibold cursor-pointer"
                    >
                      حذف
                    </button>
                  );
                }
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handlePinInput(key)}
                    className="h-12 rounded-xl flex items-center justify-center font-nums font-semibold text-lg bg-slate-800/50 hover:bg-slate-700/60 active:bg-amber-400/20 text-slate-100 border border-white/5 cursor-pointer transition-transform active:scale-95"
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            <div className="text-center text-xs text-slate-400">
              <span>هل نسيت رمز الـ PIN؟ </span>
              <button
                type="button"
                className="text-[#E5C378] font-semibold hover:underline cursor-pointer"
              >
                طلب استعادة عبر ولي الأمر
              </button>
            </div>
          </div>
        )}

        {/* Laravel Sanctum Token Inspector Toggle */}
        <div className="mt-8 pt-4 border-t border-white/10 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setShowApiTokenPayload(!showApiTokenPayload)}
            className="w-full flex items-center justify-between text-xs text-sky-400 hover:text-sky-300 font-nums cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>معاينة عقد استجابة Laravel Sanctum API</span>
            </span>
            <span>{showApiTokenPayload ? 'إخفاء' : 'عرض JSON'}</span>
          </button>

          {showApiTokenPayload && (
            <pre className="mt-3 p-3 rounded-xl bg-black/60 border border-sky-500/20 text-[11px] font-mono text-sky-200 overflow-x-auto text-left" dir="ltr">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "token_type": "Bearer",
  "access_token": "24|qf69420a89d1b4c3e87123908f...",
  "user": {
    "uuid": "usr_01J8F9Q1A7",
    "persona": "${persona}",
    "hafiz_level": 14,
    "streak_days": 21,
    "last_sync": "2026-10-19T08:01:00Z"
  }
}`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
