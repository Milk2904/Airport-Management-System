"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

export const chartData = [
  { date: "2024-04-01", inboundPassengers: 222, outboundPassengers: 150 },
  { date: "2024-04-02", inboundPassengers: 97, outboundPassengers: 180 },
  { date: "2024-04-03", inboundPassengers: 167, outboundPassengers: 120 },
  { date: "2024-04-04", inboundPassengers: 242, outboundPassengers: 260 },
  { date: "2024-04-05", inboundPassengers: 373, outboundPassengers: 290 },
  { date: "2024-04-06", inboundPassengers: 301, outboundPassengers: 340 },
  { date: "2024-04-07", inboundPassengers: 245, outboundPassengers: 180 },
  { date: "2024-04-08", inboundPassengers: 409, outboundPassengers: 320 },
  { date: "2024-04-09", inboundPassengers: 59, outboundPassengers: 110 },
  { date: "2024-04-10", inboundPassengers: 261, outboundPassengers: 190 },
  { date: "2024-04-11", inboundPassengers: 327, outboundPassengers: 350 },
  { date: "2024-04-12", inboundPassengers: 292, outboundPassengers: 210 },
  { date: "2024-04-13", inboundPassengers: 342, outboundPassengers: 380 },
  { date: "2024-04-14", inboundPassengers: 137, outboundPassengers: 220 },
  { date: "2024-04-15", inboundPassengers: 120, outboundPassengers: 170 },
  { date: "2024-04-16", inboundPassengers: 138, outboundPassengers: 190 },
  { date: "2024-04-17", inboundPassengers: 446, outboundPassengers: 360 },
  { date: "2024-04-18", inboundPassengers: 364, outboundPassengers: 410 },
  { date: "2024-04-19", inboundPassengers: 243, outboundPassengers: 180 },
  { date: "2024-04-20", inboundPassengers: 89, outboundPassengers: 150 },
  { date: "2024-04-21", inboundPassengers: 137, outboundPassengers: 200 },
  { date: "2024-04-22", inboundPassengers: 224, outboundPassengers: 170 },
  { date: "2024-04-23", inboundPassengers: 138, outboundPassengers: 230 },
  { date: "2024-04-24", inboundPassengers: 387, outboundPassengers: 290 },
  { date: "2024-04-25", inboundPassengers: 215, outboundPassengers: 250 },
  { date: "2024-04-26", inboundPassengers: 75, outboundPassengers: 130 },
  { date: "2024-04-27", inboundPassengers: 383, outboundPassengers: 420 },
  { date: "2024-04-28", inboundPassengers: 122, outboundPassengers: 180 },
  { date: "2024-04-29", inboundPassengers: 315, outboundPassengers: 240 },
  { date: "2024-04-30", inboundPassengers: 454, outboundPassengers: 380 },
  { date: "2024-05-01", inboundPassengers: 165, outboundPassengers: 220 },
  { date: "2024-05-02", inboundPassengers: 293, outboundPassengers: 310 },
  { date: "2024-05-03", inboundPassengers: 247, outboundPassengers: 190 },
  { date: "2024-05-04", inboundPassengers: 385, outboundPassengers: 420 },
  { date: "2024-05-05", inboundPassengers: 481, outboundPassengers: 390 },
  { date: "2024-05-06", inboundPassengers: 498, outboundPassengers: 520 },
  { date: "2024-05-07", inboundPassengers: 388, outboundPassengers: 300 },
  { date: "2024-05-08", inboundPassengers: 149, outboundPassengers: 210 },
  { date: "2024-05-09", inboundPassengers: 227, outboundPassengers: 180 },
  { date: "2024-05-10", inboundPassengers: 293, outboundPassengers: 330 },
  { date: "2024-05-11", inboundPassengers: 335, outboundPassengers: 270 },
  { date: "2024-05-12", inboundPassengers: 197, outboundPassengers: 240 },
  { date: "2024-05-13", inboundPassengers: 197, outboundPassengers: 160 },
  { date: "2024-05-14", inboundPassengers: 448, outboundPassengers: 490 },
  { date: "2024-05-15", inboundPassengers: 473, outboundPassengers: 380 },
  { date: "2024-05-16", inboundPassengers: 338, outboundPassengers: 400 },
  { date: "2024-05-17", inboundPassengers: 499, outboundPassengers: 420 },
  { date: "2024-05-18", inboundPassengers: 315, outboundPassengers: 350 },
  { date: "2024-05-19", inboundPassengers: 235, outboundPassengers: 180 },
  { date: "2024-05-20", inboundPassengers: 177, outboundPassengers: 230 },
  { date: "2024-05-21", inboundPassengers: 82, outboundPassengers: 140 },
  { date: "2024-05-22", inboundPassengers: 81, outboundPassengers: 120 },
  { date: "2024-05-23", inboundPassengers: 252, outboundPassengers: 290 },
  { date: "2024-05-24", inboundPassengers: 294, outboundPassengers: 220 },
  { date: "2024-05-25", inboundPassengers: 201, outboundPassengers: 250 },
  { date: "2024-05-26", inboundPassengers: 213, outboundPassengers: 170 },
  { date: "2024-05-27", inboundPassengers: 420, outboundPassengers: 460 },
  { date: "2024-05-28", inboundPassengers: 233, outboundPassengers: 190 },
  { date: "2024-05-29", inboundPassengers: 78, outboundPassengers: 130 },
  { date: "2024-05-30", inboundPassengers: 340, outboundPassengers: 280 },
  { date: "2024-05-31", inboundPassengers: 178, outboundPassengers: 230 },
  { date: "2024-06-01", inboundPassengers: 178, outboundPassengers: 200 },
  { date: "2024-06-02", inboundPassengers: 470, outboundPassengers: 410 },
  { date: "2024-06-03", inboundPassengers: 103, outboundPassengers: 160 },
  { date: "2024-06-04", inboundPassengers: 439, outboundPassengers: 380 },
  { date: "2024-06-05", inboundPassengers: 88, outboundPassengers: 140 },
  { date: "2024-06-06", inboundPassengers: 294, outboundPassengers: 250 },
  { date: "2024-06-07", inboundPassengers: 323, outboundPassengers: 370 },
  { date: "2024-06-08", inboundPassengers: 385, outboundPassengers: 320 },
  { date: "2024-06-09", inboundPassengers: 438, outboundPassengers: 480 },
  { date: "2024-06-10", inboundPassengers: 155, outboundPassengers: 200 },
  { date: "2024-06-11", inboundPassengers: 92, outboundPassengers: 150 },
  { date: "2024-06-12", inboundPassengers: 492, outboundPassengers: 420 },
  { date: "2024-06-13", inboundPassengers: 81, outboundPassengers: 130 },
  { date: "2024-06-14", inboundPassengers: 426, outboundPassengers: 380 },
  { date: "2024-06-15", inboundPassengers: 307, outboundPassengers: 350 },
  { date: "2024-06-16", inboundPassengers: 371, outboundPassengers: 310 },
  { date: "2024-06-17", inboundPassengers: 475, outboundPassengers: 520 },
  { date: "2024-06-18", inboundPassengers: 107, outboundPassengers: 170 },
  { date: "2024-06-19", inboundPassengers: 341, outboundPassengers: 290 },
  { date: "2024-06-20", inboundPassengers: 408, outboundPassengers: 450 },
  { date: "2024-06-21", inboundPassengers: 169, outboundPassengers: 210 },
  { date: "2024-06-22", inboundPassengers: 317, outboundPassengers: 270 },
  { date: "2024-06-23", inboundPassengers: 480, outboundPassengers: 530 },
  { date: "2024-06-24", inboundPassengers: 132, outboundPassengers: 180 },
  { date: "2024-06-25", inboundPassengers: 141, outboundPassengers: 190 },
  { date: "2024-06-26", inboundPassengers: 434, outboundPassengers: 380 },
  { date: "2024-06-27", inboundPassengers: 448, outboundPassengers: 490 },
  { date: "2024-06-28", inboundPassengers: 149, outboundPassengers: 200 },
  { date: "2024-06-29", inboundPassengers: 103, outboundPassengers: 160 },
  { date: "2024-06-30", inboundPassengers: 446, outboundPassengers: 400 },
];

const chartConfig = {
  inbound: {
    label: "Inbound",
    color: "var(--primary)",
  },
  outbound: {
    label: "Outbound",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillInbound" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOutbound" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
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
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="inboundPassengers"
              type="natural"
              fill="url(#fillInbound)"
              stroke="var(--color-inbound)"
              stackId="a"
            />

            <Area
              dataKey="outboundPassengers"
              type="natural"
              fill="url(#fillOutbound)"
              stroke="var(--color-outbound)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
