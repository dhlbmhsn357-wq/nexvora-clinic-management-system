import { useState } from "react";
import { User, Phone, Mail, Calendar, Edit, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const profileData = {
  name: "سارة أحمد",
  phone: "0501234567",
  email: "sara@example.com",
  birthDate: "1992-05-14",
  gender: "أنثى",
  bloodType: "A+",
  city: "الرياض",
  emergencyContact: "أحمد محمد (الأخ) - 0559876543",
};

const appointmentHistory = [
  { id: 1, date: "18 أغسطس 2026", doctor: "د. محمد الحارثي", specialty: "قلب", status: "completed", diagnosis: "ارتفاع ضغط الدم" },
  { id: 2, date: "10 يوليو 2026", doctor: "د. إيمي شن", specialty: "طب عام", status: "completed", diagnosis: "نزلة برد" },
  { id: 3, date: "5 مايو 2026", doctor: "د. سارة وليامز", specialty: "أطفال", status: "cancelled", diagnosis: "" },
  { id: 4, date: "22 مارس 2026", doctor: "د. محمد الحارثي", specialty: "قلب", status: "completed", diagnosis: "فحص دوري" },
];

const statusCfg: Record<string, { label: string; cls: string }> = {
  completed: { label: "مكتملة", cls: "bg-green-100 text-green-700 border-green-200" },
  cancelled: { label: "ملغاة", cls: "bg-red-100 text-red-700 border-red-200" },
  upcoming: { label: "قادمة", cls: "bg-blue-100 text-blue-700 border-blue-200" },
};

export function PatientProfile() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profileData });

  const handleSave = () => setEditing(false);
  const handleCancel = () => { setForm({ ...profileData }); setEditing(false); };

  const age = new Date().getFullYear() - new Date(profileData.birthDate).getFullYear();

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-foreground text-right">الملف الشخصي</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="lg:col-span-1">
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{form.name}</h2>
                <p className="text-muted-foreground text-sm">{age} سنة • {form.gender}</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">{form.bloodType}</Badge>
                  <Badge variant="outline" className="text-xs">{form.city}</Badge>
                </div>
                <Button
                  onClick={() => setEditing(!editing)}
                  variant={editing ? "outline" : "default"}
                  className="w-full mt-4 rounded-xl gap-2 text-sm"
                  size="sm"
                >
                  <Edit className="w-3.5 h-3.5" />
                  {editing ? "إلغاء التعديل" : "تعديل البيانات"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile details */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-base">البيانات الشخصية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-right block text-sm">الاسم</Label>
                        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-input-background border-border rounded-xl text-right" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-right block text-sm">رقم الهاتف</Label>
                        <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-input-background border-border rounded-xl text-right" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-right block text-sm">البريد الإلكتروني</Label>
                      <Input type="email" dir="ltr" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-input-background border-border rounded-xl text-left" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-right block text-sm">تاريخ الميلاد</Label>
                        <Input type="date" dir="ltr" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} className="bg-input-background border-border rounded-xl" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-right block text-sm">المدينة</Label>
                        <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="bg-input-background border-border rounded-xl text-right" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-right block text-sm">جهة اتصال الطوارئ</Label>
                      <Input value={form.emergencyContact} onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })} className="bg-input-background border-border rounded-xl text-right" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="flex-1 rounded-xl gap-1">
                        <Check className="w-4 h-4" />
                        حفظ التعديلات
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="rounded-xl px-4 gap-1">
                        <X className="w-4 h-4" />
                        إلغاء
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[
                      { label: "رقم الهاتف", value: form.phone, icon: Phone },
                      { label: "البريد الإلكتروني", value: form.email, icon: Mail },
                      { label: "تاريخ الميلاد", value: new Date(form.birthDate).toLocaleDateString("ar-SA"), icon: Calendar },
                      { label: "المدينة", value: form.city, icon: User },
                      { label: "جهة اتصال الطوارئ", value: form.emergencyContact, icon: Phone },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="flex items-center justify-between p-3 bg-muted/20 rounded-xl">
                        <p className="text-foreground font-medium">{value}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-sm">{label}</span>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Appointment history */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-right flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              سجل الزيارات
              <Badge variant="outline" className="text-xs">{appointmentHistory.length} زيارة</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {appointmentHistory.map((a) => {
                const cfg = statusCfg[a.status] ?? statusCfg.upcoming;
                return (
                  <div key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/10">
                    <div className="flex items-center gap-6">
                      <p className="text-sm font-medium text-foreground">{a.date}</p>
                      {a.diagnosis && <p className="text-sm text-muted-foreground hidden md:block">{a.diagnosis}</p>}
                      <div className="text-right">
                        <p className="font-medium text-foreground">{a.doctor}</p>
                        <p className="text-xs text-muted-foreground">{a.specialty}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${cfg.cls} text-xs`}>{cfg.label}</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
