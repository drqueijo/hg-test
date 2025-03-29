import { cn } from "@/lib/utils";
import { ThemeSwitch } from "@/components/ui/theme-switch";

export function DefaultLayout({
  className,
  children,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "flex min-h-svh w-full items-center justify-center p-6 md:p-10",
        className,
      )}
      {...props}
    >
      {children}
      <ThemeSwitch />
    </main>
  );
}
