import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { lazy } from "react";

const RouteSelectLazy = lazy(() => import("./pages/route-select"));
const SelectEquipmentLazy = lazy(() => import("./pages/select-equipment"));
const MainLazy = lazy(() => import("./pages/main"));


const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/route-select",
    element: <RouteSelectLazy />,
  },
  {
    path: "/select-equipment",
    element: <SelectEquipmentLazy />,
    
  },
    {
    path: "/main",
    element: <MainLazy />,
    }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter

export const preloadOtherRoutes = () => {
  import("./pages/route-select");
  import("./pages/select-equipment");
  import("./pages/main");
};
