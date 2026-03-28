"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart for flights";

export const chartData = [
  { date: "2024-04-01", departures: 12, arrivals: 10 },
  { date: "2024-04-02", departures: 8, arrivals: 15 },
  { date: "2024-04-03", departures: 14, arrivals: 12 },
  { date: "2024-04-04", departures: 18, arrivals: 20 },
  { date: "2024-04-05", departures: 22, arrivals: 25 },
  { date: "2024-04-06", departures: 20, arrivals: 28 },
  { date: "2024-04-07", departures: 16, arrivals: 18 },
  { date: "2024-04-08", departures: 25, arrivals: 22 },
  { date: "2024-04-09", departures: 5, arrivals: 8 },
  { date: "2024-04-10", departures: 19, arrivals: 15 },
  { date: "2024-04-11", departures: 21, arrivals: 23 },
  { date: "2024-04-12", departures: 17, arrivals: 16 },
  { date: "2024-04-13", departures: 24, arrivals: 26 },
  { date: "2024-04-14", departures: 10, arrivals: 18 },
  { date: "2024-04-15", departures: 9, arrivals: 14 },
  { date: "2024-04-16", departures: 11, arrivals: 15 },
  { date: "2024-04-17", departures: 28, arrivals: 30 },
  { date: "2024-04-18", departures: 26, arrivals: 32 },
  { date: "2024-04-19", departures: 15, arrivals: 14 },
  { date: "2024-04-20", departures: 7, arrivals: 12 },
  { date: "2024-04-21", departures: 10, arrivals: 16 },
  { date: "2024-04-22", departures: 18, arrivals: 14 },
  { date: "2024-04-23", departures: 11, arrivals: 19 },
  { date: "2024-04-24", departures: 27, arrivals: 24 },
  { date: "2024-04-25", departures: 16, arrivals: 20 },
  { date: "2024-04-26", departures: 6, arrivals: 10 },
  { date: "2024-04-27", departures: 29, arrivals: 35 },
  { date: "2024-04-28", departures: 9, arrivals: 15 },
  { date: "2024-04-29", departures: 23, arrivals: 19 },
  { date: "2024-04-30", departures: 31, arrivals: 28 },
];

const chartConfig = {
  departures: {
    label: "Departures",
    color: "hsl(var(--chart-1))",
  },
  arrivals: {
    label: "Arrivals",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractiveFlight() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-04-30");
    let daysToSubtract = 30;
    if (timeRange === "7d") {
      daysToSubtract = 7;
    } else if (timeRange === "90d") {
      daysToSubtract = 90;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Flight Activity</CardTitle>
          <CardDescription>
            Showing departures and arrivals over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 90 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDepartures" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-departures)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-departures)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillArrivals" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-arrivals)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-arrivals)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="arrivals"
              type="natural"
              fill="url(#fillArrivals)"
              fillOpacity={0.4}
              stroke="var(--color-arrivals)"
              stackId="a"
            />
            <Area
              dataKey="departures"
              type="natural"
              fill="url(#fillDepartures)"
              fillOpacity={0.4}
              stroke="var(--color-departures)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}