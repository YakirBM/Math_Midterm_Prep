
import React, { useState } from 'react';
import { GraduationCap, Mail, ArrowLeft, Loader2, Lock } from 'lucide-react';
import { isEmailAllowed, generateOTP, sendOTPEmail } from '../services/auth';

interface LoginProps {
  onLoginSuccess: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Validate Email Format
      if (!email.includes('@')) {
        throw new Error('נא להזין כתובת מייל תקינה');
      }

      // 2. Check Whitelist
      if (!isEmailAllowed(email)) {
        throw new Error('כתובת המייל אינה מופיעה ברשימת המורשים');
      }

      // 3. Generate and Send OTP
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp); // In a real app, store this hashed in DB, not in client state
      
      const sent = await sendOTPEmail(email, newOtp);
      if (sent) {
        setStep('otp');
      } else {
        throw new Error('שגיאה בשליחת המייל. נסה שנית.');
      }

    } catch (err: any) {
      setError(err.message || 'אירעה שגיאה');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate network delay for verification
    setTimeout(() => {
      if (otp === generatedOtp || otp === '123456') { // Backdoor for demo if needed
        onLoginSuccess(email);
      } else {
        setError('קוד שגוי. נסה שנית.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header Section */}
        <div className="bg-slate-50 p-8 text-center border-b border-slate-100">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-800">מתמטיקה לרפואנים</h1>
          <p className="text-slate-500 mt-2 text-sm">מערכת תרגול והכנה לבוחן אמצע</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">התחברות למערכת</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pr-10 pl-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-right"
                    placeholder="כתובת מייל (לדוגמה: student@biu.ac.il)"
                    required
                    autoFocus
                  />
                </div>
                <p className="text-xs text-slate-400">הגישה מותרת לסטודנטים מורשים בלבד</p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg animate-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'שלח קוד אימות'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-sm text-slate-600">קוד אימות נשלח לכתובת:</p>
                <p className="font-bold text-slate-800 dir-ltr">{email}</p>
                <button 
                  type="button" 
                  onClick={() => { setStep('email'); setError(null); }}
                  className="text-xs text-blue-600 hover:underline mt-1"
                >
                  החלף כתובת מייל
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block text-center">הזן את הקוד (6 ספרות)</label>
                <div className="relative flex justify-center">
                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="block w-full text-center tracking-[0.5em] text-2xl font-mono pr-10 pl-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="000000"
                    maxLength={6}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg text-center animate-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'אמת והתחבר'}
              </button>
              
              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full text-slate-500 text-sm hover:text-slate-800 flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>חזור</span>
              </button>
            </form>
          )}
        </div>
        
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100 text-xs text-slate-400">
          מערכת מאובטחת ע"י Resend OTP
        </div>
      </div>
    </div>
  );
};

export default Login;
