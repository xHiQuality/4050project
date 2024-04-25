const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        iduser: {
            type: Sequelize.INTEGER,
            primaryKey: true, // Define id as primary key
            autoIncrement: true // Assuming id is auto-incrementing
        },
        username: {
            type: Sequelize.STRING(20),
            allowNull: false, // Specify NOT NULL constraint
            unique: true // Add unique constraint
        },
        password: {
            type: Sequelize.STRING(20),
            allowNull: false, // Specify NOT NULL constraint
        },
        accountImage: {
            type: Sequelize.STRING(500),
            allowNull: true,
        },
        bio: {
            type: Sequelize.STRING(250),
            allowNull: true
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: true
        }
    }, {
        timestamps: false
    });
    

    return User;
};

// create a new user: create(object)
// find a user by id: findByPk(id)
// get all users: findAll()
// update a user by id: update(data, where: { id: id })
// remove a user: destroy(where: { id: id })
// remove all users: destroy(where: {})
// find all users by title: findAll({ where: { title: ... } })