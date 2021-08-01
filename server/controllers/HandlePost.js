const router = require('express').Router();
const requireLogin = require('../middlewares/requireLogin');
const Post = require('../models/Post');

router.post('/', requireLogin ,async (req,res) => {
    try {
        const { caption } = req.body;
        const newPost = new Post({
            author: `${req.user.first_name} ${req.user.last_name}`,
            caption,
            user_id: `${req.user._id}`

        });
        await newPost.save();
        res.status(201).json({message: "Post added."});
    }
    catch(err) {
        res.status(500).json({error: "Something went wrong."});
        console.log(console.error());
    }
});

module.exports = router;
