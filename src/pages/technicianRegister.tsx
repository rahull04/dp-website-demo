import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerTechnician,
  TechnicianStatus,
} from "../store/slices/technicianSlice";
import { Button } from "antd";

const TechnicianRegister: React.FC = () => {
  const [displayErrorText, setDisplayErrorText] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(
        registerTechnician({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          status: TechnicianStatus.INCOMPLETE,
          address: formData.address,
        })
      );
      navigate(
        `/technician/email-verification/${encodeURIComponent(formData.email)}`
      );
    } catch (e: unknown) {
      setDisplayErrorText((e as { message: string }).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Technician Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              name="username"
              type="text"
              style={{ marginBottom: 8 }}
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="input-style"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              style={{ marginBottom: 8 }}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-style"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              style={{ marginBottom: 8 }}
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-style"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              style={{ marginBottom: 8 }}
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="input-style"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
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
            style={{ marginBottom: 8 }}
            htmlType="submit"
            type="primary"
            className="w-full py-2"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TechnicianRegister;
