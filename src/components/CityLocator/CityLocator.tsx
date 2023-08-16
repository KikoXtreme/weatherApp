import { useState } from "react";
import Forecast from "../Forecast/Forecats";
import "../../css/cityLocator.css";

const CityLocator = () => {
    const [cityInput, setCityInput] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState<any>(null);

    const baseAPiJson = 'http://api.weatherapi.com/v1';
    const apiKeyTest = '8733ea68108f4d09ba361152231608';

    const fetchCity = async () => {
        try {
            const response = await fetch(`${baseAPiJson}/search.json?key=${apiKeyTest}&q=${cityInput}`);
            const data = await response.json();
            setCityOptions(data);
        } catch (error) {
            console.error("Data not received!", error);
        }
    }

    const handleCitySelect = (city: any) => {
        console.log('city', city)
        setSelectedCity(city);
        setCityInput(city.name); // Set the input to the selected city name
        setCityOptions([]); // Clear the dropdown options
    }

    const handleInputChange = (e: any) => {
        setCityInput(e.target.value);
        fetchCity();
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter city name"
                value={cityInput}
                onChange={handleInputChange}
            />

            {cityOptions.length > 0 && (
                <ul className="dropdown">
                    {cityOptions.map((city: any) => (
                        <li key={city.id} onClick={() => handleCitySelect(city)}>
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}

            {selectedCity && <Forecast selectedCity={selectedCity} />}
        </div>
    );
};

export default CityLocator;


