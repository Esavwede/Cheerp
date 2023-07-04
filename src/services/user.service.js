const User = require('../model/User.model');
const bcrypt = require('bcrypt');

async function createUser (user) {
    try {
        const newUser = await User.create(user)
        return newUser
        // return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        throw new Error(`Error creating user's account: ${error}`)
    }
};

async function getUserById(id) {
    try {
        const user = await User.find({id})
        return user
    } catch (error) {
        throw new Error(`Error getting user's account by id: ${error}`)
    }
};

async function getUserByEmail(email) {
    try {
        const user = await User.find({email})
        return user
    } catch (error) {
        throw new Error(`Error getting user's account by email: ${error}`)
    }
};

async function getUserByPhoneNumber(phone_number) {
    try {
        const user = await User.find({phone_number})
        return user
    } catch (error) {
        throw new Error(`Error getting user's account by phone number: ${error}`)
    }
}

const userFunctions = {
    createUser,
    getUserById,
    getUserByEmail,
    getUserByPhoneNumber
}

module.exports = userFunctions