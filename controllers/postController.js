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

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {createPost,getAllPosts,getMyPosts};