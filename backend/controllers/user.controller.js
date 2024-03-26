const User = require('../models/user.js').User;

// Getting all users 
const getUsers = async (req, res) => {
    let success = true;
    try {
        const users = await User.find().select("-password")

        return res.status(201).json({
            success,
            data : users
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
};

module.exports = {  getUsers };

