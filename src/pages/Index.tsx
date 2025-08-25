// Update this page (the content is just a fallback if you fail to update the page)

import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero page-transition">
      <div className="text-center animate-scale-in">
        <h1 className="text-5xl font-bold mb-6 text-white animate-fade-in-down">
          {t('common.welcomeToSystem')}
        </h1>
        <p className="text-xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {t('common.startJourney')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <a 
            href="/login" 
            className="inline-flex items-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 btn-hover-lift"
          >
            {t('common.login')}
          </a>
          <a 
            href="/dashboard" 
            className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-all duration-300 btn-hover-lift"
          >
            {t('common.exploreSystem')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
