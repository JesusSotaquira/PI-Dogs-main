const validarPost = (req, res, next) => {
    const { name, height, weight, temperament } = req.body;

//ntes de cagarla x23
    // Verificar que los campos requeridos estén presentes
    if (!name || !height || !weight) {
        return res.status(400).send("Campos requeridos: nombre, altura y peso.");
    }
//antes de cagarla
    // Validar que el nombre no esté vacío
    if (name.trim() === ""){
        return res.status(400).send("El nombre no es válido.");
    }

    // Validar que si el temperamento está presente, no esté vacío
    if (temperament && temperament.trim() === "") {
        return res.status(400).send("El temperamento no puede estar vacío.");
    }

    // Si todas las validaciones pasan, seguir al siguiente middleware o controlador
    next();
};

module.exports = {
    validarPost
};
