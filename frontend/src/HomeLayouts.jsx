import { Outlet } from "react-router-dom";
import { NavbarComponent } from "./NavbarComponent";
import React from "react";
import useFetchUserData from './useFetchUserData';
export const HomeLayouts = () => {

   useFetchUserData();

  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};
