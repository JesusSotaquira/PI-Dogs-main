import React, { useState } from 'react';
import axios from 'axios';
import { validateDog } from '../../validations/validateDog'; 
import './DogForm.css';


const DogForm = () => {
    // Definición del estado local para cada campo del formulario
    const [name, setName] = useState('');
    const [heightMin, setHeightMin] = useState('');
    const [heightMax, setHeightMax] = useState('');
    const [weightMin, setWeightMin] = useState('');
    const [weightMax, setWeightMax] = useState('');
    const [lifeSpan, setLifeSpan] = useState('');
    const [temperamentInput, setTemperamentInput] = useState('');
    // Estado para manejar errores de validación
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

         // Agrupando los datos ingresados por el usuario en un objeto
        const dogData = {
            name,
            height: `${heightMin} - ${heightMax}`,
            weight: `${weightMin} - ${weightMax}`,
            lifeSpan,
            temperaments: temperamentInput.split(',').map(temp => temp.trim())
        };

         // Validar datos antes de enviarlos
        const validationErrors = validateDog(dogData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        // Enviar datos al servidor
        try {
            const response = await axios.post('http://localhost:3001/dogs', dogData);
            
            if (response.data) {
                alert("¡Perro agregado exitosamente!");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data}`);
            } else {
                alert("Se produjo un error al agregar el perro.");
            }
        }
    };

    return (
        <div className="dog-form-container">
            <h2>Crear una nueva raza de perro</h2>
            <form onSubmit={handleSubmit} className="dog-form">

                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>

                <div>
                    <label>Altura (min-max):</label>
                    <input 
                        type="text"
                        value={heightMin}
                        placeholder="min"
                        onChange={(e) => setHeightMin(e.target.value)}
                    />
                    -
                    <input 
                        type="text"
                        value={heightMax}
                        placeholder="max"
                        onChange={(e) => setHeightMax(e.target.value)}
                    />
                    {errors.height && <p style={{ color: 'red' }}>{errors.height}</p>}
                </div>

                <div>
                    <label>Peso (min-max):</label>
                    <input 
                        type="text"
                        value={weightMin}
                        placeholder="min"
                        onChange={(e) => setWeightMin(e.target.value)}
                    />
                    -
                    <input 
                        type="text"
                        value={weightMax}
                        placeholder="max"
                        onChange={(e) => setWeightMax(e.target.value)}
                    />
                    {errors.weight && <p style={{ color: 'red' }}>{errors.weight}</p>}
                </div>

                <div>
                    <label>Años de vida:</label>
                    <input 
                        type="text"
                        value={lifeSpan}
                        onChange={(e) => setLifeSpan(e.target.value)}
                    />
                    {errors.lifeSpan && <p style={{ color: 'red' }}>{errors.lifeSpan}</p>}
                </div>

                <div>
                    <label>Temperamentos :</label>
                    <input 
                        type="text"
                        value={temperamentInput}
                        placeholder="Ejemplo: Juguetón, Amable, Protector"
                        onChange={(e) => setTemperamentInput(e.target.value)}
                    />
                    {errors.temperaments && <p style={{ color: 'red' }}>{errors.temperaments}</p>}
                </div>

                <button className="dog-form-submit-button" type="submit">Añadir perro</button>

            </form>
        </div>
    );
}

export default DogForm;
