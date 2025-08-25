import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero page-transition">
      <div className="text-center animate-scale-in">
        <h1 className="text-6xl font-bold mb-4 text-white animate-fade-in-down">404</h1>
        <p className="text-xl text-white/90 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {t('common.pageNotFound')}
        </p>
        <p className="text-white/80 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {t('common.pageNotFoundDesc')}
        </p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 btn-hover-lift animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {t('common.returnHome')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
