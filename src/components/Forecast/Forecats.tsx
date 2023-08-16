import { useCallback, useEffect, useState } from "react";
import "../../css/forecast.css";
import "../../css/spinner.css";

const Forecast = ({ selectedCity }: any) => {
    const { name, country, lat, lon } = selectedCity;
    const [dailyForecast, setDailyForecast] = useState<any>();

    const baseAPiJson = 'http://api.weatherapi.com/v1/current.json'
    const apiKeyTest = '8733ea68108f4d09ba361152231608';

    const fetchForecast = useCallback(async () => {
        try {
            const response = await fetch(`${baseAPiJson}?key=${apiKeyTest}&q=${lat},${lon}&aqi=no`);
            const data = await response.json();
            setDailyForecast(data);
        } catch (error) {
            console.error("Data not received!", error);
        }
    }, [apiKeyTest, lat, lon]);

    console.log('dailyForecast', dailyForecast);

    useEffect(() => {
        if (selectedCity) {
            fetchForecast();
        }
    }, [selectedCity, fetchForecast]);

    return (
        <div className="forecast">
            {dailyForecast ? (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h1>{name}, {country} </h1>
                        <img className="img" src={dailyForecast.current.condition.icon} alt="Condition" />
                    </div>
                    <div className="divider"></div>
                    <table >
                        <tbody>
                            <tr>
                                <td>Temperature:</td>
                                <td>{dailyForecast.current.temp_c}&#176;C</td>
                                <td><i className="fa-solid fa-temperature-low"></i></td>
                            </tr>
                            <tr>
                                <td>Feelslike:</td>
                                <td>{dailyForecast.current.feelslike_c}&#176;C</td>
                                <td><i className="fa-solid fa-temperature-three-quarters"></i></td>
                            </tr>
                            <tr>
                                <td>Wind Speed:</td>
                                <td>{dailyForecast.current.wind_kph}km/h</td>
                                <td><i className="fa-solid fa-wind"></i></td>
                            </tr>
                            <tr>
                                <td>Wind Direction:</td>
                                <td>{dailyForecast.current.wind_dir}</td>
                                <td><i className="fa-solid fa-location-arrow"></i></td>
                            </tr>
                            <tr>
                                <td>Humidity:</td>
                                <td>{dailyForecast.current.humidity}%</td>
                                <td><i className="fa-solid fa-smog"></i></td>
                            </tr>
                            <tr>
                                <td>Clouds:</td>
                                <td>{dailyForecast.current.cloud}%</td>
                                <td><i className="fa-solid fa-cloud"></i></td>
                            </tr>
                            <tr>
                                <td>Precipitation:</td>
                                <td>{dailyForecast.current.precip_mm}mm</td>
                                <td><i className="fa-solid fa-cloud-showers-water"></i></td>
                            </tr>
                            <tr>
                                <td>Visability</td>
                                <td>{dailyForecast.current.vis_km}km</td>
                                <td><i className="fa-solid fa-binoculars"></i></td>
                            </tr>
                            <tr>
                                <td>UV Index:</td>
                                <td>{dailyForecast.current.uv}/10</td>
                                <td><i className="fa-solid fa-u"></i><i className="fa-solid fa-v"></i></td>
                            </tr>
                            <tr>
                                <td>Condition:</td>
                                <td>{dailyForecast.current.condition.text}</td>
                                <td><i className="fa-solid fa-cloud-sun-rain"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <div className="spinner"></div>
                    <div>Loading forecast data...</div>
                </>
            )}
        </div>
    );
};

export default Forecast;