
const User = require('../../model/User.model')


function create( user )
{
   return new Promise(async (resolve, reject)=>{
        try 
        {
            const newUser = new User( user )
            const result = await newUser.save() 
            resolve()
        }
        catch(e)
        {
            console.log(' Error occured while creating User ')
            console.log(e)
            e.status = 500 
            reject(e) 
        }
   })
}


module.exports = { create }