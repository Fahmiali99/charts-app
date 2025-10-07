import { createSlice } from "@reduxjs/toolkit";

interface PopulationState {
  population: any;
  startDate: string;
  endDate: string;
}

const initialState: PopulationState = {
  population: [],
  startDate: "2012",
  endDate: "2018",
};

const populationDataSlice = createSlice({
  name: "populationdata",
  initialState,
  reducers: {
    setPopulation: (state, action) => {
      state.population = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const { setPopulation, setStartDate, setEndDate } = populationDataSlice.actions;
export default populationDataSlice.reducer;