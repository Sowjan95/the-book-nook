const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../middlewares/authentication");
const { user } = require("pg/lib/defaults");
const { User } = db;


// get all friends
router.get("/", passport.isAuthenticated(), async (req, res) => {
    const user = req.user;
    const friends = await user.getFriends();

    if (!friends) {
      return res.status(404).json({ message: "No friends found" });
    }

    res.json(friends);
});

// find a friend by id
router.get("/:friendId", passport.isAuthenticated(), async (req, res) => {
  try {
    const { friendId } = req.params;
    const user = req.user;
    const friend = await User.findOne({ where: { id: friendId } });

    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }
    return res.json(friend);
  } catch (error) {
    console.error("Error fetching friend by id", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// find a friend
router.get("/find/:username", passport.isAuthenticated(), async (req, res) => {

  const { username } = req.params;
  const user = req.user;

  const friend = await User.findOne({
    where: { username },
    include: [
      {
        model: User,
        as: "Friends",
      }
    ]
  });

  if (!friend) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(friend); 
});

router.get('/friends', passport.isAuthenticated(), async (req, res) => {
  try {
    const user = await User.findOne({
      include: [{
        model: User,
        as: 'Friends',
        through: { attributes: [] }, // Exclude join table fields
        where: { id: user.id }
      }]
    });

    const friends = user.Friends;
    res.json(friends);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get users that have you as a friend
router.get("/requests", passport.isAuthenticated(), async (req, res) => {
  const user = req.user;
  const friend = await User.findAll({
    include: [
      {
        model: User,
        as: "Friends",
        through: { attributes: [] }, // Exclude join table fields
        where: { id: user.id }
      }
    ]
  });
  if (!friend) {
    return res.status(404).json({ message: "Friend not found" });
  }
  return res.json(friend);  
});

// This only works if the user is also friends with you!
router.get("/username/:username", passport.isAuthenticated(), async (req, res) => {

  const { username } = req.params;
  const user = req.user;

  const friend = await User.findOne({
    where: { username },
    include: [
      {
        model: User,
        as: "Friends",
        through: { attributes: [] }, // Exclude join table fields
        where: { id: user.id }
      }
    ]
  });

  if (!friend) {
    return res.status(404).json({ message: "Friend not found" });
  }

  return res.json(friend);  
 
});


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
router.delete("/:friendId", passport.isAuthenticated(), async (req, res) => {

  const { friendId } = req.params;
  const user = req.user;

  try {
    const friend = await User.findOne({ where: { id: friendId } });

    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    await user.removeFriends(friend);

    res.json({ message: `Friend ${friendId} removed from user ${user.id}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }

});


module.exports = router;