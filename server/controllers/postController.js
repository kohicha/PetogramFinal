import postModel from '../models/post.js'

const getPosts = async (req, res) =>{
  try {
    const posts = await postModel.getPosts();
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Failed to get posts.'})
  }
}

const getPost = async (req, res) =>{
  try {
    const post_id = req.params.post_id
    const posts = await postModel.getPost(post_id);
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Failed to get posts.'})
  }
}

const getUserPosts = async (req, res) => {
  try {
    
    const user_id = req.params.user_id
    
    const posts = await postModel.getUserPosts(user_id);
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Failed to get user posts.'})
  }
}

const createNewPost = async (req, res) => {
  try{
    const user_id = req.user.user_id
    const {title, body} = req.body
    console.log(user_id)
    const newPost = await postModel.createNewPost(title, body, user_id)
    res.status(201).json(newPost)
  } catch(error){
    console.log('Error creating post:', error)
    res.status(500).json({errot: 'Failed to create post'})
  }
}
export default {
  getPosts,
  getPost,
  getUserPosts,
  createNewPost
}
