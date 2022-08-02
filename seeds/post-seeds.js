const { Post } = require("../models")

const postData = [
    {
        title: "test title 1",
        body: "test body 1"
    },
    {
        title: "test title 2",
        body: "test body 2"
    },
    {
        title: "test title 3",
        body: "test body 3"
    },
    {
        title: "test title 4",
        body: "test body 4"
    },
    {
        title: "test title 5",
        body: "test body 5"
    }  
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts