import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/router";
import type { User } from "@/types/user/user.types";
import { env } from "@/env";
import { toast } from "sonner";

// Define authentication context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Use environment variables
const {
  NEXT_PUBLIC_LOCAL_STORAGE_PREFIX: LOCAL_STORAGE_PREFIX = "app_auth_",
  NEXT_PUBLIC_SESSION_DURATION,
} = env as {
  NEXT_PUBLIC_LOCAL_STORAGE_PREFIX: string;
  NEXT_PUBLIC_SESSION_DURATION: string;
};

// Calculate session duration in milliseconds (default to 1 hour if not provided)
const SESSION_DURATION = NEXT_PUBLIC_SESSION_DURATION
  ? parseInt(NEXT_PUBLIC_SESSION_DURATION, 10)
  : 60 * 60 * 1000;

// Create context with default values
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Refresh the session expiration time
  const refreshSession = () => {
    const expirationTime = Date.now() + SESSION_DURATION;
    localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}session_expires`,
      expirationTime.toString(),
    );
  };

  // Handle user logout
  const handleLogout = () => {
    // Clear user data and session information
    setUser(null);
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}user`);
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}session_expires`);

    // Redirect to login page if not already there
    if (router.pathname !== "/login" && router.pathname !== "/register") {
      router.push("/login");
    }
  };

  // Verify if the user's session is still valid
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Get user data and session expiration from localStorage
        const userData = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}user`);
        const sessionExpires = localStorage.getItem(
          `${LOCAL_STORAGE_PREFIX}session_expires`,
        );

        if (!userData || !sessionExpires) {
          handleLogout();
          return;
        }

        // Check if session has expired
        const expirationTime = parseInt(sessionExpires, 10);
        if (Date.now() > expirationTime) {
          handleLogout();
          return;
        }

        // If session is valid, set the user
        setUser(JSON.parse(userData) as User);
        // Refresh session expiration time
        refreshSession();
      } catch (error) {
        console.error("Authentication error:", error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up periodic checks for session validity
    const intervalId = setInterval(checkAuth, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId);
  }, [router]);

  // Handle user login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = getUsersFromStorage();
      console.log(users);
      // Find the user with matching email and password
      const user = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (!user) {
        toast.warning("Invalid email or password");
        return;
      }

      // Store user in state and localStorage
      setUser(user);
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}user`, JSON.stringify(user));

      // Set session expiration
      refreshSession();

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get users from localStorage
  const getUsersFromStorage = (): User[] => {
    const usersJson = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}users`);
    return usersJson ? (JSON.parse(usersJson) as User[]) : [];
  };

  // Handle user registration
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = getUsersFromStorage();

      // Check if email already exists
      if (users.some((u) => u.email === email)) {
        toast.warning("Email already registered");
      }

      // Create new user
      const newUser: User = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        name,
        email,
        password, // In a real app, you should hash the password
        createdAt: new Date().toISOString(),
      };

      // Save updated users list
      const updatedUsers = [...users, newUser];
      localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}users`,
        JSON.stringify(updatedUsers),
      );

      // Log in the newly registered user
      await login(email, password);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
