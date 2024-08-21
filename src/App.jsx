import "./App.css";
import Home from "./page/home/Home";
import { HelmetProvider } from "react-helmet-async";
import AboutUs from "./page/about-us/AboutUs";

export default function App() {
  return (
    <>
      <HelmetProvider>
        <Home />
        <AboutUs />
      </HelmetProvider>
      
    </>
  );
}
