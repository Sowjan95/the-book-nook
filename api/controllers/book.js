const express = require("express");
const router = express.Router();
const db = require("../models");
const { Book } = db;


// get all books
router.get("/", (req, res) => {
    Book.findAll({}).then((allBooks) => res.json(allBooks));
});


//get books by title 
router.get("/title/:title", (req, res) => {
  const {title}  = req.params;
  Book.findAll({
    where:{
      title: title,
    }
  }).then((allBooks) => res.json(allBooks));
});


//get books by author 
router.get("/author/:author", (req, res) => {
    const {author}  = req.params;
    Book.findAll({
      where:{
        author: author,
      }
    }).then((allBooks) => res.json(allBooks));
  });


// post a new book
router.post("/", (req, res) => {
    let { title, author, pages } = req.body;
    Book.create({ title, author, pages })
      .then((newBook) => {
        res.status(201).json(newBook);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  

// delete a book
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Book.findByPk(id).then((book) => {
    if (!book) {
      return res.sendStatus(404);
    }
    book.destroy();
    res.sendStatus(204);
  });
});


module.exports = router;