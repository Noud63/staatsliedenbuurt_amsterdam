"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { jaar: "2011", "0-40": 1780, "40-60": 3111, "60-80": 1355, "80-100": 819, "100+": 330 },
  { jaar: "2012", "0-40": 1765, "40-60": 3067, "60-80": 1367, "80-100": 826 , "100+": 336},
  { jaar: "2013", "0-40": 1721, "40-60": 3099, "60-80": 1447, "80-100": 937 , "100+": 392},
  { jaar: "2014", "0-40": 1586, "40-60": 3131, "60-80": 1469, "80-100": 987 , "100+": 411},
  { jaar: "2015", "0-40": 1573, "40-60": 3122, "60-80": 1551, "80-100": 1064 , "100+": 449},
  { jaar: "2016", "0-40": 1587, "40-60": 3118, "60-80": 1553, "80-100": 1073 , "100+": 454},
  { jaar: "2017", "0-40": 1551, "40-60": 3097, "60-80": 1565, "80-100": 1093 , "100+": 458},
  { jaar: "2018", "0-40": 1540, "40-60": 3092, "60-80": 1571, "80-100": 1104 , "100+": 460},
  { jaar: "2019", "0-40": 1538, "40-60": 3088, "60-80": 1600, "80-100": 1081 , "100+": 473},
  { jaar: "2020", "0-40": 1517, "40-60": 3072, "60-80": 1598, "80-100": 1114, "100+": 484},
  { jaar: "2021", "0-40": 1505, "40-60": 3073, "60-80": 1603, "80-100": 1127 , "100+": 491},
  { jaar: "2022", "0-40": 1504, "40-60": 3083, "60-80": 1614, "80-100": 1131, "100+": 500},
  { jaar: "2023", "0-40": 1659, "40-60": 3103, "60-80": 1612, "80-100": 1132 , "100+": 502},
  { jaar: "2024", "0-40": 1656, "40-60": 3096, "60-80": 1614, "80-100": 1136 , "100+": 506},
];

const chartConfig = {
  "0-40": {
    label: "0-40",
    color: "#713f12",
  },
  "40-60": {
    label: "40-60",
    color: "#a16207",
  },
  "60-80": {
    label: "60-80",
    color: "#ca8a04",
  },
  "80-100": {
    label: "80-100",
    color: "orange",
  },
  "100+": {
    label: "100+",
    color: "yellow",
  },
};

export function Woonoppervlak() {
  return (
    <Card className="mt-4 max-w-full px-4">
      <CardHeader className="mb-4 w-full border-b border-gray-400 px-0 py-4 text-lg text-yellow-900">
        <CardTitle>Verdeling woonoppervlak in m<sup>2</sup></CardTitle>
        <CardDescription>2011 - 2024</CardDescription>
      </CardHeader>
      <CardContent className="px-2 pb-0">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid
              stroke="lightgray"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="jaar"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(2)}
            />

            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} className="p-1" />
            <Bar
              dataKey="0-40"
              stackId="a"
              fill="#713f12"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="40-60"
              stackId="a"
              fill="#a16207"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="60-80"
              stackId="a"
              fill="#ca8a04"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="80-100"
              stackId="a"
              fill="orange"
              radius={[0, 0, 0, 0]}
            />
            <Bar dataKey="100+" stackId="a" fill="red" radius={[0, 0, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-start border-t border-black pl-0 pt-4 text-sm">
        <div className="text-gray-500">
          Bron: onderzoek & statistiek Gemeente Amsterdam
        </div>
      </CardFooter>
    </Card>
  );
}
