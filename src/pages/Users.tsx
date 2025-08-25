import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/MainLayout';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, RefreshCw, Eye, Shield, User } from 'lucide-react';

// Mock data for users
const initialUsers = [
  {
    id: 1,
    fullName: 'أحمد محمد الإدارة',
    username: 'admin',
    email: 'admin@debt-iq.com',
    role: 'Admin',
    createdAt: '2024-01-01',
    lastLogin: '2024-08-03',
  },
  {
    id: 2,
    fullName: 'سارة أحمد',
    username: 'sara.ahmed',
    email: 'sara@debt-iq.com',
    role: 'Staff',
    createdAt: '2024-02-15',
    lastLogin: '2024-08-02',
  },
  {
    id: 3,
    fullName: 'محمد علي',
    username: 'mohammed.ali',
    email: 'mohammed@debt-iq.com',
    role: 'Staff',
    createdAt: '2024-03-10',
    lastLogin: '2024-07-30',
  },
];

const Users = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    role: 'Staff'
  });

  const getRoleIcon = (role: string) => {
    return role === 'Admin' ? Shield : User;
  };

  const getRoleBadgeVariant = (role: string) => {
    return role === 'Admin' ? 'default' : 'secondary';
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      fullName: '',
      username: '',
      email: '',
      role: 'Staff'
    });
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role
    });
    setIsDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!formData.fullName || !formData.username || !formData.email) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const now = new Date();
    const userId = editingUser?.id || Date.now();

    const userData = {
      id: userId,
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      role: formData.role,
      createdAt: editingUser?.createdAt || now.toISOString().split('T')[0],
      lastLogin: editingUser?.lastLogin || now.toISOString().split('T')[0]
    };

    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? userData : u));
      alert('تم تحديث المستخدم بنجاح');
    } else {
      setUsers(prev => [...prev, userData]);
      alert('تم إضافة المستخدم بنجاح');
    }

    setIsDialogOpen(false);
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    if (confirm(`هل أنت متأكد من حذف المستخدم "${userName}"؟`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      alert('تم حذف المستخدم بنجاح');
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 page-transition">
        {/* Header Section */}
        <div className="flex items-center justify-between animate-fade-in-down">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('users.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('users.description')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="btn-hover-lift">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('actions.refresh')}
            </Button>
            <Button variant="outline" size="sm" className="btn-hover-lift">
              <Eye className="h-4 w-4 mr-2" />
              {t('actions.showAll')}
            </Button>
            <Button variant="premium" size="sm" className="btn-hover-lift" onClick={handleAddUser}>
              <Plus className="h-4 w-4 mr-2" />
              {t('users.addUser')}
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <Card className="shadow-card animate-fade-in-up card-hover">
          <CardHeader>
            <CardTitle className="text-xl">{t('users.usersList')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-accent/20">
                  <TableHead className="text-right font-semibold">{t('users.fullName')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('users.username')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('client.email')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('users.role')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('users.createdAt')}</TableHead>
                  <TableHead className="text-right font-semibold">{t('users.lastLogin')}</TableHead>
                  <TableHead className="text-center font-semibold">{t('users.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <TableRow 
                      key={user.id} 
                      className="hover:bg-accent/10 transition-all duration-300 hover:scale-[1.01] animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="text-right font-medium">{user.fullName}</TableCell>
                      <TableCell className="text-right">{user.username}</TableCell>
                      <TableCell className="text-right">{user.email}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Badge variant={getRoleBadgeVariant(user.role)} className="gap-1">
                            <RoleIcon className="h-3 w-3" />
                            {user.role === 'Admin' ? t('users.admin') : t('users.staff')}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {user.createdAt}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="btn-hover-lift"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            disabled={user.role === 'Admin'} 
                            className="btn-hover-lift"
                            onClick={() => handleDeleteUser(user.id, user.fullName)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card animate-slide-in-left card-hover" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                  <Shield className="h-6 w-6 text-primary transition-transform duration-300 hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold transition-colors duration-300">1</h3>
                  <p className="text-sm text-muted-foreground">{t('users.admins')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card animate-slide-in-right card-hover" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary/10 transition-all duration-300 hover:bg-secondary/20">
                  <User className="h-6 w-6 text-secondary transition-transform duration-300 hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold transition-colors duration-300">2</h3>
                  <p className="text-sm text-muted-foreground">{t('users.employees')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit User Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? t('users.editUser') || 'تعديل المستخدم' : t('users.addUser')}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">{t('users.fullName')} *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder={t('users.fullName')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">{t('users.username')} *</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder={t('users.username')}
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
                <Label htmlFor="role">{t('users.role')} *</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('users.role')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">{t('users.admin')}</SelectItem>
                    <SelectItem value="Staff">{t('users.staff')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {t('actions.cancel')}
              </Button>
              <Button onClick={handleSaveUser}>
                {t('actions.save')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Users;