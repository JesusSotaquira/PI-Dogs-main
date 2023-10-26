const validarDogId = (req, res, next) => {
    const { id } = req.params;

    // Convirtiendo el ID a un número y verificando si es válido.
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
        return res.status(400).send("El ID de la raza debe ser numérico");
    }

    // Verificando que el número esté dentro del rango permitido.
    if (numId < 1 || numId > 264) {
        return res.status(400).send("No hay perros con ese ID");
    }

    // Verificando que el ID sea un número entero.
    if (Number(id) !== Math.floor(Number(id))) {
        return res.status(400).send("El ID debe ser un número entero.");
    }
    
    next();
};

const validarName = (req, res, next) => {
    const { name } = req.query;
    
    // Si name no está definido, simplemente pasa al siguiente middleware o ruta.
    if (name === undefined) {
        return next();
    }

    // Si 'name' está definido pero está vacío, devuelve un error.
    if (name.trim() === "") {
        return res.status(400).send("El nombre no puede estar vacío");
    }

    // Si 'name' tiene algún carácter que no sea una letra o un espacio, devuelve un error.
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return res.status(400).send("El nombre solo debe contener letras y espacios.");
    }
    
    next();
};

module.exports = {
    validarName,
    validarDogId
};


