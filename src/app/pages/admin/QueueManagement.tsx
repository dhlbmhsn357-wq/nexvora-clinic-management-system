import { useState } from "react";
import { SkipForward, CheckCircle2, Phone, User, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

type QueueStatus = "serving" | "waiting" | "completed" | "skipped";

interface QueueItem {
  id: number;
  queueNumber: string;
  patientName: string;
  appointmentTime: string;
  doctor: string;
  status: QueueStatus;
}

export function QueueManagement() {
  const [queueList, setQueueList] = useState<QueueItem[]>([
    { id: 1, queueNumber: "أ-12", patientName: "سارة أحمد", appointmentTime: "10:00 ص", doctor: "د. إيمي شن", status: "serving" },
    { id: 2, queueNumber: "ب-08", patientName: "محمد البراهيم", appointmentTime: "11:30 ص", doctor: "د. محمد الحارثي", status: "waiting" },
    { id: 3, queueNumber: "ج-05", patientName: "فاطمة داود", appointmentTime: "2:00 م", doctor: "د. سارة وليامز", status: "waiting" },
    { id: 4, queueNumber: "أ-18", patientName: "جيمس ويلسون", appointmentTime: "3:30 م", doctor: "د. إيمي شن", status: "waiting" },
    { id: 5, queueNumber: "د-15", patientName: "ليلى مارتينيز", appointmentTime: "4:00 م", doctor: "د. جيمس أندرسون", status: "waiting" },
    { id: 6, queueNumber: "أ-05", patientName: "داود لي", appointmentTime: "9:00 ص", doctor: "د. إيمي شن", status: "completed" },
    { id: 7, queueNumber: "ب-03", patientName: "أمل وايت", appointmentTime: "9:30 ص", doctor: "د. محمد الحارثي", status: "completed" },
    { id: 8, queueNumber: "ج-02", patientName: "روبرت غارسيا", appointmentTime: "9:45 ص", doctor: "د. سارة وليامز", status: "skipped" },
  ]);

  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const currentServing = queueList.find((q) => q.status === "serving");
  const waitingList = queueList.filter((q) => q.status === "waiting");
  const completedCount = queueList.filter((q) => q.status === "completed").length;
  const waitingCount = waitingList.length;

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCallNext = () => {
    if (waitingList.length === 0) {
      showToast("لا يوجد مرضى في قائمة الانتظار", "info");
      return;
    }
    const nextPatient = waitingList[0];
    setQueueList((prev) =>
      prev.map((q) => {
        if (q.id === nextPatient.id) return { ...q, status: "serving" };
        return q;
      })
    );
    showToast(`تم استدعاء ${nextPatient.patientName} - رقم الدور: ${nextPatient.queueNumber}`);
  };

  const handleMarkCompleted = () => {
    if (!currentServing) return;
    setShowCompleteDialog(true);
  };

  const confirmComplete = () => {
    if (!currentServing) return;
    const completedName = currentServing.patientName;
    const nextWaiting = waitingList[0];

    setQueueList((prev) =>
      prev.map((q) => {
        if (q.id === currentServing.id) return { ...q, status: "completed" };
        if (nextWaiting && q.id === nextWaiting.id) return { ...q, status: "serving" };
        return q;
      })
    );
    setShowCompleteDialog(false);
    if (nextWaiting) {
      showToast(`تم إكمال ${completedName}. يُستدعى الآن: ${nextWaiting.patientName}`);
    } else {
      showToast(`تم إكمال ${completedName}. لا يوجد مرضى آخرون في الانتظار`, "info");
    }
  };

  const handleSkipQueue = () => {
    if (!currentServing) return;
    setShowSkipDialog(true);
  };

  const confirmSkip = () => {
    if (!currentServing) return;
    const skippedName = currentServing.patientName;
    const nextWaiting = waitingList[0];

    setQueueList((prev) =>
      prev.map((q) => {
        if (q.id === currentServing.id) return { ...q, status: "skipped" };
        if (nextWaiting && q.id === nextWaiting.id) return { ...q, status: "serving" };
        return q;
      })
    );
    setShowSkipDialog(false);
    showToast(`تم تخطي ${skippedName}`, "info");
  };

  const getStatusBadge = (status: QueueStatus) => {
    const variants: Record<QueueStatus, { className: string; label: string }> = {
      waiting: { className: "bg-amber-100 text-amber-700 border-amber-200", label: "في الانتظار" },
      serving: { className: "bg-green-100 text-green-700 border-green-200", label: "يُخدم الآن" },
      completed: { className: "bg-blue-100 text-blue-700 border-blue-200", label: "مكتمل" },
      skipped: { className: "bg-gray-100 text-gray-700 border-gray-200", label: "متخطى" },
    };
    const config = variants[status];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const currentDate = new Date().toLocaleDateString("ar-SA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-medium transition-all duration-300 flex items-center gap-2 ${
          toast.type === "success" ? "bg-green-600" : "bg-blue-600"
        }`}>
          {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {toast.message}
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-foreground">إدارة قائمة الانتظار</h1>
            <p className="text-sm text-muted-foreground mt-1">{currentDate}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border shadow-md">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">إجمالي القائمة</p>
                  <p className="text-3xl font-bold text-foreground">{queueList.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border shadow-md">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">ينتظرون</p>
                  <p className="text-3xl font-bold text-foreground">{waitingCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border shadow-md">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">مكتملون</p>
                  <p className="text-3xl font-bold text-foreground">{completedCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Now Serving Section */}
        <Card className="border-2 border-primary bg-gradient-to-bl from-primary/5 to-accent/5 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground text-right">يُخدم الآن</CardTitle>
          </CardHeader>
          <CardContent>
            {currentServing ? (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Queue Controls */}
                <div className="flex flex-col justify-center space-y-4">
                  <Button
                    onClick={handleCallNext}
                    disabled={waitingCount === 0}
                    className="h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 justify-center disabled:opacity-50"
                  >
                    استدعاء المريض التالي
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleMarkCompleted}
                    className="h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                  >
                    تعليم كمكتمل
                    <CheckCircle2 className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleSkipQueue}
                    variant="outline"
                    className="h-14 border-2 border-muted-foreground/30 hover:bg-muted rounded-xl flex items-center gap-2 justify-center"
                  >
                    تخطي الدور
                    <SkipForward className="w-5 h-5" />
                  </Button>
                  {waitingCount > 0 && (
                    <p className="text-center text-sm text-muted-foreground">
                      التالي في الانتظار: <span className="font-semibold text-foreground">{waitingList[0].patientName}</span>
                    </p>
                  )}
                </div>
                {/* Patient Info */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-card border border-border text-right">
                    <p className="text-sm text-muted-foreground mb-1">رقم الدور</p>
                    <p className="text-5xl font-bold text-primary font-mono">{currentServing.queueNumber}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border text-right">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="w-5 h-5 text-primary" />
                      <p className="text-sm text-muted-foreground">المريض</p>
                    </div>
                    <p className="text-xl font-semibold text-foreground">{currentServing.patientName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-card border border-border text-right">
                      <p className="text-sm text-muted-foreground mb-1">الوقت</p>
                      <p className="font-medium text-foreground">{currentServing.appointmentTime}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-card border border-border text-right">
                      <p className="text-sm text-muted-foreground mb-1">الطبيب</p>
                      <p className="font-medium text-foreground text-sm">{currentServing.doctor}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-xl font-semibold text-foreground mb-2">لا يوجد مريض يُخدم حالياً</p>
                <p className="text-muted-foreground mb-6">
                  {waitingCount > 0 ? `يوجد ${waitingCount} مريض في الانتظار` : "قائمة الانتظار فارغة"}
                </p>
                {waitingCount > 0 && (
                  <Button onClick={handleCallNext} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl flex items-center gap-2 mx-auto">
                    استدعاء المريض التالي
                    <Phone className="w-5 h-5" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Queue List Table */}
        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground text-right">ترتيب قائمة الانتظار اليومية</CardTitle>
            <p className="text-sm text-muted-foreground text-right">القائمة الكاملة لحالة الانتظار اليوم</p>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">اسم المريض</TableHead>
                    <TableHead className="font-semibold">رقم الدور</TableHead>
                    <TableHead className="font-semibold">وقت الموعد</TableHead>
                    <TableHead className="font-semibold">الطبيب</TableHead>
                    <TableHead className="font-semibold">حالة الدور</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queueList.map((queue) => (
                    <TableRow
                      key={queue.id}
                      className={`hover:bg-muted/30 transition-colors ${queue.status === "serving" ? "bg-primary/5" : ""}`}
                    >
                      <TableCell className="font-medium">{queue.patientName}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg font-mono text-sm font-medium ${
                          queue.status === "serving" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}>
                          {queue.queueNumber}
                        </span>
                      </TableCell>
                      <TableCell>{queue.appointmentTime}</TableCell>
                      <TableCell>{queue.doctor}</TableCell>
                      <TableCell>{getStatusBadge(queue.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complete Dialog */}
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">تأكيد إتمام الخدمة</DialogTitle>
            <DialogDescription className="text-right">
              هل تريد تعليم هذا المريض كمكتمل والانتقال للتالي؟
            </DialogDescription>
          </DialogHeader>
          {currentServing && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-right">
              <p className="font-semibold text-foreground">{currentServing.patientName}</p>
              <p className="text-sm text-muted-foreground">رقم الدور: {currentServing.queueNumber}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={confirmComplete} className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl">
              تأكيد الإتمام
            </Button>
            <Button variant="outline" onClick={() => setShowCompleteDialog(false)} className="flex-1 rounded-xl">
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Skip Dialog */}
      <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">تأكيد تخطي الدور</DialogTitle>
            <DialogDescription className="text-right">
              هل تريد تخطي هذا المريض والانتقال للتالي؟
            </DialogDescription>
          </DialogHeader>
          {currentServing && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-right">
              <p className="font-semibold text-foreground">{currentServing.patientName}</p>
              <p className="text-sm text-muted-foreground">رقم الدور: {currentServing.queueNumber}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={confirmSkip} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white rounded-xl">
              تأكيد التخطي
            </Button>
            <Button variant="outline" onClick={() => setShowSkipDialog(false)} className="flex-1 rounded-xl">
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
