const Post = require('../models/Post');

const createPost = async(req, res)=>{
  try{
    const post = await Post.create({
      user : req.user._id,
      text : req.body.text,
    });
    
    res.status(201).json(post);
  }catch(error){
    res.status(500).json({message : error.message});
  }
}

module.exports = {createPost};