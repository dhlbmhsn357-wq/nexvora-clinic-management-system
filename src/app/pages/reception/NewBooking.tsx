import { useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, User, Stethoscope, CalendarDays, Clock, Check } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";

type Step = 1 | 2 | 3 | 4 | 5;

const doctors = [
  { id: 1, name: "د. محمد الحارثي", specialty: "قلب وأوعية دموية", slots: ["09:00 ص", "10:30 ص", "12:00 م"] },
  { id: 2, name: "د. إيمي شن", specialty: "طب عام", slots: ["09:30 ص", "11:00 ص", "02:00 م"] },
  { id: 3, name: "د. سارة وليامز", specialty: "أطفال", slots: ["10:00 ص", "11:30 ص", "01:30 م"] },
  { id: 4, name: "د. جيمس أندرسون", specialty: "عظام", slots: ["09:00 ص", "12:30 م", "03:00 م"] },
];

const existingPatients = [
  { id: 1, name: "سارة أحمد", phone: "0501234567" },
  { id: 2, name: "محمد البراهيم", phone: "0557891234" },
  { id: 3, name: "فاطمة داود", phone: "0541239876" },
];

const visitTypes = ["كشف جديد", "متابعة"];

export function NewBooking() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<(typeof existingPatients)[0] | null>(null);
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientPhone, setNewPatientPhone] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors)[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [visitType, setVisitType] = useState("كشف جديد");
  const [confirmed, setConfirmed] = useState(false);

  const filteredPatients = existingPatients.filter(
    (p) => p.name.includes(patientSearch) || p.phone.includes(patientSearch)
  );

  const steps = [
    { n: 1, label: "المريض", icon: User },
    { n: 2, label: "الطبيب", icon: Stethoscope },
    { n: 3, label: "الموعد", icon: CalendarDays },
    { n: 4, label: "تأكيد", icon: Check },
  ];

  const patientName = isNewPatient ? newPatientName : selectedPatient?.name ?? "";
  const canProceed = (): boolean => {
    if (step === 1) return !!(selectedPatient || (isNewPatient && newPatientName && newPatientPhone));
    if (step === 2) return !!selectedDoctor;
    if (step === 3) return !!(selectedDate && selectedSlot);
    return true;
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => navigate("/reception"), 1500);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">تم الحجز بنجاح</h2>
          <p className="text-muted-foreground">جاري العودة للوحة الاستقبال...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground text-right">حجز موعد جديد</h1>
        </div>
      </div>

      <div className="p-8 max-w-2xl mx-auto space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const done = step > s.n;
            const active = step === s.n;
            return (
              <div key={s.n} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${done ? "bg-green-100 text-green-700" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {done ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                  <span className="font-medium">{s.label}</span>
                </div>
                {idx < steps.length - 1 && <div className={`w-6 h-0.5 ${step > s.n ? "bg-green-400" : "bg-border"}`} />}
              </div>
            );
          })}
        </div>

        {/* Step 1: Patient */}
        {step === 1 && (
          <Card className="border-border shadow-sm">
            <CardContent className="p-6 space-y-5">
              <h2 className="text-lg font-bold text-right text-foreground">اختيار المريض</h2>

              {!isNewPatient ? (
                <>
                  <Input
                    placeholder="ابحث بالاسم أو رقم الهاتف"
                    value={patientSearch}
                    onChange={(e) => { setPatientSearch(e.target.value); setSelectedPatient(null); }}
                    className="bg-input-background border-border rounded-xl text-right"
                  />
                  <div className="space-y-2">
                    {filteredPatients.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPatient(p)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-right ${selectedPatient?.id === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/30"}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <p className="font-medium text-foreground">{p.name}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{p.phone}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setIsNewPatient(true)} className="w-full text-center text-sm text-primary hover:underline">
                    + تسجيل مريض جديد
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-right text-muted-foreground">بيانات المريض الجديد</h3>
                  <div className="space-y-2">
                    <Label className="text-right block">الاسم الكامل</Label>
                    <Input value={newPatientName} onChange={(e) => setNewPatientName(e.target.value)} placeholder="اسم المريض" className="bg-input-background border-border rounded-xl text-right" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-right block">رقم الهاتف</Label>
                    <Input value={newPatientPhone} onChange={(e) => setNewPatientPhone(e.target.value)} placeholder="05xxxxxxxx" className="bg-input-background border-border rounded-xl text-right" />
                  </div>
                  <button onClick={() => setIsNewPatient(false)} className="text-sm text-muted-foreground hover:text-foreground">
                    العودة للبحث
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Doctor */}
        {step === 2 && (
          <Card className="border-border shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-right text-foreground">اختيار الطبيب</h2>
              <div className="space-y-2">
                {doctors.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDoctor(d)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-right ${selectedDoctor?.id === d.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/30"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground">{d.name}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{d.specialty}</Badge>
                  </button>
                ))}
              </div>

              {/* Visit type */}
              <div className="space-y-2 pt-2">
                <Label className="text-right block text-sm">نوع الزيارة</Label>
                <div className="flex gap-2">
                  {visitTypes.map((vt) => (
                    <button
                      key={vt}
                      onClick={() => setVisitType(vt)}
                      className={`flex-1 py-2 rounded-xl border-2 text-sm transition-all ${visitType === vt ? "border-primary bg-primary/5 text-primary font-semibold" : "border-border text-muted-foreground hover:border-primary/30"}`}
                    >
                      {vt}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Date & Slot */}
        {step === 3 && (
          <Card className="border-border shadow-sm">
            <CardContent className="p-6 space-y-5">
              <h2 className="text-lg font-bold text-right text-foreground">اختيار الموعد</h2>
              <div className="space-y-2">
                <Label className="text-right block text-sm">التاريخ</Label>
                <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-input-background border-border rounded-xl" />
              </div>
              {selectedDate && selectedDoctor && (
                <div className="space-y-2">
                  <Label className="text-right block text-sm">المواعيد المتاحة</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedDoctor.slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 rounded-xl border-2 text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${selectedSlot === slot ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30 text-foreground"}`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <Card className="border-border shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-right text-foreground">تأكيد الحجز</h2>
              <div className="space-y-3">
                {[
                  { label: "المريض", value: patientName },
                  { label: "الطبيب", value: selectedDoctor?.name ?? "" },
                  { label: "التخصص", value: selectedDoctor?.specialty ?? "" },
                  { label: "التاريخ", value: selectedDate },
                  { label: "الوقت", value: selectedSlot },
                  { label: "نوع الزيارة", value: visitType },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
                    <span className="font-medium text-foreground">{value}</span>
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          {step < 4 ? (
            <>
              <Button
                onClick={() => setStep((s) => (s + 1) as Step)}
                disabled={!canProceed()}
                className="flex-1 bg-primary hover:bg-primary/90 rounded-xl"
              >
                التالي
              </Button>
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep((s) => (s - 1) as Step)} className="rounded-xl px-6">
                  رجوع
                </Button>
              )}
            </>
          ) : (
            <>
              <Button onClick={handleConfirm} className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl gap-2">
                <CheckCircle2 className="w-4 h-4" />
                تأكيد الحجز
              </Button>
              <Button variant="outline" onClick={() => setStep(3)} className="rounded-xl px-6">رجوع</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
