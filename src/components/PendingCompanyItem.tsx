import type { Company } from "../store/slices/companyListSlice";

export const PendingCompanyItem = ({
  company,
  setSelectedCompany,
  setShowConfirmatoryModal,
}: {
  company: Company;
  setSelectedCompany: React.Dispatch<React.SetStateAction<Company | null>>;
  setShowConfirmatoryModal: React.Dispatch<
    React.SetStateAction<{
      text: string;
      type: "approve" | "reject";
      entityType: "company" | "technician";
      entityId: string;
    } | null>
  >;
}) => {
  return (
    <li
      key={company.id}
      className="border p-4 rounded-md border-gray-400 shadow-sm bg-gray-50"
    >
      <div className="flex justify-between items-center">
        <div>
          <p style={{ marginBottom: 0 }} className="font-medium">
            {company.name}
          </p>
          <p className="text-sm text-gray-500">{company.email}</p>
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
  );
};
