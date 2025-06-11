import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CompanyRegister from "./pages/Company/companyRegister";
import CompanyLogin from "./pages/Company/companyLogin";
import CompanyEmailVerification from "./pages/Company/companyEmailVerification";
import ProtectedRoute from "./components/ProtectedRoute";
import CompanyProfile from "./pages/Company/companyProfile";
import CompanyDashboard from "./pages/Company/companyDashboard";
import TechnicianRegister from "./pages/Technician/technicianRegister";
import TechnicianEmailVerification from "./pages/Technician/technicianEmailVerification";
import TechnicianLogin from "./pages/Technician/technicianLogin";
import TechnicianProfile from "./pages/Technician/technicianProfile";
import TechnicianDashboard from "./pages/Technician/technicianDashboard";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import AdminDashboard from "./pages/Admin/adminDashboard";
import AdminLogin from "./pages/Admin/adminLogin";
import { Header } from "./components/Header";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <Router>
      {!isAuthenticated && <Header />}
      <Routes>
        <Route
          path="/home"
          element={
              <Home />
          }
        />
        <Route
          path="/company/email-verification/:email"
          element={<CompanyEmailVerification />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/profile"
          element={
            <ProtectedRoute>
              <CompanyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technician/profile"
          element={
            <ProtectedRoute>
              <TechnicianProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technician/dashboard"
          element={
            <ProtectedRoute>
              <TechnicianDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/technician/email-verification/:email" element={<TechnicianEmailVerification />} />
        <Route path="/technician/login" element={<TechnicianLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/company/register" element={<CompanyRegister />} />
        <Route path="/technician/register" element={<TechnicianRegister />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route
          path="/"
          element={
              <Home />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
