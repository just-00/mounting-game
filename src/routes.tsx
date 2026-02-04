import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { RouteSelect } from "./pages/route-select";
import { SelectEquipment } from "./pages/select-equipment";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/route-select",
    element: <RouteSelect />,
  },
  {
    path: "/select-equipment",
    element: <SelectEquipment />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
