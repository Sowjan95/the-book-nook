const express = require("express");
const router = express.Router();
const authController = require("./auth.js");

// Load each controller
const microPostsController = require("./microPosts.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/micro_posts", microPostsController);
router.use("/auth", authController);

module.exports = router;
