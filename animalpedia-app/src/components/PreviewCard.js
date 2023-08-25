import React, { useEffect, useState } from 'react'
import axiosRequests from '../api/apiCalls'


const PreviewCard = ({ animalName }) => {
    const [animal, setAnimal] = useState();
    const [taxonomy, setTaxonomy] = useState({});
    const [locations, setLocations] = useState([]);
    const [characteristics, setCharacteristics] = useState({});

    const [link, setLink] = useState();
    useEffect(() => {
        const fetchData = async () => {
            await axiosRequests.getAnimal(animalName)
                .then(res => {
                    setAnimal(res.data.name);
                    setLocations(res.data.locations);
                    setTaxonomy(res.data.taxonomy);
                    setCharacteristics(res.data.characteristics);
                });

            await axiosRequests.getImage(animalName)
                .then(res => {
                    setLink(res.data)
                })
        };
        fetchData();
    }, []);


    return (
        <div className="col-md-4">
            <div className="card flex-md-row mb-4 bshadow-sm h-md-250" style={{ background: "#dacdbf" }}>
                <div className="card-body d-flex flex-column align-items-start">
                    <strong className="d-inline-block text-success mb-2">{taxonomy.class}</strong>
                    <h4 className="mb-0">
                        <a className="text-dark" href="/">{animal}</a>
                    </h4>
                    <div className="text-muted">{taxonomy.order}</div>
                    <p className="card-text mb-auto"><strong>Can be found in:</strong>
                        {locations.map((location, index) => (
                            <span key={index}><em> {location}</em></span>
                        ))}
                    </p>
                    <a href="/" className="btn btn-success btn-sm mt-auto">View Animal Card</a>
                </div>
                <img className='card' src={`${link}`} alt='weather icon' style={{ height: "200px" }} />
            </div>
        </div>
    )
}

export default PreviewCard