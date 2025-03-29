import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type buttonVariants } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

function ThemeSwitch({
  className,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  const { theme, setTheme } = useTheme();
  const isCurrentThemeDark = theme === "dark";

  return (
    <Button
      variant="link"
      role="button"
      className={cn("cursor-pointer", className)}
      onClick={() => setTheme(isCurrentThemeDark ? "light" : "dark")}
      aria-label="Toggle theme"
      {...props}
    >
      <Sun
        className={cn(
          "h-5 w-5 text-gray-900",
          isCurrentThemeDark ? "hidden" : "",
        )}
      />
      <Moon
        className={cn(
          "h-5 w-5 text-gray-100",
          isCurrentThemeDark ? "" : "hidden",
        )}
      />
    </Button>
  );
}

export { ThemeSwitch };
