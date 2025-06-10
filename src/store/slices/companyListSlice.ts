// src/store/slices/companyListSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export enum CompanyStatus {
  INCOMPLETE,
  PENDING_REVIEW,
  APPROVED,
  REJECTED
}

export interface Company {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  status: CompanyStatus;
  approved: boolean;
  operationHours?: string;
  numberOfEmployees?: string;
  serviceTypes?: string[];
  logo?: string;
  img?: string;
}

interface CompanyListState {
  companies: Company[];
}

const initialState: CompanyListState = {
  companies: [],
};

const companyListSlice = createSlice({
  name: "companyList",
  initialState,
  reducers: {
    registerCompany: (
      state,
      action: PayloadAction<Omit<Company, "approved">>
    ) => {
      state.companies.push({ ...action.payload, approved: false });
    },
    approveCompany: (state, action: PayloadAction<string>) => {
      const company = state.companies.find((c) => c.id === action.payload);
      if (company) {
        company.approved = true;
        company.status = CompanyStatus.APPROVED;
      }
    },
    rejectCompany: (state, action: PayloadAction<string>) => {
      const company = state.companies.find((c) => c.id === action.payload);
      if (company) {
        company.status = CompanyStatus.REJECTED;
      }
    },
    submitProfile: (
      state,
      action: PayloadAction<{
        email: string;
        operationHours: string;
        numberOfEmployees: string;
        serviceTypes: string[];
        logo: string;
        img: string;
      }>
    ) => {
      const { email, ...rest } = action.payload;
      const index = state.companies.findIndex((c) => c.email === email);
    
      if (index !== -1) {
        state.companies[index] = {
          ...state.companies[index],
          ...rest,
          status: CompanyStatus.PENDING_REVIEW
        };
      }
    }
    
  },
});

export const { registerCompany, approveCompany, rejectCompany, submitProfile } =
  companyListSlice.actions;
export default companyListSlice.reducer;
