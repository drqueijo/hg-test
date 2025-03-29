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
          "container m-auto flex min-h-full items-center justify-center px-4 py-10 md:px-0",
          className,
        )}
        {...props}
      >
        {children}
      </main>
    </div>
  );
}
