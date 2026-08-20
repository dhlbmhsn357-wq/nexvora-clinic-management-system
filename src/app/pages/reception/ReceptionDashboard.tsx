import { useState } from "react";
import { useNavigate } from "react-router";
import {
  UserCheck, Clock, Stethoscope, CheckCircle2, AlertCircle,
  UserPlus, Calendar, ListOrdered, RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";

type AppStatus = "booked" | "arrived" | "waiting" | "in-consultation" | "completed" | "no-show";

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  time: string;
  visitType: string;
  status: AppStatus;
  phone: string;
}

const statusCfg: Record<AppStatus, { label: string; cls: string }> = {
  booked: { label: "محجوز", cls: "bg-blue-100 text-blue-700 border-blue-200" },
  arrived: { label: "وصل", cls: "bg-teal-100 text-teal-700 border-teal-200" },
  waiting: { label: "ينتظر", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  "in-consultation": { label: "داخل الكشف", cls: "bg-primary/10 text-primary border-primary/20" },
  completed: { label: "مكتمل", cls: "bg-green-100 text-green-700 border-green-200" },
  "no-show": { label: "غائب", cls: "bg-red-100 text-red-700 border-red-200" },
};

const initialApps: Appointment[] = [
  { id: 1, patient: "سارة أحمد", doctor: "د. محمد الحارثي", time: "09:00 ص", visitType: "كشف جديد", status: "completed", phone: "0501234567" },
  { id: 2, patient: "محمد البراهيم", doctor: "د. محمد الحارثي", time: "09:30 ص", visitType: "متابعة", status: "in-consultation", phone: "0557891234" },
  { id: 3, patient: "فاطمة داود", doctor: "د. إيمي شن", time: "10:00 ص", visitType: "كشف جديد", status: "waiting", phone: "0541239876" },
  { id: 4, patient: "خالد العمري", doctor: "د. محمد الحارثي", time: "10:30 ص", visitType: "متابعة", status: "arrived", phone: "0506543210" },
  { id: 5, patient: "نور السالم", doctor: "د. سارة وليامز", time: "11:00 ص", visitType: "كشف جديد", status: "booked", phone: "0512345678" },
  { id: 6, patient: "أحمد الشمري", doctor: "د. إيمي شن", time: "11:30 ص", visitType: "متابعة", status: "booked", phone: "0559876543" },
];

export function ReceptionDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>(initialApps);
  const [checkinTarget, setCheckinTarget] = useState<Appointment | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);
  const [noShowTarget, setNoShowTarget] = useState<Appointment | null>(null);

  const currentDate = new Date().toLocaleDateString("ar-SA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const counts = {
    total: appointments.length,
    arrived: appointments.filter((a) => a.status === "arrived").length,
    waiting: appointments.filter((a) => a.status === "waiting").length,
    inConsult: appointments.filter((a) => a.status === "in-consultation").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    noShow: appointments.filter((a) => a.status === "no-show").length,
  };

  const updateStatus = (id: number, status: AppStatus) =>
    setAppointments((p) => p.map((a) => a.id === id ? { ...a, status } : a));

  const doCheckin = () => {
    if (checkinTarget) { updateStatus(checkinTarget.id, "waiting"); setCheckinTarget(null); }
  };
  const doNoShow = () => {
    if (noShowTarget) { updateStatus(noShowTarget.id, "no-show"); setNoShowTarget(null); }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-foreground">لوحة الاستقبال</h1>
            <p className="text-sm text-muted-foreground">{currentDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate("/reception/new-booking")} className="bg-primary hover:bg-primary/90 rounded-xl gap-2 text-sm">
              <UserPlus className="w-4 h-4" />
              حجز جديد
            </Button>
            <Button variant="outline" onClick={() => navigate("/reception/appointments")} className="rounded-xl gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              الجدول
            </Button>
            <Button variant="outline" onClick={() => navigate("/reception/queue")} className="rounded-xl gap-2 text-sm">
              <ListOrdered className="w-4 h-4" />
              الانتظار
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            { label: "إجمالي اليوم", value: counts.total, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "وصل", value: counts.arrived, icon: UserCheck, color: "text-teal-600", bg: "bg-teal-50" },
            { label: "ينتظر", value: counts.waiting, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "داخل الكشف", value: counts.inConsult, icon: Stethoscope, color: "text-primary", bg: "bg-primary/10" },
            { label: "منتهية", value: counts.completed, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
            { label: "غائب", value: counts.noShow, icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="border-border shadow-sm">
                <CardContent className="p-4 text-right">
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2 mr-auto`}>
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Today's Appointments */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-right">مواعيد اليوم</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {appointments.map((a) => {
                const cfg = statusCfg[a.status];
                return (
                  <div key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-5">
                      <p className="text-sm font-bold text-foreground min-w-[60px] text-right">{a.time}</p>
                      <div className="text-right">
                        <p className="text-sm font-medium">{a.doctor}</p>
                        <p className="text-xs text-muted-foreground">{a.visitType}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{a.patient}</p>
                        <p className="text-xs text-muted-foreground">{a.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={cfg.cls}>{cfg.label}</Badge>
                      {a.status === "booked" && (
                        <Button size="sm" onClick={() => setCheckinTarget(a)} className="h-7 text-xs rounded-lg bg-teal-600 hover:bg-teal-700 text-white gap-1">
                          <UserCheck className="w-3 h-3" />
                          تسجيل وصول
                        </Button>
                      )}
                      {a.status === "booked" && (
                        <Button size="sm" variant="outline" onClick={() => setNoShowTarget(a)} className="h-7 text-xs rounded-lg border-red-200 text-red-600 hover:bg-red-50">
                          غياب
                        </Button>
                      )}
                      {a.status === "arrived" && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(a.id, "waiting")} className="h-7 text-xs rounded-lg">
                          إدراج في الانتظار
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => setRescheduleTarget(a)} className="h-7 text-xs rounded-lg text-muted-foreground hover:text-foreground gap-1">
                        <RefreshCw className="w-3 h-3" />
                        إعادة جدولة
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Check-in Dialog */}
      <Dialog open={!!checkinTarget} onOpenChange={() => setCheckinTarget(null)}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-right">تسجيل وصول المريض</DialogTitle>
          </DialogHeader>
          {checkinTarget && (
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-right space-y-1">
              <p className="font-bold text-foreground">{checkinTarget.patient}</p>
              <p className="text-sm text-muted-foreground">{checkinTarget.time} — {checkinTarget.doctor}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={doCheckin} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl">تأكيد الوصول</Button>
            <Button variant="outline" onClick={() => setCheckinTarget(null)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* No-show Dialog */}
      <Dialog open={!!noShowTarget} onOpenChange={() => setNoShowTarget(null)}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-right">تسجيل غياب</DialogTitle>
          </DialogHeader>
          {noShowTarget && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-right space-y-1">
              <p className="font-bold text-foreground">{noShowTarget.patient}</p>
              <p className="text-sm text-muted-foreground">{noShowTarget.time} — {noShowTarget.doctor}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={doNoShow} className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl">تأكيد الغياب</Button>
            <Button variant="outline" onClick={() => setNoShowTarget(null)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Dialog */}
      <Dialog open={!!rescheduleTarget} onOpenChange={() => setRescheduleTarget(null)}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-right">إعادة جدولة الموعد</DialogTitle>
          </DialogHeader>
          {rescheduleTarget && (
            <div className="space-y-4">
              <div className="p-3 bg-muted/30 rounded-xl text-right">
                <p className="font-semibold">{rescheduleTarget.patient}</p>
                <p className="text-sm text-muted-foreground">{rescheduleTarget.time} — {rescheduleTarget.doctor}</p>
              </div>
              <p className="text-sm text-muted-foreground text-right">لإعادة الجدولة الكاملة، انتقل لصفحة الحجز الجديد.</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={() => { setRescheduleTarget(null); navigate("/reception/new-booking"); }} className="flex-1 rounded-xl">حجز موعد جديد</Button>
            <Button variant="outline" onClick={() => setRescheduleTarget(null)} className="flex-1 rounded-xl">إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
