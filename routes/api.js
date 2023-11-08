const express = require("express");
const apiRouters = express.Router();

apiRouters.use('/boards', require('./boards'));

module.exports = apiRouters