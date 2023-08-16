import { useEffect, useState } from "react";

const Forecast = ({ selectedCity }: any) => {
    const { name, country, lat, lon } = selectedCity;
    const [dailyForecast, setDailyForecast] = useState<any>();

    const baseAPiJson = 'http://api.weatherapi.com/v1/current.json'
    const apiKeyTest = '8733ea68108f4d09ba361152231608';

    const fetchForecast = async () => {
        try {
            const response = await fetch(`${baseAPiJson}?key=${apiKeyTest}&q=${lat},${lon}&aqi=no`);

            const data = await response.json();
            setDailyForecast(data);
            console.log('it works')
        } catch (error) {
            console.error("Data not received!", error);
        }
    }

    console.log('dailyForecast', dailyForecast);

    useEffect(() => {
        if (selectedCity) {
            fetchForecast();
        }
    }, [selectedCity]);

    return (
        <div>
            {dailyForecast ? (
                <>
                    <h1>{name}, {country}</h1>
                    <p>Temperature: {dailyForecast.current.temp_c}C</p>
                    <p>Feelslike temp: {dailyForecast.current.feelslike_c}C</p>
                    <p>Humidity: {dailyForecast.current.humidity}%</p>
                    <p>Wind Direction: {dailyForecast.current.wind_dir}</p>
                    <p>Wind Speed: {dailyForecast.current.wind_kph}km/h</p>
                    <p>Visability: {dailyForecast.current.vis_km}km</p>
                    <p>UV: {dailyForecast.current.uv}</p>
                    <p>Condition: {dailyForecast.current.condition.text}</p>
                    <img src={dailyForecast.current.condition.icon} alt="Condition"></img>

                </>
            ) : (
                <p>Loading forecast data...</p>
            )}
        </div>
    );
};

export default Forecast;