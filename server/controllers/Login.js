const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const  { SECRET } = process.env;
const jwt = require('jsonwebtoken');

router.post('/', async (req,res) => {
    try {
       const { email, password } = req.body;
       const unautherr = "Invalid credentials."

       if(!email || !password) return res.status(422).json({error: unautherr});

       const isUser = await User.findOne({ email });
       if(!isUser) return res.status(404).json({error: unautherr});
    
       const isPass = await bcrypt.compare(password, isUser.password);
       if(!isPass) return res.status(403).json({error: unautherr});

       const token = jwt.sign({ id: isUser._id }, SECRET);
       res.status(200).json({access_token: token, user: isUser.first_name + isUser.last_name});

    }
    catch(err) {
        res.status(500).json({error: "Something went wrong."});
        console.log(err);
    }
});

module.exports = router;