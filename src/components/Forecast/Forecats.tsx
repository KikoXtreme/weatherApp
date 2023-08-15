import { useState } from "react";

const Forecast = () => {
    const [dailyForecast, setDailyForecast] = useState('');
    const ApiKey = '8ea69742df988010383677f35d9886b7';
    const lat = '123';
    const lon = '123';
    const part = 'hourlty'

    const foreCast = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${ApiKey}`);
            const data = await response.json();
            setDailyForecast(data);
            console.log('it works');
        } catch (error) {
            console.error("Data not received!", error);
        }
    }
    console.log('dailyForecast', dailyForecast);

    return (
        <div>
            <h1>Weather App</h1>
            <button onClick={foreCast}>
                Click
            </button>
            Forecast
        </div>
    );
};

export default Forecast;