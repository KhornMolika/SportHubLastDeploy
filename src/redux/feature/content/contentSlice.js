import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  // state
  news: [],
  history_of_bokator: [],
  history_of_kun_khmer: [],
  history_of_basketball: [],
  history_of_volleyball: [],
  history_of_football: [],
  status: "idle",
  error: null,
};

const baseUrl = import.meta.env.VITE_BASE_URL.replace(/^http:/, "https:");;
const endPoint = import.meta.env.VITE_NEW_URL;
const apiUrl = `${baseUrl}${endPoint}`;

// fetch all contents
export const fetchContents = createAsyncThunk(
  "contents/fetchContents",
  async () => {
    const response = await fetch(apiUrl);
    const contentData = await response.json();
    // console.log("Content Data: ", contentData.data);
    return contentData.data;
  }
);

export const contentSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = "Success";
        // Separate contents based on content_type
        state.news = action.payload.filter(
          (item) => item.content_type === "news"
        );
        state.history_of_bokator = action.payload.filter(
          (item) => item.content_type === "history-of-bokator"
        );
        state.history_of_kun_khmer = action.payload.filter(
          (item) => item.content_type === "history-of-kun-khmer"
        );
        state.history_of_basketball = action.payload.filter(
          (item) => item.content_type === "history-of-basketball"
        );
        state.history_of_volleyball = action.payload.filter(
          (item) => item.content_type === "history-of-volleyball"
        );
        state.history_of_football = action.payload.filter(
          (item) => item.content_type === "history-of-football"
        );
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
  },
});

// export reducer
export default contentSlice.reducer;

// export selectors and "content" is the name of the reducer and news, history
export const selectAllNews = (state) => state?.content?.news;
export const selectHistoryOfBokator = (state) => state?.content?.history_of_bokator;
export const selectHistoryOfKunKhmer = (state) => state?.content?.history_of_kun_khmer;
export const selectHistoryOfBasketball = (state) => state?.content?.history_of_basketball;
export const selectHistoryOfVolleyball = (state) => state?.content?.history_of_volleyball;
export const selectHistoryOfFootball = (state) => state?.content?.history_of_football;
