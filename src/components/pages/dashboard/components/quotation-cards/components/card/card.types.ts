export type CardProps = React.ComponentProps<"div"> & {
  name: string;
  isSelected: boolean;
  buy: number;
  sell?: number | null;
  variation: number;
  currencyKey: string;
};
