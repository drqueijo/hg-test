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

      if (!isAuthenticated && !isPublicRoute) {
        void router.push("/login");
      }

      if (isAuthenticated && isPublicRoute) {
        void router.push("/dashboard");
      }
    }, [isAuthenticated, isLoading, isPublicRoute, router]);

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      );
    }

    if (!isAuthenticated && !isPublicRoute) {
      return null;
    }

    if (isAuthenticated && isPublicRoute) {
      return null;
    }

    return <Component {...props} />;
  };

  const componentName = Component.displayName ?? Component.name ?? "Component";
  AuthenticatedComponent.displayName = `withAuth(${componentName})`;

  return AuthenticatedComponent;
}
