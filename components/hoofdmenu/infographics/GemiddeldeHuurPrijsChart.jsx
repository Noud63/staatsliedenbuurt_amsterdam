"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardFooter,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const chartData = [
  { jaar: "2005", huurprijs: 291 },
  { jaar: "2007", huurprijs: 309 },
  { jaar: "2009", huurprijs: 365 },
  { jaar: "2011", huurprijs: 412 },
  { jaar: "2013", huurprijs: 437 },
  { jaar: "2015", huurprijs: 539 },
  { jaar: "2017", huurprijs: 599 },
  { jaar: "2019", huurprijs: 622 },
  { jaar: "2021", huurprijs: 809 },
  { jaar: "2023", huurprijs: 772 },
];

const chartConfig = {
  huurprijs: {
    label: "huurprijs",
    color: "#854d0e",
  },
};

export function GemiddeldeHuurPrijs() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="mt-4 max-w-full px-4">
      <CardHeader className="mb-4 w-full border-b border-gray-400 px-0 py-4 text-lg text-yellow-900">
        <CardTitle>Gemiddelde huurprijs in &euro;</CardTitle>
        <CardDescription>2005 - 2023</CardDescription>
      </CardHeader>
      <CardContent className="-ml-8 pb-0">
        <ChartContainer config={chartConfig}>
          <div className="h-full w-full">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="lightgray"
                  vertical={false}
                />
                <XAxis dataKey="jaar" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                />
                <Bar
                  dataKey="huurprijs"
                  fill="#854d0e"
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
