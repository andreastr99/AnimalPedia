import React, { useEffect, useState } from 'react';
import { FaWind, FaTint, FaTemperatureLow, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

import axiosRequests from '../api/apiCalls';

const WeatherWidget = ({ city }) => {
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchWeather = async (location) => {
        try {
            const response = await axiosRequests.getForecast(location);
            setWeather(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (success) => {
                    const { latitude, longitude } = success.coords;
                    const coords = latitude + ',' + longitude;
                    fetchWeather(coords);
                },
                (error) => {
                    console.log('Unable to retrieve your location. Using city instead.');
                    // Fallback to using the city if geolocation fails
                    fetchWeather(city);
                }
            );
        } else {
            console.log('Geolocation not supported. Using city instead.');
            // Fallback to using the city if geolocation is not supported
            fetchWeather(city);
        }
    }, [city]);

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="card bg-body-tertiary" style={{ color: '#4B515D' }}>
                    <div className="card-body p-4">
                        {loading ? (
                            <div>loading...</div>
                        ) : (
                            <>
                                <div className="d-flex">
                                    <p className="flex-grow-1">
                                        {weather.name} <FaMapMarkerAlt />
                                    </p>
                                    <p>
                                        {weather.localtime} <FaClock />
                                    </p>
                                </div>

                                <div className="d-flex flex-column text-center mt-2 mb-2">
                                    <p className="display-4 mb-0" style={{ color: '#1C2331' }}>
                                        {weather.temp_c}°C{' '}
                                    </p>
                                    <span className="small">{weather.text}</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                                        <div>
                                            <FaWind /> <span className="ms-1">{weather.wind_kph} km/h</span>
                                        </div>
                                        <div>
                                            <FaTint /> <span className="ms-1">{weather.humidity}%</span>
                                        </div>
                                        <div>
                                            <FaTemperatureLow />{' '}
                                            <span className="ms-1">{weather.feelslike_c}°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={`https:${weather.icon}`} alt="weather-icon" />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
