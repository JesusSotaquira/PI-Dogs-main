import React, { useEffect, useState } from 'react'; 
import { connect } from 'react-redux';     
import DogCard from '../DogCard/DogCard'; 
import { getDogs } from '../../redux/actions/dogsActions'; 
import './Home.css';

// Función para obtener todos los temperamentos distintos de la lista de perros.
const getAllTemperaments = (dogs) => {
    let allTemps = [];
    dogs.forEach(dog => {
        if (dog.temperament) {
            allTemps = allTemps.concat(dog.temperament.split(', '));
        }
    });
    return [...new Set(allTemps)];
};

const Home = ({ getDogs, dogs }) => { 
     // Estados locales para gestionar la lógica y UI de este componente.
    const [searchValue, setSearchValue] = useState('');
    const [filteredDogs, setFilteredDogs] = useState([]);
    const [temperamentFilter, setTemperamentFilter] = useState('');
    const [temperaments, setTemperaments] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8; 
    const [originFilter, setOriginFilter] = useState('');  

    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    // Paginación determina qué perros mostrar en la página actual.
    const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog);

    // Funciones para manejar la navegación entre páginas.
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
    
    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredDogs.length / dogsPerPage)) setCurrentPage(currentPage + 1);
    }

    // useEffect para obtener la lista de perros cuando el componente se monta.
    useEffect(() => {
        getDogs(); 
    }, [getDogs]);

     //useEffect actualiza la lista filtrada de perros y los temperamentos disponibles.
    useEffect(() => {
        setFilteredDogs(dogs);
        setTemperaments(getAllTemperaments(dogs));
    }, [dogs]);

    // Función que maneja la lógica de búsqueda, filtrado y ordenación.
    const handleSearch = () => {
        let results = dogs;
        
        if (searchValue) {
            results = results.filter(dog => 
                dog.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
        
        if (temperamentFilter) {
            results = results.filter(dog =>
                dog.temperament && dog.temperament.toLowerCase().includes(temperamentFilter.toLowerCase())
            );//cambios aca por si acaso 
            
        }if (originFilter) {
            if (originFilter === 'api') {
                results = results.filter(dog => typeof dog.id === "number");
            } else if (originFilter === 'db') {
                results = results.filter(dog => typeof dog.id === "string");
            }
        }
        
        
    
        // ordenamiento:
        const sortedDogs = [...results].sort((a, b) => {
            switch (sortCriteria) {
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'name_desc':
                    return b.name.localeCompare(a.name);
                case 'weight_asc':
                    const weightA = a.weight && a.weight.metric && a.weight.metric.split('-')[0] ? parseInt(a.weight.metric.split('-')[0]) : 0;
                    const weightB = b.weight && b.weight.metric && b.weight.metric.split('-')[0] ? parseInt(b.weight.metric.split('-')[0]) : 0;
                    return weightA - weightB;
                case 'weight_desc':
                    const weightA_desc = a.weight && a.weight.metric && a.weight.metric.split('-')[0] ? parseInt(a.weight.metric.split('-')[0]) : 0;
                    const weightB_desc = b.weight && b.weight.metric && b.weight.metric.split('-')[0] ? parseInt(b.weight.metric.split('-')[0]) : 0;
                    return weightB_desc - weightA_desc;
                default:
                    return 0;
            }
        });
        
        
        setFilteredDogs(sortedDogs);
    };

    // Componente renderizado.
    return (
        <div className="home-container">
            <h2 className="welcome-heading">¡BIENVENIDO!</h2>
    
            <div className="search-and-filters">
                <input  
                    type="text" 
                    placeholder="buscar una raza"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
    
                <select value={temperamentFilter} onChange={(e) => setTemperamentFilter(e.target.value)}>
                    <option value="">temperamento</option>
                    {temperaments.map(temp => <option key={temp} value={temp}>{temp}</option>)}
                </select>
    
                <select value={originFilter} onChange={(e) => setOriginFilter(e.target.value)}>
                    <option value="">origen</option>
                    <option value="api">Desde la API</option>
                    <option value="db">Desde la Database</option>
                </select>
    
                <select 
                    value={sortCriteria} 
                    onChange={(e) => setSortCriteria(e.target.value)}
                >
                    <option value="">Ordenar por</option>
                    <option value="name_asc">Name A-Z</option>
                    <option value="name_desc">Name Z-A</option>
                    <option value="weight_asc">peso min-max</option>
                    <option value="weight_desc">peso max-min</option>
                </select>
            </div>
    
            <div className="dogs-display">
                {currentDogs.map(dog => <DogCard key={dog.id} dog={dog} />)}
            </div>
    
            <div className="pagination-buttons">
                <button className="prev-next-button" onClick={handlePrevPage}>Previous</button>
                <button className="prev-next-button" onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
}

// Mapea el estado de Redux al props del componente.
const mapStateToProps = state => ({
    dogs: state.dogs.dogs,
});

// Mapea las acciones de Redux al props del componente.
const mapDispatchToProps = {
    getDogs
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);