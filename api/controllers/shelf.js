const express = require("express");
const router = express.Router();
const db = require("../models");
const { Shelf } = db;

// get all shelves
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

// get book by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const shelf = await Shelf.findByPk(id);
    if (!shelf) {
      return res.sendStatus(404);
    }
    res.json(shelf);
  } catch (error) {
    console.error("Error fetching shelf", error);
    res.sendStatus(500);
  }
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