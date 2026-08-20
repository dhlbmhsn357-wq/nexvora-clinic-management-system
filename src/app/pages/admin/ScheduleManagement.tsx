import { useState } from "react";
import { Calendar, Plus, Edit, Trash2, AlertCircle, Check } from "lucide-react";
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

const doctors = ["د. محمد الحارثي", "د. إيمي شن", "د. سارة وليامز", "د. جيمس أندرسون"];
const dayNames = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

interface Schedule {
  id: number;
  doctor: string;
  days: string[];
  startTime: string;
  endTime: string;
  branch: string;
  slotMinutes: number;
}

interface Exception {
  id: number;
  doctor: string;
  date: string;
  type: "إجازة" | "استثناء";
  note: string;
}

const initialSchedules: Schedule[] = [
  { id: 1, doctor: "د. محمد الحارثي", days: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"], startTime: "09:00", endTime: "14:00", branch: "الفرع الرئيسي", slotMinutes: 20 },
  { id: 2, doctor: "د. إيمي شن", days: ["الأحد", "الاثنين", "الأربعاء", "الخميس"], startTime: "10:00", endTime: "16:00", branch: "الفرع الرئيسي", slotMinutes: 15 },
  { id: 3, doctor: "د. سارة وليامز", days: ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"], startTime: "09:00", endTime: "13:00", branch: "فرع الشمال", slotMinutes: 20 },
];

const initialExceptions: Exception[] = [
  { id: 1, doctor: "د. محمد الحارثي", date: "2026-08-25", type: "إجازة", note: "إجازة سنوية" },
  { id: 2, doctor: "د. إيمي شن", date: "2026-08-20", type: "استثناء", note: "مؤتمر طبي" },
];

export function ScheduleManagement() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [exceptions, setExceptions] = useState<Exception[]>(initialExceptions);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [showAddException, setShowAddException] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const [sForm, setSForm] = useState<Omit<Schedule, "id">>({
    doctor: doctors[0], days: [], startTime: "09:00", endTime: "14:00", branch: "الفرع الرئيسي", slotMinutes: 20,
  });
  const [eForm, setEForm] = useState<Omit<Exception, "id">>({
    doctor: doctors[0], date: "", type: "إجازة", note: "",
  });

  const toggleDay = (day: string) => {
    setSForm((p) => ({ ...p, days: p.days.includes(day) ? p.days.filter((d) => d !== day) : [...p.days, day] }));
  };

  const addSchedule = () => {
    setSchedules((p) => [...p, { id: Date.now(), ...sForm }]);
    setShowAddSchedule(false);
  };

  const addException = () => {
    setExceptions((p) => [...p, { id: Date.now(), ...eForm }]);
    setShowAddException(false);
  };

  const deleteSchedule = (id: number) => {
    setSchedules((p) => p.filter((s) => s.id !== id));
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground text-right">إدارة الجداول</h1>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Schedules */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                جداول العمل
              </CardTitle>
              <Button onClick={() => setShowAddSchedule(true)} size="sm" className="bg-primary hover:bg-primary/90 rounded-xl gap-1 text-sm">
                <Plus className="w-4 h-4" />
                إضافة جدول
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {schedules.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/10">
                  <div className="flex items-center gap-5">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{s.doctor}</p>
                      <p className="text-xs text-muted-foreground">{s.branch} • كل {s.slotMinutes} دقيقة</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{s.startTime} — {s.endTime}</p>
                      <div className="flex gap-1 flex-wrap mt-1 justify-end">
                        {s.days.map((d) => (
                          <Badge key={d} variant="outline" className="text-xs py-0 px-1.5">{d.slice(0, 3)}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg gap-1">
                      <Edit className="w-3 h-3" />
                      تعديل
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setDeleteTarget(s.id)} className="h-7 text-xs rounded-lg border-red-200 text-red-600 hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exceptions */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                الإجازات والاستثناءات
              </CardTitle>
              <Button onClick={() => setShowAddException(true)} size="sm" variant="outline" className="rounded-xl gap-1 text-sm">
                <Plus className="w-4 h-4" />
                إضافة
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {exceptions.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground text-sm">لا استثناءات مسجلة</p>
            ) : (
              <div className="divide-y divide-border">
                {exceptions.map((e) => (
                  <div key={e.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/10">
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-medium text-foreground">{e.date}</p>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{e.doctor}</p>
                        <p className="text-xs text-muted-foreground">{e.note}</p>
                      </div>
                      <Badge variant="outline" className={e.type === "إجازة" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-blue-100 text-blue-700 border-blue-200"}>
                        {e.type}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setExceptions((p) => p.filter((x) => x.id !== e.id))} className="h-7 text-xs rounded-lg border-red-200 text-red-600 hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Schedule */}
      <Dialog open={showAddSchedule} onOpenChange={setShowAddSchedule}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة جدول عمل</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-right block text-sm">الطبيب</Label>
              <select value={sForm.doctor} onChange={(e) => setSForm({ ...sForm, doctor: e.target.value })} className="w-full bg-input-background border border-border rounded-xl px-3 h-10 text-sm text-right">
                {doctors.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-right block text-sm">أيام العمل</Label>
              <div className="flex flex-wrap gap-2 justify-end">
                {dayNames.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-all ${sForm.days.includes(day) ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground"}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-right block text-sm">بداية العمل</Label>
                <Input type="time" dir="ltr" value={sForm.startTime} onChange={(e) => setSForm({ ...sForm, startTime: e.target.value })} className="bg-input-background border-border rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-right block text-sm">نهاية العمل</Label>
                <Input type="time" dir="ltr" value={sForm.endTime} onChange={(e) => setSForm({ ...sForm, endTime: e.target.value })} className="bg-input-background border-border rounded-xl" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-right block text-sm">مدة الكشف (دقيقة)</Label>
              <Input type="number" dir="ltr" value={sForm.slotMinutes} onChange={(e) => setSForm({ ...sForm, slotMinutes: Number(e.target.value) })} className="bg-input-background border-border rounded-xl text-right" />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button onClick={addSchedule} className="flex-1 rounded-xl gap-1"><Check className="w-4 h-4" />حفظ</Button>
            <Button variant="outline" onClick={() => setShowAddSchedule(false)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Exception */}
      <Dialog open={showAddException} onOpenChange={setShowAddException}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة إجازة أو استثناء</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-right block text-sm">الطبيب</Label>
              <select value={eForm.doctor} onChange={(e) => setEForm({ ...eForm, doctor: e.target.value })} className="w-full bg-input-background border border-border rounded-xl px-3 h-10 text-sm text-right">
                {doctors.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-right block text-sm">التاريخ</Label>
                <Input type="date" dir="ltr" value={eForm.date} onChange={(e) => setEForm({ ...eForm, date: e.target.value })} className="bg-input-background border-border rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-right block text-sm">النوع</Label>
                <select value={eForm.type} onChange={(e) => setEForm({ ...eForm, type: e.target.value as "إجازة" | "استثناء" })} className="w-full bg-input-background border border-border rounded-xl px-3 h-10 text-sm text-right">
                  <option>إجازة</option>
                  <option>استثناء</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-right block text-sm">ملاحظة</Label>
              <Input value={eForm.note} onChange={(e) => setEForm({ ...eForm, note: e.target.value })} placeholder="سبب الاستثناء" className="bg-input-background border-border rounded-xl text-right" />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button onClick={addException} className="flex-1 rounded-xl">حفظ</Button>
            <Button variant="outline" onClick={() => setShowAddException(false)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <Dialog open={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-right">حذف الجدول</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground text-right">هل تريد حذف هذا الجدول؟</p>
          <DialogFooter className="gap-2">
            <Button onClick={() => deleteTarget && deleteSchedule(deleteTarget)} className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl">حذف</Button>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
