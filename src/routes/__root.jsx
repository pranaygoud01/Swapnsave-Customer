import * as React from "react";
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// Root route with a notFoundComponent
export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: UnderConstruction, // ✅ use this instead of NotFoundRoute
});

function RootComponent() {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const hideLayout = pathname === "/login" || pathname === "/register";

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      {!hideLayout && <NavBar />}
      <div className="min-h-screen flex flex-col">
        <Outlet />
      </div>
      {!hideLayout && <Footer />}
    </React.Fragment>
  );
}

// 🚧 Under Construction Page
function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <h1 className="text-4xl max-lg:text-xl font-bold mb-4">🚧 Site Under Construction 🚧</h1>
      <p className="text-lg max-lg:text-sm text-gray-600">
        The page you are trying to access is not ready yet.
      </p>
    </div>
  );
}
