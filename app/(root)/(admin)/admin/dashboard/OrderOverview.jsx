"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,

} from "@/components/ui/chart"

export const description = "A bar chart"

const chartData = [
    { month: "January", amount: 186 },
    { month: "February", amount: 305 },
    { month: "March", amount: 23 },
    { month: "April", amount: 73 },
    { month: "May", amount: 29 },
    { month: "June", amount: 4 },
    { month: "July", amount: 245 },
    { month: "August", amount: 23 },
    { month: "September", amount: 26 },
    { month: "October", amount: 6 },
    { month: "November", amount: 212 },
    { month: "December", amount: 242 },
]

const chartConfig = {
    amount: {
        label: "Amount",
        color: "#141414",
    },
}

export function OrderOverview() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])
    return (
        <div>

            <ChartContainer className='aspect-[16/7]' config={chartConfig}  >
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={true}
                        content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="amount" fill="#141414" radius={5} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
