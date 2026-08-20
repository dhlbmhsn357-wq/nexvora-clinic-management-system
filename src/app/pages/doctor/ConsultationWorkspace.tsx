import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft, User, AlertTriangle, Pill, FlaskConical, Scan, CalendarPlus,
  Plus, Trash2, CheckCircle2, ChevronDown, ChevronUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";

interface MedItem { id: number; drug: string; dose: string; frequency: string; duration: string; notes: string }
interface LabItem { id: number; test: string }
interface RadioItem { id: number; scan: string }

const patientData: Record<number, { name: string; age: number; gender: string; complaint: string; allergies: string[]; conditions: string[]; lastVisits: { date: string; diagnosis: string }[] }> = {
  1: { name: "سارة أحمد", age: 34, gender: "أنثى", complaint: "ألم في الصدر متكرر منذ أسبوع", allergies: ["بنسيلين"], conditions: ["ضغط دم مرتفع"], lastVisits: [{ date: "10 يناير 2026", diagnosis: "نوبة قلق حادة" }, { date: "5 ديسمبر 2025", diagnosis: "ارتفاع ضغط الدم" }] },
  2: { name: "محمد البراهيم", age: 55, gender: "ذكر", complaint: "متابعة ضغط الدم الشهرية", allergies: [], conditions: ["ضغط دم مرتفع", "سكري نوع 2"], lastVisits: [{ date: "15 يناير 2026", diagnosis: "ضبط الجرعة" }, { date: "10 ديسمبر 2025", diagnosis: "ارتفاع ضغط الدم" }] },
  3: { name: "فاطمة داود", age: 28, gender: "أنثى", complaint: "خفقان متكرر وتعب عام", allergies: ["سلفا"], conditions: [], lastVisits: [{ date: "20 فبراير 2026", diagnosis: "فحص روتيني" }] },
};

export function ConsultationWorkspace() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patientId = Number(id) || 1;
  const patient = patientData[patientId] ?? patientData[1];

  const [complaint, setComplaint] = useState(patient.complaint);
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [medications, setMedications] = useState<MedItem[]>([
    { id: 1, drug: "", dose: "", frequency: "", duration: "", notes: "" },
  ]);
  const [labs, setLabs] = useState<LabItem[]>([]);
  const [radiology, setRadiology] = useState<RadioItem[]>([]);
  const [newLab, setNewLab] = useState("");
  const [newRadio, setNewRadio] = useState("");

  const addMed = () => setMedications((p) => [...p, { id: Date.now(), drug: "", dose: "", frequency: "", duration: "", notes: "" }]);
  const removeMed = (id: number) => setMedications((p) => p.filter((m) => m.id !== id));
  const updateMed = (id: number, field: keyof MedItem, val: string) =>
    setMedications((p) => p.map((m) => m.id === id ? { ...m, [field]: val } : m));

  const addLab = () => { if (newLab.trim()) { setLabs((p) => [...p, { id: Date.now(), test: newLab.trim() }]); setNewLab(""); } };
  const addRadio = () => { if (newRadio.trim()) { setRadiology((p) => [...p, { id: Date.now(), scan: newRadio.trim() }]); setNewRadio(""); } };

  const completeVisit = () => {
    setCompleted(true);
    setShowCompleteDialog(false);
    setTimeout(() => navigate("/doctor"), 1500);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">تم إنهاء الزيارة</h2>
          <p className="text-muted-foreground">جاري الانتقال لقائمة الانتظار...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h1 className="text-xl font-bold text-foreground">{patient.name}</h1>
              <p className="text-sm text-muted-foreground">{patient.age} سنة • {patient.gender}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/doctor")}
              className="rounded-xl gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة
            </Button>
            <Button
              onClick={() => setShowCompleteDialog(true)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              إنهاء الزيارة
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left column: Patient Info */}
          <div className="xl:col-span-1 space-y-4">
            {/* Allergies & Conditions */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-base flex items-center gap-2">
                  تنبيهات مهمة
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {patient.allergies.length > 0 && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">حساسية:</p>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {patient.allergies.map((a) => (
                        <Badge key={a} className="bg-red-100 text-red-700 border-red-200">{a}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {patient.conditions.length > 0 && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">أمراض مزمنة:</p>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {patient.conditions.map((c) => (
                        <Badge key={c} variant="outline" className="border-amber-200 text-amber-700">{c}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {patient.allergies.length === 0 && patient.conditions.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-2">لا تنبيهات</p>
                )}
              </CardContent>
            </Card>

            {/* Visit History */}
            <Card className="border-border shadow-sm">
              <CardHeader
                className="pb-3 cursor-pointer"
                onClick={() => setShowHistory(!showHistory)}
              >
                <CardTitle className="text-right text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    الزيارات السابقة
                    <Badge variant="outline" className="text-xs">{patient.lastVisits.length}</Badge>
                  </span>
                  {showHistory ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </CardTitle>
              </CardHeader>
              {showHistory && (
                <CardContent className="pt-0 space-y-2">
                  {patient.lastVisits.map((v, i) => (
                    <div key={i} className="p-3 bg-muted/30 rounded-lg text-right">
                      <p className="text-xs text-muted-foreground">{v.date}</p>
                      <p className="text-sm font-medium text-foreground">{v.diagnosis}</p>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Follow-up */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-base flex items-center gap-2">
                  موعد المتابعة
                  <CalendarPlus className="w-4 h-4 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="date"
                  value={followupDate}
                  onChange={(e) => setFollowupDate(e.target.value)}
                  className="bg-input-background border-border rounded-xl text-right"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right column: Consultation */}
          <div className="xl:col-span-2 space-y-4">
            {/* Complaint & Notes */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-base">سبب الزيارة والملاحظات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-right block text-sm text-muted-foreground">سبب الزيارة</Label>
                  <Input
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    className="bg-input-background border-border rounded-xl text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-right block text-sm text-muted-foreground">ملاحظات الطبيب</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أدخل ملاحظاتك..."
                    rows={3}
                    className="bg-input-background border-border rounded-xl text-right resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-right block text-sm text-muted-foreground">التشخيص</Label>
                  <Input
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="التشخيص النهائي"
                    className="bg-input-background border-border rounded-xl text-right"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Prescription */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-right text-base flex items-center gap-2">
                    الوصفة الطبية
                    <Pill className="w-4 h-4 text-primary" />
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={addMed} className="rounded-lg gap-1 text-xs">
                    <Plus className="w-3 h-3" />
                    إضافة دواء
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {medications.map((med, idx) => (
                  <div key={med.id} className="p-3 bg-muted/20 rounded-xl border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <button onClick={() => removeMed(med.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <p className="text-sm font-medium text-muted-foreground">دواء {idx + 1}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="اسم الدواء" value={med.drug} onChange={(e) => updateMed(med.id, "drug", e.target.value)} className="bg-background border-border rounded-lg text-right text-sm" />
                      <Input placeholder="الجرعة" value={med.dose} onChange={(e) => updateMed(med.id, "dose", e.target.value)} className="bg-background border-border rounded-lg text-right text-sm" />
                      <Input placeholder="عدد المرات" value={med.frequency} onChange={(e) => updateMed(med.id, "frequency", e.target.value)} className="bg-background border-border rounded-lg text-right text-sm" />
                      <Input placeholder="المدة" value={med.duration} onChange={(e) => updateMed(med.id, "duration", e.target.value)} className="bg-background border-border rounded-lg text-right text-sm" />
                    </div>
                    <Input placeholder="تعليمات إضافية" value={med.notes} onChange={(e) => updateMed(med.id, "notes", e.target.value)} className="bg-background border-border rounded-lg text-right text-sm" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Lab & Radiology */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-right text-base flex items-center gap-2">
                    طلبات التحاليل
                    <FlaskConical className="w-4 h-4 text-blue-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={addLab} className="rounded-lg px-3">
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="اسم التحليل"
                      value={newLab}
                      onChange={(e) => setNewLab(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addLab()}
                      className="bg-input-background border-border rounded-lg text-right text-sm"
                    />
                  </div>
                  {labs.map((l) => (
                    <div key={l.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                      <button onClick={() => setLabs((p) => p.filter((x) => x.id !== l.id))} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <p className="text-sm text-right">{l.test}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-right text-base flex items-center gap-2">
                    طلبات الأشعة
                    <Scan className="w-4 h-4 text-purple-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={addRadio} className="rounded-lg px-3">
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="نوع الأشعة"
                      value={newRadio}
                      onChange={(e) => setNewRadio(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addRadio()}
                      className="bg-input-background border-border rounded-lg text-right text-sm"
                    />
                  </div>
                  {radiology.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                      <button onClick={() => setRadiology((p) => p.filter((x) => x.id !== r.id))} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <p className="text-sm text-right">{r.scan}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-right">إنهاء الزيارة</DialogTitle>
            <DialogDescription className="text-right">
              سيتم حفظ جميع البيانات وتغيير حالة الموعد إلى مكتمل. هل تريد المتابعة؟
            </DialogDescription>
          </DialogHeader>
          {!diagnosis.trim() && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-right">
              <p className="text-sm text-amber-700">التشخيص فارغ — يمكنك الإنهاء بدونه.</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={completeVisit} className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl">تأكيد الإنهاء</Button>
            <Button variant="outline" onClick={() => setShowCompleteDialog(false)} className="flex-1 rounded-xl">العودة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
