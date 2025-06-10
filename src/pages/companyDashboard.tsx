import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { addJob } from "../store/slices/jobSlice";
import { Navigate } from "react-router-dom";
import { CompanyStatus } from "../store/slices/companyListSlice";

const CompanyDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const jobs = useSelector((state: RootState) => state.job.jobs).filter(j => j.companyEmail === user?.email);
  const company = useSelector(
    (state: RootState) => state.companyList.companies
  ).find((c) => c.email === user?.email);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
  });
  const dispatch = useDispatch();

  if (company?.status !== CompanyStatus.APPROVED) {
    return <Navigate to="/company/profile" replace />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveJob = () => {
    if (!user?.email) return;

    const newJob = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      address: formData.address,
      postedDate: new Date().toISOString().split("T")[0],
      companyEmail: user.email,
    };

    dispatch(addJob(newJob));
    setFormData({ title: "", description: "", address: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Company Dashboard
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            + Post a Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">No jobs posted yet.</p>
            <p className="mt-2">
              Click the button above to post your first job!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {job.title}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-1">{job.address}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {job.description}
                </p>
                <p className="text-sm text-gray-500">
                  Posted on: {job.postedDate}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Post a Job
            </h2>

            <input
              name="title"
              placeholder="Job Name"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              placeholder="Job Description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="address"
              placeholder="Job Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveJob}
                disabled={
                  !formData.title || !formData.description || !formData.address
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                Save Job
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-xl text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
