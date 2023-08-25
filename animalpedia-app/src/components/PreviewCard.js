import React, { useEffect, useState } from 'react'
import axiosRequests from '../api/apiCalls'

const PreviewCard = ({ animalName }) => {
    const [animal, setAnimal] = useState();
    const [taxonomy, setTaxonomy] = useState({});
    const [locations, setLocations] = useState([]);
    const [characteristics, setCharacteristics] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await axiosRequests.getAnimal(animalName)
                .then(res => {
                    setAnimal(res.data.name);
                    setLocations(res.data.locations);
                    setTaxonomy(res.data.taxonomy);
                    setCharacteristics(res.data.characteristics);
                });
        };
        fetchData();
    }, []);


    return (
        <div className="col-md-6">
            <div className="card mb-4 shadow-sm" style={{background: "#dacdbf"}}>            
                <div className="card-body">
                    <strong className="text-success mb-2">{taxonomy.class}</strong>
                    <h3 className="mb-2">
                        <a className="text-dark" href="/">{animal}</a>
                    </h3>
                    <div className="text-muted">{taxonomy.order}</div>
                    <p className="card-text">
                        <strong>Can be found in:</strong>
                        {locations.map((location, index) => (
                            <span key={index}><em> {location}</em></span>
                        ))}
                    </p>
                    <a href="#" className="btn btn-success btn-sm mt-auto">View Animal Card</a>
                </div>
            </div>
        </div>
    )
}

export default PreviewCard