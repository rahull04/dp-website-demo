import type { Technician } from "../store/slices/technicianSlice";

export const PendingTechnicianItem = ({
  technician,
  setSelectedTechnician,
  setShowConfirmatoryModal,
}: {
  technician: Technician;
  setSelectedTechnician: React.Dispatch<
    React.SetStateAction<Technician | null>
  >;
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
    <li
      key={technician.username}
      className="border p-4 border-gray-400 rounded-md shadow-sm bg-gray-50"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium" style={{ marginBottom: 0 }}>
            {technician.username}
          </p>
          <p className="text-sm text-gray-500">{technician.email}</p>
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
  );
};
