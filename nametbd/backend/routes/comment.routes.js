module.exports = app => {
    const comments = require("../controllers/comment.controller.js");

    var router = require("express").Router();

    // Create a new post
    router.post("/", comments.create);

    // Retrieve a single comment with postID
    router.get("/", comments.findByPostID);
    
    router.get("/", comments.findAll);

     // Retrieve all published comments
//   router.get("/published", comments.findAllPublished);

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