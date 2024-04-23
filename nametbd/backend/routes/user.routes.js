module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

    
    router.get("/", users.findAll);

    router.get("/username/:username", users.findUser);
  

     // Retrieve all published users
//   router.get("/published", users.findAllPublished);

  // Retrieve a single user with id
  router.get("/id/:id", users.findOne);

  // Update a user with id
  router.put("/:id", users.update);

  // Delete a user with id
  router.delete("/:id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  // Add route to check user existence
  //router.post("/check", users.checkExistence);


    app.use('/api/users', router);
}