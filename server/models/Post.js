const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    newPost: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

const PostModel = mongoose.model('posts', PostSchema);

module.exports = PostModel;