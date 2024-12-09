import userModel from '../models/user.js'

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users)
  } catch (error){
    console.log(error)
    res.status(500).json({error: 'Failed to get users.'})
  }
}

const getUser = async (req, res) => {
  try{
    const user_id = req.params.user_id;
    const user = await userModel.getUserByID(user_id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error){
    console.log(error)
    res.status(500).json({error: "Failed to get user."})
  }
}


const getUserByUsername = async (req, res) => {
  try{
    const username = req.params.username
    const user = await userModel.getUserByUsername(username);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch(err){
    console.log(err) 
  }
} 
const getUserByEmail = async (req, res) => {
  try{
    const email = req.body.email 
    const user = await userModel.getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch(err) {
    console.log(err)
  }
}

const addToFavorite = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const postId = req.params.post_id;

    await userModel.addPostToFavorite(userId, postId); // Implement this in your userModel
    res.status(201).json({ message: 'Post added to favorites' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
}
export default {
  getUsers,
  getUser,
  getUserByUsername,
  getUserByEmail,
  addToFavorite
}
