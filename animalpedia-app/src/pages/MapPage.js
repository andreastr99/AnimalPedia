import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

import axiosRequests from '../api/apiCalls'

import map from '../assets/images/wmap.png'
import pin from '../assets/icons/pin.png'

import africa from '../assets/icons/Africa.png'
import asia from '../assets/icons/asia.png'
import oceania from '../assets/icons/australia.png'
import europe from '../assets/icons/europe.png'
import northAmerica from '../assets/icons/north-america.png'
import southAmerica from '../assets/icons/south-america.png'
import antartica from '../assets/icons/antartica.png'

import { RxHeartFilled } from 'react-icons/rx';
import { RxHeart } from 'react-icons/rx';

const continentIcons = {
    Africa: africa,
    Asia: asia,
    Oceania: oceania,
    Europe: europe,
    'North America': northAmerica,
    'South America': southAmerica,
    Antartica: antartica
};

const MapPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    
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

        setAnimal(prevData =>
            prevData.map(animal => {
                if (animal._id === animalId) {
                    // If this is the animal to update, create a new object with the updated like value.
                    return {
                        ...animal,
                        favourite: updatedLike,
                    };
                } else {
                    // For other animals, leave them unchanged.
                    return animal;
                }
            })
        );
    }


    const [animal, setAnimal] = useState({});
    const [selectedContinent, setSelectedContinent] = useState('')

    const imageSrc = continentIcons[selectedContinent];

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosRequests.getAllAnimals()
                    .then(res => {
                        setAnimal(res.data);
                    });

            } catch (error) {
                console.error(error)
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div style={{height: "82vh"}}>
                <div className='d-flex justify-content-center align-items-center mt-4 mb-3'>
                    <h1 style={{ fontFamily: "Lucida Handwriting" }} >World Map</h1>
                    <img src={pin} alt='pin' />
                </div>
                <h6 className='d-flex justify-content-center' >Select a continent</h6>

                <div>
                    {/* <div className="modal" tabIndex="-1" role="dialog" id="myModal"> */}
                    <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">{selectedContinent}</h4>
                                    <img src={imageSrc} alt={selectedContinent} />
                                    <button onClick={handleCloseModal} type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    {animal.length > 0 ? (
                                        animal
                                            .filter((animal) => animal.continent === selectedContinent)
                                            .map((animal) => (
                                                <div className='d-flex rounded-1 m-2 p-2 align-items-center' key={animal._id} style={{ background: "#C1E1C1" }}>
                                                    <div><img className='rounded-1' src={animal.image} alt={animal.name.common} style={{ maxHeight: "100px" }} /></div>
                                                    <Link onClick={handleCloseModal} to={`/animal/${animal._id}`} className='pl-3 text-dark' style={{ textDecoration: "none" }}><em> {animal.name.common}</em></Link>
                                                    <div className='ml-auto'>
                                                        <button name='like' onClick={(e) => handleAnimalLike(animal._id, animal.favourite)} style={{ fontSize: '2.5rem', background: 'none', border: 'none' }}>
                                                            {animal.favourite ? <RxHeartFilled className="text-danger" /> : <RxHeart className="text-secondary" />}
                                                        </button>
                                                    </div>
                                                </div>

                                            ))) : (
                                        <div className='text-center'>
                                            <p>Loading...</p>
                                            <p>It'll just take a moment.</p>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button onClick={handleCloseModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center mt-3'>
                    <img src={map} alt='world map' useMap='#worldmap' style={{ maxWidth: '100%', height: 'auto' }} />
                    <map name="worldmap">
                        <area onClick={(e) => { e.preventDefault(); setSelectedContinent('North America'); handleShowModal() }} alt="North America" title="North America" coords="140,90,124,95,92,105,70,110,45,106,60,97,72,75,88,73,167,27,220,37,258,36,281,23,328,5,375,3,437,0,475,1,570,0,581,6,566,23,514,59,489,68,473,77,452,89,425,102,423,132,321,200,356,253,299,272,280,307,256,298,217,272,184,250,148,130" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); setSelectedContinent('South America'); handleShowModal() }} alt="South America" title="South America" coords="270,328,293,298,307,277,334,272,353,276,374,292,408,313,423,330,462,348,456,375,443,421,429,438,408,478,395,504,388,520,407,542,401,560,380,564,359,564,327,497" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); setSelectedContinent('Africa'); handleShowModal() }} alt="Africa" title="Africa" coords="538,188,522,217,513,260,516,287,540,314,568,323,590,323,606,339,615,369,622,396,624,434,635,473,665,484,760,443,782,382,764,350,771,280,744,285,728,256,715,217,690,190,642,183,602,172" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); setSelectedContinent('Oceania'); handleShowModal() }} alt="Oceania" title="Oceania" coords="1013,405,1031,390,1054,371,1070,364,1072,344,1072,321,1092,317,1117,330,1151,332,1199,355,1262,366,1278,398,1239,516,1153,552,1027,504,984,468,981,416" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); setSelectedContinent('Asia'); handleShowModal() }} alt="Asia" title="Asia" coords="706,148,687,161,690,177,701,197,721,222,728,243,735,261,751,274,769,270,794,254,816,240,834,238,839,268,855,295,914,340,975,365,1033,378,1065,356,1065,322,1074,272,1124,173,1183,127,1214,82,1190,30,1070,14,871,-1,807,17,785,91,782,127,780,152,780,179,751,184" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); setSelectedContinent('Antartica'); handleShowModal() }} alt="Antartica" title="Antartica" coords="247,665,223,659,200,651,201,639,220,630,255,627,288,620,331,614,379,610,413,587,440,588,444,605,459,625,490,627,525,617,670,592,746,592,846,588,921,587,990,589,1045,604,1057,639,1028,666" shape="poly" style={{ cursor: 'pointer' }} />
                        <area onClick={(e) => { e.preventDefault(); setSelectedContinent('Europe'); handleShowModal() }} alt="Europe" title="Europe" coords="550,45,520,66,536,133,547,181,572,176,599,165,626,174,649,179,685,185,685,167,690,152,703,140,721,152,735,165,751,176,767,174,776,167,778,131,780,102,785,72,792,54,801,7,724,-2,604,2" shape="poly" style={{ cursor: 'pointer' }} />
                    </map>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MapPage