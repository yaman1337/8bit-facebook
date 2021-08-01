const router = require('express').Router();
const Post = require('../models/User');

router.get('/', async (req,res) => {
   try {   
       const data = await Post.find();
       res.status(200).json({data})
   }
   catch(err) {
       res.status(500).json({error: "Something went wrong."});
   }
});

module.exports = router;