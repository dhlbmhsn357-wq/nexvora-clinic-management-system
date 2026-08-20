import { useState } from "react";
import { Search, Eye, Edit, Trash2, User, Calendar, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateJoined: string;
  totalAppointments: number;
  lastVisit: string;
  status: string;
}

export function ManagePatients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "سارة أحمد", email: "sara.ahmed@email.com", phone: "0501234567", dateJoined: "15 يناير 2025", totalAppointments: 12, lastVisit: "5 مارس 2026", status: "نشط" },
    { id: 2, name: "محمد البراهيم", email: "m.ibrahim@email.com", phone: "0552345678", dateJoined: "3 فبراير 2025", totalAppointments: 8, lastVisit: "28 فبراير 2026", status: "نشط" },
    { id: 3, name: "فاطمة داود", email: "fatima.d@email.com", phone: "0563456789", dateJoined: "20 ديسمبر 2024", totalAppointments: 15, lastVisit: "8 مارس 2026", status: "نشط" },
    { id: 4, name: "جيمس ويلسون", email: "james.wilson@email.com", phone: "0574567890", dateJoined: "28 يناير 2025", totalAppointments: 6, lastVisit: "2 مارس 2026", status: "نشط" },
    { id: 5, name: "ليلى مارتينيز", email: "layla.m@email.com", phone: "0585678901", dateJoined: "10 نوفمبر 2024", totalAppointments: 20, lastVisit: "7 مارس 2026", status: "نشط" },
    { id: 6, name: "داود لي", email: "david.lee@email.com", phone: "0596789012", dateJoined: "5 أكتوبر 2024", totalAppointments: 18, lastVisit: "15 فبراير 2026", status: "نشط" },
    { id: 7, name: "أمل وايت", email: "amal.white@email.com", phone: "0507890123", dateJoined: "1 مارس 2025", totalAppointments: 4, lastVisit: "8 مارس 2026", status: "نشط" },
    { id: 8, name: "روبرت غارسيا", email: "robert.g@email.com", phone: "0518901234", dateJoined: "18 سبتمبر 2024", totalAppointments: 22, lastVisit: "6 مارس 2026", status: "نشط" },
  ]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Patient>>({});

  const currentDate = new Date().toLocaleDateString("ar-SA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
  );

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowViewDialog(true);
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setEditForm({ ...patient });
    setShowEditDialog(true);
  };

  const handleDelete = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDeleteDialog(true);
  };

  const saveEdit = () => {
    if (selectedPatient && editForm) {
      setPatients((prev) =>
        prev.map((p) => p.id === selectedPatient.id ? { ...p, ...editForm } as Patient : p)
      );
      setShowEditDialog(false);
      setSelectedPatient(null);
    }
  };

  const confirmDelete = () => {
    if (selectedPatient) {
      setPatients((prev) => prev.filter((p) => p.id !== selectedPatient.id));
      setShowDeleteDialog(false);
      setSelectedPatient(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-foreground">إدارة المرضى</h1>
              <p className="text-sm text-muted-foreground mt-1">{currentDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border shadow-md border-t-4 border-t-primary">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">إجمالي المرضى</p>
                  <p className="text-3xl font-bold text-foreground">{patients.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border shadow-md border-t-4 border-t-green-500">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">المرضى النشطون</p>
                  <p className="text-3xl font-bold text-foreground">{patients.filter((p) => p.status === "نشط").length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border shadow-md border-t-4 border-t-blue-500">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">إجمالي المواعيد</p>
                  <p className="text-3xl font-bold text-foreground">
                    {patients.reduce((sum, p) => sum + p.totalAppointments, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground text-right">سجلات المرضى</CardTitle>
            <p className="text-sm text-muted-foreground text-right">عرض وإدارة حسابات المرضى المسجلين</p>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="البحث بالاسم أو البريد الإلكتروني أو الهاتف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-11 bg-input-background border-border rounded-xl text-right"
                />
              </div>
            </div>

            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">المريض</TableHead>
                    <TableHead className="font-semibold">معلومات الاتصال</TableHead>
                    <TableHead className="font-semibold">تاريخ الانضمام</TableHead>
                    <TableHead className="font-semibold">إجمالي المواعيد</TableHead>
                    <TableHead className="font-semibold">آخر زيارة</TableHead>
                    <TableHead className="font-semibold">الحالة</TableHead>
                    <TableHead className="font-semibold">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border border-border">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-right">
                            <p className="font-medium">{patient.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{patient.email}</p>
                        <p className="text-xs text-muted-foreground">{patient.phone}</p>
                      </TableCell>
                      <TableCell>{patient.dateJoined}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-muted font-medium text-sm">
                          {patient.totalAppointments}
                        </span>
                      </TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                          {patient.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Button variant="outline" size="sm" onClick={() => handleDelete(patient)}
                            className="rounded-lg border-red-200 text-red-700 hover:bg-red-50 px-2">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(patient)}
                            className="rounded-lg hover:bg-muted flex items-center gap-1 text-xs px-2">
                            <Edit className="w-3.5 h-3.5" /> تعديل
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleView(patient)}
                            className="rounded-lg hover:bg-muted flex items-center gap-1 text-xs px-2">
                            <Eye className="w-3.5 h-3.5" /> عرض
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">لا يوجد مرضى يطابقون معايير البحث</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right text-xl">بيانات المريض</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                <Avatar className="w-16 h-16 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {selectedPatient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-xl font-bold text-foreground">{selectedPatient.name}</p>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                    {selectedPatient.status}
                  </span>
                </div>
              </div>
              {[
                { label: "البريد الإلكتروني", value: selectedPatient.email },
                { label: "رقم الهاتف", value: selectedPatient.phone },
                { label: "تاريخ الانضمام", value: selectedPatient.dateJoined },
                { label: "إجمالي المواعيد", value: String(selectedPatient.totalAppointments) },
                { label: "آخر زيارة", value: selectedPatient.lastVisit },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="font-medium text-foreground">{value}</span>
                  <span className="text-muted-foreground text-sm">{label}</span>
                </div>
              ))}
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
            <DialogTitle className="text-right text-xl">تعديل بيانات المريض</DialogTitle>
            <DialogDescription className="text-right">قم بتعديل معلومات المريض</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-right block">الاسم الكامل</Label>
              <Input value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="text-right" placeholder="الاسم الكامل" />
            </div>
            <div className="space-y-2">
              <Label className="text-right block">البريد الإلكتروني</Label>
              <Input value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="text-right" placeholder="البريد الإلكتروني" type="email" />
            </div>
            <div className="space-y-2">
              <Label className="text-right block">رقم الهاتف</Label>
              <Input value={editForm.phone || ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="text-right" placeholder="رقم الهاتف" />
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

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right text-xl">حذف المريض</DialogTitle>
            <DialogDescription className="text-right">
              هل أنت متأكد من حذف هذا المريض؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-right">
              <p className="font-semibold text-foreground">{selectedPatient.name}</p>
              <p className="text-sm text-muted-foreground">{selectedPatient.email} • {selectedPatient.phone}</p>
              <p className="text-sm text-muted-foreground mt-1">إجمالي المواعيد: {selectedPatient.totalAppointments}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={confirmDelete} className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl flex items-center gap-2 justify-center">
              حذف المريض <X className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} className="flex-1 rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
