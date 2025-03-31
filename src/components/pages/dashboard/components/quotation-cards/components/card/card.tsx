import { cn } from "@/lib/utils";
import {
  Card as UICard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CardProps } from "./card.types";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export function Card({
  className,
  buy,
  currencyKey,
  sell,
  variation,
  isSelected,
  name,
  ...props
}: CardProps) {
  return (
    <UICard
      className={cn(
        "border-border hover:bg-accent hover:text-accent-foreground flex h-52 flex-col gap-6 border-b p-4",
        isSelected && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    >
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-2xl leading-none font-semibold tracking-tight">
          {name}
        </CardTitle>
        <CardDescription>{currencyKey.toUpperCase()}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">R$ {buy.toFixed(2)}</div>
          <div
            className={`flex items-center ${variation > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {variation > 0 ? (
              <ArrowUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="mr-1 h-4 w-4" />
            )}
            {Math.abs(variation).toFixed(2)}%
          </div>
        </div>
        {sell && (
          <div className="text-muted-foreground mt-2 text-sm">
            Sell: R$ {sell.toFixed(2)}
          </div>
        )}
      </CardContent>
    </UICard>
  );
}
