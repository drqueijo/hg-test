import { useEffect, type ComponentType } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { PUBLIC_ROUTES } from "@/constants/routes";

/**
 * Higher-order component to protect routes from unauthenticated access
 * @template P - Component props type
 * @param Component - The page component to wrap
 * @returns Authenticated component
 */
export function withAuth<P extends Record<string, unknown>>(
  Component: ComponentType<P>,
): ComponentType<P> {
  const AuthenticatedComponent = (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const { pathname } = router;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    useEffect(() => {
      if (isLoading) return;

      // Redirect unauthenticated users trying to access protected routes
      if (!isAuthenticated && !isPublicRoute) {
        void router.push("/login");
      }

      // Redirect authenticated users trying to access public routes
      if (isAuthenticated && isPublicRoute) {
        void router.push("/dashboard");
      }
    }, [isAuthenticated, isLoading, isPublicRoute, router]);

    // Handle loading state
    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      );
    }

    // Don't render protected content for unauthenticated users
    if (!isAuthenticated && !isPublicRoute) {
      return null;
    }

    // Don't render login/register pages for authenticated users
    if (isAuthenticated && isPublicRoute) {
      return null;
    }

    // Render the component with its props
    return <Component {...props} />;
  };

  // Add display name for debugging
  const componentName = Component.displayName ?? Component.name ?? "Component";
  AuthenticatedComponent.displayName = `withAuth(${componentName})`;

  return AuthenticatedComponent;
}
