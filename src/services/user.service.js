const User = require('../model/User.model');
const bcrypt = require('bcrypt');
const { omit } = require('lodash') 


async function createUser (user) {
    try {
        var newUser = await User.create(user)
        newUser = newUser.toJSON() 
        newUser = omit( newUser, ['password','messagesIds'] )
        console.log( newUser ) 
        return newUser 
    } catch (error) {
        throw new Error(`Error creating account: ${error}`)
    }
};


async function getUserById(id) {
    try {
        const user = await User.find({id})
        return user
    } catch (error) {
        throw new Error(`Error getting account by id: ${error}`)
    }
};

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({email})
        return user
    } catch (error) {
        throw new Error(`Error getting account by email: ${error}`)
    }
};

async function getUserByPhoneNumber(phone_number) {
    try {
        var user = await User.findOne({phone_number},{ userId: 1, email: 1, phone_number: 1, messagesIds: 1,  _id: 0 })
        return user
    } catch (error) {
        throw new Error(`Error getting account by phone number: ${error}`)
    }
}

async function hashPassword (password) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash
    } catch (error) {
        throw new Error(`Error hashing password: ${error}`);
    };
};

async function deleteAccount(id) {
    try {
        const deleted = await User.deleteOne({ id })
        return deleted
    } catch (error) {
        throw new Error(`Error deleting password: ${error}`);
    }
}

const userFunctions = {
    createUser,
    getUserById,
    getUserByEmail,
    hashPassword,
    getUserByPhoneNumber
}

module.exports = userFunctions