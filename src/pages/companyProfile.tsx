import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { CompanyStatus, submitProfile } from "../store/slices/companyListSlice";
import { base64ToFile, toBase64 } from "../lib/utils/imageUtils";

const serviceOptions = [
  "Web Design",
  "App Building",
  "CCTV",
  "Networking",
  "IT Support",
];

const CompanyProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const formData = useSelector(
    (state: RootState) => state.companyList.companies
  ).find((c) => c.email === user?.email);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formDataLocal, setFormDataLocal] = useState({
    username: formData?.username || "",
    email: formData?.email || "",
    phone: formData?.phone || "",
    name: formData?.name || "",
    address: formData?.address || "",
    operationHours: formData?.operationHours ?? "",
    numberOfEmployees: formData?.numberOfEmployees ?? "",
    serviceTypes: formData?.serviceTypes ?? ([] as string[]),
    companyLogo: null as File | null,
    companyImage: null as File | null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const checkImgs = async () => {
      if (formData?.logo) {
        const logoFile = base64ToFile(formData.logo, "Company Logo");
        setFormDataLocal((prev) => ({ ...prev, companyLogo: logoFile }));
      }
      if (formData?.img) {
        const imgFile = base64ToFile(formData.img, "Company Image");
        setFormDataLocal((prev) => ({ ...prev, companyImage: imgFile }));
      }
    };
    checkImgs();
  }, [formData?.logo, formData?.img]);

  if (!formData) {
    return null;
  }

  const isFormValid = Object.values(formDataLocal).every((field) => {
    if (Array.isArray(field)) return field.length > 0;
    if (typeof field === "string") return field.trim() !== "";
    return field !== null;
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDataLocal((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      if (name === "companyLogo") setLogoPreview(url);
      if (name === "companyImage") setImagePreview(url);
      setFormDataLocal((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleCheckboxChange = (service: string) => {
    setFormDataLocal((prev) => {
      const alreadySelected = prev.serviceTypes.includes(service);
      const updatedServices = alreadySelected
        ? prev.serviceTypes.filter((s) => s !== service)
        : [...prev.serviceTypes, service];

      return { ...prev, serviceTypes: updatedServices };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile submitted:", formData);
    alert("Company profile submitted!");
    const compLogo = formDataLocal.companyLogo
      ? await toBase64(formDataLocal.companyLogo)
      : "";
    const compImage = formDataLocal.companyImage
      ? await toBase64(formDataLocal.companyImage)
      : "";
    dispatch(
      submitProfile({
        email: formDataLocal.email,
        operationHours: formDataLocal.operationHours,
        numberOfEmployees: formDataLocal.numberOfEmployees,
        serviceTypes: formDataLocal.serviceTypes,
        logo: compLogo,
        img: compImage,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Company Profile
        </h1>
        {formData.status === CompanyStatus.INCOMPLETE && <p className="text-sm text-red-600 mb-4 text-center">
          * All fields are mandatory including service types and file uploads.
        </p>}
        {formData.status === CompanyStatus.PENDING_REVIEW && <p className="text-sm text-green-600 mb-4 text-center">
          Your company details are under review right now.
        </p>}
        {formData.status === CompanyStatus.REJECTED && <p className="text-sm text-red-600 mb-4 text-center">
          Your company details were rejected. Please review and re-submit.
        </p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Username <span className="text-red-500">*</span>
              <input
                name="username"
                placeholder="Username"
                value={formDataLocal.username}
                onChange={handleChange}
                className="input-style"
                required
              />
            </label>

            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email <span className="text-red-500">*</span>
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={formDataLocal.email}
                onChange={handleChange}
                className="input-style"
                required
              />
            </label>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Phone <span className="text-red-500">*</span>
              <input
                name="phone"
                placeholder="Phone"
                type="tel"
                value={formDataLocal.phone}
                onChange={handleChange}
                className="input-style"
                required
              />
            </label>

            <label className="text-sm font-medium text-gray-700 block mb-1">
              Company Name <span className="text-red-500">*</span>
              <input
                name="companyName"
                placeholder="Company Name"
                value={formDataLocal.name}
                onChange={handleChange}
                className="input-style"
                required
              />
            </label>
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
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Operation Hours <span className="text-red-500">*</span>
              <input
                name="operationHours"
                placeholder="Operation Hours (e.g. 9AM–6PM)"
                value={formDataLocal.operationHours}
                onChange={handleChange}
                className="input-style"
              />
            </label>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Number Of Employees <span className="text-red-500">*</span>
              <input
                name="numberOfEmployees"
                placeholder="Number of Employees"
                type="number"
                value={formDataLocal.numberOfEmployees}
                onChange={handleChange}
                className="input-style"
              />
            </label>
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
                  <span className="text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* File Uploads with Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Company Logo <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="companyLogo"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="mt-2 h-20 object-contain"
                />
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Company Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="companyImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="mt-2 h-20 object-cover"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          {formData.status !== CompanyStatus.PENDING_REVIEW && <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-md text-lg font-semibold transition ${
              isFormValid
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

export default CompanyProfile;
