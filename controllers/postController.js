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

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await post.deleteOne();

    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if already liked
    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    post.likes.push(req.user._id);
    await post.save();

    res.json({ message: 'Post liked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.likes = post.likes.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );

    await post.save();

    res.json({ message: 'Post unliked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {createPost,getAllPosts,getMyPosts,deletePost,likePost,unlikePost} ;