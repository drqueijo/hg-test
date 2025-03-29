import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/router";
import type { User } from "@/types/user/user.types";
import { toast } from "sonner";
import type { AuthContextType } from "@/types/auth/auth.types";
import { setValue, getValue, removeValue } from "@/lib/local-storage";
import { getSessionDuration } from "@/lib/get-session-duration";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const SESSION_DURATION = getSessionDuration();

  const refreshSession = useCallback(() => {
    const expirationTime = Date.now() + SESSION_DURATION;
    setValue("session_expires", expirationTime.toString());
  }, [SESSION_DURATION]);

  const handleLogout = useCallback(() => {
    setUser(null);
    removeValue("user");
    removeValue("session_expires");

    if (router.pathname !== "/login" && router.pathname !== "/register") {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = getValue("user");
        const sessionExpires = getValue("session_expires");

        if (!userData || !sessionExpires) {
          handleLogout();
          return;
        }

        const expirationTime = parseInt(sessionExpires, 10);
        if (Date.now() > expirationTime) {
          handleLogout();
          return;
        }

        setUser(JSON.parse(userData) as User);

        refreshSession();
      } catch (error) {
        toast.warning("Authentication error");
        console.error("Authentication error:", error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const intervalId = setInterval(checkAuth, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId);
  }, [router, handleLogout, refreshSession]);

  const getUsersFromStorage = useCallback((): User[] => {
    const usersJson = getValue("users");
    return usersJson ? (JSON.parse(usersJson) as User[]) : [];
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const users = getUsersFromStorage();
        const user = users.find(
          (u) => u.email === email && u.password === password,
        );

        if (!user) {
          toast.warning("Invalid email or password");
          return;
        }

        setUser(user);
        setValue("user", JSON.stringify(user));

        refreshSession();

        router.push("/");
      } catch (error) {
        toast.warning("Login error");
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [getUsersFromStorage, refreshSession, router],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      try {
        const users = getUsersFromStorage();

        if (users.some((u) => u.email === email)) {
          toast.warning("Email already registered");
        }

        const newUser: User = {
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          name,
          email,
          password,
          createdAt: new Date().toISOString(),
        };

        const updatedUsers = [...users, newUser];
        setValue("users", JSON.stringify(updatedUsers));

        await login(email, password);
      } catch (error) {
        toast.warning("Registration error");
        console.error("Registration error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [getUsersFromStorage, login],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
