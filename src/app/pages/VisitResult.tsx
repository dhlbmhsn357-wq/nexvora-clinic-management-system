import { useNavigate } from "react-router";
import {
  ArrowLeft, CheckCircle2, Pill, FlaskConical, Scan, CalendarCheck, FileText, Stethoscope
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const visitData = {
  doctor: "د. محمد الحارثي",
  specialty: "قلب وأوعية دموية",
  date: "18 أغسطس 2026",
  time: "10:30 ص",
  complaint: "ألم في الصدر مع خفقان متكرر",
  diagnosis: "ارتفاع ضغط الدم مع قلق عصبي",
  notes: "المريضة تحتاج إلى متابعة منتظمة وتقليل التوتر والاسترخاء.",
  prescription: [
    { drug: "أملوديبين 5 مجم", dose: "قرص واحد", frequency: "مرة يومياً", duration: "شهر", notes: "في الصباح" },
    { drug: "أسبرين 81 مجم", dose: "قرص واحد", frequency: "مرة يومياً", duration: "مستمر", notes: "بعد الأكل" },
  ],
  labs: ["صورة دم كاملة CBC", "تحليل كوليسترول شامل", "وظائف كلى"],
  radiology: ["أشعة صدر X-Ray"],
  followup: "22 سبتمبر 2026",
};

export function VisitResult() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <button onClick={() => navigate("/my-appointments")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          العودة لمواعيدي
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 p-5 bg-green-50 border border-green-200 rounded-2xl">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <div className="text-right flex-1">
            <h1 className="text-xl font-bold text-foreground">ملخص الزيارة</h1>
            <p className="text-sm text-muted-foreground">{visitData.doctor} • {visitData.date} {visitData.time}</p>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200">مكتملة</Badge>
        </div>

        {/* Visit info */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-right text-base flex items-center gap-2">
              تفاصيل الزيارة
              <Stethoscope className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "الطبيب", value: visitData.doctor },
              { label: "التخصص", value: visitData.specialty },
              { label: "سبب الزيارة", value: visitData.complaint },
              { label: "التشخيص", value: visitData.diagnosis },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-start p-3 bg-muted/20 rounded-lg gap-3">
                <p className="text-foreground font-medium text-right flex-1">{value}</p>
                <p className="text-sm text-muted-foreground flex-shrink-0">{label}</p>
              </div>
            ))}
            {visitData.notes && (
              <div className="p-3 bg-muted/20 rounded-lg text-right">
                <p className="text-xs text-muted-foreground mb-1">ملاحظات الطبيب</p>
                <p className="text-sm text-foreground">{visitData.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prescription */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-right text-base flex items-center gap-2">
              الوصفة الطبية
              <Pill className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {visitData.prescription.map((med, i) => (
              <div key={i} className="p-4 border border-border rounded-xl text-right">
                <p className="font-bold text-foreground mb-2">{med.drug}</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-muted/30 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground">الجرعة</p>
                    <p className="font-medium">{med.dose}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground">التكرار</p>
                    <p className="font-medium">{med.frequency}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground">المدة</p>
                    <p className="font-medium">{med.duration}</p>
                  </div>
                </div>
                {med.notes && <p className="text-xs text-muted-foreground mt-2">{med.notes}</p>}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Labs */}
          {visitData.labs.length > 0 && (
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-base flex items-center gap-2">
                  التحاليل المطلوبة
                  <FlaskConical className="w-4 h-4 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {visitData.labs.map((lab) => (
                  <div key={lab} className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-lg">
                    <p className="text-sm text-foreground">{lab}</p>
                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Radiology */}
          {visitData.radiology.length > 0 && (
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-base flex items-center gap-2">
                  الأشعة المطلوبة
                  <Scan className="w-4 h-4 text-purple-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {visitData.radiology.map((r) => (
                  <div key={r} className="flex items-center gap-2 p-2.5 bg-purple-50 rounded-lg">
                    <p className="text-sm text-foreground">{r}</p>
                    <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Follow-up */}
        {visitData.followup && (
          <Card className="border-2 border-primary/20 shadow-sm bg-primary/5">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">موعد المتابعة</p>
                  <p className="font-bold text-foreground">{visitData.followup}</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5 text-primary" />
                </div>
              </div>
              <Button onClick={() => navigate("/book-appointment")} className="bg-primary hover:bg-primary/90 rounded-xl text-sm">
                حجز المتابعة
              </Button>
            </CardContent>
          </Card>
        )}

        <Button variant="outline" onClick={() => window.print()} className="w-full rounded-xl gap-2 h-11">
          <FileText className="w-4 h-4" />
          طباعة ملخص الزيارة
        </Button>
      </div>
    </div>
  );
}
