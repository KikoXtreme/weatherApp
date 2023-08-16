import { useEffect, useState } from "react";
import "../../css/forecast.css";

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
        <div className="forecast">
            {dailyForecast ? (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h1>{name}, {country} </h1>
                        <img className="img" src={dailyForecast.current.condition.icon} alt="Condition" />
                    </div>
                    <div className="test"></div>
                    <table style={{ margin: '0 auto' }}>
                        <tbody>
                            <tr>
                                <td>Temperature:</td>
                                <td>{dailyForecast.current.temp_c}&#176;C</td>
                            </tr>
                            <tr>
                                <td>Feelslike:</td>
                                <td>{dailyForecast.current.feelslike_c}&#176;C</td>
                            </tr>
                            <tr>
                                <td>Humidity:</td>
                                <td>{dailyForecast.current.humidity}%</td>
                            </tr>
                            <tr>
                                <td>Clouds:</td>
                                <td>{dailyForecast.current.cloud}%</td>
                            </tr>
                            <tr>
                                <td>Precipitation:</td>
                                <td>{dailyForecast.current.precip_mm}mm</td>
                            </tr>
                            <tr>
                                <td>Wind Direction:</td>
                                <td>{dailyForecast.current.wind_dir}</td>
                            </tr>
                            <tr>
                                <td>Wind Speed:</td>
                                <td>{dailyForecast.current.wind_kph}km/h</td>
                            </tr>
                            <tr>
                                <td>Visability</td>
                                <td>{dailyForecast.current.vis_km}km</td>
                            </tr>
                            <tr>
                                <td>UV Index:</td>
                                <td>{dailyForecast.current.uv}/10</td>
                            </tr>
                            <tr>
                                <td>Condition:</td>
                                <td>{dailyForecast.current.condition.text}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <p>Temperature: {dailyForecast.current.temp_c}&#176;C</p>
                    <p>Feelslike: {dailyForecast.current.feelslike_c}&#176;C</p>
                    <p>Humidity: {dailyForecast.current.humidity}%</p>
                    <p>Clouds: {dailyForecast.current.cloud}%</p>
                    <p>Precipitation: {dailyForecast.current.precip_mm}mm</p>
                    <p>Wind Direction: {dailyForecast.current.wind_dir}</p>
                    <p>Wind Speed: {dailyForecast.current.wind_kph}km/h</p>
                    <p>Visability: {dailyForecast.current.vis_km}km</p>
                    <p>UV Index: {dailyForecast.current.uv}/10</p>
                    <p>Condition: {dailyForecast.current.condition.text}</p> */}
                </>
            ) : (
                <p>Loading forecast data...</p>
            )}
        </div>
    );
};

export default Forecast;