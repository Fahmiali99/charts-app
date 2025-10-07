import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { ChartComponentProps } from "../types/dashboard";

function LinesChartComponent ({ data }: ChartComponentProps) {
    const transformedData = data.map((item: any) => ({year: item.name, population: item.value })).sort((a:any, b: any) => parseInt(a.year) - parseInt(b.year));

    const CustomTooltip: React.FC<any> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                    <p className="font-semibold">{`Tahun: ${payload[0].payload.year}`}</p>
                    <p className="text-blue-600">{`Populasi: ${payload[0].value?.toLocaleString()}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[600px] h-[400px] sm:min-w-full sm:h-[500px] p-2 sm:p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={transformedData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="year" 
                            label={{ value: 'Tahun', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                            tickFormatter={(value: number) => `${(value / 1000000).toFixed(0)}M`}
                            label={{ value: 'Populasi (Juta)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="population"
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            name="Populasi"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default LinesChartComponent;