import { Outlet, Link, useNavigate, useLocation } from "react-router";
import {
  Activity,
  LayoutDashboard,
  CalendarCheck,
  ListOrdered,
  Users,
  FileText,
  LogOut,
  Stethoscope,
  Calendar,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin" && location.pathname === "/admin") return true;
    if (path !== "/admin" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const menuGroups = [
    {
      label: "التشغيل",
      items: [
        { path: "/admin", icon: LayoutDashboard, label: "لوحة التحكم" },
        { path: "/admin/appointments", icon: CalendarCheck, label: "المواعيد" },
        { path: "/admin/queue", icon: ListOrdered, label: "قائمة الانتظار" },
        { path: "/admin/patients", icon: Users, label: "المرضى" },
      ],
    },
    {
      label: "الإدارة",
      items: [
        { path: "/admin/doctors", icon: Stethoscope, label: "الأطباء" },
        { path: "/admin/schedule", icon: Calendar, label: "الجداول" },
        { path: "/admin/users", icon: Shield, label: "المستخدمون" },
      ],
    },
    {
      label: "التقارير",
      items: [
        { path: "/admin/reports", icon: FileText, label: "التقارير" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex bg-background" dir="rtl" data-app-shell>
      {/* Fixed Sidebar - Right Side for RTL */}
      <aside className="w-64 bg-[#2C2C2C] text-white flex flex-col fixed right-0 left-auto top-0 h-screen shadow-xl z-40 overflow-y-auto" data-app-sidebar>
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">ميديكير</h1>
          </div>
          <p className="text-xs text-white/60 ms-[52px]">لوحة الإدارة</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            {menuGroups.map((group) => (
              <li key={group.label}>
                <p className="text-xs text-white/40 uppercase tracking-wider px-4 mb-1.5">{group.label}</p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                            active
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        {/* Admin Profile Section */}
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <Avatar className="w-10 h-10 border-2 border-primary/50">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                م ن
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                مدير النظام
              </p>
              <p className="text-xs text-white/60">مدير</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area - margin-right for RTL sidebar */}
      <div className="flex-1 me-64" data-app-content>
        <Outlet />
      </div>
    </div>
  );
}
