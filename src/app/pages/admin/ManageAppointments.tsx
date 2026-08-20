import { useState } from "react";
import { Search, Filter, Eye, Edit, Check, X, Calendar, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
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
  phone: string;
}

export function ManageAppointments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Appointment>>({});

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: "سارة أحمد", service: "فحص عام", doctor: "د. إيمي شن", date: "10 مارس 2026", time: "10:00 ص", queueNumber: "أ-12", status: "confirmed", phone: "0501234567" },
    { id: 2, patientName: "محمد البراهيم", service: "قلب", doctor: "د. محمد الحارثي", date: "10 مارس 2026", time: "11:30 ص", queueNumber: "ب-08", status: "pending", phone: "0552345678" },
    { id: 3, patientName: "فاطمة داود", service: "أطفال", doctor: "د. سارة وليامز", date: "10 مارس 2026", time: "2:00 م", queueNumber: "ج-05", status: "confirmed", phone: "0563456789" },
    { id: 4, patientName: "جيمس ويلسون", service: "عظام", doctor: "د. جيمس أندرسون", date: "11 مارس 2026", time: "9:00 ص", queueNumber: "د-01", status: "pending", phone: "0574567890" },
    { id: 5, patientName: "ليلى مارتينيز", service: "فحص عام", doctor: "د. إيمي شن", date: "11 مارس 2026", time: "10:30 ص", queueNumber: "أ-03", status: "confirmed", phone: "0585678901" },
    { id: 6, patientName: "داود لي", service: "قلب", doctor: "د. محمد الحارثي", date: "11 مارس 2026", time: "2:30 م", queueNumber: "ب-05", status: "cancelled", phone: "0596789012" },
    { id: 7, patientName: "أمل وايت", service: "أطفال", doctor: "د. سارة وليامز", date: "12 مارس 2026", time: "11:00 ص", queueNumber: "ج-08", status: "pending", phone: "0507890123" },
    { id: 8, patientName: "روبرت غارسيا", service: "عظام", doctor: "د. جيمس أندرسون", date: "12 مارس 2026", time: "3:00 م", queueNumber: "د-12", status: "confirmed", phone: "0518901234" },
  ]);

  const currentDate = new Date().toLocaleDateString("ar-SA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

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

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDoctor = filterDoctor === "all" || a.doctor === filterDoctor;
    const matchesStatus = filterStatus === "all" || a.status === filterStatus;
    return matchesSearch && matchesDoctor && matchesStatus;
  });

  const updateStatus = (id: number, status: AppointmentStatus) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  };

  const handleView = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowViewDialog(true);
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditForm({ ...appointment });
    setShowEditDialog(true);
  };

  const handleApprove = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowApproveDialog(true);
  };

  const handleCancel = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelDialog(true);
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

  const saveEdit = () => {
    if (selectedAppointment && editForm) {
      setAppointments((prev) =>
        prev.map((a) => a.id === selectedAppointment.id ? { ...a, ...editForm } : a)
      );
      setShowEditDialog(false);
      setSelectedAppointment(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-foreground">إدارة المواعيد</h1>
            <p className="text-sm text-muted-foreground mt-1">{currentDate}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground text-right">جميع المواعيد</CardTitle>
            <p className="text-sm text-muted-foreground text-right">البحث والتصفية وإدارة مواعيد المرضى</p>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-11 rounded-xl bg-input-background border-border">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                  <Filter className="w-4 h-4 mr-2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="confirmed">مؤكد</SelectItem>
                  <SelectItem value="pending">معلق</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="cancelled">ملغى</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                <SelectTrigger className="h-11 rounded-xl bg-input-background border-border">
                  <SelectValue placeholder="تصفية حسب الطبيب" />
                  <Filter className="w-4 h-4 mr-2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأطباء</SelectItem>
                  <SelectItem value="د. إيمي شن">د. إيمي شن</SelectItem>
                  <SelectItem value="د. محمد الحارثي">د. محمد الحارثي</SelectItem>
                  <SelectItem value="د. سارة وليامز">د. سارة وليامز</SelectItem>
                  <SelectItem value="د. جيمس أندرسون">د. جيمس أندرسون</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="البحث باسم المريض أو الخدمة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-11 bg-input-background border-border rounded-xl text-right"
                />
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
              <span>إجمالي النتائج: <strong className="text-foreground">{filteredAppointments.length}</strong></span>
              <span>•</span>
              <span>معلق: <strong className="text-amber-600">{filteredAppointments.filter(a => a.status === "pending").length}</strong></span>
              <span>•</span>
              <span>مؤكد: <strong className="text-green-600">{filteredAppointments.filter(a => a.status === "confirmed").length}</strong></span>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">اسم المريض</TableHead>
                    <TableHead className="font-semibold">نوع الخدمة</TableHead>
                    <TableHead className="font-semibold">الطبيب</TableHead>
                    <TableHead className="font-semibold">التاريخ</TableHead>
                    <TableHead className="font-semibold">الوقت</TableHead>
                    <TableHead className="font-semibold">رقم الدور</TableHead>
                    <TableHead className="font-semibold">الحالة</TableHead>
                    <TableHead className="font-semibold">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-xs text-muted-foreground">{appointment.phone}</p>
                      </TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell className="text-sm">{appointment.doctor}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-muted font-mono text-sm font-medium">
                          {appointment.queueNumber}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Button variant="outline" size="sm" onClick={() => handleView(appointment)}
                            className="rounded-lg hover:bg-muted flex items-center gap-1 text-xs px-2">
                            <Eye className="w-3.5 h-3.5" /> عرض
                          </Button>
                          {appointment.status === "pending" && (
                            <>
                              <Button variant="outline" size="sm" onClick={() => handleApprove(appointment)}
                                className="rounded-lg border-green-200 text-green-700 hover:bg-green-50 flex items-center gap-1 text-xs px-2">
                                <Check className="w-3.5 h-3.5" /> موافقة
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleCancel(appointment)}
                                className="rounded-lg border-red-200 text-red-700 hover:bg-red-50 flex items-center gap-1 text-xs px-2">
                                <X className="w-3.5 h-3.5" /> إلغاء
                              </Button>
                            </>
                          )}
                          {appointment.status === "confirmed" && (
                            <Button variant="outline" size="sm" onClick={() => handleEdit(appointment)}
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

            {filteredAppointments.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">لا توجد مواعيد تطابق معايير البحث</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right text-xl">تفاصيل الموعد</DialogTitle>
            <DialogDescription className="text-right">بيانات الموعد الكاملة</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-3">
              {[
                { label: "اسم المريض", value: selectedAppointment.patientName },
                { label: "رقم الهاتف", value: selectedAppointment.phone },
                { label: "الطبيب", value: selectedAppointment.doctor },
                { label: "نوع الخدمة", value: selectedAppointment.service },
                { label: "التاريخ", value: selectedAppointment.date },
                { label: "الوقت", value: selectedAppointment.time },
                { label: "رقم الدور", value: selectedAppointment.queueNumber },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-foreground font-medium">{value}</span>
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

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right text-xl">تعديل الموعد</DialogTitle>
            <DialogDescription className="text-right">قم بتعديل بيانات الموعد</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-right block">التاريخ</Label>
              <Input value={editForm.date || ""} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                className="text-right" placeholder="التاريخ" />
            </div>
            <div className="space-y-2">
              <Label className="text-right block">الوقت</Label>
              <Input value={editForm.time || ""} onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                className="text-right" placeholder="الوقت" />
            </div>
            <div className="space-y-2">
              <Label className="text-right block">نوع الخدمة</Label>
              <Select value={editForm.service} onValueChange={(v) => setEditForm({ ...editForm, service: v })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="فحص عام">فحص عام</SelectItem>
                  <SelectItem value="قلب">قلب</SelectItem>
                  <SelectItem value="أطفال">أطفال</SelectItem>
                  <SelectItem value="عظام">عظام</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-right block">الطبيب</Label>
              <Select value={editForm.doctor} onValueChange={(v) => setEditForm({ ...editForm, doctor: v })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="د. إيمي شن">د. إيمي شن</SelectItem>
                  <SelectItem value="د. محمد الحارثي">د. محمد الحارثي</SelectItem>
                  <SelectItem value="د. سارة وليامز">د. سارة وليامز</SelectItem>
                  <SelectItem value="د. جيمس أندرسون">د. جيمس أندرسون</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button onClick={saveEdit} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl flex items-center gap-2 justify-center">
              حفظ التعديلات <Save className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => setShowEditDialog(false)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right text-xl">تأكيد الموافقة</DialogTitle>
            <DialogDescription className="text-right">هل تريد الموافقة على هذا الموعد؟</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-right">
              <p className="font-semibold text-foreground">{selectedAppointment.patientName}</p>
              <p className="text-sm text-muted-foreground">{selectedAppointment.date} - {selectedAppointment.time}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={confirmApprove} className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl">
              موافقة على الموعد
            </Button>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right text-xl">إلغاء الموعد</DialogTitle>
            <DialogDescription className="text-right">هل تريد إلغاء هذا الموعد؟ لا يمكن التراجع عن هذا الإجراء.</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-right">
              <p className="font-semibold text-foreground">{selectedAppointment.patientName}</p>
              <p className="text-sm text-muted-foreground">{selectedAppointment.date} - {selectedAppointment.time}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={confirmCancel} className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl">
              إلغاء الموعد
            </Button>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="flex-1 rounded-xl">الاحتفاظ بالموعد</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
