import { cn } from "@/lib/utils";
import { useDataChart } from "./hooks/useDataChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DataChartProps } from "./data-chart.types";

export function DataChart({ className, ...props }: DataChartProps) {
  const { chartData, currentAssetName, hasData } = useDataChart();

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Price evolution- {currentAssetName}</CardTitle>
          <CardDescription>Graph of asset price evolution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    tickFormatter={(value: string) => value}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tickFormatter={(value: string) => value.toLocaleString()}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      value.toLocaleString(),
                      "Valor",
                    ]}
                    labelFormatter={(label) => `Hora: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Valor"
                    isAnimationActive={true}
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">
                  No data available to display the chart
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
