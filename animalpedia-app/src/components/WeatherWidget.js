import React, { useEffect, useState } from 'react'
import { FaWind, FaTint, FaTemperatureLow } from 'react-icons/fa';

import axiosRequests from '../api/apiCalls'



const WeatherWidget = ({ city }) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await axiosRequests.getForecast(city)
                .then(res => {
                    setWeather(res.data);
                });
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="card" style={{ color: "#4B515D", borderRadius: "35px" }}>
                    <div className="card-body p-4">

                        <div className="d-flex">
                            <h6 className="flex-grow-1">{weather.name}</h6>
                            <h6>{weather.localtime}</h6>
                        </div>

                        <div className="d-flex flex-column text-center mt-2 mb-2">
                            <h6 className="display-4 mb-0 font-weight-bold" style={{ color: "#1C2331" }}>{weather.temp_c}°C </h6>
                            <span className="small" style={{ color: "#868B94" }}>{weather.text}</span>
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
                                <img src={`https:${weather.icon}`} alt='weather icon' />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default WeatherWidget