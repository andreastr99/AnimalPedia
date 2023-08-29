import React, { useState, useEffect } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import map from '../assets/map.png'

import pin from '../assets/pin.png'
const MapPage = () => {

    const [selectedContinent, setSelectedContinent] = useState('')

    const handleContinentClick = (continent) => {
        setSelectedContinent(prevData => ({ ...prevData, continent }))
    };

    useEffect(() => {
        console.log("Selected Continent:", selectedContinent);
    }, [selectedContinent]);

    return (
        <>
            <Header />
            <div style={{ fontFamily: "Lucida Handwriting" }}>
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <h1 >World Map</h1>
                    <img src={pin} alt='pin' />
                </div>
                <h6 className='d-flex justify-content-center' >Select a continent</h6>
                <div className='d-flex justify-content-center'>
                    <img src={map} alt='world map' useMap='#worldmap' style={{ maxWidth: '100%', height: 'auto' }} />
                    <map name="worldmap">
                        <area onClick={(e) => { e.preventDefault(); handleContinentClick('North America') }} alt="north-america" title="north-america" coords="14,96,71,84,98,94,144,86,154,54,202,24,257,8,302,0,543,6,568,20,552,75,527,103,481,118,449,157,434,212,412,242,382,264,378,309,371,341,325,364,263,376,45,289,1,201,-1,124" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); handleContinentClick('South America') }} alt="south-america" title="south-america" coords="276,394,331,372,358,372,401,375,422,403,449,423,479,442,480,481,472,527,451,565,426,586,411,600,391,627,409,654,407,680,377,687,331,676,323,523,271,436" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); handleContinentClick('Africa') }} alt="africa" title="africa" coords="551,304,585,280,617,270,638,274,665,285,680,291,710,291,723,304,731,332,740,354,754,367,760,380,783,382,794,393,791,422,819,535,800,551,745,581,704,595,665,588,543,414,523,356" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); handleContinentClick('Oceania') }} alt="oceania" title="oceania" coords="978,480,1053,425,1134,428,1196,452,1273,484,1277,677,1050,681,974,558" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); handleContinentClick('Europe') }} alt="europe" title="europe" coords="515,114,595,53,663,17,729,24,758,69,780,170,779,248,748,282,689,284,655,274,609,267,572,280" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); handleContinentClick('Asia') }} alt="asia" title="asia" coords="755,15,1266,5,1275,382,1249,455,1129,407,1097,413,1051,419,1018,448,993,452,974,467,933,472,814,392,792,372,769,376,747,350,740,316,747,293,782,252,786,169" shape="poly" style={{ cursor: 'pointer' }} />
                    </map>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MapPage