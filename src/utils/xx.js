
const paginatePokemons = (pokemons, page, pageSize) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return pokemons.slice(startIndex, endIndex);
  };
  
  const sortPokemonsByName = async (sort = 'asc', pokemons) => {
    const allPokemons = await pokemons;
    const sortedPokemons = allPokemons.slice().sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
  
      if (sort === 'asc') {
        return nameA.localeCompare(nameB);
      } else if (sort === 'desc') {
        return nameB.localeCompare(nameA);
      } else {
        throw new Error('Invalid sort order');
      }
    });
    return sortedPokemons;
  };


  
  const sortPokemonsByAttack = async (sort = 'max', pokemons) => {
    const allPokemons = await pokemons;
    const sortedPokemons = allPokemons.sort((a, b) => {
      const attackA = a.attack;
      const attackB = b.attack;
  
      if (sort === 'max') {
        return attackB - attackA;
      } else if (sort === 'min') {
        return attackA - attackB;
      } else {
        throw new Error('Invalid sort order');
      }
    });
    return sortedPokemons;
  };
  
  const getPokemonByType = async (type, pokemons) => {
    const allPokemons = await pokemons;
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.type.includes(type.toLowerCase())
    );
  
    return filteredPokemons;
  };
  
  const getPokemonBySource = async (source = 'DB', pokemons) => {
    const allPokemons = await pokemons;
    if (source === 'DB') {
      const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.source === 'DB');
      return filteredPokemons;
    } else if (source === 'API') {
      const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.source === 'API');
      return filteredPokemons;
    }
  };
  
  
  
 
  
 
  
  const deletePokemon = async (id) => {
    if (id.length <= 4) {
      throw new Error('Cannot delete Pokemon from API')
    } else {
      const dbPokemon = await Pokemon.findByPk(id)
      if (!dbPokemon) {
        throw new Error(`Pokemon with ID ${id} not found in the database.`);
      }
      await dbPokemon.destroy()
      return { message: 'Pokemon deleted successfully' };
    }
  }
  
  const changePokemon = async (
    id,
    name,
    image,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
    type
  ) => {
    const elpepe = await Pokemon.findOne({ where: { id: id } });
  
    if (!elpepe) {
      return "Pokemon not found.";
    }
  
    const pepito = {};
    if (name) {
      pepito.name = name;
    }
    if (image) {
      pepito.image = image;
    }
    if (life) {
      pepito.life = life;
    }
    if (attack) {
      pepito.attack = attack;
    }
    if (defense) {
      pepito.defense = defense;
    }
    if (speed) {
      pepito.speed = speed;
    }
    if (height) {
      pepito.height = height;
    }
    if (weight) {
      pepito.weight = weight;
    }
  
    if (type) {
      const foundTypes = await Type.findAll({ where: { name: type } });
      if (foundTypes.length > 0) {
        await elpepe.setTypes(foundTypes);
        const typeNames = foundTypes.map((foundType) => foundType.name);
        pepito.type = typeNames;
      } else {
        return "Unable to find the specified types.";
      }
    }
  
    const [updatedRows] = await Pokemon.update(pepito, {
      where: {
        id: id
      }
    });
  
    if (updatedRows > 0) {
      await elpepe.reload();
      
      return elpepe;
    } else {
      return "Unable to update the specified Pokemon.";
    }
  };
  