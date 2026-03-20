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
  { jaar: "2010", eenpersoonshuishoudens: 64.2 },
  { jaar: "2011", eenpersoonshuishoudens: 63.3 },
  { jaar: "2012", eenpersoonshuishoudens: 63.7 },
  { jaar: "2013", eenpersoonshuishoudens: 62.6 },
  { jaar: "2014", eenpersoonshuishoudens: 61.9 },
  { jaar: "2015", eenpersoonshuishoudens: 60.9 },
  { jaar: "2016", eenpersoonshuishoudens: 60.2 },
  { jaar: "2017", eenpersoonshuishoudens: 60.2 },
  { jaar: "2018", eenpersoonshuishoudens: 59.9 },
  { jaar: "2019", eenpersoonshuishoudens: 59.5 },
  { jaar: "2020", eenpersoonshuishoudens: 59.5 },
  { jaar: "2021", eenpersoonshuishoudens: 59.5 },
  { jaar: "2022", eenpersoonshuishoudens: 61.5 },
  { jaar: "2023", eenpersoonshuishoudens: 61.6 },
  { jaar: "2024", eenpersoonshuishoudens: 61.7 }
];

const chartConfig = {
  eenpersoonshuishoudens: {
    label: "Eenpersoonshuishoudens",
    color: "#854d0e",
  },
};

export function EenpersoonsHuishoudens() {
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
        <CardTitle>Eenpersoonshuishoudens in %</CardTitle>
        <CardDescription>2010 - 2024</CardDescription>
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
                  dataKey="eenpersoonshuishoudens"
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
