export const validateDog = (data) => {
    const errors = {};

    if (!data.name.trim()) {
        errors.name = "Se requiere el nombre.";
    }

    if (!data.height.split("-")[0].trim() || isNaN(Number(data.height.split("-")[0].trim()))) {
        errors.height = "La altura mínima no es válida.";
    }

    if (!data.height.split("-")[1].trim() || isNaN(Number(data.height.split("-")[1].trim()))) {
        errors.height = "La altura máxima no es válida.";
    }

    if (Number(data.height.split("-")[0].trim()) > Number(data.height.split("-")[1].trim())) {
        errors.height = "La altura mínima no puede ser mayor que la altura máxima.";
    }

    if (!data.weight.split("-")[0].trim() || isNaN(Number(data.weight.split("-")[0].trim()))) {
        errors.weight = "El peso mínimo no es válido.";
    }

    if (!data.weight.split("-")[1].trim() || isNaN(Number(data.weight.split("-")[1].trim()))) {
        errors.weight = "El peso máximo no es válido.";
    }

    if (Number(data.weight.split("-")[0].trim()) > Number(data.weight.split("-")[1].trim())) {
        errors.weight = "El peso mínimo no puede ser mayor que el peso máximo.";
    }

    const temperamentsArray = data.temperaments;
    if (!temperamentsArray.length) {
        errors.temperaments = "Se requiere al menos un temperamento.";
    } else {
        temperamentsArray.forEach((temp, index) => {
            if (!/^[a-zA-Z\s]+$/.test(temp)) {
                errors.temperaments = `El temperamento ${index + 1} debe contener sólo letras.`;
            }
        });
    }

    return errors;
};
