import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { login, UserType } from "../store/slices/authSlice";
import { TechnicianStatus } from "../store/slices/technicianSlice";
import { Button } from "antd";

const TechnicianLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [displayErrorText, setDisplayErrorText] = useState("");
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
    setDisplayErrorText("Invalid credentials");
    const tech = technicianList.find(
      (c) =>
        c.username === credentials.username &&
        c.password === credentials.password
    );
    if(tech && !tech.isVerified) {
      setDisplayErrorText("Email verification is incomplete for your account");
      return;
    }
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
      setDisplayErrorText("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md bg-white p-8 rounded-xl shadow-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Technician Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              className="input-style"
              style={{ marginBottom: 12 }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="input-style"
              style={{ marginBottom: 12 }}
              required
            />
          </div>
          {displayErrorText && (
            <p
              style={{ marginBottom: 4 }}
              className="text-sm text-red-600 text-center"
            >
              {displayErrorText}
            </p>
          )}
          <br />
          <Button
            style={{ marginBottom: 12 }}
            htmlType="submit"
            type="primary"
            className="w-full py-2"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TechnicianLogin;
