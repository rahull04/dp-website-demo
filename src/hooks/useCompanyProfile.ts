import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { submitProfile } from "../store/slices/companyListSlice";
import { base64ToFile, toBase64 } from "../lib/utils/imageUtils";
import Swal from "sweetalert2";

export const useCompanyProfile = () => {
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

  useEffect(() => {
    if (formData?.logo) {
      setLogoPreview(formData.logo);
    }
  }, [formData?.logo]);

  useEffect(() => {
    if (formData?.img) {
      setImagePreview(formData.img);
    }
  }, [formData?.img]);

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
    Swal.fire({ title: `Profile submitted successfully!`, icon: "success" });
  };

  return {
    formData,
    formDataLocal,
    logoPreview,
    imagePreview,
    handleChange,
    handleCheckboxChange,
    handleFileChange,
    handleSubmit,
    isFormValid,
  };
};
