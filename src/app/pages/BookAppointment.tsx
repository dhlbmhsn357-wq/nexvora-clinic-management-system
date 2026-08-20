import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Calendar as CalendarComponent } from "../components/ui/calendar";

export function BookAppointment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");

  const doctors = [
    {
      id: "1",
      name: "د. إيمي شن",
      specialty: "طبيب عام",
      experience: "15 سنة",
    },
    {
      id: "2",
      name: "د. محمد الحارثي",
      specialty: "طبيب قلب",
      experience: "12 سنة",
    },
    {
      id: "3",
      name: "د. سارة وليامز",
      specialty: "طبيب أطفال",
      experience: "10 سنوات",
    },
    {
      id: "4",
      name: "د. جيمس أندرسون",
      specialty: "طبيب عظام",
      experience: "18 سنة",
    },
  ];

  const timeSlots = [
    "09:00 ص",
    "09:30 ص",
    "10:00 ص",
    "10:30 ص",
    "11:00 ص",
    "11:30 ص",
    "02:00 م",
    "02:30 م",
    "03:00 م",
    "03:30 م",
    "04:00 م",
    "04:30 م",
  ];

  const handleContinue = () => {
    if (step === 1 && selectedDoctor) {
      setStep(2);
    } else if (step === 2 && selectedDate) {
      setStep(3);
    } else if (step === 3 && selectedTime) {
      sessionStorage.setItem(
        "pendingAppointment",
        JSON.stringify({
          doctor: doctors.find((d) => d.id === selectedDoctor),
          date: selectedDate,
          time: selectedTime,
        })
      );
      navigate("/appointment-confirmation");
    }
  };

  const canContinue = () => {
    if (step === 1) return !!selectedDoctor;
    if (step === 2) return !!selectedDate;
    if (step === 3) return !!selectedTime;
    return false;
  };

  const steps = [
    { num: 1, label: "اختر الطبيب" },
    { num: 2, label: "اختر التاريخ" },
    { num: 3, label: "اختر الوقت" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-l from-primary/10 via-accent/10 to-secondary/20 border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold text-foreground mb-3 text-right">
            حجز موعد
          </h1>
          <p className="text-lg text-muted-foreground text-right">
            اتبع الخطوات أدناه لجدولة زيارتك
          </p>

          {/* Progress Steps - RTL */}
          <div className="flex items-center gap-4 mt-8">
            {steps.map((s, index) => (
              <div key={s.num} className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-1 text-right">
                    <p
                      className={`text-sm font-medium ${
                        step >= s.num ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 flex-shrink-0 ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{s.num}</span>
                    )}
                  </div>
                </div>
                {index < 2 && (
                  <div
                    className={`h-1 w-full rounded-full transition-all duration-200 ${
                      step > s.num ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground text-right">
              {step === 1 && "اختر طبيبك"}
              {step === 2 && "اختر تاريخ الموعد"}
              {step === 3 && "اختر الوقت المناسب"}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 text-right">
              {step === 1 && "اختر من بين كوكبة أطبائنا المتخصصين"}
              {step === 2 && "حدد يوماً مناسباً لزيارتك"}
              {step === 3 && "اختر وقتاً متاحاً يناسبك"}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Select Doctor */}
            {step === 1 && (
              <div className="space-y-4">
                <Label className="text-foreground">الأطباء المتاحون</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className={`p-5 rounded-xl border-2 text-right transition-all duration-200 hover:shadow-md ${
                        selectedDoctor === doctor.id
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-lg mb-1">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {doctor.specialty}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            الخبرة: {doctor.experience}
                          </p>
                        </div>
                        {selectedDoctor === doctor.id && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Date */}
            {step === 2 && (
              <div className="space-y-4">
                <Label className="text-foreground">اختر التاريخ</Label>
                <div className="flex justify-center p-4 bg-muted/30 rounded-xl">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-lg border-0"
                  />
                </div>
                {selectedDate && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl text-right">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">التاريخ المحدد:</span>{" "}
                      {selectedDate.toLocaleDateString("ar-SA", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Select Time */}
            {step === 3 && (
              <div className="space-y-4">
                <Label className="text-foreground">المواعيد المتاحة</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-md ${
                        selectedTime === time
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <Clock className="w-5 h-5 mx-auto mb-2 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {time}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                onClick={handleContinue}
                disabled={!canContinue()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                {step === 3 ? "تأكيد الموعد" : "التالي"}
              </Button>
              <Button
                variant="outline"
                onClick={() => (step > 1 ? setStep(step - 1) : navigate("/"))}
                className="rounded-lg border-border hover:bg-muted flex items-center gap-2"
              >
                {step > 1 ? "السابق" : "إلغاء"}
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
