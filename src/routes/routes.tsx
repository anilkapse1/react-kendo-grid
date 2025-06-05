import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Kendo1 from "../pages/Kendo1";
import Kendo2 from "../pages/Kendo2";
import Kendo3 from "../pages/Kendo3";
import Layout from "../layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Kendo1 /> }, 
      { path: "kendo1", element: <Kendo2 /> },
      { path: "kendo2", element: <Kendo3 /> },
    ],
  },
]);
