import React from 'react'
import { FaWind, FaTint, FaSun } from 'react-icons/fa';
import sun from '../assets/sun.png'
const WeatherWidget = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="">

                    <div className="card" style={{ color: "#4B515D", borderRadius: "35px" }}>
                        <div className="card-body p-4">

                            <div className="d-flex">
                                <h6 className="flex-grow-1">Warsaw</h6>
                                <h6>15:07</h6>
                            </div>

                            <div className="d-flex flex-column text-center mt-2 mb-2">
                                <h6 className="display-4 mb-0 font-weight-bold" style={{ color: "#1C2331" }}> 13°C </h6>
                                <span className="small" style={{ color: "#868B94" }}>Stormy</span>
                            </div>

                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                                    <div>
                                        <FaWind /> <span className="ms-1">40 km/h</span>
                                    </div>
                                    <div>
                                        <FaTint /> <span className="ms-1">84%</span>
                                    </div>
                                    <div>
                                        <FaSun /> <span className="ms-1">0.2h</span>
                                    </div>
                                </div>
                                <div>
                                    <img src={sun} />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default WeatherWidget