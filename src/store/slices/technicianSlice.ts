import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export enum TechnicianStatus {
  INCOMPLETE,
  PENDING_REVIEW,
  APPROVED,
  REJECTED,
}

export interface Technician {
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  isVerified: boolean;
  status: TechnicianStatus;
  photo?: string;
  skills?: string[];
  certificates?: string[];
}

interface TechnicianState {
  technicians: Technician[];
}

const initialState: TechnicianState = {
  technicians: [],
};

const technicianSlice = createSlice({
  name: "technician",
  initialState,
  reducers: {
    registerTechnician: (
      state,
      action: PayloadAction<Omit<Technician, "isVerified">>
    ) => {
      const newTech: Technician = {
        ...action.payload,
        isVerified: false,
      };
      state.technicians.push(newTech);
    },
    submitTechnicianProfile: (
      state,
      action: PayloadAction<{
        email: string;
        photo?: string;
        skills?: string[];
        certificates?: string[];
      }>
    ) => {
      const { email, ...rest } = action.payload;
      const index = state.technicians.findIndex((c) => c.email === email);

      if (index !== -1) {
        state.technicians[index] = {
          ...state.technicians[index],
          ...rest,
          status: TechnicianStatus.PENDING_REVIEW,
        };
      }
    },
    approveTechnician: (state, action: PayloadAction<string>) => {
      const company = state.technicians.find((c) => c.username === action.payload);
      if (company) {
        company.status = TechnicianStatus.APPROVED;
      }
    },
    rejectTechnician: (state, action: PayloadAction<string>) => {
      const company = state.technicians.find((c) => c.username === action.payload);
      if (company) {
        company.status = TechnicianStatus.REJECTED;
      }
    },
  },
});

export const { registerTechnician, submitTechnicianProfile, approveTechnician, rejectTechnician} = technicianSlice.actions;

export default technicianSlice.reducer;
