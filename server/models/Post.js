const mongoose = require('mongoose');
const { ObjectId } = mongoose.SchemaTypes;

const feedSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    user_id:{
        type: ObjectId,
        required: true
    }
    
}, { timestamps: true });

module.exports = new mongoose.model('Feeds', feedSchema);