const {validationResult} = require('express-validator')
const {generateToken} = require('../authentication/user.auth')
const user = require('../services/user.service') 
const { v4: uuidv4 } = require('uuid');
const logger = require('../system/logger/index') 


const {
    createUser,
    getUserById,
    getUserByEmail,
    hashPassword,
    getUserByPhoneNumber
} = require('../services/user.service')



async function signup(req, res) {
    const errors = validationResult(req)
    try {
        // Check if all required fields are provided
        if (!req.body.email || !req.body.phone_number || !req.body.password) {
            res.status(400).json({ 
                    success: false, 
                    message: "Please enter all required fields"
            });
            return;
        };
        const {email, phone_number, password} = req.body;
        
        // Validate email and password
        if (!errors.isEmpty()) {    
            const error = errors.array()[0];
            if (error.param === 'email') {
                return res.status(400).json({success: false, message: 'Please enter a valid email address'});
            }
            if (error.param === 'password') {
                return res.status(400).json({success: false, message: 'Password must be at least 8 characters long, must contain at least one lowercase letter, one uppercase letter, one number and one special character.'});
            }
        }
     
        // Check if email is already registered
        const userExists = await getUserByEmail(email)

        if ( userExists !== null ) { 
            res.status(400).json({ success: false, message: "Email is already registered"}) 
            return;
        };

        // Check if phone number is already registered
        const phoneNumberExists = await getUserByPhoneNumber(phone_number)
        if ( phoneNumberExists !== null ) {
            res.status(400).json({ success: false, message: "Phone number Registered is already"}) 
            return;
        };
       
        // Hash password, create user and return message to user
        const hashed_password = await hashPassword(password);
        const userId = uuidv4() 
        const user = await createUser({email, phone_number, password: hashed_password, userId})


        res.status(201).json({ 
            success: true,
            message : "Your account has been created successfully", 
            user}) 


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating your account",
            error: error.message
        });
    };
};

async function login(req, res) {

    const errors = validationResult(req)

    try {
       if (!req.body.phone_number || !req.body.password) {
          res.status(400).json({ 
             success: false, 
             message: "Please enter phone number and password"
          });
          return;
       };
       const {phone_number, password} = req.body;

       // Check if email entered is correct or registered
       const user = await getUserByPhoneNumber(phone_number)

       if ( user === null ) {
          res.status(400).json({ success: false, message: "Account not found"})
          return;
       };
       
       const token = await generateToken( user.toJSON() );
       
       res.status(200).json({
            success: true,
            message: "You have successfully logged in",
            user, 
            token
       });

    } catch (e) {
        logger.error(e,' Signin Error ') 
        return res.status(500).json({
            success: false,
            message: "An error occurred during signin "
        });
    };
};





















async function getAccount(req, res) {
    try {
        const user = await getUserById(req.buyer.id);
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Account not found"
            });
            return;
        };
        res.status(200).json({ 
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting user's account details",
            error: error.message
        });
    };
};

async function deleteAccount (req, res) {
    try {
        const deletedAccount = await deleteUserAccount(req.user.id)
        if (deletedAccount === 1) { 
            res.status(200).send({
                success: true,
                message: "Your account has been deleted!"
            })
            return
        };
        res.status(400).send({
            success: false,
            message: "You do not have an account, sign up to create an account"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting your account',
            error: error.message
        });
    };
};


module.exports = { signup, login, getAccount, deleteAccount }