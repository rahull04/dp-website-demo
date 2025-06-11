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
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Username
        <input
          name="username"
          placeholder="Username"
          value={technician.username}
          style={{ marginBottom: 8 }}
          readOnly
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Email
        <input
          name="email"
          placeholder="Email"
          value={technician.email}
          className="input-style"
          readOnly
          required
        />
      </label>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Phone
        <input
          name="phone"
          placeholder="Phone"
          type="tel"
          value={technician.phone}
          className="input-style"
          required
          readOnly
        />
      </label>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Address
        <textarea
          name="caddress"
          placeholder="Address"
          value={technician.address}
          className="input-style"
          required
          readOnly
        />
      </label>
      <div>
        <label className="font-semibold text-gray-700 mb-2 block">Skills</label>
        <div className="flex">
          {technician.skills?.map((skill, i) => (
            <Tag color={TAG_COLORS[i]}>{skill}</Tag>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mb-2">
        <div className="col-span-6">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Certificates
            <img
              src={technician?.certificates?.[0]}
              alt="Uploaded"
              className="h-16 w-16 object-cover m-1 mr-1.5"
            />
          </label>
        </div>
      </div>
    </Modal>
  );
};
