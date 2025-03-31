import { useDashboardContext } from "@/contexts/dashboard-context";
import type { QuotationCardsProps } from "./quotation-cards.types";
import { cn } from "@/lib/utils";
import { useQuotationCard } from "./hooks/use-quotation-card";
import { Card } from "./components/card";

export function QuotationCards({ className, ...props }: QuotationCardsProps) {
  const { data, isLoading, isError } = useQuotationCard();

  return (
    <section
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      {!isLoading &&
        !isError &&
        data?.map((currency) => (
          <Card
            key={currency.name}
            currencyKey={currency.key}
            name={currency.name}
            buy={currency.buy ?? 0}
            sell={currency.sell}
            variation={currency.variation}
            isSelected={false}
          />
        ))}
    </section>
  );
}
