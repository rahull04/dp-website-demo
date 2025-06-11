import { MailOutlined, PhoneOutlined, IdcardOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { Technician } from "../store/slices/technicianSlice";

const TAG_COLORS = ["blue", "green", "volcano", "cyan", "purple", "gold", "magenta"];

export const PendingTechnicianItem = ({
  technician,
  setSelectedTechnician,
  setShowConfirmatoryModal,
}: {
  technician: Technician;
  setSelectedTechnician: React.Dispatch<React.SetStateAction<Technician | null>>;
  setShowConfirmatoryModal: (
    value: React.SetStateAction<{
      text: string;
      type: "approve" | "reject";
      entityType: "company" | "technician";
      entityId: string;
    } | null>
  ) => void;
}) => {
  return (
    <li className="bg-white border border-gray-200 rounded-xl shadow-md p-5 transition hover:shadow-lg w-full">
      <div className="flex gap-4 items-start">
        {/* Profile Image */}
        <img
          src={technician.photo || "/default-user.png"}
          alt="Technician"
          className="h-16 w-16 rounded-full object-cover border"
        />

        {/* Info Section */}
        <div className="flex-1">
          {/* Username & Action Buttons */}
          <div className="flex justify-between items-start">
            <div>
              <h3
                onClick={() => setSelectedTechnician(technician)}
                className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                {technician.username}
              </h3>
              <div className="text-sm text-gray-600 mt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <MailOutlined className="text-gray-400" />
                  <span>{technician.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-gray-400" />
                  <span>{technician.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IdcardOutlined className="text-gray-400" />
                  <span>{technician.address}</span>
                </div>
              </div>
            </div>

            {/* Approve/Reject Buttons */}
            <div className="flex gap-2 mt-1">
              <button
                style={{color: "white"}}
                onClick={() =>
                  setShowConfirmatoryModal({
                    text: "Are you sure you want to approve this technician?",
                    type: "approve",
                    entityId: technician.username,
                    entityType: "technician",
                  })
                }
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded"
              >
                <CheckCircleOutlined /> Approve
              </button>
              <button
                style={{color: "white"}}
                onClick={() =>
                  setShowConfirmatoryModal({
                    text: "Are you sure you want to reject this technician?",
                    type: "reject",
                    entityId: technician.username,
                    entityType: "technician",
                  })
                }
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded"
              >
                <CloseCircleOutlined /> Reject
              </button>
            </div>
          </div>

          {/* Skills */}
          {technician.skills?.length ? (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1 font-medium">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {technician.skills.map((skill, i) => (
                  <Tag key={skill} color={TAG_COLORS[i % TAG_COLORS.length]}>
                    {skill}
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
