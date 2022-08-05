const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

// create user model
class User extends Model {}

// create attributes of user
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "user"
    }
)

module.exports = User