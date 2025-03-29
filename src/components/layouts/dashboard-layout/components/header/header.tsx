import * as React from "react";

import { cn } from "@/lib/utils";
import type { HeaderProps } from "./header.types";
import { Button } from "@/components/ui/button";
import { useHeader } from "./hooks/use-header";
import { LogOutIcon } from "lucide-react";
import { ThemeSwitch } from "@/components/ui/theme-switch";

export function Header({ className, ...props }: HeaderProps) {
  const { handleLogout, userName } = useHeader();

  return (
    <header
      className={cn("bg-background sticky top-0 z-10 border-b px-4", className)}
      {...props}
    >
      <div className="container m-auto flex h-16 items-center justify-between py-4">
        <h1 className="text-md font-bold md:text-xl">HG Finance Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="hidden font-semibold md:block">Olá, {userName}</span>
          <ThemeSwitch />
          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
