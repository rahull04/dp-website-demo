import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import {
  approveCompany,
  CompanyStatus,
  rejectCompany,
  type Company,
} from "../../store/slices/companyListSlice";
import {
  approveTechnician,
  rejectTechnician,
  TechnicianStatus,
  type Technician,
} from "../../store/slices/technicianSlice";
import { AuthenticatedLayout } from "../../components/AuthenticatedLayout";
import { ViewCompanyModal } from "../../components/ViewCompanyModal";
import { ViewTechnicianModal } from "../../components/ViewTechnicianModal";
import { Badge, Modal } from "antd";
import Swal from "sweetalert2";
import { PendingTechnicianItem } from "../../components/PendingTechnicianItem";
import { PendingCompanyItem } from "../../components/PendingCompanyItem";
import { StatsCard } from "../../components/StatsCard";

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
  const companies = useSelector(
    (state: RootState) => state.companyList.companies
  );
  const pendingCompanies = companies.filter(
    (c) => c.status === CompanyStatus.PENDING_REVIEW
  );
  const technicians = useSelector(
    (state: RootState) => state.technician.technicians
  );
  const pendingTechnicians = technicians.filter(
    (c) => c.status === TechnicianStatus.PENDING_REVIEW
  );

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
          <StatsCard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Pending Companies */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex justify-between">
                Pending Companies
                {!!pendingCompanies.length && (
                  <Badge count={pendingCompanies.length} />
                )}
              </h2>
              {pendingCompanies.length === 0 ? (
                <p
                  className="text-gray-500"
                  style={{ marginTop: 16, paddingTop: 66, paddingBottom: 66 }}
                >
                  No pending companies.
                </p>
              ) : (
                <ul className="space-y-4 min-h-[40vh] max-h-[100vh] overflow-y-auto">
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
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex justify-between">
                Pending Technicians
                {!!pendingTechnicians.length && (
                  <Badge count={pendingTechnicians.length} />
                )}
              </h2>
              {pendingTechnicians.length === 0 ? (
                <p
                  className="text-gray-500 text-center"
                  style={{ marginTop: 16, paddingTop: 66, paddingBottom: 66 }}
                >
                  No pending technicians.
                </p>
              ) : (
                <ul className="space-y-4 h-[100vh] overflow-y-auto">
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
