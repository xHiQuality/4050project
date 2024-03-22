const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
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
            unique: true // Add unique constraint
        }
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