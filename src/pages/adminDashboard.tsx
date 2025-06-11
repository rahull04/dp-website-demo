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
import { PendingTechnicianItem } from "../components/PendingTechnicianItem";
import { PendingCompanyItem } from "../components/PendingCompanyItem";

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
    const entity = type.charAt(0).toUpperCase() + type.slice(1);
    if (type === "company") {
      dispatch(approveCompany(id));
    } else {
      dispatch(approveTechnician(id));
    }
    Swal.fire({ title: `${entity} approved successfully!`, icon: "success" });
  };

  const handleReject = (type: "company" | "technician", id: string) => {
    const entity = type.charAt(0).toUpperCase() + type.slice(1);
    if (type === "company") {
      dispatch(rejectCompany(id));
    } else {
      dispatch(rejectTechnician(id));
    }
    Swal.fire({ title: `${entity} rejected successfully!`, icon: "error" });
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
                    <PendingCompanyItem
                    key={company.username}
                    company={company}
                    setSelectedCompany={setSelectedCompany}
                    setShowConfirmatoryModal={setShowConfirmatoryModal}
                  />
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
                    <PendingTechnicianItem
                      key={technician.username}
                      technician={technician}
                      setSelectedTechnician={setSelectedTechnician}
                      setShowConfirmatoryModal={setShowConfirmatoryModal}
                    />
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
            okText={
              showConfirmatoryModal.type.charAt(0).toUpperCase() +
              showConfirmatoryModal.type.slice(1)
            }
          ></Modal>
        )}
      </>
    </AuthenticatedLayout>
  );
};

export default AdminDashboard;
