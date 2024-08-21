import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  athletes: [],
  status: "idle",
  error: null,
};

const baseUrl = import.meta.env.VITE_BASE_URL.replace(/^http:/, "https:");
const endPoint = import.meta.env.VITE_ATHLETE_URL;
const apiUrl = `${baseUrl}${endPoint}`;

export const fetchAthletes = createAsyncThunk(
  "athletes/fetchAthletes",
  async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const filterData = data.results.filter((item) => item.is_deleted == false);
    return filterData;
  }
);

export const athletesSlice = createSlice({
  name: "athletes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAthletes.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAthletes.fulfilled, (state, action) => {
        (state.status = "success"), (state.athletes = action.payload);
      })
      .addCase(fetchAthletes.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      });
  },
});

export default athletesSlice.reducer;
export const selectAllAthletes = (state) => state.athlete.athletes;
