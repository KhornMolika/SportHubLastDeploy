import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  sportclubs: [],
  status: "idle", // idle -> loading | successful | failed
  error: null,
};
const baseUrl = import.meta.env.VITE_BASE_URL.replace(/^http:/, "https:");;
const endPoint = import.meta.env.VITE_SPORT_URL;
const apiUrl = `${baseUrl}${endPoint}`;

// Updated fetchSportclubs thunk for concurrent fetching
export const fetchSportclubs = createAsyncThunk(
  "sportclubs/fetchSportclubs",
  async (_, { rejectWithValue }) => {
    let allResults = [];
    let nextPage = `${apiUrl}`;

    try {
      const response = await fetch(nextPage);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      allResults = [...data.results];
      const totalPages = Math.ceil(data.count / 15);
      // console.log("total page", totalPages);

      const pageRequests = [];
      for (let i = 2; i <= totalPages; i++) {
        pageRequests.push(fetch(`${apiUrl}?page=${i}`));
      }

      const responses = await Promise.all(pageRequests);
      const dataPromises = responses.map((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      });

      const pagesData = await Promise.all(dataPromises);
      pagesData.forEach((pageData) => {
        allResults = [...allResults, ...pageData.results];
        // console.log("all results", allResults);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
    return allResults;
  }
);

const sportclubSlice = createSlice({
  name: "sportclubs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSportclubs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSportclubs.fulfilled, (state, action) => {
        state.status = "successful";
        state.sportclubs = action.payload;
      })
      .addCase(fetchSportclubs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default sportclubSlice.reducer;
export const selectAllSportclubs = (state) => state.sportclubs.sportclubs;
