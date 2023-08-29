const { conn } = require('../db')
const { Type, Pokemon } = conn.models;

const createPokemonEntry = async (name, image, hp, attack, defense, speed, height, weight) => {
    const createdPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight
    });
    return createdPokemon;
};
  
const findOrCreateTypes = async (type) => {
    const typeIds = await Promise.all(type.map(async (el) => {
      const [typeInstance] = await Type.findOrCreate({
        where: {
          name: el
        }
      });
      return typeInstance.dataValues.id;
    }));
    return typeIds;
  };
  
  const associatePokemonWithTypes = async (pokemon, typeIds) => {
    await pokemon.setTypes(typeIds);
};
  
const findPokemonWithTypes = async (name) => {
    const pokemonWithTypes = await Pokemon.findOne({
      attributes: ['name', 'image', 'hp', 'attack', 'defense', 'speed', 'height', 'weight'],
      where: {
        name: name,
      },
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });
    return pokemonWithTypes;
};

module.exports = {
    createPokemonEntry,
    findOrCreateTypes, 
    associatePokemonWithTypes,
    findPokemonWithTypes

}