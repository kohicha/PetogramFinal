import db from '../db/connection.js'
import { v4 as uuidv4 } from 'uuid'

const createNewUser = async(email, username, first_name, last_name, password, location) => {
  const user_id = uuidv4();
  const result = await db.query('INSERT INTO users (user_id,email, username, first_name, last_name, password, location) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', 
  [user_id,email,username, first_name, last_name, password, location])
  return result.rows[0]
}

const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0]
  return user
}

const getUserByID = async (id) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
    const user = result.rows;
    return user;
  } catch (error) {
    throw error;
  }
};


export default{
  createNewUser,
  getUserByEmail,
  getUserByID
}
