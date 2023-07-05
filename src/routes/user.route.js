const express = require('express')
const router = express.Router() 
const {body} = require('express-validator')
const { verifyToken } = require('../authentication/user.auth')
const {signup, login, getAccount, deleteAccount} = require('../controller/user.controller')

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

router.post(
    '/signup', 
    body('email').isEmail(), 
    body('password')
    .isLength({min: 8})
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/), 
    signup
    );
    
router.post('/login', body('email').isEmail(), login);
router.get('/read', verifyToken, getAccount)
router.delete('/delete', verifyToken, deleteAccount)

module.exports = router;

