import React from 'react'

const AnimalCardModal = ({ showModal = false, handleClose, animal, animalImage }) => {
    return (
        <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" id="modalSheet">
            <div className="modal modal-sheet position-static d-block p-4 py-md-5">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header border-bottom-0">
                            <h1 className="modal-title fs-5">{animal.name[0]} <em>{animal.name[1] ? `(${animal.name[1]})` : ""}</em></h1>
                            <button type="button" onClick={handleClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <img className='img-thumbnail' src={animalImage} alt={animal.name} />

                        <div className="m-3 border-bottom border-success">
                            <p><strong>Order:</strong> {animal.order}</p>
                            <p><strong>Class:</strong> {animal.class}</p>
                            <p><strong>Location:</strong>
                                {animal.continent.map((location, index) => (
                                    <span key={index}><em> {location}</em></span>
                                ))}
                            </p>
                        </div>

                        <div className="modal-body py-3">
                            <p>
                                The <em>{animal.name[0]}</em> is a remarkable resident of various geographic regions, where it thrives with a captivating range of characteristics:
                            </p>
                            <ul className="list-unstyled">
                                <li>Distinctive Trait: Recognized for its remarkable and unique attribute.</li>
                                <li><u>Main Threat</u>: Faces its most significant threat from <strong>{animal.characteristics[0].biggest_threat}</strong>.</li>
                                <li><u>Life Expectancy</u>: Typically lives an average of <strong>{animal.characteristics[0].lifespan}</strong>.</li>
                                <li><u>Habitat Explorer</u>: Roams habitats with a weight of <strong>{animal.characteristics[0].weight}</strong>{animal.characteristics[0].length ? (
                                    <span>
                                        and a height of <strong>{animal.characteristics[0].length}</strong>
                                    </span>
                                ) : (
                                    ""
                                )}.</li>
                                <li><u>Reproductive Maturity</u>: Reaches sexual maturity around <strong>{animal.characteristics[0].age_of_sexual_maturity}</strong>.</li>
                                <li><u>Growing Up</u>: Undergoes the weaning process at <strong>{animal.characteristics[0].age_of_weaning}</strong>.</li>
                            </ul>
                            <p>
                                The <em>{animal.name[1] ? `${animal.name[1]} (scientific name)` : animal.name[0]}</em> serves as a remarkable testament to the incredible diversity that the animal kingdom holds.
                            </p>
                        </div>


                        <div className="modal-footer">
                            <button onClick={handleClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimalCardModal