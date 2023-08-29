const { getTypes } = require("../controllers/TypesController");

const types = async (req, res) => {
  try {
    const tipos = await getTypes();
    res.status(200).json(tipos);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = types;
