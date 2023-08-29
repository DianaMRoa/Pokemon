const { Router } = require("express");
const { 
    getPokemonHandler, 
    getIdHandler,
    createPokemonsHandler,
    validate } = require('../handlers/pokemonsHandlers')


const pokemonsRouter = Router ();

pokemonsRouter.get('/', getPokemonHandler);
pokemonsRouter.get('/:id', getIdHandler);
pokemonsRouter.post('/', validate, createPokemonsHandler);

module.exports = pokemonsRouter;
