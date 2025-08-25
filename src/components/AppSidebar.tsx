import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  UserCheck,
  FileText,
  Settings,
  HelpCircle,
  MessageSquare,
  BookOpen,
  DollarSign,
  Menu,
  X,
  LogOut,
  UserCog
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/auth';
import { toast } from 'sonner';
import { LanguageSwitcher } from './LanguageSwitcher';

const navigationItems = [
  { key: 'dashboard.title', icon: Home, path: '/dashboard' },
  { key: 'vendors', icon: Users, path: '/vendors' },
  { key: 'clients', icon: UserCheck, path: '/clients' },
  { key: 'reports', icon: FileText, path: '/reports' },
  { key: 'users', icon: Users, path: '/users' },
  { key: 'settings', icon: Settings, path: '/settings' },
  { key: 'support', icon: HelpCircle, path: '/support' },
  { key: 'adminChat', icon: MessageSquare, path: '/admin-chat' },
];

export function AppSidebar() {
  const { t, i18n } = useTranslation();
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isRTL = i18n.language === 'ar';
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(isRTL ? 'تم تسجيل الخروج' : 'Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(isRTL ? 'خطأ في تسجيل الخروج' : 'Logout error');
    }
  };

  const handleSwitchAccount = async () => {
    try {
      await logout();
      navigate('/login');
      toast.info(isRTL ? 'يمكنك تسجيل الدخول بحساب آخر' : 'You can now log in with a different account');
    } catch (error) {
      console.error('Switch account error:', error);
      navigate('/login');
    }
  };

  return (
    <Sidebar 
      side={isRTL ? 'right' : 'left'}
      className={`${collapsed ? 'w-16' : 'w-64'} bg-gradient-card`}
    >
      <SidebarContent className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Logo Section */}
        <div className={`flex items-center gap-3 mb-8 px-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <DollarSign className="h-8 w-8 text-primary" />
          {!collapsed && (
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-xl font-bold text-primary">Debt-IQ</h1>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'إدارة الديون' : 'Debt Management'}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={!collapsed ? '' : 'sr-only'}>
            {t('navigation') || (isRTL ? 'التنقل' : 'Navigation')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth ${
                        isActive(item.path)
                          ? 'bg-primary text-primary-foreground shadow-card'
                          : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
                      } ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium">
                          {item.key === 'dashboard.title' ? t('dashboard.title') :
                           item.key === 'vendors' ? t('vendor.title') :
                           item.key === 'clients' ? t('client.title') :
                           item.key === 'reports' ? t('reports.title') :
                           item.key === 'users' ? t('users.title') :
                           item.key === 'settings' ? t('settings.title') :
                           item.key === 'support' ? t('support.title') :
                           item.key === 'adminChat' ? t('adminChat.title') :
                           t(item.key)}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* How to Use Section */}
        <SidebarGroup className="mt-8">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className={`flex items-center gap-3 px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-smooth ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <BookOpen className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="text-sm">{t('howToUse')}</span>
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Info & Auth Actions */}
        {!collapsed && user && (
          <div className="mt-auto pt-4 space-y-4">
            {/* User Info */}
            <div className={`px-3 py-2 bg-accent/20 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">
                    {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Auth Actions */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className={`w-full justify-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                onClick={handleSwitchAccount}
              >
                <UserCog className="h-4 w-4" />
                <span className="text-sm">{t('auth.switchAccount') || (isRTL ? 'تبديل الحساب' : 'Switch Account')}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 ${isRTL ? 'flex-row-reverse' : ''}`}
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">{t('auth.logout') || (isRTL ? 'خروج' : 'Log Out')}</span>
              </Button>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        )}

        {/* Language Switcher Only (when collapsed or no user) */}
        {(collapsed || !user) && (
          <div className="mt-auto pt-4">
            <LanguageSwitcher />
          </div>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}