const User = require("../models/User");
require('dotenv').config();
const { SECRET } = process.env;
const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    const { authorization } =  req.headers;
    if(!authorization) return res.status(403).json({error: "You are not logged in."});

    const token = authorization.split(' ')[1];
    jwt.verify(token, SECRET, async (err, payload) => {
        if(err) return res.status(403).json({error: "You are not logged in."});

        const { id } = payload;
        const data = await User.findById(id);
        req.user = data;
        next();
    });
}
