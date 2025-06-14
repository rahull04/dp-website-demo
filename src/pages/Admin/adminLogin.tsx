import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { login, UserType } from "../../store/slices/authSlice";

interface LoginFormData {
  username: string;
  password: string;
}

const USERNAME = "admin001";
const PASSWORD = "admin123";

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [displayErrorText, setDisplayErrorText] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayErrorText(false);
    if (formData.username === USERNAME && formData.password === PASSWORD) {
      navigate("/admin/dashboard");
      dispatch(login({ username: USERNAME, type: UserType.ADMIN }));
    } else {
      setDisplayErrorText(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login as Admin
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
              id="username"
              placeholder="Enter your username"
              value={formData.username}
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
              className="text-sm text-red-600 mb-4 text-center"
            >
              Invalid credentials
            </p>
          )}
          <Button htmlType="submit" type="primary" className="w-full py-2">
            Login
          </Button>
          <div className="space-y-1 mt-4">
            <div className="text-sm text-gray-500 text-center">Username: <span className="font-bold">{USERNAME}</span></div>
            <div className="text-sm text-gray-500 text-center">Password: <span className="font-bold">{PASSWORD}</span></div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
