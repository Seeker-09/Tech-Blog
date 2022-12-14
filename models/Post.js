const { Model, DataTypes, Sequelize } = require("sequelize")
const sequelize = require("../config/connection")

// create post model
class Post extends Model {}

// Create columns for Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        createdAt: {
            type: Sequelize.DATEONLY
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post"
    }
)

module.exports = Post