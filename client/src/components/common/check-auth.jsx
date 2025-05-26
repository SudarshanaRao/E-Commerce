import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const { pathname } = location;

  // Root path redirection based on auth and role
  if (pathname === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" />
      : <Navigate to="/shop/home" />;
  }

  // If not authenticated and accessing protected routes
  const isAuthPage = pathname.includes("/login") || pathname.includes("/register");
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/auth/login" />;
  }

  // If authenticated but accessing login or register
  if (isAuthenticated && isAuthPage) {
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" />
      : <Navigate to="/shop/home" />;
  }

  // Prevent user from accessing admin routes
  if (isAuthenticated && user?.role !== "admin" && pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // Prevent admin from accessing user routes
  if (isAuthenticated && user?.role === "admin" && pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Allow access to intended page
  return <>{children}</>;
}

export default CheckAuth;
