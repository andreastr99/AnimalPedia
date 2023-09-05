import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

import axiosRequests from '../api/apiCalls'

//icons
import youtube from '../assets/icons/youtube.png'
import { RxHeartFilled } from 'react-icons/rx';
import { RxHeart } from 'react-icons/rx';
import back from '../assets/icons/back.png'

//images
import northAmerica from '../assets/images/north-america.png'
import southAmerica from '../assets/images/south-america.png'
import europe from '../assets/images/europe.png'
import africa from '../assets/images/africa.png'
import oceania from '../assets/images/oceania.png'
import asia from '../assets/images/asia.png'
import antartica from '../assets/images/antartica.png'


const continentImages = {
    Africa: africa,
    Asia: asia,
    Oceania: oceania,
    Europe: europe,
    'North America': northAmerica,
    'South America': southAmerica,
    Antartica: antartica
};

const AnimalPage = () => {
    const { animalId } = useParams();

    const [animal, setAnimal] = useState('')
    const [loading, setLoading] = useState(true);
    const [selectedContinent, setSelectedContinent] = useState('');

    const imageSrc = continentImages[selectedContinent];

    const handleAnimalLike = (animalId, like) => {
        const updatedLike = !like;

        const updateLike = async () => {
            try {
                await axiosRequests.setLike(animalId, updatedLike)
                    .then(res => {
                        console.log(res.data.message);
                    });

            } catch (error) {
                console.error(error)
            }
        };

        updateLike();

        setAnimal((prevData) => ({ ...prevData, favourite: updatedLike }));
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosRequests.getAnimalById(animalId)
                    .then(res => {
                        setAnimal(res.data);
                        setSelectedContinent(res.data.continent);
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
                <div className='container custom-wide-container'>
                    <div className='card shadow my-5 bg-light'>
                        <div className="row">
                            <Link to="/map" className="col-md-4">
                                <img className="p-3" src={back} alt="back arrow" />
                            </Link>
                            <div className="col-md-4 mt-3"> {/* This div pushes the image to the start */}
                                <h1 className="text-center">{animal.name.common}</h1> {/* This h1 is centered */}
                            </div>
                        </div>

                        <hr />
                        <div className='row m-3'>
                            <div className='col-md-6'>
                                <img className='rounded-1 img-fluid' src={animal.image} alt={animal.name.common} />
                            </div>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <h3>Taxonomy</h3>
                                        <ul>
                                            <li>Scientific name: <em>{animal.name.scientific}</em></li>
                                            <li>kingdom: Animalia</li>
                                            <li>phylum: Chordata</li>
                                            <li>class: Mammalia</li>
                                            <li>order: Carnivora</li>
                                            <li>family: Procyonidae</li>
                                        </ul>
                                    </div>

                                    <div className='col-md-6 card' style={{ background: "none", border: "none" }}> <img src={imageSrc} /></div>

                                </div>
                            </div>
                        </div>
                        <div className='row m-3'>
                            <div className='col'>
                                {animal.details}
                            </div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-center mb-3'>
                            <a href={animal.youtube} target="_blank">
                                <img src={youtube} alt='youtube icon' />
                            </a>
                            <button onClick={() => handleAnimalLike(animal._id, animal.favourite)} style={{ background: 'none', border: 'none' }}>
                                {animal.favourite ? <RxHeartFilled className="text-danger" style={{ fontSize: '3rem' }} /> : <RxHeart className="text-secondary" style={{ fontSize: '3rem' }} />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default AnimalPage