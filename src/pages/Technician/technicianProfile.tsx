import React from "react";
import { TechnicianStatus } from "../../store/slices/technicianSlice";
import { AuthenticatedLayout } from "../../components/AuthenticatedLayout";
import { FaRegUser, FaUpload } from "react-icons/fa";
import clsx from "clsx";
import { ProfileInput } from "../../components/ProfileInput";
import { useTechniciansProfile } from "../../hooks/useTechniciansProfile";
import { Progress } from "antd";

const skillOptions = ["NodeJS", "Java", "Python", "C++", "React", "Angular"];

const ProgressStatus = {
  [TechnicianStatus.INCOMPLETE]: 20,
  [TechnicianStatus.PENDING_REVIEW]: 100,
  [TechnicianStatus.REJECTED]: 60,
};

const TechnicianProfile: React.FC = () => {
  const {
    technician,
    photoPreview,
    handleChange,
    handleFileChange,
    handleSkillToggle,
    handleSubmit,
    isFormValid,
    formData,
    setFormData,
    certificatePreviews,
    setCertificatePreviews,
  } = useTechniciansProfile();

  if (!technician) {
    return null;
  }

  const textItems = (
    <>
      <div className="flex justify-between">
          <div>
            {technician.status !== TechnicianStatus.APPROVED && (
              <div className="text-[16px] text-slate-600 mb-2">
                {ProgressStatus[technician.status]}% profile complete
              </div>
            )}
          </div>
          <div>
            {" "}
            {technician.status === TechnicianStatus.PENDING_REVIEW && (
              <span className="text-green-600">
                Your profile details are under review
              </span>
            )}
            {technician.status === TechnicianStatus.REJECTED && (
              <span className="text-red-600">
                Your profile details were rejected. Please review and submit
                again
              </span>
            )}
            {technician.status === TechnicianStatus.INCOMPLETE && (
              <span className="text-orange-600">
                Please make sure you submit all the details to use all the
                features
              </span>
            )}
          </div>
        </div>
        <div className="flex">
          {technician.status !== TechnicianStatus.APPROVED && (
            <Progress
              percent={ProgressStatus[technician.status]}
              status={
                technician.status === TechnicianStatus.PENDING_REVIEW
                  ? "success"
                  : "active"
              }
              style={{ marginBottom: 20 }}
              size={{ height: 26 }}
            />
          )}
        </div>
    </>
  );

  const PhotoUpload = (
    <div className="relative">
      <label className="block font-medium text-gray-700 mb-1">
        Photo <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleFileChange}
        id="photo-upload"
        className="hidden"
        required
      />
      <label
        htmlFor="photo-upload"
        className="inline-block cursor-pointer px-4 py-2 absolute bottom-[-4px] left-[58px]"
      >
        <FaUpload size={18} />
      </label>
      {photoPreview ? (
        <img
          src={photoPreview}
          alt="Photo Preview"
          className="mt-3 h-20 w-20 object-cover rounded-full border shadow"
        />
      ) : (
        <div className="mt-3 h-20 w-20 object-cover rounded-full border shadow flex justify-center items-center">
          <FaRegUser size={34} color="gray" />
        </div>
      )}
    </div>
  );

  const Skills = (
    <div>
      <label className="font-semibold text-gray-700 mb-2 block">
        Skills <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {skillOptions.map((skill) => (
          <label key={skill} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.skills.includes(skill)}
              onChange={() => handleSkillToggle(skill)}
            />
            <span className="text-gray-700 ml-1.5">{skill}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const Certificates = (
    <div>
      <label className="block font-medium text-gray-700 mb-1">
        Certificates <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        name="certificates"
        accept="image/*"
        id="certificates-upload"
        multiple
        onChange={handleFileChange}
        disabled={certificatePreviews.length >= 3}
        className="w-full text-sm disabled:opacity-50 hidden"
        required={certificatePreviews.length === 0}
      />
      {certificatePreviews.length < 3 && (
        <label
          htmlFor="certificates-upload"
          className={clsx(
            "inline-block px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold rounded-md cursor-pointer transition"
          )}
        >
          Upload certificates
        </label>
      )}
      {certificatePreviews.length === 3 && (
        <label
          onClick={() => {
            setFormData((prev) => ({ ...prev, certificates: [] }));
            setCertificatePreviews([]);
          }}
          className={clsx(
            "inline-block px-4 py-2 bg-white text-red-500 hover:text-red-800 text-sm font-semibold rounded-md cursor-pointer transition"
          )}
        >
          Clear certificates
        </label>
      )}
      <div className="flex flex-wrap gap-3 mt-3">
        {certificatePreviews.map((src, idx) => (
          <div
            key={idx}
            className="relative w-20 h-20 rounded-md overflow-hidden border shadow-sm"
          >
            <img
              src={src}
              alt={`Certificate ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <AuthenticatedLayout>
      <div className="mx-auto bg-white rounded-xl p-8">
        {textItems}
        <form onSubmit={handleSubmit} className="space-y-6">
          {PhotoUpload}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileInput
              label="Username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="input-style"
              required
            />
            <ProfileInput
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <ProfileInput
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <ProfileInput
              label="Phone"
              name="phone"
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-style"
              required
            />
          </div>
          <label className="text-sm font-medium text-gray-700 block mb-4">
            Address <span className="text-red-500">*</span>
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="input-style"
              required
            />
          </label>
          {Skills}
          {Certificates}
          {technician.status !== TechnicianStatus.APPROVED &&
            technician.status !== TechnicianStatus.PENDING_REVIEW && (
              <button
                type="submit"
                style={{ color: isFormValid() ? "white" : "#6a7282" }}
                disabled={!isFormValid()}
                className={`w-full py-3 rounded-md text-lg font-semibold transition ${
                  isFormValid()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
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

export default TechnicianProfile;
