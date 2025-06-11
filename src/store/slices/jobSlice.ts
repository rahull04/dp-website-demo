import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Job {
  id: string;
  title: string;
  description: string;
  address: string;
  postedDate: string;
  companyEmail: string; // This links the job to a company
}

interface JobState {
  jobs: Job[];
}

const initialState: JobState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.unshift(action.payload);
    },
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
  },
});

export const { addJob, setJobs } = jobSlice.actions;
export default jobSlice.reducer;
