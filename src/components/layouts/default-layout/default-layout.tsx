import { cn } from "@/lib/utils";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import type { DefaultLayoutProps } from "./default-layout.types";

export function DefaultLayout({
  className,
  children,
  ...props
}: DefaultLayoutProps) {
  return (
    <main
      className={cn(
        "flex min-h-svh w-full items-center justify-center p-6 md:p-10",
        className,
      )}
      {...props}
    >
      {children}
      <div className="absolute top-2 right-2">
        <ThemeSwitch />
      </div>
    </main>
  );
}
