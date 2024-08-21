import { Outlet } from "react-router-dom";
import { FooterComponent } from "../footer/FooterComponent";
import NavBarComponent from "../navbar/NavbarComponent";
export default function Layout() {
  return (
    <>
      <header>
        <NavBarComponent />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </>
  );
}
