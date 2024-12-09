import db from '../db/connection.js'
import { v4 as uuidv4 } from 'uuid'
// get all users
const getUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows.map(user => ({
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    location: user.location,
    biographhy: user.biography
  })) 
}

const getExpertUsers = async () => {
  const role = 'expert'
  const result = await db.query('SELECT * FROM users WHERE role = = $1', [role]);
  return result.rows.map(user => ({
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    location: user.location,
    biographhy: user.biography
  })) 
}
const getUserByID = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
  const user = result.rows[0]
  return user
}


const getUserByUsername = async (username) => {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0]
  return user 
}

const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0]
  return user
}

const addPostToFavorite = async (userId, postId) => {
  try {
    const favorite_id = uuidv4();
    const existingFavorite = await db.query(
      'SELECT 1 FROM favorites WHERE user_id = $1 AND post_id = $2',
      [userId, postId]
    );
    if (existingFavorite.rows.length > 0) {
      throw new Error('Post is already in favorites'); 
    }

    await db.query(
      'INSERT INTO favorites (favorite_id,user_id, post_id) VALUES ($1, $2, $3)',
      [favorite_id,userId, postId]
    );

    return { message: 'Post added to favorites' }; 
  } catch (error) {
    console.error('Error adding post to favorites:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
export default {
  getUsers,
  getUserByID,
  getUserByUsername,
  getUserByEmail,
  addPostToFavorite
}