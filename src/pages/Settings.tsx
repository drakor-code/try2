import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, Upload, Download, RotateCcw, Building2, FileImage } from 'lucide-react';

const Settings = () => {
  const { t } = useTranslation();
  const [companyName, setCompanyName] = useState('شركة الديون الذكية');
  const [companyDescription, setCompanyDescription] = useState('نظام إدارة الديون والمالية الشخصية');

  const handleSaveSettings = () => {
    toast.success('تم حفظ الإعدادات بنجاح');
  };

  const handleBackupDatabase = () => {
    toast.success('تم إنشاء نسخة احتياطية من قاعدة البيانات');
  };

  const handleRestoreDatabase = () => {
    toast.success('تم استعادة قاعدة البيانات بنجاح');
  };

  const handleLogoUpload = () => {
    toast.success('تم رفع الشعار بنجاح');
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 page-transition">
        {/* Header Section */}
        <div className="flex items-center justify-between animate-fade-in-down">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('settings.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('settings.description')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Settings */}
          <Card className="shadow-card animate-slide-in-left card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {t('settings.companySettings')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">{t('settings.companyName')}</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={t('settings.companyName')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyDescription">{t('settings.companyDescription')}</Label>
                <Textarea
                  id="companyDescription"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  placeholder={t('settings.companyDescription')}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>{t('settings.companyLogo')}</Label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <FileImage className="h-8 w-8 text-white" />
                  </div>
                  <Button variant="outline" onClick={handleLogoUpload} className="btn-hover-lift">
                    <Upload className="h-4 w-4 mr-2" />
                    {t('settings.uploadNewLogo')}
                  </Button>
                </div>
              </div>

              <Button onClick={handleSaveSettings} className="w-full btn-hover-lift">
                <Save className="h-4 w-4 mr-2" />
                {t('settings.saveSettings')}
              </Button>
            </CardContent>
          </Card>

          {/* Database Management */}
          <Card className="shadow-card animate-slide-in-right card-hover" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                {t('settings.databaseManagement')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">{t('settings.backup')}</h4>
                <p className="text-sm text-blue-700 mb-3">
                  {t('settings.backupDesc')}
                </p>
                <Button variant="outline" onClick={handleBackupDatabase} className="w-full btn-hover-lift">
                  <Download className="h-4 w-4 mr-2" />
                  {t('settings.createBackup')}
                </Button>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">{t('settings.restore')}</h4>
                <p className="text-sm text-orange-700 mb-3">
                  {t('settings.restoreDesc')}
                </p>
                <Button variant="outline" onClick={handleRestoreDatabase} className="w-full btn-hover-lift">
                  <Upload className="h-4 w-4 mr-2" />
                  {t('settings.restoreFromBackup')}
                </Button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">{t('settings.systemInfo')}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>{t('settings.systemVersion')}:</span>
                    <span className="font-mono">v1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('settings.lastBackup')}:</span>
                    <span>2024-08-03</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('settings.databaseSize')}:</span>
                    <span>2.4 MB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;