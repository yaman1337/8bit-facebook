const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/', async (req,res) => {
    try {
        const { first_name, last_name, email, gender, password } = req.body;

        if(!first_name || !last_name || !email || !gender || !password) return res.status(422).json({error: "Please add all the fields."});

        const isUser = await User.findOne({ email });
        if(isUser) return res.status(409).json({error: "Email already exists."});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser =  new User({first_name, last_name, email, gender, password: hashedPassword});

        await newUser.save();
        res.status(201).json({message: "Account created successfully."});
    }
    catch(err) {
        res.status(500).json({error: err.message});
        console.log(err);
    }
});

module.exports = router;