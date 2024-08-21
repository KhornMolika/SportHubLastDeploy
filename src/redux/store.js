import { configureStore } from "@reduxjs/toolkit";
import sportclubReducer from "../redux/feature/sportclub/SportClubSlice";
import contentSlice from "./feature/content/contentSlice";
import athletesSlice from "./feature/athletes/athletesSlice";
import eventSlice from "./feature/eventSlice/eventSlices";
import userSlice from "./feature/user/userSlice";

const store = configureStore({
  reducer: {
    sportclubs: sportclubReducer,
    content: contentSlice,
    event: eventSlice,
    athlete: athletesSlice,
    user: userSlice,
  },
});

export default store;
