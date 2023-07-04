require('dotenv').config() 


const { MongoClient } = require('mongodb');

const uri = process.env.DB_URI ; // Replace with your MongoDB connection URI
const databaseName = process.env.DB_NAME; // Replace with the desired database name

async function createDatabase() {
  const client = new MongoClient(uri);

  try {

    console.log(' Creating API Database ')
    
    // Connect to the MongoDB server
    await client.connect();

    // Get the list of existing database names
    const databaseNames = await client.db().admin().listDatabases();
    const existingDatabases = databaseNames.databases.map(db => db.name);

    if (!existingDatabases.includes(databaseName)) {
      // Create the database
      await client.db(databaseName).createCollection('dummy');
      console.log(`Database '${databaseName}' created successfully.`);
    } else {
      console.log(`Database '${databaseName}' already exists.`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}


// Call the function to create the database when the server starts
// createDatabase()
//   .catch(error => console.error('Error running createDatabase:', error));


module.exports = { createDatabase }