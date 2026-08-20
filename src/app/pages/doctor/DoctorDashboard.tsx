import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Calendar, Clock, CheckCircle2, UserCheck, AlertCircle,
  ArrowLeft, User, ChevronLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

type PatientStatus = "booked" | "arrived" | "waiting" | "in-consultation" | "completed" | "no-show";

interface Patient {
  id: number;
  name: string;
  time: string;
  visitType: "كشف جديد" | "متابعة";
  status: PatientStatus;
  age: number;
  complaint: string;
  queueNumber: string;
}

const statusConfig: Record<PatientStatus, { label: string; className: string }> = {
  booked: { label: "محجوز", className: "bg-blue-100 text-blue-700 border-blue-200" },
  arrived: { label: "وصل", className: "bg-teal-100 text-teal-700 border-teal-200" },
  waiting: { label: "ينتظر", className: "bg-amber-100 text-amber-700 border-amber-200" },
  "in-consultation": { label: "داخل الكشف", className: "bg-primary/10 text-primary border-primary/20" },
  completed: { label: "مكتمل", className: "bg-green-100 text-green-700 border-green-200" },
  "no-show": { label: "غائب", className: "bg-red-100 text-red-700 border-red-200" },
};

const initialPatients: Patient[] = [
  { id: 1, name: "سارة أحمد", time: "09:00 ص", visitType: "كشف جديد", status: "completed", age: 34, complaint: "ألم في الصدر", queueNumber: "1" },
  { id: 2, name: "محمد البراهيم", time: "09:30 ص", visitType: "متابعة", status: "in-consultation", age: 55, complaint: "متابعة ضغط الدم", queueNumber: "2" },
  { id: 3, name: "فاطمة داود", time: "10:00 ص", visitType: "كشف جديد", status: "waiting", age: 28, complaint: "خفقان متكرر", queueNumber: "3" },
  { id: 4, name: "خالد العمري", time: "10:30 ص", visitType: "متابعة", status: "arrived", age: 62, complaint: "متابعة بعد العملية", queueNumber: "4" },
  { id: 5, name: "نور السالم", time: "11:00 ص", visitType: "كشف جديد", status: "booked", age: 41, complaint: "ضيق في التنفس", queueNumber: "5" },
  { id: 6, name: "أحمد الشمري", time: "11:30 ص", visitType: "متابعة", status: "booked", age: 48, complaint: "متابعة بعد القسطرة", queueNumber: "6" },
];

export function DoctorDashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  const currentDate = new Date().toLocaleDateString("ar-SA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const inConsultation = patients.find((p) => p.status === "in-consultation");
  const waiting = patients.filter((p) => p.status === "waiting");
  const nextPatient = waiting[0];
  const completed = patients.filter((p) => p.status === "completed");
  const noShows = patients.filter((p) => p.status === "no-show");

  const stats = [
    { label: "مواعيد اليوم", value: patients.length, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "ينتظرون", value: waiting.length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "مكتملة", value: completed.length, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: "غائبون", value: noShows.length, icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  ];

  const advancePatient = (id: number) => {
    setPatients((prev) => prev.map((p) => {
      if (p.id !== id) return p;
      const next: Record<string, PatientStatus> = {
        arrived: "waiting", waiting: "in-consultation", "in-consultation": "completed",
      };
      return { ...p, status: next[p.status] ?? p.status };
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-foreground">يومي اليوم</h1>
            <p className="text-sm text-muted-foreground">{currentDate}</p>
          </div>
          <Button onClick={() => navigate("/doctor/queue")} variant="outline" className="flex items-center gap-2 rounded-xl">
            <ChevronLeft className="w-4 h-4" />
            قائمة الانتظار الكاملة
          </Button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="border-border shadow-sm">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-3xl font-bold text-foreground">{s.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current + Next */}
          <div className="lg:col-span-1 space-y-4">
            {/* Current Patient */}
            <Card className="border-2 border-primary shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-base text-muted-foreground font-medium">المريض الحالي</CardTitle>
              </CardHeader>
              <CardContent>
                {inConsultation ? (
                  <div className="text-right space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-foreground">{inConsultation.name}</p>
                        <p className="text-sm text-muted-foreground">{inConsultation.age} سنة • {inConsultation.visitType}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                      {inConsultation.complaint}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigate(`/doctor/consultation/${inConsultation.id}`)}
                        className="flex-1 bg-primary hover:bg-primary/90 rounded-xl gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        فتح الكشف
                      </Button>
                      <Button
                        onClick={() => advancePatient(inConsultation.id)}
                        variant="outline"
                        className="rounded-xl border-green-200 text-green-700 hover:bg-green-50"
                      >
                        إنهاء
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <UserCheck className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">لا يوجد مريض حالياً في الكشف</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Patient */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-base text-muted-foreground font-medium">التالي في الانتظار</CardTitle>
              </CardHeader>
              <CardContent>
                {nextPatient ? (
                  <div className="text-right space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{nextPatient.name}</p>
                        <p className="text-sm text-muted-foreground">{nextPatient.time} • {nextPatient.visitType}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => advancePatient(nextPatient.id)}
                      variant="outline"
                      className="w-full rounded-xl"
                      disabled={!!inConsultation}
                    >
                      استدعاء المريض
                    </Button>
                  </div>
                ) : (
                  <p className="text-center text-sm text-muted-foreground py-4">لا يوجد مرضى ينتظرون</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <Card className="lg:col-span-2 border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-right">جدول اليوم</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {patients.map((patient) => {
                  const cfg = statusConfig[patient.status];
                  return (
                    <div key={patient.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium text-foreground">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.complaint}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{patient.time}</p>
                          <p className="text-xs text-muted-foreground">{patient.visitType}</p>
                        </div>
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center font-mono text-sm font-bold text-foreground">
                          {patient.queueNumber}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
                        {(patient.status === "waiting" || patient.status === "arrived") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => advancePatient(patient.id)}
                            className="text-xs rounded-lg h-7"
                          >
                            تقدّم
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/doctor/consultation/${patient.id}`)}
                          className="text-xs rounded-lg h-7 text-primary hover:text-primary"
                        >
                          فتح
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
