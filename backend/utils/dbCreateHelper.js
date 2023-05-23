require('dotenv').config();
const dbName = process.env.DATABASE_NAME;
const pgtools = require('pgtools');

const dbConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  host: '127.0.0.1'
};


const initializeDatabase = async () => {
  try {
    // Create database if not present
    await pgtools.createdb(dbConfig, dbName);
    console.log(`Database ${dbName} created`);

  } catch (error) {
    if (error.message === "Attempted to create a duplicate database.") {
      console.log("Database Already Exists");
    } else {
      console.error('An error occurred:', error);
      throw error;
    }
  }
}

module.exports = {
  initializeDatabase
}