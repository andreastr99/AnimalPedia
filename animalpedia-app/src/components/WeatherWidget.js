import React, { useEffect, useState } from 'react'
import { FaWind, FaTint, FaTemperatureLow, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

import axiosRequests from '../api/apiCalls';

const WeatherWidget = ({ city }) => {
    const [weather, setWeather] = useState({});

    const [loading, setLoading] = useState(true);

    const getUsersLocation = (callback) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((success, error) => {
                if (error) {
                    console.log("Unable to retrieve your location");
                } else {
                    const latitude = success.coords.latitude;
                    const longitude = success.coords.longitude;
                    callback({ latitude, longitude });
                }
            });
        } else {
            console.log("Geolocation not supported");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                getUsersLocation(async (coordinates) => {
                    const { latitude, longitude } = coordinates;
                    const coords = coordinates ? latitude + "," + longitude : city;
                    await axiosRequests.getForecast(coords)
                        .then(res => {
                            setWeather(res.data);
                        });
                });
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [city]);

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="card bg-body-tertiary" style={{ color: "#4B515D" }}>
                    <div className="card-body p-4">
                        {loading ? (
                            <div >
                                loading...
                            </div>
                        ) : (
                            <>
                                <div className="d-flex">
                                    <p className="flex-grow-1"> {weather.name}  <FaMapMarkerAlt /></p>
                                    <p>{weather.localtime} <FaClock /></p>
                                </div>

                                <div className="d-flex flex-column text-center mt-2 mb-2">
                                    <p className="display-4 mb-0" style={{ color: "#1C2331" }}>{weather.temp_c}°C </p>
                                    <span className="small" >{weather.text}</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                                        <div>
                                            <FaWind /> <span className="ms-1">{weather.wind_kph} km/h</span>
                                        </div>
                                        <div>
                                            <FaTint /> <span className="ms-1">{weather.humidity}%</span>
                                        </div>
                                        <div>
                                            <FaTemperatureLow /> <span className="ms-1">{weather.feelslike_c}°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={`https:${weather.icon}`} alt='weather-icon' />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default WeatherWidget