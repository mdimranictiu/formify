import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root/Root";
import ErrorPage from "./ErrorPage/ErrorPage";
import { FormBuilderProvider } from "./Context/FormBuilderContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
     <FormBuilderProvider>
     <RouterProvider router={router} />
    </FormBuilderProvider>
  
  </StrictMode>
);
