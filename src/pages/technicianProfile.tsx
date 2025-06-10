import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { toBase64 } from "../lib/utils/imageUtils";
import { submitTechnicianProfile, TechnicianStatus } from "../store/slices/technicianSlice";

const skillOptions = ["NodeJS", "Java", "Python", "C++", "React", "Angular"];

const TechnicianProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const technician = useSelector((state: RootState) => state.technician.technicians).find(t => t.username === user?.username);
  const dispatch = useDispatch();

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [certificatePreviews, setCertificatePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    username: technician?.username || "",
    password: technician?.password || "",
    email: technician?.email || "",
    phone: technician?.phone || "",
    address: technician?.address || "",
    photo: null as File | null,
    skills: technician?.skills ?? [] as string[],
    certificates: [] as File[],
  });

  if (!technician) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === "photo") {
        const file = files[0];
        setPhotoPreview(URL.createObjectURL(file));
        setFormData((prev) => ({ ...prev, photo: file }));
      }

      if (name === "certificates") {
        const fileArray = Array.from(files);
        const previews = fileArray.map((file) => URL.createObjectURL(file));
        setCertificatePreviews(previews);
        setFormData((prev) => ({ ...prev, certificates: fileArray }));
      }
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.skills.includes(skill);
      const updatedSkills = alreadySelected
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];

      return { ...prev, skills: updatedSkills };
    });
  };

  const isFormValid = (): boolean => {
    return (
      !!formData.username.trim() &&
      !!formData.password.trim() &&
      !!formData.email.trim() &&
      !!formData.phone.trim() &&
      !!formData.address.trim() &&
      formData.photo !== null &&
      formData.skills.length > 0 &&
      formData.certificates.length > 0
    );
  };
  console.log('formData', formData.skills)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    alert("Technician profile submitted!");
    const photoBase64 = formData.photo
      ? await toBase64(formData.photo)
      : "";

    const certificatesBase64 = await Promise.all(
      formData.certificates.map((cert) => toBase64(cert))
    );
    dispatch(
      submitTechnicianProfile({
        email: formData.email,
        photo: photoBase64,
        certificates: certificatesBase64,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Technician Profile
        </h1>
        {technician.status === TechnicianStatus.INCOMPLETE && <p className="text-sm text-red-600 mb-4 text-center">
          * All fields are mandatory.
        </p>}
        {technician.status === TechnicianStatus.PENDING_REVIEW && <p className="text-sm text-green-600 mb-4 text-center">
          Your details are under review right now.
        </p>}
        {technician.status === TechnicianStatus.REJECTED && <p className="text-sm text-red-600 mb-4 text-center">
          Your details were rejected. Please review and re-submit.
        </p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Username <span className="text-red-500">*</span>
              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="input-style"
                required
              />
            </label>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password <span className="text-red-500">*</span>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-style"
                required
              />
            </label>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email <span className="text-red-500">*</span>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input-style"
                required
              />
            </label>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Phone <span className="text-red-500">*</span>
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-style"
                required
              />
            </label>
          </div>

          <label className="text-sm font-medium text-gray-700 block mb-1">
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

          {/* Skills */}
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
                  <span className="text-gray-700">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Photo <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm"
              required
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Photo Preview"
                className="mt-2 h-20 object-cover"
              />
            )}
          </div>

          {/* Certificates Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Certificates <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="certificates"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm"
              required
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {certificatePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Certificate ${idx + 1}`}
                  className="h-20 object-cover"
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          {technician.status !== TechnicianStatus.PENDING_REVIEW && <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-3 rounded-md text-lg font-semibold transition ${
              isFormValid()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit Profile
          </button>}
        </form>
      </div>
    </div>
  );
};

export default TechnicianProfile;
