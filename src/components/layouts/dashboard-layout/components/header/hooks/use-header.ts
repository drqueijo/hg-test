import { useAuth } from "@/contexts/auth-contenxt";

export function useHeader() {
  const { user, logout } = useAuth();
  const userName = user?.name;

  return {
    userName,
    handleLogout: logout,
  };
}
