import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { CustomTooltipProps, DataItemProps, ChartComponentProps } from "../types/dashboard";

const RADIAN = Math.PI / 180;
const COLORS = ["#93c5fd", "#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a"];

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    name,
}: any) => {
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#1a1a1a"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            style={{ fontSize: "14px", fontWeight: 500 }}
        >
            {name}
        </text>
    );
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-start">
                <p className="mb-1 font-semibold text-gray-800">{data.country} - {data.name}</p>
                <p className="my-1 text-sm text-gray-700">
                    <span className="font-medium">Population:</span> {data.value.toLocaleString()}
                </p>
                <p className="my-1 text-xs text-blue-600">{data.indicator}</p>
                <p className="my-1 text-xs text-blue-600">Code: {data.countryCode}</p>
            </div>
        );
    }
    return null;
};

function PieChartComponent({ data, metadata }: ChartComponentProps) {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-600 mt-10">No data available</p>;
    }

    return (
        <div className="w-full flex flex-col items-center justify-center p-4 sm:p-8">
            <div className="w-full overflow-x-auto">
                <div className="min-w-[400px] h-[400px] sm:min-w-full sm:h-[500px]">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                stroke="none"
                                labelLine={{ stroke: "#1a1a1a", strokeWidth: 1 }}
                                label={renderCustomizedLabel}
                            >
                                {data.map((_: DataItemProps, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend 
                                formatter={(value) => (
                                    <span className="text-gray-800 text-xs sm:text-sm">{value}</span>
                                )}
                                wrapperStyle={{ fontSize: '12px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {metadata?.lastupdated && (
                <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
                    <p>Data source: World Bank API</p>
                    <p>Last updated: {metadata.lastupdated}</p>
                </div>
            )}
        </div>
    );
}

export default PieChartComponent;