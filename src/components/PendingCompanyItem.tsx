import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, PhoneOutlined, MailOutlined, TeamOutlined } from "@ant-design/icons";
import type { Company } from "../store/slices/companyListSlice";
import { Tag } from "antd";

const TAG_COLORS = ["magenta", "volcano", "orange", "gold", "cyan", "blue", "green", "purple"];

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
    <li className="bg-white rounded-xl shadow-md border border-gray-200 p-5 transition hover:shadow-lg w-full">
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <img
            src={company.logo || "/placeholder-logo.png"}
            alt="Company Logo"
            className="h-16 w-16 rounded-full object-cover border"
          />
        </div>

        {/* Info section */}
        <div className="flex-1">
          {/* Name and Email */}
          <div className="flex justify-between items-center">
            <h3
              onClick={() => setSelectedCompany(company)}
              className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              {company.name}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setShowConfirmatoryModal({
                    text: "Are you sure you want to approve this company?",
                    type: "approve",
                    entityId: company.id,
                    entityType: "company",
                  })
                }
                style={{color: "white"}}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md"
              >
                <CheckCircleOutlined />
                Approve
              </button>
              <button
                style={{color: "white"}}
                onClick={() =>
                  setShowConfirmatoryModal({
                    text: "Are you sure you want to reject this company?",
                    type: "reject",
                    entityId: company.id,
                    entityType: "company",
                  })
                }
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md"
              >
                <CloseCircleOutlined />
                Reject
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <MailOutlined className="text-gray-400" />
              <span>{company.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneOutlined className="text-gray-400" />
              <span>{company.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockCircleOutlined className="text-gray-400" />
              <span>{company.operationHours || "Not specified"}</span>
            </div>
            <div className="flex items-center gap-2">
              <TeamOutlined className="text-gray-400" />
              <span>{company.numberOfEmployees || "N/A"} employees</span>
            </div>
          </div>

          {/* Service Tags */}
          {company.serviceTypes?.length ? (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1 font-medium">Services:</p>
              <div className="flex flex-wrap gap-2">
                {company.serviceTypes.map((type, index) => (
                  <Tag color={TAG_COLORS[index % TAG_COLORS.length]} key={type}>
                    {type}
                  </Tag>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
};
