import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.js";
// FIXED: Corrected the import extension to .js as requested.
import DashboardPage from "../pages/Dashboard.jsx";
//import { checkAuth } from "../utils/helper.js"; // It's good practice to add .js here too

// This creates the route for your dashboard page
export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  // This component will be rendered when the user visits /dashboard
  component: DashboardPage,
  // Optional: You can add a beforeLoad check for authentication
});
