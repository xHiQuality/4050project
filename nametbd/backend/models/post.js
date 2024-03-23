const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        idpost: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        tag: {
            type: Sequelize.STRING(20), // Set max length to 20 characters
            //allowNull: false
        },
        header: {
            type: Sequelize.STRING(50), // Set max length to 50 characters
            allowNull: false
        },
        author: {
            type: Sequelize.STRING(20), // Set max length to 20 characters
            allowNull: false,
            references: {
                model: 'User',
                key: 'username'
            }
        },
        content: {
            type: Sequelize.STRING(250), // Set max length to 250 characters
            allowNull: false
        }
    }, {
        timestamps: false
    });
    

    return Post;
}

// create a new post: create(object)
// find a post by id: findByPk(id)
// get all posts: findAll()
// update a post by id: update(data, where: { id: id })
// remove a post: destroy(where: { id: id })
// remove all posts: destroy(where: {})
// find all posts by title: findAll({ where: { title: ... } })