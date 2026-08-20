import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { AdminLayout } from "./components/AdminLayout";
import { DoctorLayout } from "./components/DoctorLayout";
import { ReceptionLayout } from "./components/ReceptionLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { BookAppointment } from "./pages/BookAppointment";
import { AppointmentConfirmation } from "./pages/AppointmentConfirmation";
import { MyAppointments } from "./pages/MyAppointments";
import { About } from "./pages/About";
import { SearchDoctors } from "./pages/SearchDoctors";
import { VisitResult } from "./pages/VisitResult";
import { PatientProfile } from "./pages/PatientProfile";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ManageAppointments } from "./pages/admin/ManageAppointments";
import { QueueManagement } from "./pages/admin/QueueManagement";
import { ManagePatients } from "./pages/admin/ManagePatients";
import { Reports } from "./pages/admin/Reports";
import { DoctorsManagement } from "./pages/admin/DoctorsManagement";
import { ScheduleManagement } from "./pages/admin/ScheduleManagement";
import { UsersPermissions } from "./pages/admin/UsersPermissions";
import { DoctorDashboard } from "./pages/doctor/DoctorDashboard";
import { DoctorQueue } from "./pages/doctor/DoctorQueue";
import { ConsultationWorkspace } from "./pages/doctor/ConsultationWorkspace";
import { ReceptionDashboard } from "./pages/reception/ReceptionDashboard";
import { ReceptionAppointments } from "./pages/reception/ReceptionAppointments";
import { ReceptionQueue } from "./pages/reception/ReceptionQueue";
import { NewBooking } from "./pages/reception/NewBooking";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  // Patient
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "book-appointment", Component: BookAppointment },
      { path: "appointment-confirmation", Component: AppointmentConfirmation },
      { path: "my-appointments", Component: MyAppointments },
      { path: "about", Component: About },
      { path: "search", Component: SearchDoctors },
      { path: "visit-result", Component: VisitResult },
      { path: "profile", Component: PatientProfile },
    ],
  },
  // Admin / System Manager
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "appointments", Component: ManageAppointments },
      { path: "queue", Component: QueueManagement },
      { path: "patients", Component: ManagePatients },
      { path: "reports", Component: Reports },
      { path: "doctors", Component: DoctorsManagement },
      { path: "schedule", Component: ScheduleManagement },
      { path: "users", Component: UsersPermissions },
    ],
  },
  // Doctor
  {
    path: "/doctor",
    Component: DoctorLayout,
    children: [
      { index: true, Component: DoctorDashboard },
      { path: "queue", Component: DoctorQueue },
      { path: "consultation/:id", Component: ConsultationWorkspace },
      { path: "consultations", Component: DoctorQueue },
    ],
  },
  // Reception
  {
    path: "/reception",
    Component: ReceptionLayout,
    children: [
      { index: true, Component: ReceptionDashboard },
      { path: "appointments", Component: ReceptionAppointments },
      { path: "queue", Component: ReceptionQueue },
      { path: "new-booking", Component: NewBooking },
    ],
  },
]);
