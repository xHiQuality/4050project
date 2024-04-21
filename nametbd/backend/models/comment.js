const {sequelize, Sequelize} = require(".")

module.exports = (sequelize,Sequelize) => {
    const Comment = sequelize.define("comments", {
        commentID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        commentAuthor: {
            type: Sequelize.STRING(20),
            allowNull: false,
            references: {
                model: 'User',
                key: 'username'
            }
        },
        content: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
        postID : {
            type: Sequelize.INTEGER,
            allowNull: false,
            references : {
                model: 'Post',
                key: 'idpost'
            }
        },
        votes: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    })

    return Comment;
}