const express = require("express");
const router = express.Router();

// Load each controller
const authController = require("./auth.js");
const microPostsController = require("./microPosts.js");
const myBooksController = require("./myBooks.js");
const friendsController = require("./friends.js")
const bookController = require("./book.js");
const myBookController = require("./myBook.js");
const shelfController = require("./shelf.js");
const friendController = require("./friend.js");
const recController = require("./recommend.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/micro_posts", microPostsController);
router.use("/auth", authController);
router.use("/my_books", myBooksController);
router.use("/friends", friendsController);
router.use("/book", bookController);
router.use("/my_book", myBookController);
router.use("/shelf", shelfController);
router.use("/friend", friendController);
router.use("/recs", recController);

module.exports = router;
