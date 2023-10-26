const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Dog = sequelize.define('dog', {
       
        id: {
            type: DataTypes.UUID,  
            defaultValue: DataTypes.UUIDV4,  // Se generará automáticamente.
            allowNull: false,  
            primaryKey: true,  
        },
        // Nombre del perro
        name: {
            type: DataTypes.STRING,  
            allowNull: false,  
        },
        // URL de la imagen del perro. Opcional.
        image: {
            type: DataTypes.STRING,  
            allowNull: true,  
        },
        // Altura del perro
        height: {
            type: DataTypes.STRING,  
            allowNull: false,  
        },
        // Peso del perro
        weight: {
            type: DataTypes.STRING,  
            allowNull: false,  
        },
        // Esperanza de vida del perro
        lifeSpan: {
            type: DataTypes.STRING,  
            allowNull: true,  
            field: 'life_span' 
        }
    });
    
   
    return Dog;
};
