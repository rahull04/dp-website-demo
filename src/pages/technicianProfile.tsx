import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { toBase64 } from "../lib/utils/imageUtils";
import {
  submitTechnicianProfile,
  TechnicianStatus,
} from "../store/slices/technicianSlice";
import { AuthenticatedLayout } from "../components/AuthenticatedLayout";
import Swal from "sweetalert2";
import { FaRegUser, FaUpload } from "react-icons/fa";
import clsx from "clsx";

const skillOptions = ["NodeJS", "Java", "Python", "C++", "React", "Angular"];

const TechnicianProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const technician = useSelector(
    (state: RootState) => state.technician.technicians
  ).find((t) => t.username === user?.username);
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
    skills: technician?.skills ?? ([] as string[]),
    certificates: [] as File[],
  });

  useEffect(() => {
    if (technician?.photo) {
      setPhotoPreview(technician.photo);
    }
  }, [technician?.photo]);

  useEffect(() => {
    if (technician?.certificates) {
      setCertificatePreviews(technician.certificates);
    }
  }, [technician?.certificates]);

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
        const files = Array.from(e.target.files || []);
        const remainingSlots = 3 - certificatePreviews.length;

        const selectedFiles = files.slice(0, remainingSlots);
        const newPreviews = selectedFiles.map((file) =>
          URL.createObjectURL(file)
        );

        setCertificatePreviews((prev) => [...prev, ...newPreviews]);
        setFormData((prev) => ({ ...prev, certificates: files }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const photoBase64 = formData.photo ? await toBase64(formData.photo) : "";

    const certificatesBase64 = await Promise.all(
      formData.certificates.map((cert) => toBase64(cert))
    );
    dispatch(
      submitTechnicianProfile({
        email: formData.email,
        photo: photoBase64,
        certificates: certificatesBase64,
        skills: formData.skills,
      })
    );
    Swal.fire({ title: `Profile submitted successfully!`, icon: "success" });
  };

  return (
    <AuthenticatedLayout>
      <div className="mx-auto bg-white rounded-xl p-8">
        {technician.status === TechnicianStatus.INCOMPLETE && (
          <p className="text-sm text-red-600 mb-4 text-center">
            * All fields are mandatory.
          </p>
        )}
        {technician.status === TechnicianStatus.PENDING_REVIEW && (
          <p className="text-sm text-green-600 mb-4 text-center">
            Your details are under review right now.
          </p>
        )}
        {technician.status === TechnicianStatus.REJECTED && (
          <p className="text-sm text-red-600 mb-4 text-center">
            Your details were rejected. Please review and re-submit.
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="relative">
            <label className="block font-medium text-gray-700 mb-1">
              Photo <span className="text-red-500">*</span>
            </label>

            {/* Hidden File Input */}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              id="photo-upload"
              className="hidden"
              required
            />

            {/* Custom Upload Button */}
            <label
              htmlFor="photo-upload"
              className="inline-block cursor-pointer px-4 py-2 absolute bottom-[-4px] left-[58px]"
            >
              <FaUpload size={18} />
            </label>

            {/* Image Preview */}
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
                  <span className="text-gray-700 ml-1.5">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Certificates Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Certificates <span className="text-red-500">*</span>
            </label>

            {/* Hidden Input for Style */}
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

            {/* Preview */}
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

          {/* Submit */}
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
