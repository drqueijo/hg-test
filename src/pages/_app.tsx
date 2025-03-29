import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
