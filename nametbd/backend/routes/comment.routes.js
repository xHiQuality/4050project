module.exports = app => {
    const comments = require("../controllers/comment.controller.js");

    var router = require("express").Router();

    // Create a new post
    router.post("/", comments.create);

    
    router.get("/", comments.findAll);

     // Retrieve all published comments
//   router.get("/published", comments.findAllPublished);

// Increment comment votes with id 
  router.put("/upvote/:id", comments.upvote);

  // Decrement comment votes with id 
  router.put("/downvote/:id", comments.downvote);


  // Retrieve a single post with id
  router.get("/:id", comments.findOne);

  // Update a post with id
  router.put("/:id", comments.update);

  // Delete a post with id
  router.delete("/:id", comments.delete);

  // Delete all comments
  router.delete("/", comments.deleteAll);


    app.use('/api/comments', router);
}