import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  Building2, 
  HelpCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';

const Support = () => {
  const { t } = useTranslation();

  const contactMethods = [
    {
      icon: Phone,
      title: t('support.phone'),
      value: '+966 50 123 4567',
      description: t('support.phoneDesc'),
      action: t('support.callNow'),
    },
    {
      icon: Mail,
      title: t('support.email'),
      value: 'support@afnan-it.com',
      description: t('support.emailDesc'),
      action: t('support.sendMessage'),
    },
    {
      icon: MessageCircle,
      title: t('support.liveChat'),
      value: t('support.available247'),
      description: t('support.chatDesc'),
      action: t('support.startChat'),
    },
  ];

  const helpResources = [
    {
      icon: BookOpen,
      title: t('support.userGuide'),
      description: t('support.userGuideDesc'),
    },
    {
      icon: HelpCircle,
      title: t('support.faq'),
      description: t('support.faqDesc'),
    },
    {
      icon: Globe,
      title: t('support.training'),
      description: t('support.trainingDesc'),
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 space-y-6 page-transition">
        {/* Header Section */}
        <div className="flex items-center justify-between animate-fade-in-down">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('support.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('support.description')}
            </p>
          </div>
        </div>

        {/* Company Info */}
        <Card className="shadow-card bg-gradient-card border-primary/20 animate-fade-in-up card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Building2 className="h-6 w-6" />
              {t('support.companyInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">{t('support.aboutCompany')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('support.aboutDesc')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('support.services')}</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>{t('support.service1')}</li>
                  <li>{t('support.service2')}</li>
                  <li>{t('support.service3')}</li>
                  <li>{t('support.service4')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-elegant transition-all duration-300 animate-scale-in card-hover btn-hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <method.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{method.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="font-semibold text-primary">{method.value}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
                <Button variant="outline" className="w-full btn-hover-lift">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Resources */}
        <Card className="shadow-card animate-slide-in-left card-hover" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle>{t('support.helpResources')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {helpResources.map((resource, index) => (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg hover:bg-accent/20 transition-all duration-300 cursor-pointer btn-hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${(index + 5) * 0.05}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <resource.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Website Link */}
        <Card className="shadow-card animate-slide-in-right card-hover" style={{ animationDelay: '0.5s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg transition-all duration-300 hover:bg-primary/20">
                  <Globe className="h-6 w-6 text-primary transition-transform duration-300 hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-semibold transition-colors duration-300">{t('support.website')}</h3>
                  <p className="text-muted-foreground">{t('support.websiteDesc')}</p>
                </div>
              </div>
              <Button variant="premium" className="btn-hover-lift">
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('support.visitWebsite')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Support;