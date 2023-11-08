const express = require("express");
const itemRouter = express.Router();
const {addItem, deleteItem, updateItem} = require("../controllers/item");

itemRouter.post("/", addItem);

itemRouter.route("/:itemId").delete(deleteItem).patch(updateItem);

module.exports = columnsRouter;
