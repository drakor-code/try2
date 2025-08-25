import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleLanguage = async () => {
    setIsTransitioning(true);
    
    // Add smooth transition class to body
    document.body.classList.add('language-transition');
    
    // Small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    await i18n.changeLanguage(newLang);
    
    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove('language-transition');
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    // Update document direction based on language with smooth transition
    const newDir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    
    // Add transition class before changing direction
    document.documentElement.style.transition = 'all 0.3s ease-in-out';
    document.documentElement.dir = newDir;
    document.documentElement.lang = i18n.language;
    
    // Clean up transition after animation
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  }, [i18n.language]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      disabled={isTransitioning}
      className="gap-2 transition-all duration-300 hover:scale-105 hover:bg-accent/80 active:scale-95"
    >
      <Globe className={`h-4 w-4 transition-transform duration-300 ${isTransitioning ? 'rotate-180' : ''}`} />
      <span className="transition-opacity duration-200">
        {i18n.language === 'en' ? 'العربية' : 'English'}
      </span>
    </Button>
  );
}