import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  approveCompany,
  CompanyStatus,
  rejectCompany,
  type Company,
} from "../store/slices/companyListSlice";
import {
  approveTechnician,
  rejectTechnician,
  TechnicianStatus,
  type Technician,
} from "../store/slices/technicianSlice";
import { AuthenticatedLayout } from "../components/AuthenticatedLayout";
import { ViewCompanyModal } from "../components/ViewCompanyModal";
import { ViewTechnicianModal } from "../components/ViewTechnicianModal";
import { Modal } from "antd";
import Swal from "sweetalert2";

const AdminDashboard: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showConfirmatoryModal, setShowConfirmatoryModal] = useState<{
    text: string;
    type: "approve" | "reject";
    entityType: "company" | "technician";
    entityId: string;
  } | null>(null);
  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);
  const pendingCompanies = useSelector(
    (state: RootState) => state.companyList.companies
  ).filter((c) => c.status === CompanyStatus.PENDING_REVIEW);
  const pendingTechnicians = useSelector(
    (state: RootState) => state.technician.technicians
  ).filter((c) => c.status === TechnicianStatus.PENDING_REVIEW);

  const dispatch = useDispatch();

  const handleApprove = (type: "company" | "technician", id: string) => {
    const entity = type.charAt(0).toUpperCase() + type.slice(1)
    if (type === "company") {
      dispatch(approveCompany(id));
    } else {
      dispatch(approveTechnician(id));
    }
    Swal.fire({title: `${entity} approved successfully!`, icon: "success"},);
  };

  const handleReject = (type: "company" | "technician", id: string) => {
    const entity = type.charAt(0).toUpperCase() + type.slice(1)
    if (type === "company") {
      dispatch(rejectCompany(id));
    } else {
      dispatch(rejectTechnician(id));
    }
    Swal.fire({title: `${entity} rejected successfully!`, icon: "error"},);
  };

  return (
    <AuthenticatedLayout>
      <>
        {" "}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pending Companies */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Pending Companies
              </h2>
              {pendingCompanies.length === 0 ? (
                <p className="text-gray-500">No pending companies.</p>
              ) : (
                <ul className="space-y-4">
                  {pendingCompanies.map((company) => (
                    <li
                      key={company.id}
                      className="border p-4 rounded-md shadow-sm bg-gray-50"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p
                            style={{ marginBottom: 0 }}
                            className="font-medium"
                          >
                            {company.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {company.email}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedCompany(company)}
                            className="text-blue-600 hover:underline text-sm cursor-pointer"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() =>
                              setShowConfirmatoryModal({
                                text: "Are you sure you want to approve this company?",
                                type: "approve",
                                entityId: company.id,
                                entityType: "company",
                              })
                            }
                            style={{ color: "white" }}
                            className="bg-green-500 cursor-pointer hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              setShowConfirmatoryModal({
                                text: "Are you sure you want to reject this company?",
                                type: "reject",
                                entityId: company.id,
                                entityType: "company",
                              })
                            }
                            style={{ color: "white" }}
                            className="bg-[#ff4d4f] cursor-pointer hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
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
              <h2
                style={{ marginBottom: 0 }}
                className="text-xl font-semibold text-gray-800 mb-4"
              >
                Pending Technicians
              </h2>
              {pendingTechnicians.length === 0 ? (
                <p
                  className="text-gray-500 text-center"
                  style={{ marginTop: 16 }}
                >
                  No pending technicians.
                </p>
              ) : (
                <ul className="space-y-4">
                  {pendingTechnicians.map((technician) => (
                    <li
                      key={technician.username}
                      className="border p-4 rounded-md shadow-sm bg-gray-50"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium"
                            style={{ marginBottom: 0 }}>{technician.username}</p>
                          <p className="text-sm text-gray-500">
                            {technician.email}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedTechnician(technician)}
                            className="text-blue-600 hover:underline text-sm cursor-pointer"
                          >
                            View Profile
                          </button>
                          <button
                            style={{ color: "white" }}
                            onClick={() =>
                              setShowConfirmatoryModal({
                                text: "Are you sure you want to approve this technician?",
                                type: "approve",
                                entityId: technician.username,
                                entityType: "technician",
                              })
                            }
                            className="bg-green-500 cursor-pointer hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                          >
                            Approve
                          </button>
                          <button
                            style={{ color: "white" }}
                            onClick={() =>
                              setShowConfirmatoryModal({
                                text: "Are you sure you want to reject this technician?",
                                type: "reject",
                                entityId: technician.username,
                                entityType: "technician",
                              })
                            }
                            className="bg-[#ff4d4f] cursor-pointer hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
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
        {selectedCompany && (
          <ViewCompanyModal
            open={!!selectedCompany}
            company={selectedCompany}
            onCancel={() => setSelectedCompany(null)}
            onOk={() => setSelectedCompany(null)}
          />
        )}
        {selectedTechnician && (
          <ViewTechnicianModal
            open={!!selectedTechnician}
            technician={selectedTechnician}
            onCancel={() => setSelectedTechnician(null)}
            onOk={() => setSelectedTechnician(null)}
          />
        )}
        {showConfirmatoryModal && (
          <Modal
            title={showConfirmatoryModal.text}
            open={!!showConfirmatoryModal}
            onCancel={() => setShowConfirmatoryModal(null)}
            onOk={() => {
              if (showConfirmatoryModal.type === "approve") {
                handleApprove(
                  showConfirmatoryModal.entityType,
                  showConfirmatoryModal.entityId
                );
              } else {
                handleReject(
                  showConfirmatoryModal.entityType,
                  showConfirmatoryModal.entityId
                );
              }
              setShowConfirmatoryModal(null);
            }}
            okText={showConfirmatoryModal.type.charAt(0).toUpperCase() + showConfirmatoryModal.type.slice(1)}
          ></Modal>
        )}
      </>
    </AuthenticatedLayout>
  );
};

export default AdminDashboard;
