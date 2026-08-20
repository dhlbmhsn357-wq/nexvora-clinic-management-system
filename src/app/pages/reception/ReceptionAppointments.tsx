import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, ChevronLeft, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

type AppStatus = "booked" | "arrived" | "waiting" | "in-consultation" | "completed" | "no-show" | "cancelled";

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  time: string;
  visitType: string;
  status: AppStatus;
}

const statusCfg: Record<AppStatus, { label: string; cls: string }> = {
  booked: { label: "محجوز", cls: "bg-blue-100 text-blue-700 border-blue-200" },
  arrived: { label: "وصل", cls: "bg-teal-100 text-teal-700 border-teal-200" },
  waiting: { label: "ينتظر", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  "in-consultation": { label: "داخل الكشف", cls: "bg-primary/10 text-primary border-primary/20" },
  completed: { label: "مكتمل", cls: "bg-green-100 text-green-700 border-green-200" },
  "no-show": { label: "غائب", cls: "bg-red-100 text-red-700 border-red-200" },
  cancelled: { label: "ملغى", cls: "bg-gray-100 text-gray-600 border-gray-200" },
};

const doctors = ["الكل", "د. محمد الحارثي", "د. إيمي شن", "د. سارة وليامز", "د. جيمس أندرسون"];

const weekDays = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"];
const times = ["09:00 ص", "09:30 ص", "10:00 ص", "10:30 ص", "11:00 ص", "11:30 ص", "12:00 م", "12:30 م", "01:00 م"];

const sampleAppointments: Appointment[] = [
  { id: 1, patient: "سارة أحمد", doctor: "د. محمد الحارثي", time: "09:00 ص", visitType: "كشف جديد", status: "completed" },
  { id: 2, patient: "محمد البراهيم", doctor: "د. محمد الحارثي", time: "09:30 ص", visitType: "متابعة", status: "in-consultation" },
  { id: 3, patient: "فاطمة داود", doctor: "د. إيمي شن", time: "10:00 ص", visitType: "كشف جديد", status: "waiting" },
  { id: 4, patient: "خالد العمري", doctor: "د. محمد الحارثي", time: "10:30 ص", visitType: "متابعة", status: "arrived" },
  { id: 5, patient: "نور السالم", doctor: "د. سارة وليامز", time: "11:00 ص", visitType: "كشف جديد", status: "booked" },
  { id: 6, patient: "أحمد الشمري", doctor: "د. إيمي شن", time: "11:30 ص", visitType: "متابعة", status: "booked" },
  { id: 7, patient: "ريم القحطاني", doctor: "د. جيمس أندرسون", time: "12:00 م", visitType: "كشف جديد", status: "no-show" },
  { id: 8, patient: "ليلى مارتينيز", doctor: "د. سارة وليامز", time: "12:30 م", visitType: "متابعة", status: "booked" },
];

type ViewMode = "day" | "week";

export function ReceptionAppointments() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewMode>("day");
  const [selectedDoctor, setSelectedDoctor] = useState("الكل");
  const [dayOffset, setDayOffset] = useState(0);

  const today = new Date();
  today.setDate(today.getDate() + dayOffset);
  const dateLabel = today.toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const filtered = sampleAppointments.filter(
    (a) => selectedDoctor === "الكل" || a.doctor === selectedDoctor
  );

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">المواعيد</h1>
          <Button onClick={() => navigate("/reception/new-booking")} className="bg-primary hover:bg-primary/90 rounded-xl gap-2 text-sm">
            <UserPlus className="w-4 h-4" />
            حجز جديد
          </Button>
        </div>
      </div>

      <div className="p-8 space-y-4">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant={view === "day" ? "default" : "outline"} onClick={() => setView("day")} className="rounded-xl text-sm h-9">يومي</Button>
            <Button variant={view === "week" ? "default" : "outline"} onClick={() => setView("week")} className="rounded-xl text-sm h-9">أسبوعي</Button>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="bg-input-background border border-border rounded-xl px-3 h-9 text-sm text-foreground text-right"
            >
              {doctors.map((d) => <option key={d}>{d}</option>)}
            </select>

            <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1">
              <button onClick={() => setDayOffset((p) => p + 1)} className="p-1.5 hover:bg-muted rounded-lg">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium px-2 min-w-[180px] text-center">{dateLabel}</span>
              <button onClick={() => setDayOffset((p) => p - 1)} className="p-1.5 hover:bg-muted rounded-lg">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {view === "day" ? (
          <Card className="border-border shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {times.map((time) => {
                  const apps = filtered.filter((a) => a.time === time);
                  return (
                    <div key={time} className={`flex gap-4 px-6 py-3 ${apps.length === 0 ? "opacity-40" : ""}`}>
                      <div className="w-20 text-right text-sm font-medium text-muted-foreground pt-1 flex-shrink-0">{time}</div>
                      <div className="flex-1">
                        {apps.length === 0 ? (
                          <div className="h-8 border border-dashed border-border rounded-lg" />
                        ) : (
                          <div className="space-y-2">
                            {apps.map((a) => {
                              const cfg = statusCfg[a.status];
                              return (
                                <div key={a.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border">
                                  <div className="text-right">
                                    <p className="font-medium text-sm">{a.patient}</p>
                                    <p className="text-xs text-muted-foreground">{a.doctor} • {a.visitType}</p>
                                  </div>
                                  <Badge variant="outline" className={`${cfg.cls} text-xs`}>{cfg.label}</Badge>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border shadow-sm overflow-x-auto">
            <CardHeader>
              <CardTitle className="text-right text-base">عرض أسبوعي</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-6 border-b border-border bg-muted/30">
                  <div className="p-3 text-sm font-medium text-muted-foreground text-right border-l border-border">الوقت</div>
                  {weekDays.map((d) => (
                    <div key={d} className="p-3 text-sm font-semibold text-center text-foreground border-l border-border last:border-0">{d}</div>
                  ))}
                </div>
                {times.slice(0, 6).map((time) => (
                  <div key={time} className="grid grid-cols-6 border-b border-border last:border-0">
                    <div className="p-3 text-xs text-muted-foreground text-right border-l border-border bg-muted/10">{time}</div>
                    {weekDays.map((day, di) => {
                      const hasApp = filtered.length > di && di % 2 === 0 && times.indexOf(time) === di;
                      return (
                        <div key={day} className="p-2 border-l border-border last:border-0 min-h-[52px]">
                          {hasApp && filtered[di] && (
                            <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
                              <p className="text-xs font-medium text-primary truncate">{filtered[di].patient}</p>
                              <p className="text-xs text-muted-foreground truncate">{filtered[di].doctor}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
