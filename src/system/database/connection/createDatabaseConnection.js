
require('dotenv').config() 
const mongoose = require('mongoose')


const DB_URI = process.env.DB_URI 
const DB_OPTIONS = { useNewUrlParser: true, }

console.log(DB_URI);


function createDatabaseConnection()
{
    return new Promise((resolve, reject)=>{
        try 
        {
            
            console.log(' Creating Database Connection ') 
            mongoose.connect(DB_URI,DB_OPTIONS)
            const db = mongoose.connection 


            // Database Connection Events 

            db.once('connected',()=>{
                console.log(' Database Connection Created Successfully ') 
                resolve( db ) 
            })

            db.on('error',(e)=>{
                console.log('DATABASE_ERROR')
                console.log(e) 
            })

            db.on('connected',()=>{
                console.log(' Database Connected ')
            }) 

            db.on('disconnected',()=>{
                console.log(' Database disconnected ') 
            })

            db.on('reconnected',()=>{
                console.log(' Database reconnected ') 
            })

        }
        catch(e)
        {
            console.log('DATABASE_CONNECTION_ERROR: ERROR OCCURED WHILE CREATING DATABASE CONNECTION')
            console.log(e) 
            reject() 
        }
    })
}


module.exports = { createDatabaseConnection } 

