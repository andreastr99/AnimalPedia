import React, { useEffect, useState } from 'react'
import axiosRequests from '../api/animals'

const PreviewCard = ({animalName}) => {
    const [animal, setAnimal] = useState();
    const [taxonomy, setTaxonomy] = useState({});
    const [locations, setLocations] = useState({});
    const [characteristics, setCharacteristics] = useState({});

    useEffect(() => {
        console.log("name", animalName)
        const fetchData = async () => {
            await axiosRequests.getAnimal(animalName)
                .then(res => {
                    setAnimal(res.data.name);
                    setTaxonomy(res.data.taxonomy);
                    setCharacteristics(res.data.characteristics);
                });
        };
        fetchData();
    }, []);
    

    return (
        <div className="col-md-6">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                     <strong className="d-inline-block mb-2 text-success">{taxonomy.class}</strong>
                    <h3 className="mb-0">
                        <a className="text-dark" href="/">{animal}</a>
                    </h3>
                    <div className="mb-1 text-muted">{taxonomy.order}</div>
                    <p className="card-text mb-auto">{characteristics.most_distinctive_feature}</p>
                    <a href="#">Continue reading</a>
                </div>
                {/* <img className="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Card image cap" /> */}
            </div>
        </div>
    )
}

export default PreviewCard