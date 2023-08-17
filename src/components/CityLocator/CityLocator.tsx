import { ChangeEvent, useState } from "react";
import { City } from "../../interfaces/interfaces";
import Forecast from "../Forecast/Forecats";
import "../../css/cityLocator.css";

const CityLocator = () => {
    const [cityInput, setCityInput] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const baseApi = 'http://api.weatherapi.com/v1';
    const apiKeyTest = '8733ea68108f4d09ba361152231608';

    const fetchCity = async () => {
        try {
            const response = await fetch(`${baseApi}/search.json?key=${apiKeyTest}&q=${cityInput}`);
            const data = await response.json();
            setCityOptions(data);
        } catch (error) {
            console.error("Data not received!", error);
        }
    }

    const handleCitySelect = (city: City) => {
        console.log('city', city)
        setSelectedCity(city);
        setCityInput(city.name);
        setCityOptions([]);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCityInput(e.target.value);
        fetchCity();
    }

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                placeholder="Enter city name"
                value={cityInput}
                onChange={handleInputChange}
            />

            {cityOptions.length > 0 && (
                <>
                    <div className="overlay" onClick={() => setCityOptions([])} />
                    <ul className="dropdown">
                        {cityOptions.map((city: City) => (
                            <li key={city.id} onClick={() => handleCitySelect(city)}>
                                {city.name}, {city.country}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {selectedCity && <Forecast selectedCity={selectedCity} />}
        </div>
    );
};

export default CityLocator;


