import React, { useEffect, useState } from 'react'

//components
import Header from '../components/Header'
import Footer from '../components/Footer'
import PreviewCard from '../components/PreviewCard'

import axiosRequests from '../api/apiCalls'

const FavoritesPage = () => {

    const [favourites, setFavourites] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosRequests.getFavourites()
                    .then(res => {                       
                        setFavourites(res.data);
                    });

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <div className='container my-5' style={{minHeight: "73vh"}}>
                {loading ? (
                    <div className="card-body d-flex flex-column align-items-start" >
                        loading...
                    </div>
                ) : (
                    <div className='row'>
                        {favourites.map((favouriteAnimal, index) => (
                            <PreviewCard key={index} favouriteAnimal={favouriteAnimal} />
                        ))}                     
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default FavoritesPage