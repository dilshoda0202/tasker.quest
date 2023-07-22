import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import styles from 'src/app/WeatherWidget.module.css';

const WeatherWidget = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('San Diego');
    const [suggestions, setSuggestions] = useState([]);
    const API_KEY = '8376b81f04b21fb3c8cc35d74bf471af';

    useEffect(() => {
        fetchWeatherData();

        // Update weather data every 10 minutes (600000 milliseconds)
        const interval = setInterval(fetchWeatherData, 600000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        // Fetch weather data whenever the city changes
        fetchWeatherData();
    }, [city]);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }
    };

    const handleCityChange = (event, { newValue }) => {
        setCity(newValue);
    };

    const handleSuggestionsFetchRequested = ({ value }) => {
        // Fetch city suggestions based on the user input
        const API_ENDPOINT = `https://api.teleport.org/api/cities/?search=${value}`;
        axios
            .get(API_ENDPOINT)
            .then((response) => {
                const cities = response.data._embedded['city:search-results'];
                const suggestions = cities.map((cityData) => {
                    const cityName = cityData.matching_full_name;
                    return cityName;
                });
                setSuggestions(suggestions);
            })
            .catch((error) => {
                console.log('Error fetching city suggestions:', error);
            });
    };

    const handleSuggestionsClearRequested = () => {
        // Clear suggestions when the input is empty
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => {
        return suggestion;
    };

    const renderSuggestion = (suggestion) => {
        return <span>{suggestion}</span>;
    };

    const inputProps = {
        placeholder: 'Enter city name',
        value: city,
        onChange: handleCityChange,
    };

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    // Convert Celsius to Fahrenheit with one decimal place
    const celsiusToFahrenheit = (celsius) => {
        return (celsius * 9) / 5 + 32;
    };


    return (
        <div className={styles.weatherCard}>
            <div className={styles.weatherWidget}>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={handleSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />

                {/* Display the weather information here */}
                <h2 className={styles.weatherHeading}>Weather for {weatherData.name}</h2>
                <img
                    className={styles.weatherIcon}
                    src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                    alt={weatherData.weather[0].description}
                />
                <p className={styles.weatherDescription}>{weatherData.weather[0].description}</p>
                <p className={styles.weatherTemp}>
                    Temperature: {celsiusToFahrenheit(weatherData.main.temp).toFixed(1)} °F
                </p>
                <p className={styles.weatherInfo}>Humidity: {weatherData.main.humidity} %</p>
            </div>
        </div>
    );
};

export default WeatherWidget;
