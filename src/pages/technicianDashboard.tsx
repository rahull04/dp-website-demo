import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Navigate } from "react-router-dom";
import { TechnicianStatus } from "../store/slices/technicianSlice";

const TechnicianDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const technician = useSelector((state: RootState) =>
    state.technician.technicians.find((t) => t.email === user?.email)
  );

  const jobs = useSelector((state: RootState) => state.job.jobs);

  if (technician?.status !== TechnicianStatus.APPROVED) {
    return <Navigate to="/technician/profile" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Technician Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Browse and apply for available job postings
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">No jobs available at the moment.</p>
            <p className="mt-2">Please check back later!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
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

                <button
                  className="mt-4 bg-blue-600 text-white py-1 px-8 rounded-md hover:bg-blue-700 transition self-start"
                  onClick={() => {}}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianDashboard;
