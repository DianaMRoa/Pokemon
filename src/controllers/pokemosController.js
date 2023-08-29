const { getDbPokemons, getApiPokemons, getPokemonFromAPI, getPokemonFromDB, searchPokemon } = require ('../utils/utilsPokemons')
const { createPokemonEntry, findOrCreateTypes, associatePokemonWithTypes, findPokemonWithTypes } = require('../utils/createPokemon')

//Se usan estas funciones, para poder interactuar con los modelos

const getAllPokemon =  async() => {
    
    const dbPokemons = await getDbPokemons(); // BDD
    const apiPokemons = await getApiPokemons();

    return [...dbPokemons, ...apiPokemons];
};

const getPokemonId = async (id, source) => {
    if (id.length <= 4) {
      return getPokemonFromAPI(id);
    } else {
      return getPokemonFromDB(id);
    }
};


const getPokemonName = async (name) => {
  try {
    const pokemon = await searchPokemon(name);
    return pokemon;
  } catch (error) {
    throw new Error(error.message);
  }
};
const createPokemon = async (name, image, hp, attack, defense, speed, height, weight, type) => {
  const createdPokemon = await createPokemonEntry(name, image, hp, attack, defense, speed, height, weight);
  const typeIds = await findOrCreateTypes(type);
  await associatePokemonWithTypes(createdPokemon, typeIds);
  const pokemonWithTypes = await findPokemonWithTypes(name);
  return pokemonWithTypes;
};

module.exports = { 
    getAllPokemon,
    getPokemonId,
    getPokemonName,
    createPokemon,
}; 