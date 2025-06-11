import React from "react";
import { CompanyStatus } from "../../store/slices/companyListSlice";
import { AuthenticatedLayout } from "../../components/AuthenticatedLayout";
import { ProfileInput } from "../../components/ProfileInput";
import { useCompanyProfile } from "../../hooks/useCompanyProfile";
import { Progress } from "antd";

export const serviceOptions = [
  "Web Design",
  "App Building",
  "CCTV",
  "Networking",
  "IT Support",
];

const ProgressStatus = {
  [CompanyStatus.INCOMPLETE]: 20,
  [CompanyStatus.PENDING_REVIEW]: 100,
  [CompanyStatus.REJECTED]: 60,
};

const CompanyProfile: React.FC = () => {
  const {
    formData,
    formDataLocal,
    logoPreview,
    imagePreview,
    handleChange,
    handleCheckboxChange,
    handleFileChange,
    handleSubmit,
    isFormValid,
  } = useCompanyProfile();

  if (!formData) {
    return null;
  }

  return (
    <AuthenticatedLayout>
      <div className=" mx-auto bg-white rounded-xl p-8">
        <div className="flex justify-between">
          <div>
            {formData.status !== CompanyStatus.APPROVED && (
              <div className="text-[16px] text-slate-600 mb-2">
                {ProgressStatus[formData.status]}% profile complete
              </div>
            )}
          </div>
          <div>
            {" "}
            {formData.status === CompanyStatus.PENDING_REVIEW && (
              <span className="text-green-600">
                Your company details are under review
              </span>
            )}
            {formData.status === CompanyStatus.REJECTED && (
              <span className="text-red-600">
                Your company details were rejected. Please review and submit
                again
              </span>
            )}
            {formData.status === CompanyStatus.INCOMPLETE && (
              <span className="text-orange-600">
                Please make sure you submit all the details to use all the
                features
              </span>
            )}
          </div>
        </div>
        <div className="flex">
          {formData.status !== CompanyStatus.APPROVED && (
            <Progress
              percent={ProgressStatus[formData.status]}
              status={
                formData.status === CompanyStatus.PENDING_REVIEW
                  ? "success"
                  : "active"
              }
              style={{ marginBottom: 20 }}
              size={{ height: 26 }}
            />
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileInput
              label="Username"
              name="username"
              placeholder="Username"
              value={formDataLocal.username}
              onChange={handleChange}
              required
            />
            <ProfileInput
              label="Email"
              name="email"
              placeholder="Email"
              type="email"
              value={formDataLocal.email}
              onChange={handleChange}
              required
            />
            <ProfileInput
              label="Phone"
              name="phone"
              placeholder="Phone"
              type="tel"
              value={formDataLocal.phone}
              onChange={handleChange}
              required
            />
            <ProfileInput
              label="Company Name"
              name="companyName"
              placeholder="Company Name"
              value={formDataLocal.name}
              onChange={handleChange}
              required
            />
          </div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Company Address <span className="text-red-500">*</span>
            <textarea
              name="companyAddress"
              placeholder="Company Address"
              value={formDataLocal.address}
              onChange={handleChange}
              className="input-style"
              required
            />
          </label>

          {/* Extra Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <ProfileInput
              label="Operation Hours"
              name="operationHours"
              placeholder="Operation Hours (e.g. 9AM–6PM)"
              value={formDataLocal.operationHours}
              onChange={handleChange}
              required
            />
            <ProfileInput
              name="numberOfEmployees"
              label="Number Of Employees"
              placeholder="Number of Employees"
              type="number"
              value={formDataLocal.numberOfEmployees}
              onChange={handleChange}
              required
            />
          </div>

          {/* Services */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Area of Service <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {serviceOptions.map((service) => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formDataLocal?.serviceTypes?.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                  />
                  <span className="text-gray-700 ml-1.5">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* File Uploads with Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Company Logo Upload */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Company Logo <span className="text-red-500">*</span>
              </label>
              <div className="border border-dashed border-gray-300 rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition">
                <input
                  type="file"
                  name="companyLogo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-600 cursor-pointer"
                />
                {logoPreview && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="h-24 w-auto object-contain border rounded shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Company Image Upload */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Company Image <span className="text-red-500">*</span>
              </label>
              <div className="border border-dashed border-gray-300 rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition">
                <input
                  type="file"
                  name="companyImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-600 cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="h-24 w-auto object-cover border rounded shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {formData.status !== CompanyStatus.APPROVED &&
            formData.status !== CompanyStatus.PENDING_REVIEW && (
              <button
                type="submit"
                disabled={!isFormValid}
                style={{ color: isFormValid ? "white" : "#6a7282" }}
                className={`w-full py-3 rounded-md text-lg font-semibold transition cursor-pointer ${
                  isFormValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit Profile
              </button>
            )}
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default CompanyProfile;
