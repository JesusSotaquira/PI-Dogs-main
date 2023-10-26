import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './DogDetail.css';

const DogDetails = ({ dog }) => {

    if (!dog) return <h2>Loading...</h2>;

    const imageUrl = dog.image ? dog.image.url : "https://i1.sndcdn.com/artworks-000195327479-o5f43a-t500x500.jpg";

    return (
        <div className="dog-details">
            <div className="details-container">
                <div className="image-container">
                    <img src={imageUrl} alt={dog.name} />
                </div>
                <div className="info-container">
                    <h2>{dog.name ? dog.name : "Nombre no disponible"}</h2>

                    <p>
                        <strong>Temperamento:</strong>
                        {dog.temperaments && dog.temperaments.length > 0 ? 
                            dog.temperaments.map(t => t.name).join(', ') : 
                            "Temperamento no disponible"}
                    </p>

                    <p><strong>Peso:</strong> {typeof dog.weight === 'object' ? dog.weight.metric : dog.weight || "Peso no disponible"} kg</p>

                    <p><strong>Altura:</strong> {typeof dog.height === 'object' ? dog.height.metric : dog.height || "Altura no disponible"} cm</p>

                    <p>
                        <strong>Orígenes:</strong> 
                        {dog.origin ? dog.origin : "Origen no disponible"}
                    </p>

                    <p>
                        <strong>Expectativa de vida:</strong> 
                        {dog.lifeSpan ? dog.lifeSpan : "Expectativa de vida no disponible"}
                    </p>
                </div>
            </div>
            <div className="footer-container">
                <Link to="/home" className="return-button">Volver a la lista de perros</Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
  
    const dogId = ownProps.match.params.id;
    
    return {
        dog: state.dogs.dogs.find(d => String(d.id) === String(dogId))
    };
}

export default connect(mapStateToProps)(DogDetails);
