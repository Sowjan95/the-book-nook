const express = require("express");
const router = express.Router();
const passport = require("../middlewares/authentication");
const db = require("../models");
const { MyBook, Book, Shelf } = db; // after Book API is implemented

//get all mybooks belonging to user
router.get("/allmybooks", passport.isAuthenticated(), (req, res) => {
    const user = req.user;
    user.getMyBooks().then((allMyBooks) => res.json(allMyBooks));
});

//get mybooks by title 
router.get("/title/:title", passport.isAuthenticated(), async (req, res) => {
    const user = req.user;
    const {title}  = req.params;
    let book = await Book.findOne({
        where:{
            title: title,
        },
    })
    MyBook.findAll({
        where:{
        BookId: book.id,
        UserId: user.id
        }
    }).then((allMyBooks) => res.json(allMyBooks));
});

//get mybooks by author 
router.get("/author/:author", passport.isAuthenticated(), async (req, res) => {
    const user = req.user;
    const {author}  = req.params;
    let book = await Book.findOne({
        where:{
            author: author,
        },
    })
    MyBook.findAll({
      where:{
        BookId: book.id,
        UserId: user.id
      }
    }).then((allMyBooks) => res.json(allMyBooks));
  });

// get all mybooks belonging to a shelf type
router.get("/shelf/:type", passport.isAuthenticated(), async (req, res) => {
    const user = req.user;
    const {type}  = req.params;
    if (!type) {
      type = "Currently Reading";
    }
    let shelf = await Shelf.findOne({
        where:{
        type: type,
        }
    });
    MyBook.findAll({
        where:{
          ShelfId: shelf.id,
          UserId: user.id
        }
      }).then((allMyBooks) => res.json(allMyBooks));
});

// get all liked mybooks
router.get("/favorites", passport.isAuthenticated(), async (req, res) => {
  const user = req.user;
  MyBook.findAll({
      where:{
        UserId: user.id,
        like: true
      }
    }).then((allMyBooks) => res.json(allMyBooks));
});

// post a new mybook
router.post("/", passport.isAuthenticated(),  async (req, res) => {
  let { rating, review, like, pages_read, date_started, date_ended, type, title } = req.body;
  let userId = (req.user).id;
  if (!type) {
    type = "Want to Read";
  }
  let shelf = await Shelf.findOne({
    where:{
      type: type,
    }
  })
  let book = await Book.findOne({
    where:{
      title: title,
    },
  })

  MyBook.create({ rating, review, like, pages_read, date_started, date_ended, UserId: userId, ShelfId: shelf.id, BookId: book.id })
    .then((newMyBook) => {
      (req.user).addMyBook(newMyBook);
      res.status(201).json(newMyBook);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// update mybook
// perhaps update my book can be dateStarted and dateRead, etc. which would need to be added to model
// perhaps shelves can also be it's own model [Read, Want To Read, and Currently Reading]
router.put("/:id", passport.isAuthenticated(), async (req, res) => {
    let { rating, review, like, pages_read, date_started, date_ended, type } = req.body;
    const { id } = req.params;
    let shelf = await Shelf.findOne({
        where: {
            type: type,
        }
    })

    MyBook.findByPk(id).then((mybook) => {
      if (!mybook) {
        return res.sendStatus(404);
      } else if(mybook.UserId != (req.user).id){
        return res.sendStatus(401);
      }
      mybook.rating = rating;
      mybook.review = review;
      mybook.like = like;
      mybook.pages_read = pages_read;
      mybook.date_started = date_started;
      mybook.date_ended = date_ended;
      mybook.ShelfId = shelf.id;
      mybook
        .save()
        .then((updatedMyBook) => {
          res.json(updatedMyBook);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  });
  
// delete an mybook
router.delete("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  MyBook.findByPk(id).then((mybook) => {
    if (!mybook) {
      return res.sendStatus(404);
    }else if(mybook.UserId != (req.user).id){
      return res.sendStatus(401);
    }
    mybook.destroy();
    res.sendStatus(204);
  });
});
module.exports = router;