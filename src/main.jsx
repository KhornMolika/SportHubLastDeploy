import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Layout from "./components/layout/Layout.jsx";
import store from "./redux/store";

import AboutUs from "./page/about-us/AboutUs.jsx";
import SportClub from "./page/sport-club/SportClub.jsx";
import EventHome from "./page/events/EventHome.jsx";
import EventDetails from "./page/events/EventDetails.jsx";
import News from "./page/news/News.jsx";
import History from "./page/history/History.jsx";
import Login from "./page/auth/login/Login.jsx";
import Register from "./page/auth/register/Register.jsx";
import SportClubDetail from "./page/sportclub-details/SportClubDetail.jsx";
import NewsDetailPage from "./page/news-detail/NewsDetailPage.jsx";
import HistoryDetail from "./page/history-detail/HistoryDetail.jsx";
import AthletesDetail from "./page/athletes-detail/AthletesDetail.jsx";
import VerifyEmail from "./page/auth/verify-email/VerifyEmail.jsx";
import MapComponent from "./components/Map/MapComponent.jsx";
import UserDetail from "./page/user-detail/UserDetail.jsx";
import ViewProfile from "./page/user-detail/ViewProfile.jsx";
import ErrorPage from "./page/error-page/ErrorPage.jsx";
import Home from "./page/home/Home.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/sport-club",
        element: <SportClub />,
      },
      {
        path: "/sportclub-details",
        element: <SportClubDetail />,
      },
      {
        path: "/event-home",
        element: <EventHome />,
      },
      {
        path: "/eventDetail/:id",
        element: <EventDetails />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news-detail",
        element: <NewsDetailPage />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/history-detail",
        element: <HistoryDetail />,
      },
      {
        path: "/athletes-detail",
        element: <AthletesDetail />,
      },
      {
        path: "/map",
        element: <MapComponent />,
      },
      {
        path: "/user-detail",
        element: <UserDetail />,
      },
      {
        path: "/view-profile",
        element: <ViewProfile />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="847530507240-vhsv4gri0t1uqdchf2t02s1p4lr7p585.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
