import { useState, useMemo } from "react";
import { Download, Calendar, Filter, FileText, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
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

interface DayReport {
  id: number;
  isoDate: string;
  date: string;
  totalAppointments: number;
  confirmed: number;
  pending: number;
  completed: number;
  cancelled: number;
  doctor: string;
  service: string;
}

interface DoctorStat {
  key: string;
  doctor: string;
  totalAppointments: number;
  completed: number;
  pending: number;
  cancelled: number;
}

interface ServiceStat {
  key: string;
  service: string;
  total: number;
}

const ALL_REPORT_DATA: DayReport[] = [
  { id: 1, isoDate: "2026-03-10", date: "10 مارس 2026", totalAppointments: 28, confirmed: 16, pending: 8, completed: 4, cancelled: 0, doctor: "dr-emily", service: "general" },
  { id: 2, isoDate: "2026-03-09", date: "9 مارس 2026", totalAppointments: 25, confirmed: 18, pending: 5, completed: 2, cancelled: 0, doctor: "dr-michael", service: "cardiology" },
  { id: 3, isoDate: "2026-03-08", date: "8 مارس 2026", totalAppointments: 30, confirmed: 20, pending: 6, completed: 3, cancelled: 1, doctor: "dr-sarah", service: "pediatrics" },
  { id: 4, isoDate: "2026-03-07", date: "7 مارس 2026", totalAppointments: 22, confirmed: 15, pending: 4, completed: 3, cancelled: 0, doctor: "dr-james", service: "orthopedics" },
  { id: 5, isoDate: "2026-03-06", date: "6 مارس 2026", totalAppointments: 27, confirmed: 19, pending: 5, completed: 2, cancelled: 1, doctor: "dr-emily", service: "general" },
  { id: 6, isoDate: "2026-03-05", date: "5 مارس 2026", totalAppointments: 20, confirmed: 14, pending: 3, completed: 2, cancelled: 1, doctor: "dr-michael", service: "cardiology" },
  { id: 7, isoDate: "2026-03-04", date: "4 مارس 2026", totalAppointments: 18, confirmed: 12, pending: 4, completed: 2, cancelled: 0, doctor: "dr-sarah", service: "pediatrics" },
  { id: 8, isoDate: "2026-03-03", date: "3 مارس 2026", totalAppointments: 24, confirmed: 17, pending: 4, completed: 2, cancelled: 1, doctor: "dr-emily", service: "general" },
  { id: 9, isoDate: "2026-03-02", date: "2 مارس 2026", totalAppointments: 21, confirmed: 15, pending: 3, completed: 3, cancelled: 0, doctor: "dr-james", service: "orthopedics" },
  { id: 10, isoDate: "2026-03-01", date: "1 مارس 2026", totalAppointments: 26, confirmed: 18, pending: 5, completed: 3, cancelled: 0, doctor: "dr-emily", service: "general" },
];

const ALL_DOCTOR_STATS: DoctorStat[] = [
  { key: "dr-emily", doctor: "د. إيمي شن", totalAppointments: 45, completed: 38, pending: 5, cancelled: 2 },
  { key: "dr-michael", doctor: "د. محمد الحارثي", totalAppointments: 38, completed: 32, pending: 4, cancelled: 2 },
  { key: "dr-sarah", doctor: "د. سارة وليامز", totalAppointments: 42, completed: 36, pending: 5, cancelled: 1 },
  { key: "dr-james", doctor: "د. جيمس أندرسون", totalAppointments: 35, completed: 30, pending: 4, cancelled: 1 },
];

const ALL_SERVICE_STATS: ServiceStat[] = [
  { key: "general", service: "فحص عام", total: 65 },
  { key: "cardiology", service: "قلب", total: 42 },
  { key: "pediatrics", service: "أطفال", total: 35 },
  { key: "orthopedics", service: "عظام", total: 18 },
];

export function Reports() {
  const [startDate, setStartDate] = useState("2026-03-01");
  const [endDate, setEndDate] = useState("2026-03-10");
  const [filterDoctor, setFilterDoctor] = useState("all");
  const [filterService, setFilterService] = useState("all");

  const currentDate = new Date().toLocaleDateString("ar-SA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const filteredReportData = useMemo(() => {
    return ALL_REPORT_DATA.filter((row) => {
      const inDateRange = row.isoDate >= startDate && row.isoDate <= endDate;
      const matchDoctor = filterDoctor === "all" || row.doctor === filterDoctor;
      const matchService = filterService === "all" || row.service === filterService;
      return inDateRange && matchDoctor && matchService;
    });
  }, [startDate, endDate, filterDoctor, filterService]);

  const filteredDoctorStats = useMemo(() => {
    if (filterDoctor === "all") return ALL_DOCTOR_STATS;
    return ALL_DOCTOR_STATS.filter((d) => d.key === filterDoctor);
  }, [filterDoctor]);

  const filteredServiceStats = useMemo(() => {
    if (filterService === "all") return ALL_SERVICE_STATS;
    return ALL_SERVICE_STATS.filter((s) => s.key === filterService);
  }, [filterService]);

  const serviceTotal = filteredServiceStats.reduce((s, r) => s + r.total, 0);

  const totalAppointments = filteredReportData.reduce((s, d) => s + d.totalAppointments, 0);
  const totalConfirmed = filteredReportData.reduce((s, d) => s + d.confirmed, 0);
  const totalCompleted = filteredReportData.reduce((s, d) => s + d.completed, 0);
  const totalCancelled = filteredReportData.reduce((s, d) => s + d.cancelled, 0);

  const handleExportReport = () => {
    const header = "التاريخ,الإجمالي,مؤكدة,معلقة,مكتملة,ملغاة\n";
    const rows = filteredReportData.map((d) =>
      `${d.date},${d.totalAppointments},${d.confirmed},${d.pending},${d.completed},${d.cancelled}`
    ).join("\n");
    const blob = new Blob(["﻿" + header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "تقرير-المواعيد.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-foreground">التقارير</h1>
              <p className="text-sm text-muted-foreground mt-1">{currentDate}</p>
            </div>
            <Button
              onClick={handleExportReport}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all h-11 flex items-center gap-2"
            >
              تصدير التقرير
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Filter Section */}
        <Card className="border-border shadow-md mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground text-right">تصفية التقارير</CardTitle>
            <p className="text-sm text-muted-foreground text-right">اختر نطاق التاريخ والمرشحات لإنشاء التقارير</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">تصفية حسب الخدمة</Label>
                <Select value={filterService} onValueChange={setFilterService}>
                  <SelectTrigger className="h-11 rounded-xl bg-input-background border-border">
                    <SelectValue placeholder="اختر الخدمة" />
                    <Filter className="w-4 h-4 ml-2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الخدمات</SelectItem>
                    <SelectItem value="general">فحص عام</SelectItem>
                    <SelectItem value="cardiology">قلب</SelectItem>
                    <SelectItem value="pediatrics">أطفال</SelectItem>
                    <SelectItem value="orthopedics">عظام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">تصفية حسب الطبيب</Label>
                <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                  <SelectTrigger className="h-11 rounded-xl bg-input-background border-border">
                    <SelectValue placeholder="اختر الطبيب" />
                    <Filter className="w-4 h-4 ml-2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأطباء</SelectItem>
                    <SelectItem value="dr-emily">د. إيمي شن</SelectItem>
                    <SelectItem value="dr-michael">د. محمد الحارثي</SelectItem>
                    <SelectItem value="dr-sarah">د. سارة وليامز</SelectItem>
                    <SelectItem value="dr-james">د. جيمس أندرسون</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-foreground">تاريخ الانتهاء</Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                  <Input id="endDate" type="date" value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="pr-10 h-11 bg-input-background border-border rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-foreground">تاريخ البدء</Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                  <Input id="startDate" type="date" value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pr-10 h-11 bg-input-background border-border rounded-xl" />
                </div>
              </div>
            </div>

            {(filterDoctor !== "all" || filterService !== "all") && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="rounded-lg text-sm"
                  onClick={() => { setFilterDoctor("all"); setFilterService("all"); }}>
                  إزالة التصفية
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "ملغاة", value: totalCancelled, color: "red", icon: FileText },
            { label: "مكتملة", value: totalCompleted, color: "blue", icon: FileText },
            { label: "مؤكدة", value: totalConfirmed, color: "green", icon: TrendingUp },
            { label: "إجمالي المواعيد", value: totalAppointments, color: "primary", icon: FileText },
          ].map(({ label, value, color, icon: Icon }) => (
            <Card key={label} className={`border-border shadow-md border-t-4 border-t-${color}-500`}>
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">{label}</p>
                    <p className="text-3xl font-bold text-foreground">{value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-${color}-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Report Table */}
        <Card className="border-border shadow-md mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-right">
                <CardTitle className="text-2xl font-bold text-foreground">تقرير المواعيد اليومي</CardTitle>
                <p className="text-sm text-muted-foreground">توزيع المواعيد حسب التاريخ</p>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                {filteredReportData.length} أيام
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {filteredReportData.length > 0 ? (
              <div className="rounded-xl border border-border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="font-semibold whitespace-nowrap">التاريخ</TableHead>
                      <TableHead className="font-semibold">إجمالي المواعيد</TableHead>
                      <TableHead className="font-semibold">مؤكدة</TableHead>
                      <TableHead className="font-semibold">معلقة</TableHead>
                      <TableHead className="font-semibold">مكتملة</TableHead>
                      <TableHead className="font-semibold">ملغاة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReportData.map((day) => (
                      <TableRow key={day.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium whitespace-nowrap">{day.date}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-muted font-medium">{day.totalAppointments}</span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-green-100 text-green-700 font-medium">{day.confirmed}</span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-amber-100 text-amber-700 font-medium">{day.pending}</span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-blue-100 text-blue-700 font-medium">{day.completed}</span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-red-100 text-red-700 font-medium">{day.cancelled}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <p>لا توجد بيانات تطابق التصفية المحددة</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Doctor Performance & Service Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Statistics */}
          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground text-right">إحصائيات الخدمات</CardTitle>
              <p className="text-sm text-muted-foreground text-right">المواعيد حسب نوع الخدمة</p>
            </CardHeader>
            <CardContent>
              {filteredServiceStats.length > 0 ? (
                <div className="space-y-4">
                  {filteredServiceStats.map((stat, index) => {
                    const pct = serviceTotal > 0 ? Math.round((stat.total / serviceTotal) * 100) : 0;
                    return (
                      <div key={index} className="p-4 rounded-xl border border-border bg-muted/20">
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-semibold text-foreground">{stat.service}</p>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{stat.total}</p>
                            <p className="text-xs text-muted-foreground">{pct}%</p>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">لا توجد بيانات</div>
              )}
            </CardContent>
          </Card>

          {/* Doctor Performance */}
          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground text-right">أداء الأطباء</CardTitle>
              <p className="text-sm text-muted-foreground text-right">إحصائيات المواعيد حسب الطبيب</p>
            </CardHeader>
            <CardContent>
              {filteredDoctorStats.length > 0 ? (
                <div className="space-y-4">
                  {filteredDoctorStats.map((stat, index) => (
                    <div key={index} className="p-4 rounded-xl border border-border bg-muted/20">
                      <p className="font-semibold text-foreground mb-3 text-right">{stat.doctor}</p>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">ملغاة</p>
                          <p className="font-bold text-red-600">{stat.cancelled}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">معلقة</p>
                          <p className="font-bold text-amber-600">{stat.pending}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">مكتملة</p>
                          <p className="font-bold text-green-600">{stat.completed}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">الإجمالي</p>
                          <p className="font-bold text-foreground">{stat.totalAppointments}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">لا توجد بيانات</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
