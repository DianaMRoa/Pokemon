const { Router } = require("express");
const types = require('../handlers/typesHandlers');

const typesRouter = Router();

typesRouter.get('/', types);

module.exports = typesRouter;

