import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { COUNTRY_API_ENDPOINT } from "../config/urlApi";
import { setPopulation } from "../store/dashboard";
import type { RootState } from "../store";

export const useDashboard = () => {
    const dispatch = useDispatch();
    const population = useSelector((state: RootState) => state.population);

    const listCountry = async () => {
        try {
            const response = await axios.get(`${COUNTRY_API_ENDPOINT}?date=${population.startDate}:${population.endDate}&format=json`, {
                headers: { "Content-Type": "application/json" },
            });
            dispatch(setPopulation(response.data));
        } catch (error) {
            console.error("Failed to fetch population data:", error);
        }
    }

    return { listCountry };
}