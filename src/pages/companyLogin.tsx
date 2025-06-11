import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { login, UserType } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { CompanyStatus } from "../store/slices/companyListSlice";
import { Button } from "antd";

interface LoginFormData {
  email: string;
  password: string;
}

const CompanyLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [displayErrorText, setDisplayErrorText] = useState("");

  const companyList = useSelector(
    (state: RootState) => state.companyList.companies
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayErrorText("Invalid credentials");
    const comp = companyList.find(
      (c) =>
        c.email === formData.email &&
        c.password === formData.password
    );
    if(comp && !comp.isVerified) {
      setDisplayErrorText("Email verification is incomplete for your account");
      return;
    }
    if (comp) {
      dispatch(
        login({
          username: comp.username,
          email: comp.email,
          type: UserType.COMPANY,
        })
      );

      if (comp.status === CompanyStatus.APPROVED) {
        navigate("/company/dashboard");
      } else {
        navigate("/company/profile");
      }
    } else {
      setDisplayErrorText("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Company Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {displayErrorText && (
            <p
              style={{ marginBottom: 4 }}
              className="text-sm text-red-600 mb-3 text-center"
            >
              {displayErrorText}
            </p>
          )}
          <Button htmlType="submit" type="primary" className="w-full py-2">
            Login
          </Button>
        </form>
        <br />
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/company/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default CompanyLogin;
