import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import map from '../assets/map.png'

const MapPage = () => {
    return (
        <div className='text-center'>
            <Header />
            <img className='container m-3' src={map}/>
            <Footer />
        </div>
    )
}

export default MapPage