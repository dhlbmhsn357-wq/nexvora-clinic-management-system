import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { Activity, User, Settings, LogOut, ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName] = useState("سارة أحمد");

  const handleLogout = () => {
    navigate("/login");
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground tracking-tight">
                  عيادتي
                </h1>
                <p className="text-xs text-muted-foreground">
                  نظام إدارة الرعاية الصحية
                </p>
              </div>
            </Link>

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`px-5 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive("/") && location.pathname === "/"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                الرئيسية
              </Link>
              <Link
                to="/book-appointment"
                className={`px-5 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive("/book-appointment")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                حجز موعد
              </Link>
              <Link
                to="/my-appointments"
                className={`px-5 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive("/my-appointments")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                مواعيدي
              </Link>
              <Link
                to="/search"
                className={`px-5 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive("/search")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                البحث عن طبيب
              </Link>
              <Link
                to="/about"
                className={`px-5 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive("/about")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                عن العيادة
              </Link>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring">
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-foreground">
                    {userName}
                  </p>
                  <p className="text-xs text-muted-foreground">مريض</p>
                </div>
                <Avatar className="w-9 h-9 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium text-sm">
                    س أ
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => navigate("/profile")}>
                  <User className="w-4 h-4" />
                  الملف الشخصي
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <Settings className="w-4 h-4" />
                  الإعدادات
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
