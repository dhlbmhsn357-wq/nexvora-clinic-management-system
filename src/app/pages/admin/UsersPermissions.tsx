import { useState } from "react";
import { Plus, Edit, Trash2, Check, Shield, Stethoscope, MonitorSpeaker, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../../components/ui/dialog";

type Role = "admin" | "doctor" | "reception" | "patient";

interface SystemUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: "active" | "inactive";
  lastLogin: string;
}

const roleConfig: Record<Role, { label: string; icon: typeof User; cls: string; color: string }> = {
  admin: { label: "مدير النظام", icon: Shield, cls: "bg-purple-100 text-purple-700 border-purple-200", color: "text-purple-600" },
  doctor: { label: "طبيب", icon: Stethoscope, cls: "bg-blue-100 text-blue-700 border-blue-200", color: "text-blue-600" },
  reception: { label: "استقبال", icon: MonitorSpeaker, cls: "bg-teal-100 text-teal-700 border-teal-200", color: "text-teal-600" },
  patient: { label: "مريض", icon: User, cls: "bg-gray-100 text-gray-700 border-gray-200", color: "text-gray-600" },
};

const permissions: Record<Role, string[]> = {
  admin: ["عرض جميع البيانات", "إدارة الأطباء والجداول", "إدارة المستخدمين", "عرض التقارير الكاملة", "إدارة الفروع والخدمات", "تعديل الإعدادات"],
  doctor: ["عرض مواعيد اليوم", "فتح ملف المريض السريري", "إنشاء الوصفات الطبية", "طلبات التحاليل والأشعة", "إنهاء الزيارة وحفظها"],
  reception: ["عرض جميع المواعيد", "إنشاء وتعديل الحجوزات", "تسجيل وصول المرضى", "إدارة قوائم الانتظار", "الملف الإداري للمريض فقط"],
  patient: ["عرض مواعيده الخاصة", "حجز موعد", "إلغاء موعد قبل الموعد", "عرض ملخص زيارة واحدة"],
};

const initialUsers: SystemUser[] = [
  { id: 1, name: "أحمد مدير", email: "admin@clinic.com", role: "admin", status: "active", lastLogin: "منذ ساعة" },
  { id: 2, name: "د. محمد الحارثي", email: "mharthy@clinic.com", role: "doctor", status: "active", lastLogin: "منذ 30 دقيقة" },
  { id: 3, name: "د. إيمي شن", email: "aichen@clinic.com", role: "doctor", status: "active", lastLogin: "منذ ساعتين" },
  { id: 4, name: "ليلى الزهراني", email: "lzahrani@clinic.com", role: "reception", status: "active", lastLogin: "منذ 10 دقائق" },
  { id: 5, name: "نورة الحربي", email: "nharbi@clinic.com", role: "reception", status: "inactive", lastLogin: "منذ أسبوع" },
];

export function UsersPermissions() {
  const [users, setUsers] = useState<SystemUser[]>(initialUsers);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editTarget, setEditTarget] = useState<SystemUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SystemUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>("admin");

  const emptyForm = { name: "", email: "", role: "reception" as Role, status: "active" as const };
  const [form, setForm] = useState(emptyForm);

  const handleSave = () => {
    if (editTarget) {
      setUsers((p) => p.map((u) => u.id === editTarget.id ? { ...u, name: form.name, email: form.email, role: form.role, status: form.status } : u));
      setEditTarget(null);
    } else {
      setUsers((p) => [...p, { id: Date.now(), ...form, lastLogin: "جديد" }]);
      setShowAddDialog(false);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) { setUsers((p) => p.filter((u) => u.id !== deleteTarget.id)); setDeleteTarget(null); }
  };

  const filteredUsers = users.filter((u) => u.role === selectedRole);

  const roleCount = (r: Role) => users.filter((u) => u.role === r).length;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">المستخدمون والصلاحيات</h1>
          <Button onClick={() => { setForm(emptyForm); setShowAddDialog(true); }} className="bg-primary hover:bg-primary/90 rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            إضافة مستخدم
          </Button>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Role tabs */}
        <div className="flex gap-2">
          {(["admin", "doctor", "reception", "patient"] as Role[]).map((r) => {
            const cfg = roleConfig[r];
            const Icon = cfg.icon;
            const active = selectedRole === r;
            return (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${active ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-primary" : cfg.color}`} />
                {cfg.label}
                <span className="bg-muted rounded-full px-1.5 py-0.5 text-xs font-bold">{roleCount(r)}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users list */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-base">
                  {roleConfig[selectedRole].label}s ({filteredUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {filteredUsers.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground text-sm">لا يوجد مستخدمون في هذا الدور</p>
                ) : (
                  <div className="divide-y divide-border">
                    {filteredUsers.map((u) => {
                      const cfg = roleConfig[u.role];
                      const Icon = cfg.icon;
                      return (
                        <div key={u.id} className="flex items-center justify-between px-5 py-4 hover:bg-muted/10">
                          <div className="flex items-center gap-4">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${u.status === "active" ? "bg-primary/10" : "bg-muted"}`}>
                              <Icon className={`w-4 h-4 ${u.status === "active" ? cfg.color : "text-muted-foreground"}`} />
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-foreground">{u.name}</p>
                              <p className="text-xs text-muted-foreground" dir="ltr" style={{textAlign:"right"}}>{u.email}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className={`text-xs ${u.status === "active" ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-600"}`}>
                                {u.status === "active" ? "نشط" : "غير نشط"}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">{u.lastLogin}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => { setEditTarget(u); setForm({ name: u.name, email: u.email, role: u.role, status: u.status }); }} className="h-7 text-xs rounded-lg gap-1">
                              <Edit className="w-3 h-3" />
                              تعديل
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setDeleteTarget(u)} className="h-7 text-xs rounded-lg border-red-200 text-red-600 hover:bg-red-50">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Permissions panel */}
          <div>
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-4 h-4 text-primary" />
                  صلاحيات {roleConfig[selectedRole].label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {permissions[selectedRole].map((p) => (
                    <div key={p} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <p className="text-sm text-foreground text-right">{p}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-right mt-3">
                  الصلاحيات محددة على مستوى النظام ولا يمكن تعديلها يدوياً لكل مستخدم.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add/Edit */}
      <Dialog open={showAddDialog || !!editTarget} onOpenChange={() => { setShowAddDialog(false); setEditTarget(null); }}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">{editTarget ? "تعديل مستخدم" : "إضافة مستخدم جديد"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-right block text-sm">الاسم</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-input-background border-border rounded-xl text-right" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-right block text-sm">البريد الإلكتروني</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-input-background border-border rounded-xl text-right" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-right block text-sm">الدور</Label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })} className="w-full bg-input-background border border-border rounded-xl px-3 h-10 text-sm text-right">
                  {(["admin", "doctor", "reception", "patient"] as Role[]).map((r) => (
                    <option key={r} value={r}>{roleConfig[r].label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-right block text-sm">الحالة</Label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive" })} className="w-full bg-input-background border border-border rounded-xl px-3 h-10 text-sm text-right">
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button onClick={handleSave} className="flex-1 rounded-xl">{editTarget ? "حفظ" : "إضافة"}</Button>
            <Button variant="outline" onClick={() => { setShowAddDialog(false); setEditTarget(null); }} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-right">حذف المستخدم</DialogTitle>
            <DialogDescription className="text-right">هذا الإجراء لا يمكن التراجع عنه.</DialogDescription>
          </DialogHeader>
          {deleteTarget && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-right">
              <p className="font-bold">{deleteTarget.name}</p>
              <p className="text-sm text-muted-foreground">{deleteTarget.email}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={handleDelete} className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl">حذف</Button>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
