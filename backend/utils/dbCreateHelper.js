require('dotenv').config();
const dbName = process.env.DATABASE_NAME;
const pgtools = require('pgtools');

const dbConfig = {
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  host: '127.0.0.1'
};


const  initializeDatabase = async() => {
  try {
    // Check if the database exists
   await pgtools.createdb(dbConfig, dbName);
   console.log(`Database ${dbName} created`);

  } catch (error) {
    if(error.message === "Attempted to create a duplicate database."){
        console.log("Database Already Exists");
    }else{
        console.error('An error occurred:', error);
        throw error;
    }
  }
}

module.exports = {
    initializeDatabase
}