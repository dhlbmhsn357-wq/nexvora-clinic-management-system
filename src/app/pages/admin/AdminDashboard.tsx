import { useState } from "react";
import { Calendar, Clock, CheckCircle2, Users, Eye, Edit, Check, X } from "lucide-react";
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

type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

interface Appointment {
  id: number;
  patientName: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  queueNumber: string;
  status: AppointmentStatus;
}

export function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: "سارة أحمد", service: "فحص عام", doctor: "د. إيمي شن", date: "10 مارس 2026", time: "10:00 ص", queueNumber: "أ-12", status: "confirmed" },
    { id: 2, patientName: "محمد البراهيم", service: "قلب", doctor: "د. محمد الحارثي", date: "10 مارس 2026", time: "11:30 ص", queueNumber: "ب-08", status: "pending" },
    { id: 3, patientName: "فاطمة داود", service: "أطفال", doctor: "د. سارة وليامز", date: "10 مارس 2026", time: "2:00 م", queueNumber: "ج-05", status: "confirmed" },
    { id: 4, patientName: "جيمس ويلسون", service: "عظام", doctor: "د. جيمس أندرسون", date: "10 مارس 2026", time: "3:30 م", queueNumber: "د-15", status: "pending" },
    { id: 5, patientName: "ليلى مارتينيز", service: "فحص عام", doctor: "د. إيمي شن", date: "10 مارس 2026", time: "4:00 م", queueNumber: "أ-18", status: "completed" },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const currentDate = new Date().toLocaleDateString("ar-SA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const stats = [
    { title: "مواعيد اليوم", value: String(appointments.length), icon: Calendar, gradient: "from-blue-500/20 to-blue-600/20", accentColor: "border-t-4 border-t-blue-500" },
    { title: "المواعيد المعلقة", value: String(appointments.filter(a => a.status === "pending").length), icon: Clock, gradient: "from-amber-500/20 to-amber-600/20", accentColor: "border-t-4 border-t-amber-500" },
    { title: "المواعيد المكتملة", value: String(appointments.filter(a => a.status === "completed").length), icon: CheckCircle2, gradient: "from-green-500/20 to-green-600/20", accentColor: "border-t-4 border-t-green-500" },
    { title: "إجمالي المرضى", value: "342", icon: Users, gradient: "from-primary/20 to-primary/30", accentColor: "border-t-4 border-t-primary" },
  ];

  const getStatusBadge = (status: AppointmentStatus) => {
    const variants: Record<AppointmentStatus, { className: string; label: string }> = {
      confirmed: { className: "bg-green-100 text-green-700 border-green-200", label: "مؤكد" },
      pending: { className: "bg-amber-100 text-amber-700 border-amber-200", label: "معلق" },
      completed: { className: "bg-blue-100 text-blue-700 border-blue-200", label: "مكتمل" },
      cancelled: { className: "bg-red-100 text-red-700 border-red-200", label: "ملغى" },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const updateStatus = (id: number, status: AppointmentStatus) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  };

  const confirmApprove = () => {
    if (selectedAppointment) {
      updateStatus(selectedAppointment.id, "confirmed");
      setShowApproveDialog(false);
      setSelectedAppointment(null);
    }
  };

  const confirmCancel = () => {
    if (selectedAppointment) {
      updateStatus(selectedAppointment.id, "cancelled");
      setShowCancelDialog(false);
      setSelectedAppointment(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground mt-1">{currentDate}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className={`border-border shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden ${stat.accentColor}`}>
                <CardContent className="p-6">
                  <div className="flex justify-end mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 text-right">{stat.title}</p>
                  <p className="text-4xl font-bold text-foreground text-right">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Appointments Table */}
        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground text-right">المواعيد الأخيرة</CardTitle>
            <p className="text-sm text-muted-foreground text-right">جدول مواعيد اليوم وحالتها</p>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">اسم المريض</TableHead>
                    <TableHead className="font-semibold">نوع الخدمة</TableHead>
                    <TableHead className="font-semibold">الطبيب</TableHead>
                    <TableHead className="font-semibold">الوقت</TableHead>
                    <TableHead className="font-semibold">رقم الدور</TableHead>
                    <TableHead className="font-semibold">الحالة</TableHead>
                    <TableHead className="font-semibold">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{appointment.patientName}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell className="text-sm">{appointment.doctor}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-muted font-mono text-sm font-medium">
                          {appointment.queueNumber}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Button variant="outline" size="sm"
                            onClick={() => { setSelectedAppointment(appointment); setShowViewDialog(true); }}
                            className="rounded-lg hover:bg-muted flex items-center gap-1 text-xs px-2">
                            <Eye className="w-3.5 h-3.5" /> عرض
                          </Button>
                          {appointment.status === "pending" && (
                            <>
                              <Button variant="outline" size="sm"
                                onClick={() => { setSelectedAppointment(appointment); setShowApproveDialog(true); }}
                                className="rounded-lg border-green-200 text-green-700 hover:bg-green-50 flex items-center gap-1 text-xs px-2">
                                <Check className="w-3.5 h-3.5" /> موافقة
                              </Button>
                              <Button variant="outline" size="sm"
                                onClick={() => { setSelectedAppointment(appointment); setShowCancelDialog(true); }}
                                className="rounded-lg border-red-200 text-red-700 hover:bg-red-50 flex items-center gap-1 text-xs px-2">
                                <X className="w-3.5 h-3.5" /> إلغاء
                              </Button>
                            </>
                          )}
                          {appointment.status === "confirmed" && (
                            <Button variant="outline" size="sm"
                              onClick={() => { setSelectedAppointment(appointment); setShowViewDialog(true); }}
                              className="rounded-lg hover:bg-muted flex items-center gap-1 text-xs px-2">
                              <Edit className="w-3.5 h-3.5" /> تعديل
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">تفاصيل الموعد</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-3">
              {[
                { label: "المريض", value: selectedAppointment.patientName },
                { label: "الطبيب", value: selectedAppointment.doctor },
                { label: "الخدمة", value: selectedAppointment.service },
                { label: "التاريخ", value: selectedAppointment.date },
                { label: "الوقت", value: selectedAppointment.time },
                { label: "رقم الدور", value: selectedAppointment.queueNumber },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="font-medium text-foreground">{value}</span>
                  <span className="text-muted-foreground text-sm">{label}</span>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                {getStatusBadge(selectedAppointment.status)}
                <span className="text-muted-foreground text-sm">الحالة</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowViewDialog(false)} className="w-full rounded-xl">إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">تأكيد الموافقة</DialogTitle>
            <DialogDescription className="text-right">هل تريد الموافقة على هذا الموعد؟</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-right">
              <p className="font-semibold">{selectedAppointment.patientName}</p>
              <p className="text-sm text-muted-foreground">{selectedAppointment.date} - {selectedAppointment.time}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={confirmApprove} className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl">موافقة</Button>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">إلغاء الموعد</DialogTitle>
            <DialogDescription className="text-right">هل تريد إلغاء هذا الموعد؟</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-right">
              <p className="font-semibold">{selectedAppointment.patientName}</p>
              <p className="text-sm text-muted-foreground">{selectedAppointment.date} - {selectedAppointment.time}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={confirmCancel} className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl">إلغاء الموعد</Button>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="flex-1 rounded-xl">الاحتفاظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
