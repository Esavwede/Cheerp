const User = require('../model/User.model');
const bcrypt = require('bcrypt');

async function createUser (user) {
    try {
        const newUser = await User.create(user)
        return newUser
        // return JSON.parse(JSON.stringify(newUser))
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
        const user = await User.find({email})
        return user
    } catch (error) {
        throw new Error(`Error getting account by email: ${error}`)
    }
};

async function getUserByPhoneNumber(phone_number) {
    try {
        const user = await User.find({phone_number})
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