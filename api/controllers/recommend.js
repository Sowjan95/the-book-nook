const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../middlewares/authentication");
const { User, Recommendation, Book } = db;


// get all recommendations for the user
router.get("/", passport.isAuthenticated(), async (req, res) => {
    const user = req.user;
    const recs = await Recommendation.findAll({
        where: {
          UserId: user.id
        }
      });
    res.json(recs);
});


// post a new recommendation
router.post("/", passport.isAuthenticated(), async (req, res) => {
    const user = req.user;
    let { friendId, bookId } = req.body;

    const friend = await User.findOne({
        where: {
            id: friendId
        }
    });
    const book = await Book.findOne({
        where: {
            id: bookId
        }
    });
    Recommendation.create({ UserId: friend.id, BookId: book.id, FriendId: user.id })
    .then((newRec) => {
      (req.user).addRecommendation(newRec);
      res.status(201).json(newRec);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  });
  

// delete a recommendation
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Recommendation.findByPk(id).then((recommendation) => {
    if (!recommendation) {
      return res.sendStatus(404);
    }
    recommendation.destroy();
    res.sendStatus(204);
  });
});


module.exports = router;