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

const getUserFavorites = async (user_id) => {
  const result = await db.query(`SELECT p.* 
       FROM posts p
       JOIN favorites f ON p.post_id = f.post_id
       WHERE f.user_id = $1`,
      [user_id]);
  return result.rows
}

const createNewPost = async(title, body, user_id) => {
  const post_id = uuidv4();
  const result = await db.query('INSERT INTO posts (post_id ,title, body,user_id) VALUES ($1,$2,$3,$4) RETURNING *', 
  [post_id,title,body, user_id])
  return result.rows[0]
}

const createShelterRegistrationForm = async (
  userId,
  shelter_license,
  shelter_registration,
  owner,
  name,
  address,
  google_maps_link,
  description,
  email,
  phone,
  website,
  open_hours,
  close_hours
) => {
  const shelter_form_id = uuidv4()
  try {
    const result = await db.query(
      `INSERT INTO shelter_registration_form (
        shelter_form_id,
        user_id, 
        shelter_license, 
        shelter_registration, 
        owner, 
        name, 
        address, 
        google_maps_link, 
        description, 
        email, 
        phone, 
        website, 
        open_hours, 
        close_hours
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14) RETURNING *`,
      [
        shelter_form_id,
        userId,
        shelter_license,
        shelter_registration,
        owner,
        name,
        address,
        google_maps_link,
        description,
        email,
        phone,
        website,
        open_hours,
        close_hours,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating shelter registration form:", error);
    throw error;
  }
};
const getPendingShelterRegistrations = async () => {
  try {
    const result = await db.query(
      `SELECT 
        srf.*, 
        u.username AS owner  
       FROM shelter_registration_form srf
       JOIN users u ON srf.user_id = u.user_id
       WHERE srf.shelter_registration_status = 'reviewing'`
    );
    return result.rows;
  } catch (error) {
    console.error('Error getting pending shelter registrations:', error);
    throw error;
  }
};

const createShelter = async (
  owner,
  name,
  address,
  google_maps_link,
  description,
  email,
  phone,
  website,
  open_hours,
  close_hours
) => {
  try {
    const result = await db.query(
      `INSERT INTO shelters (
        owner, 
        name, 
        address, 
        google_maps_link, 
        description, 
        email, 
        phone, 
        website, 
        open_hours, 
        close_hours
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        owner,
        name,
        address,
        google_maps_link,
        description,
        email,
        phone,
        website,
        open_hours,
        close_hours,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating shelter:', error);
    throw error;
  }
};

const getShelterRegistrationById = async (shelterFormId) => {
  try {
    const result = await db.query(
      'SELECT * FROM shelter_registration_form WHERE shelter_form_id = $1',
      [shelterFormId]
    );
    return result.rows[0]; // Return the first row (if found)
  } catch (error) {
    console.error('Error getting shelter registration by ID:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default{
  getPosts,
  getPost,
  getUserPosts,
  getUserFavorites,
  createNewPost,
  createShelterRegistrationForm,
  getPendingShelterRegistrations,
  createShelter,
  getShelterRegistrationById
}
