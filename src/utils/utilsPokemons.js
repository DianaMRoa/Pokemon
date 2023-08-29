const axios = require('axios');
const { conn } = require('../db')
const { Type, Pokemon } = conn.models;
const { formatPokemonData, formatCard, formatCardDb, formatPokemonDataDb } = require ('./format')

const getApiPokemons = async () => {
    const apiResponse = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150")).data.results;
    const apiPokemons = await Promise.all(
      apiResponse.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return formatCard(response.data, "API");
      }));
    return apiPokemons;
};
  
const getDbPokemons = async () => {
    const dbPokemons = await Pokemon.findAll({
      include: [
        {
          model: Type,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    const formattedDbPokemons = dbPokemons.map((pokemon) =>
    formatCardDb(pokemon, "Database")
  );
  return formattedDbPokemons;
};
  
// Función para obtener id de la api
const getPokemonFromAPI = async (id) => {
    const pokemonDetail = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
    return formatPokemonData(pokemonDetail);
};

// Función para obtener id de la base de datos
const getPokemonFromDB = async (id) => {
    const dbPokemon = await Pokemon.findByPk(id, { 
      include: {
        model: Type,
        attributes: ['name'], 
      },
    });
    if (!dbPokemon) {
      throw new Error(`Pokemon with ID ${id} not found in the database.`);
    }
    const formattedPokemon = formatPokemonDataDb(dbPokemon);
    return formattedPokemon;
};

// Función para obtener información por nombre
const searchPokemon = async (name) => {
  const apiResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=251`
  );
  const pokemonList = apiResponse.data.results;
  const filteredPokemon = pokemonList.find(
    (p) => p.name === name.toLowerCase()
  );

  if (!filteredPokemon) {
    const existingPokemon = await Pokemon.findOne({
      where: { name: name.toLowerCase() },
    });

    if (!existingPokemon) {
      return { message: `No hay pokemones llamados ${name}` };
    }

    const formatPokemon = formatPokemonDataDb(existingPokemon);
    return formatPokemon;
  }

  const pokemonResponse = await axios.get(filteredPokemon.url);
  const pokemonData = pokemonResponse.data;

  const formatPokemon = formatPokemonData(pokemonData);
  return formatPokemon;
};



  
module.exports = {
    getDbPokemons,
    getApiPokemons,
    getPokemonFromAPI,
    getPokemonFromDB,
    searchPokemon,
}
  
  
  
 