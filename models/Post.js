const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    requied : true
  },
  text : {
    type : String,
    required : true,
  },
  likes : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    }

  ]
},{timestamps : true})

module.exports = mongoose.model('Post',postSchema)