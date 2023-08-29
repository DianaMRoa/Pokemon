//Formato de pokemons
  function formatPokemonData(pokemon) {
    if (!pokemon) {
      return null;
    }
  
    const {
      id, name, image, hp, attack, defense, speed, height, weight, types, sprites, stats
    } = pokemon;
  
    const formattedPokemon = {
      id,
      name,
      // image: sprites?.front_default || image || "default_image_url", 
      image: sprites?.other['official-artwork']['front_default'] || sprites?.front_default,
      hp: stats?.[0]?.base_stat || hp || 0, 
      attack: stats?.[1]?.base_stat || attack || 0, 
      defense: stats?.[2]?.base_stat || defense || 0, 
      speed: stats?.[5]?.base_stat || speed || null,
      height,
      weight,
      type: types?.map((type) => type?.type?.name || null) || [], 
      source: 'API'
    };
  
    return formattedPokemon;
  }
  
  
  function formatPokemonDataDb(pokemon) {
    if (!pokemon) {
      return null;
    }
  
    const {
      id, name, image, hp, attack, defense, speed, height, weight, types, sprites, stats
    } = pokemon;
  
    const formattedPokemon = {
      id,
      name,
      image: sprites?.front_default || image || "default_image_url", 
      hp: stats?.[0]?.base_stat || hp || 0, 
      attack: stats?.[1]?.base_stat || attack || 0, 
      defense: stats?.[2]?.base_stat || defense || 0, 
      speed: stats?.[5]?.base_stat || speed || null,
      height,
      weight,
      type: (types || []).map((t) => t.name),
      source: 'DB'
    };
  
    return formattedPokemon;
  }
  
  function formatCard(pokemon) {
    if (!pokemon) {
      return null;
    }
  
    const { id, image, name, sprites, types, attack, stats } = pokemon;
  
    const formattedCard = {
      id,
      name,
      // image: sprites?.front_default || image || "default_image_url",
      image: sprites?.other['official-artwork']['front_default'] || sprites?.front_default,
      attack: stats?.[1]?.base_stat || attack || 0,
      type: types?.map((type) => type.type.name) || [],
      source: 'API',
    };
  
    return formattedCard;
  }
  
  function formatCardDb(pokemon) {
    if (!pokemon) {
      return null;
    }
  
    const { id, image, name, sprites, types, attack } = pokemon;
  
    const formattedCard = {
      id,
      name,
      image: sprites?.front_default || image || "default_image_url",
      attack: attack,
      type: types?.map((type) => type.name) || [],
      source: 'DB',
    };
  
    return formattedCard;
  }
  
  
  module.exports = { 
    formatPokemonData, 
    formatCard, 
    formatCardDb, 
    formatPokemonDataDb };

