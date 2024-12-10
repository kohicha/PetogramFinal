import db from '../db/connection.js'
import { v4 as uuidv4 } from 'uuid'

const getShelterById = async (shelterId) => {
  try {
    const result = await db.query('SELECT * FROM shelters WHERE shelter_id = $1', [shelterId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error getting shelter by ID:', error);
    throw error;
  }
};

const updateShelterStatus = async (shelterId, status, reason) => {
  try {
    // You might want to add a 'verification_reason' column to your shelters table
    await db.query(
      'UPDATE shelters SET verification_status = $1, verification_reason = $2 WHERE shelter_id = $3',
      [status, reason, shelterId]
    );
    // Optionally return the updated shelter data
  } catch (error) {
    console.error('Error updating shelter status:', error);
    throw error;
  }
};

export default { getShelterById, updateShelterStatus };

