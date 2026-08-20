import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, User, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

type PatientStatus = "booked" | "arrived" | "waiting" | "in-consultation" | "completed" | "no-show";

interface Patient {
  id: number;
  name: string;
  time: string;
  visitType: string;
  status: PatientStatus;
  age: number;
  complaint: string;
  waitMinutes?: number;
}

const statusConfig: Record<PatientStatus, { label: string; className: string; order: number }> = {
  "in-consultation": { label: "داخل الكشف", className: "bg-primary/10 text-primary border-primary/20", order: 0 },
  waiting: { label: "ينتظر", className: "bg-amber-100 text-amber-700 border-amber-200", order: 1 },
  arrived: { label: "وصل", className: "bg-teal-100 text-teal-700 border-teal-200", order: 2 },
  booked: { label: "محجوز", className: "bg-blue-100 text-blue-700 border-blue-200", order: 3 },
  completed: { label: "مكتمل", className: "bg-green-100 text-green-700 border-green-200", order: 4 },
  "no-show": { label: "غائب", className: "bg-red-100 text-red-700 border-red-200", order: 5 },
};

export function DoctorQueue() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "سارة أحمد", time: "09:00 ص", visitType: "كشف جديد", status: "completed", age: 34, complaint: "ألم في الصدر" },
    { id: 2, name: "محمد البراهيم", time: "09:30 ص", visitType: "متابعة", status: "in-consultation", age: 55, complaint: "متابعة ضغط الدم", waitMinutes: 8 },
    { id: 3, name: "فاطمة داود", time: "10:00 ص", visitType: "كشف جديد", status: "waiting", age: 28, complaint: "خفقان متكرر", waitMinutes: 22 },
    { id: 4, name: "خالد العمري", time: "10:30 ص", visitType: "متابعة", status: "arrived", age: 62, complaint: "متابعة بعد العملية" },
    { id: 5, name: "نور السالم", time: "11:00 ص", visitType: "كشف جديد", status: "booked", age: 41, complaint: "ضيق في التنفس" },
    { id: 6, name: "أحمد الشمري", time: "11:30 ص", visitType: "متابعة", status: "booked", age: 48, complaint: "متابعة بعد القسطرة" },
    { id: 7, name: "ريم القحطاني", time: "12:00 م", visitType: "كشف جديد", status: "no-show", age: 30, complaint: "صداع مزمن" },
  ]);

  const updateStatus = (id: number, status: PatientStatus) =>
    setPatients((p) => p.map((pt) => pt.id === id ? { ...pt, status } : pt));

  const activePatients = patients
    .filter((p) => !["completed", "no-show"].includes(p.status))
    .sort((a, b) => statusConfig[a.status].order - statusConfig[b.status].order);

  const donePatients = patients.filter((p) => ["completed", "no-show"].includes(p.status));

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">قائمة الانتظار</h1>
          <Button variant="outline" onClick={() => navigate("/doctor")} className="rounded-xl gap-2">
            <ArrowLeft className="w-4 h-4" />
            العودة لليوم
          </Button>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Active queue */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              قائمة الانتظار النشطة
              <Badge variant="outline" className="text-xs">{activePatients.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {activePatients.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground text-sm">لا يوجد مرضى في الانتظار</p>
            ) : (
              <div className="divide-y divide-border">
                {activePatients.map((p, idx) => {
                  const cfg = statusConfig[p.status];
                  return (
                    <div key={p.id} className={`grid grid-cols-1 md:grid-cols-[auto_minmax(12rem,1fr)_auto_auto_auto_auto] items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/10 ${p.status === "in-consultation" ? "bg-primary/5" : ""}`}>
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center font-mono text-sm font-bold justify-self-start md:justify-self-auto">
                        {idx + 1}
                      </div>
                      <div className="text-right min-w-0">
                        <p className="font-semibold text-foreground truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{p.complaint}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium whitespace-nowrap">{p.time}</p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{p.visitType}</p>
                      </div>
                      <div className="text-right min-w-20">
                        {p.waitMinutes != null && (
                          <p className="text-xs text-amber-600 font-medium whitespace-nowrap">انتظر {p.waitMinutes} د</p>
                        )}
                      </div>
                      <div className="flex items-center md:justify-self-end">
                        <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
                      </div>
                      <div className="flex items-center gap-3 md:justify-self-start">
                        <div className="flex gap-1.5">
                          {p.status === "arrived" && (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(p.id, "waiting")} className="h-7 text-xs rounded-lg">
                              إدراج في الانتظار
                            </Button>
                          )}
                          {p.status === "waiting" && (
                            <Button size="sm" onClick={() => updateStatus(p.id, "in-consultation")} className="h-7 text-xs rounded-lg bg-primary hover:bg-primary/90">
                              بدء الكشف
                            </Button>
                          )}
                          {p.status === "in-consultation" && (
                            <Button
                              size="sm"
                              onClick={() => navigate(`/doctor/consultation/${p.id}`)}
                              className="h-7 text-xs rounded-lg bg-primary hover:bg-primary/90 gap-1"
                            >
                              فتح الكشف
                            </Button>
                          )}
                          {p.status === "booked" && (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(p.id, "no-show")} className="h-7 text-xs rounded-lg border-red-200 text-red-600 hover:bg-red-50">
                              غياب
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Done */}
        {donePatients.length > 0 && (
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                منتهية / غائبون
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {donePatients.map((p) => {
                  const cfg = statusConfig[p.status];
                  return (
                    <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 opacity-60">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.complaint}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{p.time}</p>
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                      <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
