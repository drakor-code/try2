import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/MainLayout';
import { mockAPI, Client } from '@/lib/mock-data';
import { formatIQDFallback, getDebtBadgeVariant } from '@/lib/currency';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, RefreshCw, Eye, Printer } from 'lucide-react';

const Clients = () => {
  const { t } = useTranslation();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '+964',
    email: '',
    debt: ''
  });

  // Fetch clients data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        await mockAPI.delay();
        const data = await mockAPI.getClients();
        setClients(data);
      } catch (error) {
        toast.error('فشل في جلب بيانات الزبائن');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف الزبون "${name}"؟`)) {
      setClients(prev => prev.filter(client => client.id !== id));
      toast.success('تم حذف الزبون بنجاح');
    }
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      await mockAPI.delay();
      const data = await mockAPI.getClients();
      setClients(data);
      toast.success('تم تحديث البيانات');
    } catch (error) {
      toast.error('فشل في تحديث البيانات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      phone: '+964',
      email: '',
      debt: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      phone: client.phone,
      email: client.email,
      debt: client.totalDebt?.toString() || ''
    });
    setIsDialogOpen(true);
  };

  const handleSaveClient = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const now = new Date();
    let clientId = editingClient?.id;
    
    if (!editingClient) {
      // Generate sequential client ID (simple numbers)
      const maxId = clients.reduce((max, client) => {
        const idNum = parseInt(client.id);
        return idNum > max ? idNum : max;
      }, 0);
      clientId = (maxId + 1).toString();
    }

    const clientData = {
      id: clientId,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      totalDebt: parseFloat(formData.debt) || 0,
      createdAt: editingClient?.createdAt || now.toISOString()
    };

    if (editingClient) {
      setClients(prev => prev.map(c => c.id === editingClient.id ? clientData : c));
      toast.success('تم تحديث الزبون بنجاح');
    } else {
      setClients(prev => [...prev, clientData]);
      toast.success('تم إضافة الزبون بنجاح');
    }

    setIsDialogOpen(false);
  };

  const handlePrintClient = (client: Client) => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #7c3aed;">Debt-IQ</h1>
          <h2>بيانات الزبون</h2>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>رقم الزبون:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${client.id}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>الاسم:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${client.name}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>الهاتف:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${client.phone}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>الإيميل:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${client.email}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>المديونية:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${formatIQDFallback(client.totalDebt || 0)}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>تاريخ الإنشاء:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${new Date(client.createdAt).toLocaleDateString('ar-IQ')}</td></tr>
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
      <div className="p-6 space-y-6 page-transition">
        {/* Header Section */}
        <div className="flex items-center justify-between animate-fade-in-down">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('client.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('client.trackDebts')}
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
            <Button variant="premium" size="sm" className="btn-hover-lift" onClick={handleAddClient}>
              <Plus className="h-4 w-4 mr-2" />
              {t('client.addClient')}
            </Button>
          </div>
        </div>

        {/* Clients Table */}
        <Card className="shadow-card animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-xl">{t('client.clientsList') || 'قائمة الزبائن'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-accent/20">
                  <TableHead className="text-right font-semibold">{t('client.clientId')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('client.name')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('client.phone')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('client.email')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('client.totalDebt')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('client.createdAt')}</TableHead>
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
                ) : clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      {t('common.noData')}
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client, index) => (
                    <TableRow 
                      key={client.id} 
                      className="hover:bg-accent/10 transition-all duration-300 hover:scale-[1.01] animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="font-medium text-right">{client.id}</TableCell>
                      <TableCell className="text-right font-medium">{client.name}</TableCell>
                      <TableCell className="text-right">{client.phone}</TableCell>
                      <TableCell className="text-right">{client.email}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={getDebtBadgeVariant(client.totalDebt || 0)}>
                          {formatIQDFallback(client.totalDebt || 0)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {new Date(client.createdAt).toLocaleDateString('ar-IQ')}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="btn-hover-lift"
                            onClick={() => handlePrintClient(client)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="btn-hover-lift"
                            onClick={() => handleEditClient(client)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(client.id, client.name)}
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

        {/* Add/Edit Client Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? t('client.editClient') : t('client.addClient')}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('client.name')} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('client.name')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">{t('client.phone')} *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+964"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('client.email')} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="example@email.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="debt">{t('client.totalDebt')} ({t('common.iqd')})</Label>
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
              <Button onClick={handleSaveClient}>
                {t('actions.save')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Clients;