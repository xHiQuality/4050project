const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

//Create and Save a new Post
exports.create = (req,res) => {
    //Validate request
     if (!req.body.author) {
        res.status(400).send({
            message: "Author can not be empty!"
        });
        return;
    } else if (!req.body.header) {
        res.status(400).send({
            message: "Header can not be empty!"
        });
        return;
    }  else if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    //Create a post
      const post = {
        idpost: req.body.idpost,
        tag: req.body.tag,
        header: req.body.header,
        author: req.body.author,
        content: req.body.content,
        votes: req.body.votes,
        image: req.body.image
      };
      
      //Save Post in the database
      Post.create(post)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Post"
        });
      });
    };
    
    //Retreive all Post from the database
    exports.findAll = (req,res) => {
        const idpost = req.query.idpost;
        var condition = idpost ? {idpost: {[Op.like]: `%${idpost}`}} : null;
    
        Post.findAll({where : condition})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving posts"
                })
            })
    };
    
    //Find a single Post with an id
    exports.findOne = (req,res) => {
        const idpost = req.params.id;
    
        Post.findByPk(idpost)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Post with id =${idpost}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + idpost
            })
        })
    };
    
    //Find all post with user
    exports.findByAuthor = (req, res) => {
      const author = req.params.author; // Access the author from req.params instead of req.query
    
      Post.findAll({ where: { author: author } })
          .then(data => {
              res.send(data);
          })
          .catch(err => {
              res.status(500).send({
                  message: err.message || "Some error occurred while retrieving posts."
              });
          });
  };

    exports.upvote = (req, res) => {
        const idpost = req.params.id;

        Post.increment(
          'votes', {by: 1, where: {idpost: idpost}}
        )
        .then(data => {
          if (data) {
            res.send({message: "Post was updated successfully."});
          } else {
            res.send({
              message: `Cannot increment votes for post with id=${idpost}. Maybe Post was not found`
            })
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error incrementing votes for post with id="+idpost
          })
        })
    };

    exports.downvote = (req, res) => {
      const idpost = req.params.id;

      Post.decrement(
        'votes', {by: 1, where: {idpost: idpost}}
      )
      .then(data => {
        if (data) {
          res.send({message: "Votes decremeneted successfully."});
        } else {
          res.send({
            message: `Cannot decrement votes for post with id=${idpost}. Maybe POst was not found`
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error decrementing votes for post with id="+idpost
        })
      })
    };

    // Update a Post by the id in the request
    exports.update = (req, res) => {
      const idpost = req.params.id;
    
      Post.update(req.body, {
        where: {idpost: idpost}
      })
      .then(num => {
        if (num == 1) {
            res.send({
                message: "Post was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Tutorial with id=${idpost}. Maybe Post was not found`
            })
        }
      })
      .catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id="+idpost
        })
      })
    };
    
    // Delete a Post with the specified id in the request
    exports.delete = (req, res) => {
      const idpost = req.params.id;
    
      Post.destroy({
        where: {idpost: idpost}
      })
      .then(num => {
        if (num == 1) {
            res.send({
                message: "Post was deleted successfully!"
            })
        } else {
            res.send({
                message: `Cannot delete Post with id=${idpost}. Maybe Post was not found!`
            })
        }
      })
      .catch(err => {
        res.status(500).send({
            message: "Could not delete Post with id="+idpost
        })
      })
    };
    
    // Delete all Posts from the database.
    exports.deleteAll = (req, res) => {
      Post.destroy({
        where: {},
        truncate: false
      })
      .then(nums => {
        res.send({
            message: `${nums} Posts were deleted successfully!`
        })
      })
      .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while removing all Posts."
        })
      })
    };
