import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { toBase64 } from "../lib/utils/imageUtils";
import { submitTechnicianProfile } from "../store/slices/technicianSlice";
import Swal from "sweetalert2";

export const useTechniciansProfile = () => {
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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [certificatePreviews.length]
  );

  const handleSkillToggle = useCallback((skill: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.skills.includes(skill);
      const updatedSkills = alreadySelected
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];

      return { ...prev, skills: updatedSkills };
    });
  }, []);

  const isFormValid = useCallback((): boolean => {
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
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
    },
    [
      dispatch,
      formData.certificates,
      formData.email,
      formData.photo,
      formData.skills,
    ]
  );

  return {
    photoPreview,
    handleChange,
    handleFileChange,
    handleSkillToggle,
    handleSubmit,
    isFormValid,
    technician,
    formData,
    setFormData,
    certificatePreviews,
    setCertificatePreviews,
  };
};
