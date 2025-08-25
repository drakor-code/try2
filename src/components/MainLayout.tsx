import { useTranslation } from 'react-i18next';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { i18n } = useTranslation();
  const currentTime = new Date().toLocaleString(i18n.language === 'ar' ? 'ar-SA' : 'en-US');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-white/50 backdrop-blur-sm flex items-center justify-between px-6">
            <div className={`flex items-center gap-4 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <SidebarTrigger 
                className={`${i18n.language === 'ar' ? 'sidebar-trigger-rtl' : ''} z-50 relative`} 
                style={{ display: 'flex', visibility: 'visible', opacity: 1 }}
              />
              <div className="text-sm text-muted-foreground">
                {currentTime}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="h-12 border-t bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-xs text-muted-foreground">
              Debt-IQ v1.0 - Powered by Afnan IT Solutions
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}