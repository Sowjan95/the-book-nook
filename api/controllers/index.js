const express = require("express");
const router = express.Router();

// Load each controller
const authController = require("./auth.js");
const microPostsController = require("./microPosts.js");
const myBooksController = require("./myBooks.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/micro_posts", microPostsController);
router.use("/auth", authController);
router.use("/my_books", myBooksController);

module.exports = router;
