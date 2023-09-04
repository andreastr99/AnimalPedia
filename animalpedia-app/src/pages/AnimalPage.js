import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

import axiosRequests from '../api/apiCalls'


const AnimalPage = () => {
    const { animalId } = useParams();

    const [animal, setAnimal] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosRequests.getAnimalById(animalId)
                    .then(res => {
                        setAnimal(res.data);
                    });

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [animalId])

    return (
        <div>
            <Header />
            {loading ? (

                <div >
                    loading...
                </div>

            ) : (
                <div className='container'>
                    <div className='card'>
                    <h1>{animal.name.common}</h1>
                    <div> name is: {animal.name.common}</div>
                    <img className='rounded-1' src={animal.image} alt={animal.name.common} style={{ maxWidth: "35%" }} />
                </div>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default AnimalPage