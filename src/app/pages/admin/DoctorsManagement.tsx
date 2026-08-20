import { useState } from "react";
import { Plus, Edit, Trash2, Check, X, Stethoscope } from "lucide-react";
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
} from "../../components/ui/dialog";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  branch: string;
  workDays: string;
  slotDuration: number;
  status: "active" | "inactive";
  dailyCapacity: number;
}

const initialDoctors: Doctor[] = [
  { id: 1, name: "د. محمد الحارثي", specialty: "قلب وأوعية دموية", branch: "الفرع الرئيسي", workDays: "الأحد - الخميس", slotDuration: 20, status: "active", dailyCapacity: 15 },
  { id: 2, name: "د. إيمي شن", specialty: "طب عام", branch: "الفرع الرئيسي", workDays: "الأحد - الأربعاء", slotDuration: 15, status: "active", dailyCapacity: 20 },
  { id: 3, name: "د. سارة وليامز", specialty: "أطفال", branch: "فرع الشمال", workDays: "الاثنين - الجمعة", slotDuration: 20, status: "active", dailyCapacity: 12 },
  { id: 4, name: "د. جيمس أندرسون", specialty: "عظام", branch: "الفرع الرئيسي", workDays: "الأحد - الخميس", slotDuration: 30, status: "inactive", dailyCapacity: 10 },
];

const specialties = ["قلب وأوعية دموية", "طب عام", "أطفال", "عظام", "جلدية", "باطنة", "نساء وتوليد"];
const branches = ["الفرع الرئيسي", "فرع الشمال", "فرع الجنوب"];

export function DoctorsManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editTarget, setEditTarget] = useState<Doctor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Doctor | null>(null);

  const emptyForm: Omit<Doctor, "id"> = {
    name: "", specialty: specialties[0], branch: branches[0],
    workDays: "الأحد - الخميس", slotDuration: 20, status: "active", dailyCapacity: 15,
  };
  const [form, setForm] = useState<Omit<Doctor, "id">>(emptyForm);

  const openAdd = () => { setForm(emptyForm); setShowAddDialog(true); };
  const openEdit = (d: Doctor) => { setEditTarget(d); setForm({ name: d.name, specialty: d.specialty, branch: d.branch, workDays: d.workDays, slotDuration: d.slotDuration, status: d.status, dailyCapacity: d.dailyCapacity }); };

  const handleSave = () => {
    if (editTarget) {
      setDoctors((p) => p.map((d) => d.id === editTarget.id ? { ...d, ...form } : d));
      setEditTarget(null);
    } else {
      setDoctors((p) => [...p, { id: Date.now(), ...form }]);
      setShowAddDialog(false);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) { setDoctors((p) => p.filter((d) => d.id !== deleteTarget.id)); setDeleteTarget(null); }
  };

  const toggleStatus = (id: number) =>
    setDoctors((p) => p.map((d) => d.id === id ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d));

  const FormFields = () => (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label className="text-right block text-sm">اسم الطبيب</Label>
        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="د. الاسم" className="bg-input-background border-border rounded-xl text-right" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-right block text-sm">التخصص</Label>
          <select value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="w-full bg-input-background border border-border rounded-xl px-3 h-10 text-sm text-foreground text-right">
            {specialties.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-right block text-sm">الفرع</Label>
          <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className="w-full bg-input-background border border-border rounded-xl px-3 h-10 text-sm text-foreground text-right">
            {branches.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-right block text-sm">أيام العمل</Label>
        <Input value={form.workDays} onChange={(e) => setForm({ ...form, workDays: e.target.value })} className="bg-input-background border-border rounded-xl text-right" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-right block text-sm">مدة الكشف (دقيقة)</Label>
          <Input type="number" value={form.slotDuration} onChange={(e) => setForm({ ...form, slotDuration: Number(e.target.value) })} className="bg-input-background border-border rounded-xl text-right" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-right block text-sm">الطاقة اليومية</Label>
          <Input type="number" value={form.dailyCapacity} onChange={(e) => setForm({ ...form, dailyCapacity: Number(e.target.value) })} className="bg-input-background border-border rounded-xl text-right" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">إدارة الأطباء</h1>
          <Button onClick={openAdd} className="bg-primary hover:bg-primary/90 rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            إضافة طبيب
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {doctors.map((d) => (
            <Card key={d.id} className={`border-border shadow-sm transition-all ${d.status === "inactive" ? "opacity-60" : ""}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-foreground">{d.name}</h3>
                      <p className="text-sm text-muted-foreground">{d.specialty}</p>
                    </div>
                  </div>
                  <Badge
                    onClick={() => toggleStatus(d.id)}
                    className={`cursor-pointer text-xs ${d.status === "active" ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-600 border-gray-200"}`}
                    variant="outline"
                  >
                    {d.status === "active" ? "نشط" : "غير نشط"}
                  </Badge>
                </div>
                <div className="space-y-2 text-right">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الفرع</span>
                    <span className="text-muted-foreground">{d.branch}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">أيام العمل</span>
                    <span className="text-muted-foreground">{d.workDays}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">مدة الكشف</span>
                    <span className="text-muted-foreground">{d.slotDuration} دقيقة</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الطاقة اليومية</span>
                    <span className="text-muted-foreground">{d.dailyCapacity} مريض</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <Button size="sm" variant="outline" onClick={() => openEdit(d)} className="flex-1 rounded-lg gap-1 text-xs">
                    <Edit className="w-3.5 h-3.5" />
                    تعديل
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setDeleteTarget(d)} className="rounded-lg border-red-200 text-red-600 hover:bg-red-50 gap-1 text-xs px-3">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog || !!editTarget} onOpenChange={() => { setShowAddDialog(false); setEditTarget(null); }}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">{editTarget ? "تعديل بيانات الطبيب" : "إضافة طبيب جديد"}</DialogTitle>
          </DialogHeader>
          <FormFields />
          <DialogFooter className="gap-2">
            <Button onClick={handleSave} className="flex-1 rounded-xl gap-1">
              <Check className="w-4 h-4" />
              {editTarget ? "حفظ التعديلات" : "إضافة"}
            </Button>
            <Button variant="outline" onClick={() => { setShowAddDialog(false); setEditTarget(null); }} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-right">حذف الطبيب</DialogTitle>
          </DialogHeader>
          {deleteTarget && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-right">
              <p className="font-bold">{deleteTarget.name}</p>
              <p className="text-sm text-muted-foreground">{deleteTarget.specialty}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={handleDelete} className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl gap-1">
              <Trash2 className="w-4 h-4" />
              حذف
            </Button>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
