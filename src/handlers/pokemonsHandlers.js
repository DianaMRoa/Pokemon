const { getAllPokemon, getPokemonId, getPokemonName, createPokemon  } = require ('../controllers/pokemosController');

const getPokemonHandler = async(req, res) => {
    const { name } = req.query

    const results = name ? await getPokemonName(name) : await getAllPokemon();
    res.status(200).json(results);
};

const getIdHandler = async(req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? 'bdd' : 'api'
    try {
        const pokemon = await getPokemonId(id, source);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message })
    };
}

const createPokemonsHandler = async(req, res) => {
    const { name, image, hp, attack, defense, speed, height, weight, type } = req.body;
    try {
            const newPokemon = await createPokemon (  //controller
            name, image, hp, attack, defense, speed, height, weight, type
        ); 
        res.status(201).json(newPokemon);

    } catch (error) {
        res.status(400).json({ error: error.message })
    };
};

const validate = (req, res, next) => {
    const { name, hp, attack, defense, type } = req.body;
    if(!name) return res.status(400).json({ error: "Missing name"});
    if(!hp) return res.status(400).json({ error: "Missing hp"});
    if(!defense) return res.status(400).json({ error: "Missing defense"});
    if(!attack) return res.status(400).json({ error: "Missing attack"});
        
    next();
};

module.exports = {
    getPokemonHandler,
    getIdHandler, 
    createPokemonsHandler,  
    validate
};