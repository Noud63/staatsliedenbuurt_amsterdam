"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { jaar: "2005", "0-18": 1940, "18-64": 9471, "65-79": 563, "80+": 146 },
  { jaar: "2006", "0-18": 1989, "18-64": 9381, "65-79": 574, "80+": 150 },
  { jaar: "2007", "0-18": 1993, "18-64": 9345, "65-79": 606, "80+": 154 },
  { jaar: "2008", "0-18": 1949, "18-64": 9379, "65-79": 616, "80+": 150 },
  { jaar: "2009", "0-18": 1914, "18-64": 9198, "65-79": 615, "80+": 148 },
  { jaar: "2010", "0-18": 1886, "18-64": 9238, "65-79": 640, "80+": 157 },
  { jaar: "2011", "0-18": 1890, "18-64": 9470, "65-79": 663, "80+": 162 },
  { jaar: "2012", "0-18": 1935, "18-64": 9667, "65-79": 723, "80+": 155 },
  { jaar: "2013", "0-18": 1960, "18-64": 9691, "65-79": 774, "80+": 165 },
  { jaar: "2014", "0-18": 1983, "18-64": 9868, "65-79": 825, "80+": 161 },
  { jaar: "2015", "0-18": 1996, "18-64": 10103, "65-79": 883, "80+": 165 },
  { jaar: "2016", "0-18": 1992, "18-64": 10178, "65-79": 930, "80+": 167 },
  { jaar: "2017", "0-18": 1968, "18-64": 10253, "65-79": 966, "80+": 176 },
  { jaar: "2018", "0-18": 1934, "18-64": 10279, "65-79": 1022, "80+": 173 },
  { jaar: "2019", "0-18": 1872, "18-64": 10124, "65-79": 1081, "80+": 172 },
  { jaar: "2020", "0-18": 1834, "18-64": 10058, "65-79": 1132, "80+": 177 },
  { jaar: "2021", "0-18": 1745, "18-64": 9883, "65-79": 1180, "80+": 192 },
  { jaar: "2022", "0-18": 1646, "18-64": 9921, "65-79": 1253, "80+": 192 },
  { jaar: "2023", "0-18": 1544, "18-64": 10003, "65-79": 1296, "80+": 206 },
  { jaar: "2024", "0-18": 1494, "18-64": 10004, "65-79": 1390, "80+": 207 },
];

const chartConfig = {
  "0-18": {
    label: "0-18",
    color: "#713f12",
  },
  "18-64": {
    label: "18-64",
    color: "#a16207",
  },
  "65-79": {
    label: "65-79",
    color: "#ca8a04",
  },
  "80+": {
    label: "80+",
    color: "orange",
  },
}; 

export function Leeftijdscategorieen() {
  return (
    <Card className="mt-4 max-w-full px-4">
      <CardHeader className="mb-4 w-full border-b border-gray-400 px-0 py-4 text-lg text-yellow-900">
        <CardTitle>Leeftijdscategorieën</CardTitle>
        <CardDescription>2005 - 2024</CardDescription>
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
                  dataKey="0-18"
                  stackId="a"
                  fill="#713f12"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="18-64"
                  stackId="a"
                  fill="#a16207"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="65-79"
                  stackId="a"
                  fill="#ca8a04"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="80+"
                  stackId="a"
                  fill="orange"
                  radius={[0, 0, 0, 0]}
                />
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

