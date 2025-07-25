import { createRootRoute } from "@tanstack/react-router";
import { homePageRoute } from "./homepage.js";
import { authRoute, loginRoute, signupRoute } from "./auth.route.js";
// Corrected the typo from "dasboardRoute" to "dashboardRoute" for consistency
import { dashboardRoute } from "./dashboard.js"; 
// Corrected the import by adding the .jsx extension
import RootLayout from "../RouteLayout.jsx"; 

export const rootRoute = createRootRoute({
    component: RootLayout,
});


authRoute.addChildren([loginRoute, signupRoute]);

export const routeTree = rootRoute.addChildren([
    homePageRoute, 
    authRoute, 
    dashboardRoute // Use the corrected variable name
]);