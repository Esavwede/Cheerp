
const user = require('../../services/User/user.service') 


const create = async function(req, res, next)
{
    try 
    {
        const userData = req.body 
        await user.create( userData ) 
        res.send(' User created ')
    }
    catch(e)
    {
        console.log(' Error occured while creating user ')
        res.send(' Error ') 
    }
}



module.exports = { create }