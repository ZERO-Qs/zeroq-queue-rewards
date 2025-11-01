import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};