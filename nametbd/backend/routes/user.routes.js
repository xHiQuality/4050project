module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

    router.post("/login", users.login);

    router.delete("/logout", users.logout);

    router.post("/signup", users.signup);

    router.get("/validate", users.validate);

    router.get("/", users.findAll);

    router.get("/username/:username", users.findUser);
  

   router.get("/auth", auth.auth, users.authenticate);

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