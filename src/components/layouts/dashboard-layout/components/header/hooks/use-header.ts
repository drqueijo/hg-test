import { useAuth } from "@/contexts/AuthContext";

export function useHeader() {
  const { user, logout } = useAuth();
  const userName = user?.name;

  return {
    userName,
    handleLogout: logout,
  };
}
