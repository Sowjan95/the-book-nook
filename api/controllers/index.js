const express = require("express");
const router = express.Router();
const authController = require("./auth.js");

// Load each controller
const microPostsController = require("./microPosts.js");
const bookController = require("./book.js");
const myBookController = require("./myBook.js");
const shelfController = require("./shelf.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/micro_posts", microPostsController);
router.use("/auth", authController);
router.use("/book", bookController);
router.use("/my_book", myBookController);
router.use("/shelf", shelfController);


module.exports = router;
