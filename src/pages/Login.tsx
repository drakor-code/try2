import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { DollarSign, User, Lock, X, Loader2, UserPlus, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuthStore } from '@/lib/auth';
import { toast } from 'sonner';

// Frontend-only login page

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, loginWithGoogle, isLoading } = useAuthStore();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const isRTL = i18n.language === 'ar';

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error(isRTL ? 'اكتب الإيميل وكلمة السر' : 'Please enter email and password');
      return;
    }

    if (isSignUp) {
      if (!firstName || !lastName) {
        toast.error(isRTL ? 'اكتب الاسم الأول والأخير' : 'Please enter first and last name');
        return;
      }
      if (password !== confirmPassword) {
        toast.error(isRTL ? 'كلمات السر مو متطابقة' : 'Passwords do not match');
        return;
      }
    }

    console.log(`🔐 Attempting ${isSignUp ? 'registration' : 'login'} with:`, { email, password: '***' });

    try {
      if (isSignUp) {
        await register({ email, password, firstName, lastName });
        console.log('✅ Registration successful');
        toast.success(isRTL ? 'تم التسجيل بنجاح' : 'Registration successful');
      } else {
        await login(email, password);
        console.log('✅ Login successful');
        toast.success(isRTL ? 'دخلت بنجاح' : 'Login successful');
      }
      navigate(from, { replace: true });
    } catch (error: unknown) {
      console.error(`❌ ${isSignUp ? 'Registration' : 'Login'} error:`, error);
      const errorMessage = error instanceof Error ? error.message : (isRTL ? 'صار خطأ' : 'An error occurred');
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // Google OAuth will redirect automatically
    } catch (error: unknown) {
      console.error('❌ Google login error:', error);
      const errorMessage = error instanceof Error ? error.message : (isRTL ? 'فشل في تسجيل الدخول بـ Google' : 'Google login failed');
      toast.error(errorMessage);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-hero flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Language Switcher */}
      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
        <LanguageSwitcher />
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} text-white hover:bg-white/20`}
        onClick={() => navigate('/dashboard')}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Auth Card */}
      <Card className="w-full max-w-md shadow-elegant bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-gradient-primary p-4 rounded-full">
              <DollarSign className="h-12 w-12 text-white" />
            </div>
          </div>
          
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('login.title')}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isRTL ? 'نظام إدارة الديون' : 'Debt Management System'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp 
                ? (isRTL ? 'إنشاء حساب جديد' : 'Create new account')
                : (isRTL ? 'تسجيل الدخول' : 'Sign in to your account')
              }
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sign Up Fields */}
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    {isRTL ? 'الاسم الأول' : 'First Name'}
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12"
                    placeholder={isRTL ? 'أحمد' : 'John'}
                    required={isSignUp}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    {isRTL ? 'الاسم الأخير' : 'Last Name'}
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12"
                    placeholder={isRTL ? 'محمد' : 'Doe'}
                    required={isSignUp}
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                {t('login.email') || (isRTL ? 'الإيميل' : 'Email')}
              </Label>
              <div className="relative">
                <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-muted-foreground`} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${isRTL ? 'pr-10' : 'pl-10'} h-12`}
                  placeholder="admin@debtmanagement.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                {t('login.password') || (isRTL ? 'كلمة السر' : 'Password')}
              </Label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-muted-foreground`} />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${isRTL ? 'pr-10' : 'pl-10'} h-12`}
                  placeholder={isRTL ? 'كلمة السر' : 'Password'}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Confirm Password Field - Only for Sign Up */}
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  {isRTL ? 'تأكيد كلمة السر' : 'Confirm Password'}
                </Label>
                <div className="relative">
                  <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-muted-foreground`} />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`${isRTL ? 'pr-10' : 'pl-10'} h-12`}
                    placeholder={isRTL ? 'تأكيد كلمة السر' : 'Confirm Password'}
                    required={isSignUp}
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="hero"
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4 animate-spin`} />
                  {isSignUp 
                    ? (isRTL ? 'جاري التسجيل...' : 'Creating account...')
                    : (isRTL ? 'جاري الدخول...' : 'Signing in...')
                  }
                </>
              ) : (
                <>
                  {isSignUp ? <UserPlus className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} /> : <User className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />}
                  {isSignUp 
                    ? (isRTL ? 'إنشاء حساب' : 'Sign Up')
                    : (t('login.loginButton') || (isRTL ? 'ادخل' : 'Log In'))
                  }
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {isRTL ? 'أو' : 'Or'}
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Chrome className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5 text-blue-600`} />
              {isRTL ? 'تسجيل الدخول بـ Google' : 'Continue with Google'}
            </Button>

            {/* Toggle Sign Up/Log In */}
            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                className="text-sm"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setEmail('');
                  setPassword('');
                  setFirstName('');
                  setLastName('');
                  setConfirmPassword('');
                }}
                disabled={isLoading}
              >
                {isSignUp 
                  ? (isRTL ? 'عندك حساب؟ ادخل هنا' : 'Already have an account? Log in')
                  : (isRTL ? 'ما عندك حساب؟ سجل هنا' : "Don't have an account? Sign up")
                }
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}