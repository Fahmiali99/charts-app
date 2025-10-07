import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { useDashboard } from "./lib/dashboard";
import PieChartComponent from "./components/piechart";
import { Form, Input, Segmented, Spin } from "antd";
import LinesChartComponent from "./components/lineschart";
import { setStartDate, setEndDate } from "./store/dashboard";

function Home() {
    const dispatch = useDispatch();
    const population = useSelector((state: RootState) => state.population);
    const { listCountry } = useDashboard();
    
    const [localStartDate, setLocalStartDate] = useState<string>(population.startDate);
    const [localEndDate, setLocalEndDate] = useState<string>(population.endDate);
    const [activeKey, setActiveKey] = useState<string>("pie-chart");

    useEffect(() => {
        setLocalStartDate(population.startDate);
        setLocalEndDate(population.endDate);
    }, [population.startDate, population.endDate]);

    useEffect(() => {
        if (population.startDate && population.endDate) {
            listCountry();
        }
    }, [population.startDate, population.endDate]);

    const handleStartDateChange = (e: any) => {
        const value = e.target.value;
        setLocalStartDate(value);
        if (value.trim() !== "") {
            dispatch(setStartDate(value));
        }
    };

    const handleEndDateChange = (e: any) => {
        const value = e.target.value;
        setLocalEndDate(value);
        if (value.trim() !== "") {
            dispatch(setEndDate(value));
        }
    };

    const handleStartDateBlur = () => {
        if (localStartDate.trim() === "") {
            setLocalStartDate(population.startDate);
        }
    };

    const handleEndDateBlur = () => {
        if (localEndDate.trim() === "") {
            setLocalEndDate(population.endDate);
        }
    };

    const countryData = population?.population;
    const hasData = countryData && Array.isArray(countryData) && countryData.length >= 2;
    
    let data: any[] = [];
    let tabs: any[] = [];

    if (hasData) {
        const rawData = countryData[1];
        data = rawData.map((item: any) => ({
            name: item.date,
            value: Number(item.value),
            country: item.country.value,
            indicator: item.indicator.value,
            countryCode: item.countryiso3code,
        }));

        tabs = [
            { label: "Pie Chart", value: "pie-chart", content: <PieChartComponent data={data} /> },
            { label: "Line Chart", value: "line-chart", content: <LinesChartComponent data={data}/> },
        ];
    } else {
        tabs = [
            { label: "Pie Chart", value: "pie-chart" },
            { label: "Line Chart", value: "line-chart" },
        ];
    }

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center bg-white space-y-6 px-6 py-20">
            <div className="mb-6 text-center">
                <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                    {data[0]?.country} Population
                </h1>
                <p className="text-gray-600">
                    Years {data[data.length - 1]?.name} – {data[0]?.name}
                </p>
            </div>
            <div className="w-full md:w-5/12 lg:w-3/12">
                <Segmented
                    value={activeKey}
                    onChange={(val) => setActiveKey(val as string)}
                    options={tabs.map((tab) => ({ label: tab.label, value: tab.value }))}
                    block
                />
            </div>

            <div className="max-w-4xl w-full rounded-2xl shadow-2xl bg-white p-6 text-center text-gray-700">
                <div className="flex justify-center">
                    <Form layout="vertical" className="flex gap-2">
                        <Form.Item layout="vertical" label="Start Date">
                            <Input 
                                value={localStartDate} 
                                onChange={handleStartDateChange}
                                onBlur={handleStartDateBlur}
                                placeholder="ex. 2012" 
                                type="number" 
                            />
                        </Form.Item>
                        <Form.Item layout="vertical" label="End Date">
                            <Input 
                                value={localEndDate} 
                                onChange={handleEndDateChange}
                                onBlur={handleEndDateBlur}
                                placeholder="ex. 2018" 
                                type="number" 
                            />
                        </Form.Item>
                    </Form>
                </div>
                
                {hasData ? (
                    tabs.find((tab) => tab.value === activeKey)?.content
                ) : (
                    <div className="py-20"><Spin size="large" /></div>
                )}
            </div>
        </div>
    );
}

export default Home;