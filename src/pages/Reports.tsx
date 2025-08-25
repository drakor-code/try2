import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Users, Building2, DollarSign, CreditCard } from 'lucide-react';

const Reports = () => {
  const { t } = useTranslation();

  const reportTypes = [
    {
      id: 1,
      title: t('reports.vendorDebts'),
      description: t('reports.vendorDebtsDesc'),
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      title: t('reports.clientDebts'),
      description: t('reports.clientDebtsDesc'),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 3,
      title: t('reports.cashPayments'),
      description: t('reports.cashPaymentsDesc'),
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 4,
      title: t('reports.transfers'),
      description: t('reports.transfersDesc'),
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 space-y-6 page-transition">
        {/* Header Section */}
        <div className="flex items-center justify-between animate-fade-in-down">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('reports.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('reports.description')}
            </p>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report, index) => (
            <Card 
              key={report.id} 
              className="shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer animate-scale-in card-hover btn-hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${report.bgColor}`}>
                    <report.icon className={`h-6 w-6 ${report.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {report.description}
                </p>
                <div className="flex gap-2">
                  <Button variant="premium" size="sm" className="flex-1 btn-hover-lift">
                    <FileText className="h-4 w-4 mr-2" />
                    {t('reports.viewReport')}
                  </Button>
                  <Button variant="outline" size="sm" className="btn-hover-lift">
                    <Download className="h-4 w-4 mr-2" />
                    {t('reports.exportPdf')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="shadow-card animate-slide-in-left card-hover" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-50 transition-all duration-300 hover:bg-blue-100">
                  <Building2 className="h-6 w-6 text-blue-600 transition-transform duration-300 hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold transition-colors duration-300">15</h3>
                  <p className="text-sm text-muted-foreground">{t('reports.totalVendors')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card animate-scale-in card-hover" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-50 transition-all duration-300 hover:bg-green-100">
                  <Users className="h-6 w-6 text-green-600 transition-transform duration-300 hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold transition-colors duration-300">28</h3>
                  <p className="text-sm text-muted-foreground">{t('reports.totalClients')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card animate-slide-in-right card-hover" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-50 transition-all duration-300 hover:bg-purple-100">
                  <DollarSign className="h-6 w-6 text-purple-600 transition-transform duration-300 hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold transition-colors duration-300">342</h3>
                  <p className="text-sm text-muted-foreground">{t('reports.totalTransactions')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;