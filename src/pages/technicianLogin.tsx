import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { login, UserType } from "../store/slices/authSlice";
import { TechnicianStatus } from "../store/slices/technicianSlice";

const TechnicianLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [displayErrorText, setDisplayErrorText] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const technicianList = useSelector(
    (state: RootState) => state.technician.technicians
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayErrorText(false);
    const tech = technicianList.find(
      (c) =>
        c.username === credentials.username &&
        c.password === credentials.password
    );
    if (tech) {
      dispatch(
        login({
          username: tech.username,
          email: tech.email,
          type: UserType.TECHINICIAN,
        })
      );

      if (tech.status === TechnicianStatus.APPROVED) {
        navigate("/technician/dashboard");
      } else {
        navigate("/technician/profile");
      }
    } else {
      setDisplayErrorText(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md bg-white p-8 rounded-xl shadow-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Technician Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            className="input-style"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="input-style"
            required
          />
          {displayErrorText && (
            <p className="text-sm text-red-600 mb-4 text-center">
              Invalid credentials
            </p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default TechnicianLogin;
