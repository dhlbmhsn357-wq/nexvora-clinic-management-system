import { useState } from "react";
import { Clock, User, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

type QStatus = "waiting" | "in-consultation" | "completed";

interface QueueEntry {
  id: number;
  patient: string;
  time: string;
  visitType: string;
  status: QStatus;
  waitMinutes: number;
}

interface DoctorQueue {
  doctor: string;
  specialty: string;
  queue: QueueEntry[];
}

const statusCfg: Record<QStatus, { label: string; cls: string }> = {
  waiting: { label: "ينتظر", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  "in-consultation": { label: "داخل الكشف", cls: "bg-primary/10 text-primary border-primary/20" },
  completed: { label: "مكتمل", cls: "bg-green-100 text-green-700 border-green-200" },
};

const initialQueues: DoctorQueue[] = [
  {
    doctor: "د. محمد الحارثي",
    specialty: "قلب وأوعية دموية",
    queue: [
      { id: 1, patient: "محمد البراهيم", time: "09:30 ص", visitType: "متابعة", status: "in-consultation", waitMinutes: 0 },
      { id: 2, patient: "فاطمة داود", time: "10:00 ص", visitType: "كشف جديد", status: "waiting", waitMinutes: 24 },
      { id: 3, patient: "خالد العمري", time: "10:30 ص", visitType: "متابعة", status: "waiting", waitMinutes: 12 },
    ],
  },
  {
    doctor: "د. إيمي شن",
    specialty: "طب عام",
    queue: [
      { id: 4, patient: "نور السالم", time: "11:00 ص", visitType: "كشف جديد", status: "in-consultation", waitMinutes: 0 },
      { id: 5, patient: "أحمد الشمري", time: "11:30 ص", visitType: "متابعة", status: "waiting", waitMinutes: 8 },
    ],
  },
  {
    doctor: "د. سارة وليامز",
    specialty: "أطفال",
    queue: [
      { id: 6, patient: "ليلى مارتينيز", time: "10:00 ص", visitType: "كشف جديد", status: "completed", waitMinutes: 0 },
    ],
  },
];

export function ReceptionQueue() {
  const [queues, setQueues] = useState<DoctorQueue[]>(initialQueues);

  const advanceStatus = (doctorIdx: number, entryId: number) => {
    setQueues((prev) =>
      prev.map((dq, di) => {
        if (di !== doctorIdx) return dq;
        return {
          ...dq,
          queue: dq.queue.map((e) => {
            if (e.id !== entryId) return e;
            const next: Record<QStatus, QStatus> = { waiting: "in-consultation", "in-consultation": "completed", completed: "completed" };
            return { ...e, status: next[e.status] };
          }),
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground text-right">إدارة قوائم الانتظار</h1>
          <p className="text-sm text-muted-foreground text-right">حالة الانتظار لكل طبيب</p>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {queues.map((dq, di) => {
            const active = dq.queue.filter((e) => e.status !== "completed");
            const done = dq.queue.filter((e) => e.status === "completed");
            const current = dq.queue.find((e) => e.status === "in-consultation");
            const waitingList = dq.queue.filter((e) => e.status === "waiting");

            return (
              <Card key={dq.doctor} className="border-border shadow-sm">
                <CardHeader className="pb-3 border-b border-border">
                  <div className="text-right">
                    <CardTitle className="text-base font-bold">{dq.doctor}</CardTitle>
                    <p className="text-xs text-muted-foreground">{dq.specialty}</p>
                  </div>
                  <div className="flex items-center gap-2 justify-end mt-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 ml-1" />
                      {active.length} نشط
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                      {done.length} منتهي
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3 space-y-2">
                  {/* Current */}
                  {current && (
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl">
                      <p className="text-xs text-primary font-medium mb-1 text-right">الحالي في الكشف</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{current.patient}</p>
                            <p className="text-xs text-muted-foreground">{current.visitType}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => advanceStatus(di, current.id)}
                          className="h-6 text-xs rounded-lg bg-green-600 hover:bg-green-700 text-white"
                        >
                          إنهاء
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Waiting list */}
                  {waitingList.map((e, idx) => (
                    <div key={e.id} className="p-3 bg-muted/30 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-muted rounded-lg flex items-center justify-center font-mono text-xs font-bold">
                            {idx + 1 + (current ? 1 : 0)}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{e.patient}</p>
                            <p className="text-xs text-muted-foreground">انتظر {e.waitMinutes} د • {e.visitType}</p>
                          </div>
                        </div>
                        {!current && idx === 0 && (
                          <Button
                            size="sm"
                            onClick={() => advanceStatus(di, e.id)}
                            className="h-6 text-xs rounded-lg bg-primary hover:bg-primary/90"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </Button>
                        )}
                        {e.waitMinutes > 20 && (
                          <Badge className="bg-red-100 text-red-600 border-red-200 text-xs">انتظار طويل</Badge>
                        )}
                      </div>
                    </div>
                  ))}

                  {active.length === 0 && (
                    <p className="text-center text-xs text-muted-foreground py-4">لا يوجد مرضى نشطون</p>
                  )}

                  {done.length > 0 && (
                    <p className="text-xs text-center text-muted-foreground pt-1">{done.length} كشف مكتمل اليوم</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
