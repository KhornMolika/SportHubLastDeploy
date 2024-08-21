import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  eventId: {},
  status: "idle",
  error: null,
};

const baseUrl = import.meta.env.VITE_BASE_URL.replace(/^http:/, "https:");
const endPoint = import.meta.env.VITE_EVENT_URL;
const end_point = import.meta.env.VITE_ONE_EVENT_URL;
const apiUrl = `${baseUrl}${endPoint}`;
const apiID = `${baseUrl}${end_point}`;

export const fetchevents = createAsyncThunk("events/fetchevents", async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const filterData = data.results.filter((item) => item.is_deleted == false);
  return filterData;
});

export const fetcheventsssById = createAsyncThunk(
  "events/fetcheventById",
  async (id) => {
    const response = await fetch(`${apiID}${id}/`);
    console.log("DataSlug:",response)
    const data = await response.json();
    return data;
  }
);

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchevents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchevents.fulfilled, (state, action) => {
        (state.status = "success"), (state.events = action.payload);
      })
      .addCase(fetchevents.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })

      //by id get
      .addCase(fetcheventsssById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetcheventsssById.fulfilled, (state, action) => {
        (state.status = "success"), (state.eventId = action.payload);
      })
      .addCase(fetcheventsssById.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      });
  },
});
//export reducer
export default eventSlice.reducer;
//select all
export const seleteAllEvents = (state) => state.event.events;

//export const seleteEventByID = (state) => state.event.eventId;
