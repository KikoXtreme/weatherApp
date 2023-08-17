import { ChangeEvent, useState } from "react";
import { City } from "../../interfaces/interfaces";
import Forecast from "../Forecast/Forecats";
import "../../css/cityLocator.css";
import { apiUtils } from "../../utils/apiUtils";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CityLocator = () => {
    const [cityInput, setCityInput] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const fetchCity = async () => {
        try {
            const response = await fetch(`${apiUtils.baseApi}/search.json?key=${apiUtils.apiKeyTest}&q=${cityInput}`);
            const data = await response.json();
            setCityOptions(data);
        } catch (error) {
            console.error("Data not received", error);
            toast.error('City not found, data not received!');
        }
    }

    const handleCitySelect = (city: City) => {
        setSelectedCity(city);
        setCityInput('');
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


