/**
 * User Profile model
 * Extends user information
 */

const db = require('../config/db');

/**
 * Create user_profiles table
 */
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      phone_number VARCHAR(20),
      city VARCHAR(100),
      country VARCHAR(100),
      additional_info TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
  `;

  try {
    await db.query(query);
    console.log('Ensuring user_profiles table exists');
  } catch (error) {
    console.error('Error ensuring user_profiles table exists:', error);
  }
};

/**
 * Find profile by user ID
 * @param {number} userId - User ID
 * @returns {Promise<object>} Profile object or null
 */
const findByUserId = async (userId) => {
  try {
    const result = await db.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error finding user profile:', error);
    throw error;
  }
};

/**
 * Create or update profile
 * @param {object} profileData - Profile data
 * @returns {Promise<object>} Created/updated profile
 */
const upsert = async (profileData) => {
  const { userId, firstName, lastName, phoneNumber, city, country, additionalInfo } = profileData;
  try {
    const query = `
      INSERT INTO user_profiles (user_id, first_name, last_name, phone_number, city, country, additional_info)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (user_id) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        phone_number = EXCLUDED.phone_number,
        city = EXCLUDED.city,
        country = EXCLUDED.country,
        additional_info = EXCLUDED.additional_info,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
    const values = [userId, firstName, lastName, phoneNumber, city, country, additionalInfo];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error upserting user profile:', error);
    throw error;
  }
};

module.exports = {
  createTable,
  findByUserId,
  upsert
};