

import { useState } from 'react';
import { useWeatherStore } from './store';
import { MdWaves } from "react-icons/md";
import { BsWind } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";



const Weather = () => {
    const [city, setCity] = useState('');
    const { weather, setWeather } = useWeatherStore();

    const fetchWeatherData = async (cityName) => {
        const apiKey = '735e253b61cdf1ec17a74a861a12f8cb';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            alert('Could not find the city. Please try again.');
            return;
        }

        const data = await response.json();
        setWeather(data);
    };

    const handleSearch = () => {
        fetchWeatherData(city);
    };

    return (
        <div className=" flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-black text-white">
            <div className="top mb-5 flex items-center">
                <input 
                    type="text" 
                    placeholder="Enter city name" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    className="border border-gray-300 p-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <button 
                    onClick={handleSearch} 
                    className="bg-blue-600 text- h-11 w-11 flex justify-center ml-3 items-center p-2 rounded-full hover:bg-blue-800"
                >
                    <FaSearch />

                </button>
            </div>

            {weather && (
                <div id="weather-info" className="w-96 text-center">
                    <div className="details bg-gray-700 p-5 rounded-lg shadow-lg">
                        <div className="pic mb-4">
                            <img 
                                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
                                alt={weather.weather[0].description} 
                                className="w-24 h-24 mx-auto"
                            />
                        </div>
                        <p className="text-xl mb-2">{weather.weather[0].description}</p>
                        <h2 className="temperature text-5xl font-bold mb-2">{weather.main.temp}°C</h2>
                        <h3 className="city text-2xl font-semibold mb-2">{weather.name}</h3>
                    </div>

                    <div className="more-details mt-4 flex justify-around p-4 bg-gray-800 rounded-lg shadow-md">
                        <div className="humidity text-center flex flex-col items-center">
                            <p className="text-2xl font-bold text-center"><MdWaves /> </p>
                            <p className="text-lg font-semibold"> {weather.main.humidity}%</p>
                            <p className="text-lg">Humidity</p>
                        </div>

                        <div className="wind text-center flex flex-col items-center">
                            <p className="text-2xl font-bold "><BsWind /></p>
                            <p className="text-xl font-semibold "> 
                            {weather.wind.speed} km/h</p>
                            <p className="text-lg">Wind Speed</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
