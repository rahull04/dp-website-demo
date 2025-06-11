import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CompanyRegister from "./pages/companyRegister";
import CompanyLogin from "./pages/companyLogin";
import AdminLogin from "./pages/adminLogin";
import AdminDashboard from "./pages/adminDashboard";
import CompanyEmailVerification from "./pages/companyEmailVerification";
import ProtectedRoute from "./components/ProtectedRoute";
import CompanyProfile from "./pages/companyProfile";
import CompanyDashboard from "./pages/companyDashboard";
import TechnicianRegister from "./pages/technicianRegister";
import TechnicianEmailVerification from "./pages/technicianEmailVerification";
import TechnicianLogin from "./pages/technicianLogin";
import TechnicianProfile from "./pages/technicianProfile";
import TechnicianDashboard from "./pages/technicianDashboard";
import Navbar from "./components/navbar";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <Router>
      {!isAuthenticated && <Navbar />}
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
