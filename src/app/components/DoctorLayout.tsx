import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { Activity, LayoutDashboard, Users, ClipboardList, LogOut, Stethoscope } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function DoctorLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/doctor" && location.pathname === "/doctor") return true;
    if (path !== "/doctor" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    { path: "/doctor", icon: LayoutDashboard, label: "يومي اليوم" },
    { path: "/doctor/queue", icon: Users, label: "قائمة الانتظار" },
    { path: "/doctor/consultations", icon: ClipboardList, label: "الكشوفات" },
  ];

  return (
    <div className="min-h-screen flex bg-background" dir="rtl" data-app-shell>
      <aside className="w-64 bg-[#1E3A2F] text-white flex flex-col fixed end-0 top-0 h-screen shadow-xl z-40" data-app-sidebar>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">عيادتي</h1>
          </div>
          <p className="text-xs text-white/60 ms-[52px]">واجهة الطبيب</p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      active
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <Avatar className="w-10 h-10 border-2 border-primary/50">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                <Stethoscope className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">د. محمد الحارثي</p>
              <p className="text-xs text-white/60">قلب وأوعية دموية</p>
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

      <div className="flex-1 me-64" data-app-content>
        <Outlet />
      </div>
    </div>
  );
}
