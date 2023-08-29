const axios = require("axios");
const { conn } = require('../db')
const { Type } = conn.models;

const getTypes = async () => {
  try {
    const apiResponse = await axios.get("https://pokeapi.co/api/v2/type/");
    const apiTypes = apiResponse.data.results.map((pokemon) => ({
      name: pokemon.name,
    }));

    const createdTypes = await Promise.all(
      apiTypes.map((type) => Type.findOrCreate({ where: { name: type.name }, defaults: type }))
    );

    const allTypes = createdTypes.map(([createdType]) => createdType.toJSON());
    return allTypes;
  } catch (error) {
    throw new Error(`Error fetching types: ${error.message}`);
  }
};


module.exports = { getTypes };