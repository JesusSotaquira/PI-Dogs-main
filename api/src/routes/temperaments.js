// Importación de los módulos necesarios
const { Router } = require('express');
const { Temperament } = require('../db');
const axios = require('axios');
const router = Router();

// Ruta para obtener todos los temperamentos
router.get('/', async (req, res) => {
    try {
        // Intenta buscar todos los temperamentos en la base de datos
        let temperaments = await Temperament.findAll();

        // Si no hay temperamentos en la base de datos, procedemos a obtenerlos de la API
        if (temperaments.length === 0) {
            // Hacer una solicitud a la API para obtener todas las razas de perros
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`);
            
            // Extracción y limpieza de temperamentos de los datos recibidos
            let allTemperaments = response.data
                .map(dog => dog.temperament) // Extraemos temperamentos.
                .filter(Boolean)  // Filtramos valores nulos o falsos.
                .join(', ') // Convertimos la lista en una cadena.
                .split(', ') // Luego volvemos a dividirla para obtener cada temperamento por separado.
                .map(temp => temp.trim()) // Limpiamos los espacios.
                .filter((value, index, self) => self.indexOf(value) === index); // Eliminamos duplicados.

            // Insertar cada temperamento en la base de datos (sólo si no existe)
            await Promise.all(allTemperaments.map(temp => Temperament.findOrCreate({ where: { name: temp }})));

            // Vuelve a obtener todos los temperamentos después de insertarlos
            temperaments = await Temperament.findAll();
        }

        // Enviar los temperamentos como respuesta
        res.json(temperaments);
    } catch (error) {
        // En caso de un error, enviar una respuesta con estado 500
        res.status(500).send("Error al obtener los temperamentos");
    }
});

module.exports = router;
