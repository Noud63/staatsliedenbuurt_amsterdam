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
  { jaar: "2002", inkomen: 22030 },
  { jaar: "2005", inkomen: 21900 },
  { jaar: "2006", inkomen: 23300 },
  { jaar: "2007", inkomen: 24900 },
  { jaar: "2008", inkomen: 26100 },
  { jaar: "2009", inkomen: 26900 },
  { jaar: "2010", inkomen: 26900 },
  { jaar: "2011", inkomen: 29200 },
  { jaar: "2012", inkomen: 29300 },
  { jaar: "2013", inkomen: 30100 },
  { jaar: "2014", inkomen: 32000 },
  { jaar: "2015", inkomen: 33100 },
  { jaar: "2016", inkomen: 34600 },
  { jaar: "2017", inkomen: 35900 },
  { jaar: "2018", inkomen: 37100 },
  { jaar: "2019", inkomen: 38900 },
  { jaar: "2020", inkomen: 40700 },
  { jaar: "2021", inkomen: 43900 }
];

const chartConfig = {
  inwoners: {
    label: "Inkomen",
    color: "#854d0e",
  },
};

export function Inkomensverschillen() {
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
        <CardTitle>Gemiddeld besteedbaar inkomen in &euro;</CardTitle>
        <CardDescription>2002 - 2021</CardDescription>
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
                <Bar dataKey="inkomen" fill="#854d0e" radius={[0, 0, 0, 0]} />
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
