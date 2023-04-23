const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../middlewares/authentication");
const { User, Recommendation, Book } = db;


// get all recommendations
router.get("/", passport.isAuthenticated(), async (req, res) => {
    const user = req.user;
    const recs = await Recommendation.findAll({
        where: {
          id: user.id
        },
        include: "Recommendation"
      });
    res.json(recs);
});


//get friend by username
// router.get("/username/:username", passport.isAuthenticated(), async (req, res) => {
//     const user = req.user

//     const {username}  = req.params;
//     let friendUser = await User.findOne({
//         where:{
//             id: user.id,
//         },
//         include: "Friend"
//     });
//     res.json(friendUser);
// });


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
    Recommendation.create({ UserId: friend.id, BookId: book.id })
    .then((newRec) => {
      (req.user).addRecommendation(newRec);
      res.status(201).json(newRec);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
    // user.addRecommendation(friend, book).then((newRec) => {
    //     res.status(201).json(newRec);
    //   })
    //   .catch((err) => {
    //     res.status(400).json(err);
    //   });
  });
  

// delete a friend
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   Friend.findByPk(id).then((friend) => {
//     if (!friend) {
//       return res.sendStatus(404);
//     }
//     friend.destroy();
//     res.sendStatus(204);
//   });
// });


module.exports = router;