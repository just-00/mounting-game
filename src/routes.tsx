import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/home";
import { lazy } from "react";

const RouteSelectLazy = lazy(() => import("./pages/route-select"));
const SelectEquipmentLazy = lazy(() => import("./pages/select-equipment"));
const MainLazy = lazy(() => import("./pages/main"));
const BagManageLazy = lazy(() => import("./pages/bag-manage"));
const AchievementLazy = lazy(() => import("./pages/achievement"));

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
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
    children: [
      {
        path: "bag-manage",
        element: <BagManageLazy />,
      },
    ],
  },
  {
    path: "/achievement",
    element: <AchievementLazy />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;

// eslint-disable-next-line react-refresh/only-export-components
export const preloadOtherRoutes = () => {
  import("./pages/route-select");
  import("./pages/select-equipment");
  import("./pages/main");
  import("./pages/bag-manage");
  import("./pages/achievement");
};
