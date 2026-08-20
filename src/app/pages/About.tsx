import {
  Activity,
  Clock,
  MapPin,
  Phone,
  Mail,
  Heart,
  Users,
  Award,
  Stethoscope,
  User,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export function About() {
  const services = [
    {
      icon: Stethoscope,
      title: "الطب العام",
      description: "رعاية أولية شاملة لجميع الأعمار",
    },
    {
      icon: Heart,
      title: "طب القلب",
      description: "رعاية صحة القلب والأوعية الدموية",
    },
    {
      icon: Users,
      title: "طب الأطفال",
      description: "رعاية متخصصة للأطفال والرضع",
    },
    {
      icon: Activity,
      title: "جراحة العظام",
      description: "علاج العظام والمفاصل والعضلات",
    },
  ];

  const doctors = [
    {
      name: "د. إيمي شن",
      specialty: "طبيب عام",
      experience: "15 سنة",
      education: "دكتوراه في الطب، جامعة هارفارد",
      description: "متخصصة في الرعاية الوقائية وإدارة الأمراض المزمنة",
    },
    {
      name: "د. محمد الحارثي",
      specialty: "طبيب قلب",
      experience: "12 سنة",
      education: "دكتوراه في الطب، جامعة جونز هوبكنز",
      description: "خبير في الوقاية من أمراض القلب وعلاجها",
    },
    {
      name: "د. سارة وليامز",
      specialty: "طبيب أطفال",
      experience: "10 سنوات",
      education: "دكتوراه في الطب، جامعة ستانفورد",
      description: "متفانية في صحة الأطفال ونموهم",
    },
    {
      name: "د. جيمس أندرسون",
      specialty: "جراح عظام",
      experience: "18 سنة",
      education: "دكتوراه في الطب، جامعة ييل",
      description: "متخصص في إصابات الرياضة واستبدال المفاصل",
    },
  ];

  const stats = [
    { number: "5000+", label: "مريض سعيد" },
    { number: "50+", label: "طبيب خبير" },
    { number: "20+", label: "سنة خدمة" },
    { number: "24/7", label: "دعم الطوارئ" },
  ];

  const operatingHours = [
    { day: "الاثنين - الجمعة", hours: "8:00 ص - 8:00 م" },
    { day: "السبت", hours: "9:00 ص - 5:00 م" },
    { day: "الأحد", hours: "10:00 ص - 4:00 م" },
    { day: "الطوارئ", hours: "متاح 24/7" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-bl from-primary/20 via-accent/20 to-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-right">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-2">عيادتي</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                نظام إدارة الرعاية الصحية
              </p>
            </div>
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed text-right">
            نقدم خدمات رعاية صحية رحيمة وعالية الجودة لمجتمعنا منذ أكثر من 20 عاماً. التزامنا هو تقديم رعاية استثنائية للمريض من خلال الابتكار والخبرة والتفاني.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="py-8 text-center">
                <p className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-right">مهمتنا</h2>
          <Card className="border-border shadow-sm">
            <CardContent className="p-8 text-right">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                في عيادتي، نؤمن بأن الجميع يستحق الوصول إلى رعاية صحية جيدة. مهمتنا هي تقديم خدمات طبية شاملة تتمحور حول المريض وتعزز الصحة وتمنع المرض وتحسن جودة الحياة لأفراد ومجتمعات منطقتنا.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                نسعى إلى خلق بيئة ترحيبية يشعر فيها المرضى بأنهم مسموعون ومحترمون ومُعتنى بهم. من خلال نظامنا المتطور لحجز المواعيد وإدارة قوائم الانتظار، نضمن تقديم الخدمة بكفاءة عالية مع الحفاظ على أعلى معايير الرعاية الطبية.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-right">خدماتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-border shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/30"
              >
                <CardContent className="p-6 text-right">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mr-auto">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Doctors Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-right">
            تعرف على أطبائنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doctor, index) => (
              <Card
                key={index}
                className="border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 text-right">
                      <h3 className="font-bold text-foreground text-xl mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-2">
                        {doctor.specialty}
                      </p>
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground justify-end">
                          <Award className="w-4 h-4" />
                          <span>{doctor.experience} خبرة</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground justify-end">
                          <Activity className="w-4 h-4" />
                          <span>{doctor.education}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {doctor.description}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Operating Hours & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Operating Hours */}
          <Card className="border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-bold text-foreground text-xl">
                  ساعات العمل
                </h3>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="space-y-4">
                {operatingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <span className="font-medium text-foreground">
                      {schedule.day}
                    </span>
                    <span className="text-muted-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-bold text-foreground text-xl">
                  معلومات التواصل
                </h3>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="text-right">
                    <p className="font-medium text-foreground mb-1">العنوان</p>
                    <p className="text-sm text-muted-foreground">
                      شارع الرعاية الصحية 123
                      <br />
                      حي الطبي، الرياض 12345
                    </p>
                  </div>
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="text-right">
                    <p className="font-medium text-foreground mb-1">الهاتف</p>
                    <p className="text-sm text-muted-foreground">
                      الرئيسي: 4567-123 (920)
                      <br />
                      الطوارئ: 8888-999 (920)
                    </p>
                  </div>
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="text-right">
                    <p className="font-medium text-foreground mb-1">البريد الإلكتروني</p>
                    <p className="text-sm text-muted-foreground">
                      info@3iadati.health
                      <br />
                      appointments@3iadati.health
                    </p>
                  </div>
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
