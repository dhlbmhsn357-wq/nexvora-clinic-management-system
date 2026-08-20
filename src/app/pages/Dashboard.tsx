import { useNavigate } from "react-router";
import { Calendar, Clock, CheckCircle2, ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "إجمالي المواعيد",
      value: "24",
      icon: Calendar,
      trend: "+12% من الشهر الماضي",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "الزيارات القادمة",
      value: "3",
      icon: Clock,
      trend: "التالية: غداً، الساعة 10:00 ص",
      color: "text-accent-foreground",
      bgColor: "bg-accent",
    },
    {
      title: "الزيارات المكتملة",
      value: "21",
      icon: CheckCircle2,
      trend: "آخر زيارة: منذ 5 أيام",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      patientName: "سارة أحمد",
      date: "10 مارس 2026",
      time: "10:00 ص",
      doctor: "د. إيمي شن",
      queueNumber: "أ-12",
      status: "confirmed",
    },
    {
      id: 2,
      patientName: "سارة أحمد",
      date: "12 مارس 2026",
      time: "2:30 م",
      doctor: "د. محمد الحارثي",
      queueNumber: "ب-08",
      status: "pending",
    },
    {
      id: 3,
      patientName: "سارة أحمد",
      date: "3 مارس 2026",
      time: "11:00 ص",
      doctor: "د. إيمي شن",
      queueNumber: "أ-05",
      status: "completed",
    },
    {
      id: 4,
      patientName: "سارة أحمد",
      date: "28 فبراير 2026",
      time: "3:00 م",
      doctor: "د. سارة وليامز",
      queueNumber: "ج-15",
      status: "completed",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      confirmed: { variant: "default", label: "مؤكد" },
      pending: { variant: "secondary", label: "قيد الانتظار" },
      completed: { variant: "outline", label: "مكتمل" },
    };

    const config = variants[status] || variants.pending;
    return (
      <Badge
        variant={config.variant}
        className={
          status === "confirmed"
            ? "bg-primary/10 text-primary border-primary/20"
            : status === "pending"
            ? "bg-accent text-accent-foreground border-accent"
            : ""
        }
      >
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-l from-primary/10 via-accent/10 to-secondary/20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-right">
              <h1 className="text-4xl font-bold text-foreground mb-3">
                مرحباً بعودتك، سارة
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                أدر مواعيدك وتابع زياراتك الصحية وابق على تواصل مع مقدمي الرعاية الصحية في مكان واحد.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={() => navigate("/book-appointment")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                حجز موعد
              </Button>
              <Button
                onClick={() => navigate("/search")}
                variant="outline"
                className="px-6 h-12 rounded-xl whitespace-nowrap flex items-center gap-2"
              >
                البحث عن طبيب
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-border shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground text-right">
                  {stat.title}
                </CardTitle>
                <div
                  className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground mb-2 text-right">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground justify-end">
                  <span>{stat.trend}</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Appointments Table */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-right">
                <CardTitle className="text-2xl font-bold text-foreground">
                  المواعيد الأخيرة
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  سجل مواعيدك والزيارات القادمة
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/my-appointments")}
                className="rounded-lg border-border hover:bg-muted"
              >
                عرض الكل
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">المريض</TableHead>
                    <TableHead className="font-semibold">التاريخ</TableHead>
                    <TableHead className="font-semibold">الوقت</TableHead>
                    <TableHead className="font-semibold">الطبيب</TableHead>
                    <TableHead className="font-semibold">رقم الدور</TableHead>
                    <TableHead className="font-semibold">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-medium">{appointment.patientName}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-muted font-mono text-sm">
                          {appointment.queueNumber}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
