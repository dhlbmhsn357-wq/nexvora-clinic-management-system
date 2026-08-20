import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Activity, Mail, Lock, Eye, EyeOff, User, Stethoscope, MonitorSpeaker, Shield } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

type Role = "patient" | "doctor" | "reception" | "admin";

const roles: { value: Role; label: string; description: string; icon: typeof User; route: string }[] = [
  { value: "patient", label: "مريض", description: "حجز وتابعة المواعيد", icon: User, route: "/" },
  { value: "doctor", label: "طبيب", description: "إدارة المرضى والكشوفات", icon: Stethoscope, route: "/doctor" },
  { value: "reception", label: "استقبال", description: "جدول اليوم وتسجيل الوصول", icon: MonitorSpeaker, route: "/reception" },
  { value: "admin", label: "مدير النظام", description: "إدارة شاملة للمركز", icon: Shield, route: "/admin" },
];

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("patient");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const role = roles.find((r) => r.value === selectedRole);
    navigate(role?.route ?? "/");
  };

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-bl from-primary/20 via-accent/30 to-secondary/40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 18c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z' stroke='%237FA08C' stroke-width='.5' opacity='.1'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-center items-end px-16 w-full max-w-xl mx-auto text-right">
          <div className="w-full flex items-center justify-start gap-3 mb-10">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="text-right leading-tight space-y-1">
              <h1 className="text-3xl font-bold text-foreground leading-tight">عيادتي</h1>
              <p className="text-muted-foreground leading-relaxed">نظام إدارة الرعاية الصحية</p>
            </div>
          </div>
          <h2 className="w-full text-2xl md:text-3xl font-bold text-foreground mb-5 leading-tight whitespace-nowrap">
            صحتك أولويتنا
          </h2>
          <p className="w-full text-lg text-muted-foreground max-w-lg leading-8">
            منظومة متكاملة لإدارة العيادة — من حجز المريض حتى إنهاء الكشف وتوليد التقارير.
          </p>
          <div className="w-full mt-10 grid grid-cols-3 gap-10 text-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">5000+</p>
              <p className="text-sm text-muted-foreground mt-1">مريض سعيد</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground mt-1">طبيب خبير</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground mt-1">دعم متواصل</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">عيادتي</h1>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
            <div className="mb-6 text-right">
              <h2 className="text-3xl font-bold text-foreground mb-2">مرحباً بعودتك</h2>
              <p className="text-muted-foreground">اختر نوع حسابك وسجّل الدخول</p>
            </div>

            {/* Role Selector */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {roles.map((role) => {
                const Icon = role.icon;
                const active = selectedRole === role.value;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`flex flex-col items-start p-3 rounded-xl border-2 transition-all duration-200 text-right ${
                      active
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className={`w-full text-right text-sm font-semibold ${active ? "text-primary" : "text-foreground"}`}>{role.label}</p>
                    <p className="w-full text-right text-xs text-muted-foreground leading-tight">{role.description}</p>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    dir="rtl"
                    placeholder="بريدك@مثال.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 h-12 bg-input-background border-border rounded-xl text-right"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-10 h-12 bg-input-background border-border rounded-xl text-right"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button type="button" className="text-sm text-primary hover:underline">نسيت كلمة المرور؟</button>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm text-muted-foreground">تذكرني</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-border text-primary" />
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                تسجيل الدخول كـ {roles.find((r) => r.value === selectedRole)?.label}
              </Button>
            </form>

            {selectedRole === "patient" && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  ليس لديك حساب؟{" "}
                  <Link to="/register" className="text-primary font-medium hover:underline">إنشاء حساب مريض</Link>
                </p>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            بتسجيل الدخول، توافق على شروط الخدمة وسياسة الخصوصية
          </p>
        </div>
      </div>
    </div>
  );
}
