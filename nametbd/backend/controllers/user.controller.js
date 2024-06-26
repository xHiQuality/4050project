const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');
const auth = require('../middleware/auth')
// const axios = require('axios');


//Create and Save a new User
exports.create = async (req,res) => {
//Validate request
 if (!req.body.username) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
} else if (!req.body.password) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
}

const hashedPassword = await bcryptjs.hash(req.body.password, 8);

//Create a user
  const user = {
    iduser: req.body.iduser,
    username: req.body.username,
    password: hashedPassword
  };
  
  //Save User in the database
  User.create(user)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
            err.message || "Some error occurred while creating the User"
    });
  });
};

//Retreive all Users from the database
exports.findAll = (req,res) => {
    const iduser = req.query.iduser;
    var condition = iduser ? {iduser: {[Op.like]: `%${iduser}`}} : null;

    User.findAll({where : condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users"
            })
        })
};

exports.findUser = async (req, res) => {
  const userName = req.params.username;


      User.findOne({ where: { username: userName } })
      .then(data => {
     
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving users."
          });
      });
  };

exports.signup = async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  } else if (!req.body.password) {
      return res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  }

  const hashedPassword = await bcryptjs.hash(req.body.password, 8);
  

    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    const token = jwt.sign({id: newUser.iduser}, "passwordKey");
    res.send({ token, user: { id: newUser.iduser, username: newUser.username } });

  } catch (err) {
    res.status(400).send({
      message: err.message || "Error occured in Signup"
    });
  }
};

exports.login = async (req, res) => {
  try {
    
    const username = req.body.username;
    const password = req.body.password;
    
    const user = await User.findOne({ where: { username: username } });
    
    if (!user) {
      return res.status(400).send({ message: "User with that username does not exist" });
    }
  
    const isMatch = await bcryptjs.compare(password, user.password);
    //const isMatch = password == user.password;

    if (!isMatch) {
      return res.status(400).send({message: "Incorrect password"});
    } // if

    const token = jwt.sign({id: user.iduser}, "passwordKey");
    res.json({token, user: {id: user.iduser, username: username}});

  } catch (err) {
    console.log("backend failed in login ", err);
    res.status(400).send({message: "error in login"});
}
};

exports.logout = (req, res) => {
  try {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send("Unable to logout")
        } else {
          res.send("Logout successful")
        }
      });
    } else {
      res.end();
    }
  } catch (err) {
    console.log("backend failed in logout ", err);
    res.status(400).send({message: "Error in logout"});
  }
};


exports.validate = (req,res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.json(false);
    }
    const user = User.find(verified.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    console.log("Backend failed in verifying token validity ", err);
    res.status(400).send({message: err.messgae || "error verifying token"});
  }
};

exports.authenticate = (req, res) => {
  try {
    const user = User.findByPk(req.user);
    res.send({
      username: user.username,
      id: user.id
    });
  } catch {
    console.log("Backend failed in getting user credentials ", err);
    res.status(400).send({message: err.message || "Error in authentication"});
  }
};


//Find a single User with an id
exports.findOne = (req,res) => {
    const iduser = req.params.id;

    User.findByPk(iduser)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find User with id =${iduser}`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with id=" + iduser
        })
    })
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const iduser = req.params.id;

  User.update(req.body, {
    where: {iduser: iduser}
  })
  .then(num => {
    if (num == 1) {
        res.send({
            message: "User was updated successfully."
        });
    } else {
        res.send({
            message: `Cannot update Tutorial with id=${iduser}. Maybe User was not found`
        })
    }
  })
  .catch(err => {
    res.status(500).send({
        message: "Error updating Tutorial with id="+iduser
    })
  })
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const iduser = req.params.id;

  User.destroy({
    where: {iduser: iduser}
  })
  .then(num => {
    if (num == 1) {
        res.send({
            message: "User was deleted successfully!"
        })
    } else {
        res.send({
            message: `Cannot delete User with id=${iduser}. Maybe User was not found!`
        })
    }
  })
  .catch(err => {
    res.status(500).send({
        message: "Could not delete User with id="+iduser
    })
  })
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({
        message: `${nums} Users were deleted successfully!`
    })
  })
  .catch(err => {
    res.status(500).send({
        message:
            err.message || "Some error occured while removing all Users."
    })
  })
};

// Find all Users with posts 
//implement later
exports.findAllPublished = (req, res) => {
  
};


