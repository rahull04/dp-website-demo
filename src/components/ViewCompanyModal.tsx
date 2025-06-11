import { Modal, Tag, type ModalProps } from "antd";
import type { Company } from "../store/slices/companyListSlice";

const TAG_COLORS = ["magenta", "volcano", "orange", "gold", "cyan"];

export const ViewCompanyModal = ({
  open,
  company,
  ...props
}: ModalProps & { company: Company }) => {
  return (
    <Modal {...props} title={company.name} open={open}>
      <div className="grid grid-cols-12 gap-4 mb-2">
        <div className="col-span-6">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Company Logo
            <img
              src={company?.logo}
              alt="Uploaded"
              className="h-16 w-16 object-cover rounded-full m-1 mr-1.5"
            />
          </label>
        </div>
        <div className="col-span-6">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Company Image
            <img
              src={company?.img}
              alt="Uploaded"
              className="h-16 w-16 object-cover rounded-full m-1 mr-1.5"
            />
          </label>
        </div>
      </div>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Company Name
        <input
          name="name"
          placeholder="Company Name"
          value={company.name}
          style={{ marginBottom: 8 }}
          readOnly
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Username
        <input
          name="username"
          placeholder="Username"
          value={company.username}
          className="input-style"
          readOnly
          required
        />
      </label>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Email
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={company.email}
          className="input-style"
          required
          readOnly
        />
      </label>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Phone
        <input
          name="phone"
          placeholder="Phone"
          type="tel"
          value={company.phone}
          className="input-style"
          required
          readOnly
        />
      </label>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Company Name
        <input
          name="companyName"
          placeholder="Company Name"
          value={company.name}
          className="input-style"
          required
          readOnly
        />
      </label>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Company Address
        <textarea
          name="companyAddress"
          placeholder="Company Address"
          value={company.address}
          className="input-style"
          required
          readOnly
        />
      </label>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Operation Hours
        <input
          name="operationHours"
          placeholder="Operation Hours (e.g. 9AM–6PM)"
          value={company.operationHours}
          className="input-style"
          readOnly
        />
      </label>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Number Of Employees
        <input
          name="numberOfEmployees"
          placeholder="Number of Employees"
          type="number"
          value={company.numberOfEmployees}
          className="input-style"
          readOnly
        />
      </label>
      <div>
        <label className="font-semibold text-gray-700 mb-2 block">
          Area of Service
        </label>
        <div className="flex">
          {company.serviceTypes?.map((service, i) => (
            <Tag color={TAG_COLORS[i]}>{service}</Tag>
          ))}
        </div>
      </div>
    </Modal>
  );
};
