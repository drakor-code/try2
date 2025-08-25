import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, RefreshCw, Eye, Printer, X } from 'lucide-react';
import { formatIQDFallback, getDebtBadgeVariant } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MainLayout } from '@/components/MainLayout';
import { mockAPI, Vendor } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function Vendors() {
  const { t } = useTranslation();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '+964',
    email: '',
    debt: ''
  });

  // Fetch vendors data
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setIsLoading(true);
        await mockAPI.delay();
        const data = await mockAPI.getVendors();
        setVendors(data);
      } catch (error) {
        toast.error('فشل في جلب بيانات الموردين');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف المورد "${name}"؟`)) {
      setVendors(prev => prev.filter(vendor => vendor.id !== id));
      toast.success('تم حذف المورد بنجاح');
    }
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      await mockAPI.delay();
      const data = await mockAPI.getVendors();
      setVendors(data);
      toast.success('تم تحديث البيانات');
    } catch (error) {
      toast.error('فشل في تحديث البيانات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVendor = () => {
    setEditingVendor(null);
    setFormData({
      name: '',
      phone: '+964',
      email: '',
      debt: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name,
      phone: vendor.phone,
      email: vendor.email,
      debt: vendor.totalOwed?.toString() || ''
    });
    setIsDialogOpen(true);
  };

  const handleSaveVendor = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const now = new Date();
    let vendorId = editingVendor?.id;
    
    if (!editingVendor) {
      // Generate sequential vendor ID (simple numbers)
      const maxId = vendors.reduce((max, vendor) => {
        const idNum = parseInt(vendor.id);
        return idNum > max ? idNum : max;
      }, 0);
      vendorId = (maxId + 1).toString();
    }

    const vendorData = {
      id: vendorId,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      totalOwed: parseFloat(formData.debt) || 0,
      createdAt: editingVendor?.createdAt || now.toISOString()
    };

    if (editingVendor) {
      setVendors(prev => prev.map(v => v.id === editingVendor.id ? vendorData : v));
      toast.success('تم تحديث المورد بنجاح');
    } else {
      setVendors(prev => [...prev, vendorData]);
      toast.success('تم إضافة المورد بنجاح');
    }

    setIsDialogOpen(false);
  };

  const handlePrintVendor = (vendor: Vendor) => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #7c3aed;">Debt-IQ</h1>
          <h2>بيانات المورد</h2>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>رقم المورد:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${vendor.id}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>الاسم:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${vendor.name}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>الهاتف:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${vendor.phone}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>الإيميل:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${vendor.email}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>المديونية:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${formatIQDFallback(vendor.totalOwed || 0)}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>تاريخ الإنشاء:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${new Date(vendor.createdAt).toLocaleDateString('ar-IQ')}</td></tr>
        </table>
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
          تم الطباعة في: ${new Date().toLocaleString('ar-IQ')}
        </div>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(printContent);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <MainLayout>
      <div className="space-y-6 page-transition">
        {/* Page Header */}
        <div className="flex justify-between items-center animate-fade-in-down">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('vendor.title')}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t('vendor.description') || 'إدارة بيانات الموردين ومتابعة الديون'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleRefresh} className="btn-hover-lift">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('actions.refresh')}
            </Button>
            <Button variant="outline" size="sm" className="btn-hover-lift">
              <Eye className="h-4 w-4 mr-2" />
              {t('actions.showAll')}
            </Button>
            <Button variant="hero" className="gap-2 btn-hover-lift" onClick={handleAddVendor}>
              <Plus className="h-4 w-4" />
              {t('vendor.addVendor')}
            </Button>
          </div>
        </div>

        {/* Vendors Table */}
        <Card className="shadow-card animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-xl">{t('vendor.vendorsList') || 'قائمة الموردين'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-accent/20">
                  <TableHead className="text-right font-semibold">{t('vendor.id')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('vendor.name')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('vendor.phone')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('vendor.email')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('vendor.debt')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('vendor.createdAt')}</TableHead>
                  <TableHead className="text-center font-semibold">{t('users.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      {t('common.loadingData')}
                    </TableCell>
                  </TableRow>
                ) : vendors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      {t('common.noData')}
                    </TableCell>
                  </TableRow>
                ) : (
                  vendors.map((vendor, index) => (
                    <TableRow 
                      key={vendor.id}
                      className="hover:bg-accent/10 transition-all duration-300 hover:scale-[1.01] animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="font-medium text-right">{vendor.id}</TableCell>
                      <TableCell className="text-right font-medium">{vendor.name}</TableCell>
                      <TableCell className="text-right">{vendor.phone}</TableCell>
                      <TableCell className="text-right">{vendor.email}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={getDebtBadgeVariant(vendor.totalOwed || 0)}>
                          {formatIQDFallback(vendor.totalOwed || 0)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {new Date(vendor.createdAt).toLocaleDateString('ar-IQ')}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="btn-hover-lift"
                            onClick={() => handlePrintVendor(vendor)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="btn-hover-lift"
                            onClick={() => handleEditVendor(vendor)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(vendor.id, vendor.name)}
                            disabled={isLoading}
                            className="btn-hover-lift"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add/Edit Vendor Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingVendor ? t('vendor.editVendor') : t('vendor.addVendor')}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('vendor.name')} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('vendor.name')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">{t('vendor.phone')} *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+964"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('vendor.email')} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="example@email.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="debt">{t('vendor.debt')} ({t('common.iqd')})</Label>
                <Input
                  id="debt"
                  type="number"
                  value={formData.debt}
                  onChange={(e) => setFormData(prev => ({ ...prev, debt: e.target.value }))}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {t('actions.cancel')}
              </Button>
              <Button onClick={handleSaveVendor}>
                {t('actions.save')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}