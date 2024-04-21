const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

//Create and Save a new comment
exports.create = (req,res) => {
    //Validate request
     if (!req.body.commentAuthor) {
        res.status(400).send({
            message: "Author can not be empty!"
        });
        return;
    }  else if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    //Create a Comment
      const comment = {
        commentID: req.body.commentID,
        commentAuthor: req.body.commentAuthor,
        content: req.body.content,
        votes: req.body.votes,
        postID: req.body.postID
      };
      
      //Save Comment in the database
      Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Comment"
        });
      });
    };

    //Retreive all Comments from the database
    exports.findAll = (req,res) => {
        const commentID = req.query.commentID;
        var condition = commentID ? {id: {[Op.like]: `%${commentID}`}} : null;
    
        Comment.findAll({where : condition})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Comments"
                })
            })
    };

    //Find a single Comment with an id
    exports.findOne = (req,res) => {
        const commentID = req.params.id;
    
        Comment.findByPk(commentID)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Comment with id =${commentID}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + commentID
            })
        })
    };

    exports.update = (req, res) => {
        const commentID = req.params.id;
      
        Comment.update(req.body, {
          where: {commentID: commentID}
        })
        .then(num => {
          if (num == 1) {
              res.send({
                  message: "Comment was updated successfully."
              });
          } else {
              res.send({
                  message: `Cannot update Tutorial with id=${commentID}. Maybe Comment was not found`
              })
          }
        })
        .catch(err => {
          res.status(500).send({
              message: "Error updating Tutorial with id="+commentID
          })
        })
      }; 

      // Delete a Comment with the specified id in the request
    exports.delete = (req, res) => {
        const commentID = req.params.id;
      
        Comment.destroy({
          where: {commentID: commentID}
        })
        .then(num => {
          if (num == 1) {
              res.send({
                  message: "Comment was deleted successfully!"
              })
          } else {
              res.send({
                  message: `Cannot delete Comment with id=${commentID}. Maybe Comment was not found!`
              })
          }
        })
        .catch(err => {
          res.status(500).send({
              message: "Could not delete Comment with id="+commentID
          })
        })
      };

      // Delete all Comments from the database.
    exports.deleteAll = (req, res) => {
        Comment.destroy({
          where: {},
          truncate: false
        })
        .then(nums => {
          res.send({
              message: `${nums} Comments were deleted successfully!`
          })
        })
        .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occured while removing all Comments."
          })
        })
      };
  