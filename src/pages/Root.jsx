import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <>
      <Header name="Jay Wilco" />
      <main>
        <Outlet />
      </main>
      <Footer year={2025} />
    </>
  );
};

export default Root;
