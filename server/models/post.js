import db from '../db/connection.js'
import { v4 as uuidv4 } from 'uuid'
//get all posts

const getPosts = async () => {
  const result = await db.query('SELECT * FROM posts')
  return result.rows
}

const getPost = async (post_id) => {
  const result = await db.query('SELECT * FROM posts WHERE post_id = $1 LIMIT 1',[post_id])
  return result.rows[0]
}
const getUserPosts = async (user_id) => {
  const result = await db.query('SELECT * FROM posts WHERE user_id = $1', [user_id]);
  return result.rows[0]
}


const createNewPost = async(title, body, user_id) => {
  const post_id = uuidv4();
  const result = await db.query('INSERT INTO posts (post_id ,title, body,user_id) VALUES ($1,$2,$3,$4) RETURNING *', 
  [post_id,title,body, user_id])
  return result.rows[0]
}

export default{
  getPosts,
  getPost,
  getUserPosts,
  createNewPost
}
