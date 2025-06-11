import { Modal, Tag, type ModalProps } from "antd";
import type { Technician } from "../store/slices/technicianSlice";

const TAG_COLORS = ["magenta", "volcano", "orange", "gold", "cyan"];

export const ViewTechnicianModal = ({
  open,
  technician,
  ...props
}: ModalProps & { technician: Technician }) => {
  return (
    <Modal {...props} title={technician.username} open={open}>
      <div className="grid grid-cols-12 gap-4 mb-2">
        <div className="col-span-6">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            <img
              src={technician?.photo}
              alt="Uploaded"
              className="h-16 w-16 object-cover rounded-full m-1 mr-1.5"
            />
          </label>
        </div>
      </div>

      {/* Two column layout for inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Username
            <input
              name="username"
              placeholder="Username"
              value={technician.username}
              readOnly
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Email
            <input
              name="email"
              placeholder="Email"
              value={technician.email}
              readOnly
              required
              className="input-style"
            />
          </label>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Phone
            <input
              name="phone"
              placeholder="Phone"
              type="tel"
              value={technician.phone}
              readOnly
              required
              className="input-style"
            />
          </label>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Address
            <textarea
              name="address"
              placeholder="Address"
              value={technician.address}
              readOnly
              required
              className="input-style"
              rows={3}
            />
          </label>
        </div>
      </div>

      {/* Certificates */}
      {technician?.certificates?.length && (
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-6">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Certificates
              <div className="flex">
              {technician.certificates.map((c) => (
                <img
                  src={c}
                  alt="Uploaded"
                  className="h-16 w-16 object-cover m-1 mr-1.5"
                />
              ))}
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Skills */}
      <div className="mt-4">
        <label className="font-semibold text-gray-700 mb-2 block">Skills</label>
        <div className="flex flex-wrap gap-2">
          {technician.skills?.map((skill, i) => (
            <Tag key={i} color={TAG_COLORS[i % TAG_COLORS.length]}>
              {skill}
            </Tag>
          ))}
        </div>
      </div>
    </Modal>
  );
};
