import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Hash,
  ArrowRight,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export function AppointmentConfirmation() {
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [queueNumber] = useState("أ-" + Math.floor(Math.random() * 50 + 1));

  useEffect(() => {
    const data = sessionStorage.getItem("pendingAppointment");
    if (data) {
      setAppointmentData(JSON.parse(data));
      sessionStorage.removeItem("pendingAppointment");
    } else {
      navigate("/book-appointment");
    }
  }, [navigate]);

  if (!appointmentData) {
    return null;
  }

  const formattedDate = new Date(appointmentData.date).toLocaleDateString(
    "ar-SA",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Success Banner */}
      <div className="bg-gradient-to-l from-primary/10 via-accent/10 to-secondary/20 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              تم تأكيد الموعد!
            </h1>
            <p className="text-lg text-muted-foreground">
              تم جدولة موعدك بنجاح. سنرسل تأكيداً إلى بريدك الإلكتروني.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Queue Number Highlight */}
        <Card className="border-2 border-primary bg-gradient-to-bl from-primary/5 to-accent/5 shadow-lg mb-6">
          <CardContent className="py-8">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                رقم دورك في الانتظار
              </p>
              <div className="inline-flex items-center justify-center gap-3 bg-card px-8 py-4 rounded-2xl shadow-md border border-border">
                <span className="text-5xl font-bold text-foreground font-mono">
                  {queueNumber}
                </span>
                <Hash className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                يرجى الحضور قبل 15 دقيقة من موعدك المحدد
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <Card className="border-border shadow-lg mb-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-right">
              تفاصيل الموعد
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                <div className="flex-1 text-right">
                  <p className="text-sm text-muted-foreground mb-1">الطبيب</p>
                  <p className="text-lg font-semibold text-foreground">
                    {appointmentData.doctor.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {appointmentData.doctor.specialty}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                <div className="flex-1 text-right">
                  <p className="text-sm text-muted-foreground mb-1">التاريخ</p>
                  <p className="text-lg font-semibold text-foreground">
                    {formattedDate}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                <div className="flex-1 text-right">
                  <p className="text-sm text-muted-foreground mb-1">الوقت</p>
                  <p className="text-lg font-semibold text-foreground">
                    {appointmentData.time}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                <div className="flex-1 text-right">
                  <p className="text-sm text-muted-foreground mb-1">
                    رقم الدور
                  </p>
                  <p className="text-lg font-semibold text-foreground font-mono">
                    {queueNumber}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Hash className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="border-border shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 text-right">
              معلومات مهمة
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2 text-right">
                <span>يرجى الحضور قبل 15 دقيقة على الأقل من موعدك المحدد</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              </li>
              <li className="flex items-start gap-2 text-right">
                <span>أحضر بطاقة هوية سارية وبطاقة التأمين الصحي إن وجدت</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              </li>
              <li className="flex items-start gap-2 text-right">
                <span>يمكنك إعادة جدولة أو إلغاء موعدك قبل 24 ساعة من الموعد</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              </li>
              <li className="flex items-start gap-2 text-right">
                <span>إذا كان لديك أي استفسارات، تواصل معنا على: 920-000-000</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate("/my-appointments")}
            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 justify-center"
          >
            <ArrowRight className="w-5 h-5" />
            عرض مواعيدي
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl border-border hover:bg-muted flex items-center gap-2 justify-center"
          >
            <Share2 className="w-5 h-5" />
            مشاركة التفاصيل
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl border-border hover:bg-muted flex items-center gap-2 justify-center"
          >
            <Download className="w-5 h-5" />
            تنزيل التأكيد
          </Button>
        </div>
      </div>
    </div>
  );
}
