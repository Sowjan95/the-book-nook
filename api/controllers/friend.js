const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../middlewares/authentication");
const { User } = db;


// get all friends
router.get("/", passport.isAuthenticated(), async (req, res) => {
    const user = req.user;
    const friends = await User.findAll({
        where: {
          id: user.id
        },
        include: "Friend"
      });
    res.json(friends);
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


// post a new friend
router.post("/", passport.isAuthenticated(), async (req, res) => {
    const user = req.user;
    let { friendId } = req.body;

    const friend = await User.findOne({
        where: {
            id: friendId
        }
    });
    user.addFriend(friend).then((newFriend) => {
        res.status(201).json(newFriend);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
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