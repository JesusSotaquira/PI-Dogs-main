import React from 'react';
import { Link } from 'react-router-dom';
import './DogCard.css';


//antes de la tragedia x4
const DogCard = ({ dog }) => {
    // Si dog.image es null o undefined, usamos la URL por defecto.
    const imageUrl = dog.image ? dog.image.url : "https://i1.sndcdn.com/artworks-000195327479-o5f43a-t500x500.jpg";

    // Determinar el temperamento
    let temperamentDisplay = "No especificado";
    if (dog.temperaments && dog.temperaments.length > 0) {
        // Manejar el caso de perros creados 
        temperamentDisplay = dog.temperaments.map(temp => temp.name).join(', ');
    } else if (dog.temperament) {
        // Manejar el caso de perros de la API
        temperamentDisplay = dog.temperament;
    }

    // Determinar el peso
    let weightDisplay = "No especificado";
    if (dog.weight) {
        weightDisplay = dog.weight.metric || (typeof dog.weight === 'string' ? dog.weight : "No especificado");
    }

     // Componente renderizado.
     return (
        <Link to={`/dog/${dog.id}`} className="dog-card-link">
            <div className="dog-card-container">
                <div className="dog-card">
                    <img src={imageUrl} className="dog-card-img" alt={dog.name} />
                    <div className="dog-card-content">
                        <h5 className="dog-card-title">{dog.name}</h5>
                        <p className="dog-card-text">
                            <strong>Temperamento:</strong> {temperamentDisplay}
                        </p>
                        <p className="dog-card-text">
                            <strong>Peso:</strong> {weightDisplay} kg
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default DogCard;
