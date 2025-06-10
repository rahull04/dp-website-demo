import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { approveCompany, CompanyStatus, rejectCompany } from '../store/slices/companyListSlice';
import { approveTechnician, rejectTechnician, TechnicianStatus } from '../store/slices/technicianSlice';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const AdminDashboard: React.FC = () => {
  const pendingCompanies = useSelector((state: RootState) => state.companyList.companies).filter(c => c.status === CompanyStatus.PENDING_REVIEW);
  const pendingTechnicians = useSelector((state: RootState) => state.technician.technicians).filter(c => c.status === TechnicianStatus.PENDING_REVIEW);

  const dispatch = useDispatch();

  const handleApprove = (type: 'company' | 'technician', id: string) => {
    console.log(`Approved ${type} with ID ${id}`);
    if (type === 'company') {
      dispatch(approveCompany(id));
    } else {
      dispatch(approveTechnician(id));
    }
  };

  const handleReject = (type: 'company' | 'technician', id: string) => {
    console.log(`Rejected ${type} with ID ${id}`);
    if (type === 'company') {
      dispatch(rejectCompany(id));
    } else {
      dispatch(rejectTechnician(id));
    }
  };

  const handleViewProfile = (user: User) => {
    alert(`Name: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pending Companies */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Companies</h2>
          {pendingCompanies.length === 0 ? (
            <p className="text-gray-500">No pending companies.</p>
          ) : (
            <ul className="space-y-4">
              {pendingCompanies.map(company => (
                <li key={company.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className="text-sm text-gray-500">{company.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewProfile(company)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleApprove('company', company.id)}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject('company', company.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pending Technicians */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Technicians</h2>
          {pendingTechnicians.length === 0 ? (
            <p className="text-gray-500">No pending technicians.</p>
          ) : (
            <ul className="space-y-4">
              {pendingTechnicians.map(technician => (
                <li key={technician.username} className="border p-4 rounded-md shadow-sm bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{technician.username}</p>
                      <p className="text-sm text-gray-500">{technician.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {}}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleApprove('technician', technician.username)}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject('technician', technician.username)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
