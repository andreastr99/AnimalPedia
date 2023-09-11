import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//components
import AnimalCardModal from '../components/AnimalCardModal';

import axiosRequests from '../api/apiCalls';

const PreviewCard = ({ animalName = null, favouriteAnimal = null }) => {

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const [animal, setAnimal] = useState({});

    const [loading, setLoading] = useState(true);

    const [link, setLink] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosRequests.getAPIAnimal(animalName)
                    .then(res => {
                        setAnimal(res.data);
                    });

                await axiosRequests.getImage(animalName)
                    .then(res => {
                        setLink(res.data)
                    })
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (animalName) {
            fetchData();
        }
    }, [animalName]);

    // Effect to update animal state when favouriteAnimal changes
    useEffect(() => {
        if (favouriteAnimal) {
            setAnimal(favouriteAnimal);
            setLoading(false); // Mark loading as complete
        }
    }, [favouriteAnimal]);
    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm" style={{ background: "#f2f1eb" }}>
                {loading ? (
                    <div className="card-body d-flex flex-column align-items-start" >
                        loading...
                    </div>
                ) : (
                    <>
                        <div className='container pr-1 pt-1'>
                            <div className="row " style={{ height: "150px" }}>
                                <div className='col mt-1'>
                                    <strong className="d-inline-block mb-1" style={{ color: "#00704A" }}>{animal.class}</strong>
                                    <h4 className="mb-0">
                                        <u className="text-dark">{animalName ? animal.name[0] : animal.name.common}</u>
                                    </h4>
                                    <div className="text-muted">{animalName ? animal.order : "order"}</div>
                                    <p className="card-text mb-auto"><strong>Can be found in: </strong>
                                        {animalName ? (
                                            animal.continent.map((continent, index) => (
                                                <span key={index}><em> {continent}</em></span>
                                            ))
                                        ) : (
                                            animal.continent
                                        )}
                                    </p>
                                </div>
                                <div className='col'>
                                    <img className='img-thumbnail float-right p-0' src={animalName ? link : animal.image} alt={animalName ? animal.name : animal.name.common} style={animalName ? { maxHeight: "180px" } : { maxHeight: "150px" }} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col align-self-end mb-2'>
                                    {animalName ? (
                                        <>
                                            <button onClick={handleShowModal} className="btn btn-success btn-sm mt-auto">View Animal Card</button>
                                            <AnimalCardModal showModal={showModal} handleClose={handleCloseModal} animalImage={`${link}`} animal={animal} />
                                        </>
                                    ) : (
                                        <button className="btn btn-success btn-sm mt-auto">
                                            <Link to={`/animal/${animal._id}`} style={{ textDecoration: "none", color: "white" }}> View Animal Card</Link>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default PreviewCard