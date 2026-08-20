import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Activity, Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-bl from-accent/30 via-primary/20 to-secondary/40 relative overflow-hidden">
        <div className="absolute top-32 start-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 end-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-center items-end px-16 w-full text-right">
          <div className="flex items-center gap-3 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">عيادتي</h1>
              <p className="text-muted-foreground">نظام إدارة الرعاية الصحية</p>
            </div>
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            انضم إلى
            <br />
            مجتمعنا الصحي
          </h2>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            أنشئ حسابك للبدء في إدارة مواعيدك الصحية بسهولة. تواصل مع أفضل الأطباء وتابع رحلتك الصحية في مكان واحد.
          </p>

          <div className="mt-12 space-y-4 max-w-md">
            <div className="flex items-start gap-3">
              <div className="text-right">
                <p className="font-medium text-foreground">جدولة سهلة</p>
                <p className="text-sm text-muted-foreground">
                  احجز مواعيدك بضغطات قليلة
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-right">
                <p className="font-medium text-foreground">إدارة قائمة الانتظار</p>
                <p className="text-sm text-muted-foreground">
                  تابع مكانك وأوقات الانتظار المتوقعة
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-right">
                <p className="font-medium text-foreground">السجلات الصحية</p>
                <p className="text-sm text-muted-foreground">
                  الوصول إلى سجل مواعيدك في أي وقت
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">عيادتي</h1>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                إنشاء حساب
              </h2>
              <p className="text-muted-foreground">
                ابدأ رحلتك نحو إدارة صحية أفضل
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">
                  الاسم الكامل
                </Label>
                <div className="relative">
                  <User className="absolute end-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="محمد علي"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="pe-10 h-12 bg-input-background border-border rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-start"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Mail className="absolute end-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="بريدك@مثال.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pe-10 h-12 bg-input-background border-border rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-start"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  رقم الهاتف
                </Label>
                <div className="relative">
                  <Phone className="absolute end-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+966 5XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pe-10 h-12 bg-input-background border-border rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-start"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Lock className="absolute end-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أنشئ كلمة مرور قوية"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pe-10 ps-10 h-12 bg-input-background border-border rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-start"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                إنشاء حساب
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                هل لديك حساب بالفعل؟{" "}
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            بإنشاء حساب، توافق على شروط الخدمة وسياسة الخصوصية
          </p>
        </div>
      </div>
    </div>
  );
}
