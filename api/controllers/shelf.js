const express = require("express");
const router = express.Router();
const db = require("../models");
const { Shelf } = db;

// get all categories
router.get("/", (req, res) => {
    Shelf.findAll({}).then((allShelves) => res.json(allShelves));
});

// post a new shelf
router.post("/", (req, res) => {
  let { type } = req.body;
  Shelf.create({ type })
    .then((newShelf) => {
      res.status(201).json(newShelf);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
  
// delete a shelf
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Shelf.findByPk(id).then((shelf) => {
    if (!shelf) {
      return res.sendStatus(404);
    }
    shelf.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;