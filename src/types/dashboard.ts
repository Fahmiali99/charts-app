export interface DataItemProps {
    name: string;
    value: number;
    country: string;
    indicator: string;
    countryCode: string;
}

export interface ChartComponentProps {
    data: any;
    metadata?: any;
}

export interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
}