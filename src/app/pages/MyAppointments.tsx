import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Calendar,
  Clock,
  User,
  Eye,
  X,
  Filter,
  Search,
  Plus,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

export function MyAppointments() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const appointments = [
    {
      id: 1,
      date: "10 مارس 2026",
      time: "10:00 ص",
      doctor: "د. إيمي شن",
      specialty: "طبيب عام",
      queueNumber: "أ-12",
      status: "confirmed",
      notes: "فحص دوري",
    },
    {
      id: 2,
      date: "12 مارس 2026",
      time: "2:30 م",
      doctor: "د. محمد الحارثي",
      specialty: "طبيب قلب",
      queueNumber: "ب-08",
      status: "pending",
      notes: "استشارة القلب",
    },
    {
      id: 3,
      date: "15 مارس 2026",
      time: "11:30 ص",
      doctor: "د. سارة وليامز",
      specialty: "طبيب أطفال",
      queueNumber: "ج-05",
      status: "confirmed",
      notes: "تطعيم الأطفال",
    },
    {
      id: 4,
      date: "3 مارس 2026",
      time: "11:00 ص",
      doctor: "د. إيمي شن",
      specialty: "طبيب عام",
      queueNumber: "أ-05",
      status: "completed",
      notes: "متابعة دورية",
    },
    {
      id: 5,
      date: "28 فبراير 2026",
      time: "3:00 م",
      doctor: "د. سارة وليامز",
      specialty: "طبيب أطفال",
      queueNumber: "ج-15",
      status: "completed",
      notes: "فحص سنوي",
    },
    {
      id: 6,
      date: "20 فبراير 2026",
      time: "9:30 ص",
      doctor: "د. جيمس أندرسون",
      specialty: "طبيب عظام",
      queueNumber: "د-03",
      status: "completed",
      notes: "استشارة ألم الركبة",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; className: string }> = {
      confirmed: {
        variant: "default",
        label: "مؤكد",
        className: "bg-primary/10 text-primary border-primary/20",
      },
      pending: {
        variant: "secondary",
        label: "قيد الانتظار",
        className: "bg-accent text-accent-foreground border-accent",
      },
      completed: {
        variant: "outline",
        label: "مكتمل",
        className: "border-muted-foreground/30 text-muted-foreground",
      },
    };

    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || appointment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowDetailsDialog(true);
  };

  const handleCancelClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    setSelectedAppointment(null);
  };

  const upcomingCount = appointments.filter(
    (a) => a.status === "confirmed" || a.status === "pending"
  ).length;
  const completedCount = appointments.filter((a) => a.status === "completed").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-l from-primary/10 via-accent/10 to-secondary/20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-right">
              <h1 className="text-4xl font-bold text-foreground mb-3">
                مواعيدي
              </h1>
              <p className="text-lg text-muted-foreground">
                إدارة ومتابعة جميع مواعيدك الطبية
              </p>
            </div>
            <Button
              onClick={() => navigate("/book-appointment")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              موعد جديد
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border shadow-sm">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">
                    إجمالي المواعيد
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {appointments.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">القادمة</p>
                  <p className="text-3xl font-bold text-foreground">
                    {upcomingCount}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">المكتملة</p>
                  <p className="text-3xl font-bold text-foreground">
                    {completedCount}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-border shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground text-right">
              جميع المواعيد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="البحث بالطبيب أو التخصص..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-11 bg-input-background border-border rounded-xl text-right"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 h-11 rounded-xl bg-input-background border-border">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                  <Filter className="w-4 h-4 ml-2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="confirmed">مؤكد</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow duration-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[minmax(12rem,1.4fr)_minmax(9rem,1fr)_minmax(7rem,.8fr)_minmax(10rem,1fr)_minmax(7rem,.8fr)_auto] items-center gap-4 text-sm" dir="rtl">
                    <div className="min-w-0 text-right">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-foreground text-lg">
                          {appointment.doctor}
                        </h3>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-right">
                      <User className="w-4 h-4 flex-shrink-0" />
                      <span>{appointment.specialty}</span>
                    </div>
                    <div className="text-muted-foreground text-right">
                      <span>دور: {appointment.queueNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-right">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-right">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 md:justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(appointment)}
                        className="rounded-lg border-border hover:bg-muted flex items-center gap-1"
                      >
                        التفاصيل
                        <Eye className="w-4 h-4" />
                      </Button>
                      {appointment.status !== "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelClick(appointment)}
                          className="rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive flex items-center gap-1"
                        >
                          إلغاء
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAppointments.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  لا توجد مواعيد تطابق معايير البحث
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-right">
              تفاصيل الموعد
            </DialogTitle>
            <DialogDescription className="text-right">
              معلومات كاملة عن موعدك
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/30 text-right">
                <p className="text-sm text-muted-foreground mb-1">الطبيب</p>
                <p className="font-semibold text-foreground">
                  {selectedAppointment.doctor}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedAppointment.specialty}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 text-right">
                  <p className="text-sm text-muted-foreground mb-1">الوقت</p>
                  <p className="font-semibold text-foreground">
                    {selectedAppointment.time}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 text-right">
                  <p className="text-sm text-muted-foreground mb-1">التاريخ</p>
                  <p className="font-semibold text-foreground">
                    {selectedAppointment.date}
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 text-right">
                <p className="text-sm text-muted-foreground mb-1">
                  رقم الدور
                </p>
                <p className="font-mono font-bold text-xl text-foreground">
                  {selectedAppointment.queueNumber}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 text-right">
                <p className="text-sm text-muted-foreground mb-1">الملاحظات</p>
                <p className="text-foreground">{selectedAppointment.notes}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 text-right">
                <p className="text-sm text-muted-foreground mb-1">الحالة</p>
                {getStatusBadge(selectedAppointment.status)}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => setShowDetailsDialog(false)}
              className="w-full rounded-xl"
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-right">
              إلغاء الموعد
            </DialogTitle>
            <DialogDescription className="text-right">
              هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 text-right">
              <p className="font-semibold text-foreground mb-2">
                {selectedAppointment.doctor}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedAppointment.date} - {selectedAppointment.time}
              </p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              onClick={handleCancelConfirm}
              className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
            >
              إلغاء الموعد
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              className="flex-1 rounded-xl"
            >
              الاحتفاظ بالموعد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
