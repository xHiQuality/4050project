module.exports = app => {
    const posts = require("../controllers/post.controller.js");

    var router = require("express").Router();

    // Create a new post
    router.post("/", posts.create);

    
    router.get("/", posts.findAll);

     // Retrieve all published posts
//   router.get("/published", posts.findAllPublished);

  // Retrieve a single post with id
  router.get("/:id", posts.findOne);

  // Increment the vote count with id
  router.put("/upvote/:id", posts.upvote);

  // Decrement the vote count with id
  router.put("/downvote/:id", posts.downvote);

  // Update a post with id
  router.put("/:id", posts.update);

  // Delete a post with id
  router.delete("/:id", posts.delete);

  // Delete all posts
  router.delete("/", posts.deleteAll);


    app.use('/api/posts', router);
}