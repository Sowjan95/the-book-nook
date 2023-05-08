const express = require("express");
const router = express.Router();
const passport = require("../middlewares/authentication");
const db = require("../models");
const { Friend } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/micro_posts
//    POST   /api/micro_posts
//    GET    /api/micro_posts/:id
//    PUT    /api/micro_posts/:id
//    DELETE /api/micro_posts/:id
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /micro_posts comes from the file ./microPosts.js

router.get("/", (req, res) => {
  Friend.findAll({}).then((allFriends) => res.json(allFriends));
});

// post a new friend
// router.post("/", passport.isAuthenticated(),  async (req, res) => {
//     let { username, email } = req.body;
//     let userId = (req.user).id;
    
//     Friend.create({ username, email, UserId: userId })
//       .then((newFriend) => {
//         (req.user).addFriend(newFriend);
//         res.status(201).json(newFriend);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Friend.findByPk(id).then((friend) => {
    if (!friend) {
      return res.sendStatus(404);
    }

    res.json(friend);
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Friend.findByPk(id).then((friend) => {
    if (!friend) {
      return res.sendStatus(404);
    }

    friend.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
