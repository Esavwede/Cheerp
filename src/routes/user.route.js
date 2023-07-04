const express = require('express')
const router = express.Router() 
const { verifyToken } = require('../authentication/user.auth')
const {signup, login} = require('../controller/user.controller')

// module.exports = function(app)
//     {
//         try 
//         {
//             router.post('/', user.create )
//             app.use('/user', router )
            
//             console.log(' User routes created ')
//         }
//         catch(e)
//         {
//             console.log(' Error occured while creating user routes ')
//             console.log(e) 
//         }
//     }

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;

