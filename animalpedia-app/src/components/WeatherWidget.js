import React, { useEffect, useState } from 'react'
import { FaWind, FaTint, FaTemperatureLow } from 'react-icons/fa';

import axiosRequests from '../api/apiCalls'



const WeatherWidget = ({ city }) => {
    const [weather, setWeather] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosRequests.getForecast(city)
                    .then(res => {
                        setWeather(res.data);
                    });
            } catch (error) {
                console.error(error)
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="card bg-body-tertiary" style={{ color: "#4B515D", borderRadius: "35px"}}>
                    <div className="card-body p-4">
                        {loading ? (
                            <div >
                                loading...
                            </div>
                        ) : (
                            <>
                                <div className="d-flex">
                                    <p className="flex-grow-1">{weather.name}</p>
                                    <p>{weather.localtime}</p>
                                </div>

                                <div className="d-flex flex-column text-center mt-2 mb-2">
                                    <p className="display-4 mb-0 font-weight-bold" style={{ color: "#1C2331" }}>{weather.temp_c}°C </p>
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