import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Users, UserCheck, TrendingUp, TrendingDown, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MainLayout } from '@/components/MainLayout';
import { mockAPI, DashboardStats } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function Dashboard() {
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      console.log('Fetching dashboard data...');
      try {
        setIsLoading(true);
        await mockAPI.delay(); // Simulate API delay
        const result = await mockAPI.getDashboard();
        console.log('Dashboard API result:', result);
        setDashboardData(result);
        setError(null);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('فشل في جلب بيانات لوحة التحكم');
        toast.error('فشل في جلب بيانات لوحة التحكم');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  console.log('Dashboard state:', { dashboardData, isLoading, error });

  const summary = dashboardData;
  console.log('Summary data:', summary);

  const debtCards = [
    {
      title: t('dashboard.clientsDebt') || 'ديون العملاء',
      value: summary ? `${summary.clientDebts.total.toLocaleString('ar-IQ')} د.ع` : '0 د.ع',
      change: summary?.clientDebts.active > 0 ? `${summary.clientDebts.active} نشط` : 'ما كو ديون',
      trend: 'up' as const,
      icon: UserCheck,
      color: 'text-success',
      subtitle: summary ? `${summary.clientDebts.overdue} متأخر` : '0 متأخر'
    },
    {
      title: t('dashboard.vendorsDebt') || 'ديون الموردين', 
      value: summary ? `${summary.vendorDebts.total.toLocaleString('ar-IQ')} د.ع` : '0 د.ع',
      change: summary?.vendorDebts.active > 0 ? `${summary.vendorDebts.active} نشط` : 'ما كو ديون',
      trend: 'down' as const,
      icon: Users,
      color: 'text-warning',
      subtitle: summary ? `${summary.vendorDebts.overdue} متأخر` : '0 متأخر'
    }
  ];

  if (isLoading) {
    console.log('Dashboard is loading...');
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">جاري تحميل البيانات...</span>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    console.error('Dashboard error:', error);
    toast.error('صار خطأ بتحميل البيانات');
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <span className="ml-2">صار خطأ بتحميل البيانات</span>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 page-transition">
        {/* Page Header */}
        <div className="animate-fade-in-down">
          <h1 className="text-3xl font-bold text-foreground">
            {t('dashboard.title')}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t('dashboard.overview') || 'نظرة عامة على نظام إدارة الديون'}
          </p>
        </div>

        {/* Debt Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {debtCards.map((card, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card shadow-card animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className="p-2 bg-accent/50 rounded-lg">
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-foreground">
                      {card.value}
                    </div>
                    <div className="flex items-center mt-2">
                      {card.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-success mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-warning mr-1" />
                      )}
                      <span className={`text-sm ${
                        card.trend === 'up' ? 'text-success' : 'text-warning'
                      }`}>
                        {card.change}
                      </span>
                    </div>
                    {card.subtitle && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {card.subtitle}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="bg-gradient-card shadow-card animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('dashboard.totalReceivable') || 'إجمالي المستحقات'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {summary.summary.totalReceivable.toLocaleString('ar-IQ')} {t('common.iqd') || 'د.ع'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.receivableDesc') || 'المبلغ المستحق من العملاء'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('dashboard.totalPayable') || 'إجمالي المدفوعات'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {summary.summary.totalPayable.toLocaleString('ar-IQ')} {t('common.iqd') || 'د.ع'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.payableDesc') || 'المبلغ المستحق للموردين'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('dashboard.netPosition') || 'صافي الموقف'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${
                  summary.summary.netPosition >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {Math.abs(summary.summary.netPosition).toLocaleString('ar-IQ')} {t('common.iqd') || 'د.ع'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {summary.summary.netPosition >= 0 ? (t('dashboard.surplus') || 'فائض') : (t('dashboard.deficit') || 'عجز')}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold mb-4">{t('dashboard.quickActions') || 'إجراءات سريعة'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 hover:shadow-card transition-all duration-300 cursor-pointer card-hover btn-hover-lift" onClick={() => window.location.href = '/vendors'}>
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-primary transition-transform duration-300 hover:scale-110" />
                <div>
                  <h3 className="font-semibold">{t('dashboard.manageVendors') || 'إدارة الموردين'}</h3>
                  <p className="text-sm text-muted-foreground">{t('dashboard.manageVendorsDesc') || 'إضافة أو تعديل معلومات الموردين'}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-card transition-all duration-300 cursor-pointer card-hover btn-hover-lift" onClick={() => window.location.href = '/clients'}>
              <div className="flex items-center gap-4">
                <UserCheck className="h-8 w-8 text-primary transition-transform duration-300 hover:scale-110" />
                <div>
                  <h3 className="font-semibold">{t('client.manageClients') || 'إدارة العملاء'}</h3>
                  <p className="text-sm text-muted-foreground">{t('dashboard.manageClientsDesc') || 'إضافة أو تعديل معلومات العملاء'}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-card transition-all duration-300 cursor-pointer card-hover btn-hover-lift" onClick={() => window.location.href = '/reports'}>
              <div className="flex items-center gap-4">
                <TrendingUp className="h-8 w-8 text-primary transition-transform duration-300 hover:scale-110" />
                <div>
                  <h3 className="font-semibold">{t('reports.viewReport') || 'عرض التقارير'}</h3>
                  <p className="text-sm text-muted-foreground">{t('dashboard.viewReportsDesc') || 'إنشاء تقارير الديون والمدفوعات'}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}