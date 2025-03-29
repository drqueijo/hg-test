import { cn } from "@/lib/utils";
import type { DashboardLayoutProps } from "./dashboard-layout.types";
import { Header } from "./components/header";

export function DashboardLayout({
  className,
  children,
  ...props
}: DashboardLayoutProps) {
  return (
    <div>
      <Header />
      <main
        className={cn(
          "flex min-h-full w-full items-center justify-center p-6 md:p-10",
          className,
        )}
        {...props}
      >
        {children}
      </main>
    </div>
  );
}
