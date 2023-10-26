
const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const router = Router();

// Importando las validaciones 
const {validarName, validarDogId} = require ('../validations/dogsValidations')
const {validarPost} = require ('../validations/postValidation')

// Ruta para obtener perros
router.get('/', validarName, async (req, res) => {
    const name = req.query.name;
    
    // Obteniendo todos los perros de la API externa.
    const dogsFromApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`);
    
   
    if (name) {
       
    } else {
        // Si no se pasa un nombre, devolvemos todos los perros.
        const allDogsFromDb = await Dog.findAll({
            include: Temperament
        });
        const adaptedDogsFromApi = dogsFromApi.data.map(dog => ({
            ...dog,
            lifeSpan: dog.life_span,
            temperaments: dog.temperament ? dog.temperament.split(', ').map(temp => ({ name: temp })) : []
        }));
        return res.json([...allDogsFromDb, ...adaptedDogsFromApi]);
    }
});

// Ruta para obtener un perro específico por ID.
router.get('/:id', validarDogId, async (req, res) => {
    const { id } = req.params;

    // Si el ID tiene más de 10 caracteres, lo buscamos en la BD.
    if (id.length > 10) {  
        const dogFromDb = await Dog.findByPk(id, {
            include: Temperament
        });
        return res.json(dogFromDb);
    } else {
        // si no, lo buscamos en la API externa.
        const dogFromApi = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${process.env.API_KEY}`);
        return res.json(dogFromApi.data);
    }
});

// Ruta para crear un nuevo perro.
router.post('/', validarPost ,async (req, res) => {
    const { name, height, weight, lifeSpan, temperaments } = req.body;
    const tempArray = typeof temperaments === 'string' ? temperaments.split(',').map(temp => temp.trim()) : temperaments;

    // Creando el nuevo perro en la BD.
    const newDog = await Dog.create({
        name,
        height,
        weight,
        lifeSpan
    });

    // Asociando al perro con sus temperamentos.
    const tempInstances = await Promise.all(tempArray.map(temp => {
        return Temperament.findOrCreate({ where: { name: temp } })
            .then(result => result[0]);
    }));
    await newDog.setTemperaments(tempInstances);

    // Devolviendo el perro recién creado.
    return res.status(201).send(newDog);
});


module.exports = router;
