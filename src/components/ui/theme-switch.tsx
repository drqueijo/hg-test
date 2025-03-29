import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

function ThemeSwitch({ className, ...props }: React.ComponentProps<"div">) {
  const { theme, setTheme } = useTheme();
  const isCurrentThemeDark = theme === "dark";

  return (
    <div className={cn("absolute top-2 right-2", className)} {...props}>
      <Button
        variant="link"
        role="button"
        className="cursor-pointer"
        onClick={() => setTheme(isCurrentThemeDark ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        <Sun
          className={cn(
            "h-5 w-5 text-yellow-500",
            isCurrentThemeDark ? "hidden" : "",
          )}
        />
        <Moon
          className={cn(
            "h-5 w-5 text-gray-700",
            isCurrentThemeDark ? "" : "hidden",
          )}
        />
      </Button>
    </div>
  );
}

export { ThemeSwitch };
