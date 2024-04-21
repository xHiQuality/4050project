const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
// const axios = require('axios');


// Route to check if a user exists
exports.checkUserExistence = (req, res) => {
  const { username } = req.body;
  console.log("check");

  // Use Sequelize's findOne method to check if the user exists
  User.findOne({ where: { username } })
    .then(user => {
      if (user) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    })
    .catch(error => {
      console.error('Error checking user existence:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

//Create and Save a new User
exports.create = (req,res) => {
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
//Create a user
  const user = {
    iduser: req.body.iduser,
    username: req.body.username,
    password: req.body.password,
    accountImage: req.body.accountImage
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

exports.findByUsername = (req, res) => {
  const username = req.query.username;  // Get username from query string
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving users."
          });
      });
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


