require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PostModel = require('./models/Post');
const UserModel = require('./models/user');
const CommentModel = require('./models/comment');
const dbUrl = process.env.ATLASDB_URL;




const app = express()
app.use(cors());
app.use(express.json());



// mongoose.connect('mongodb://127.0.0.1:27017/kennect');

async function main() {
    await mongoose.connect(dbUrl);
}


main()
    .then((res) => {
        console.log('connected to DB' + res);
    })
    .catch((err) => {
        console.log(err);
    })



app.get('/', async (req, res) => {
    try {
        const posts = await PostModel.find();
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'error while getting post',
            error
        })
    }
})

// create post
app.post('/create', async (req, res) => {
    try {
        // Check if the user exists, and if not, create a new user
        const { name } = req.body.user;
        let user = await UserModel.findOne({ name });
        if (!user) {
            user = await UserModel.create({ name });
        }

        // Create the post and associate it with the user
        const post = await PostModel.create({ ...req.body, user: user._id });
        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'error while creating post',
            error
        })
    }
});



// show post
app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const singlePost = await PostModel.findById(id)
        if (!singlePost) {
            return res.status(404).send({
                success: false,
                message: 'post not found with this id',
            })
        }
        return res.status(200).send({
            success: true,
            message: 'fetch single post',
            singlePost
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'error while getting single post',
            error
        })
    }
})

// users
app.post('/user', async (req, res) => {
    try {
        const { name } = req.body
        // Check if user already exists
        const existingUser = await UserModel.findOne({ name });

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists'
            });
        }

        // If user doesn't exist, create a new user
        const newUser = new UserModel({ name })
        await newUser.save()
        return res.status(200).send({
            success: true,
            message: 'User saved successfully',
            user: newUser
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error While Creating user',
            error
        })
    }
})


// comments
app.post('/:id/comments', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found with this id',
            });
        }

        // Create the comment
        const comment = await CommentModel.create(req.body);

        // Associate the comment with the post
        post.comments.push(comment);
        await post.save();

        return res.status(200).send({
            success: true,
            message: 'Comment saved successfully',
            comment: comment // send the created comment
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while creating comment',
            error
        });
    }
});

// Fetch all comments for a specific post
app.get('/:id/comments', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findById(postId).populate('comments');
        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found with this id',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Fetch comments for the post',
            comments: post.comments
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while fetching comments',
            error
        });
    }
});

app.listen(3001, () => {
    console.log('server listening');
})