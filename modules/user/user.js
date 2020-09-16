const fs = require('fs');

// Get details of all users
const getAllUsers =  (req, res, next) => {
    try {
        const usersList = fs.readFileSync('database/users.json', 'utf8');
        res.status(200).send({users: JSON.parse(usersList)});
    } catch (error) {
        next(error);
    }
}

// Get detail of a user with Id
const getUser = async (req, res, next) => {
    try {
        const usersList = fs.readFileSync('database/users.json', 'utf8');
        const parsedList = JSON.parse(usersList);
        const filterdUser = parsedList.find(user => user.id === Number(req.params.id));
        res.status(200).send({user: filterdUser});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getUser
}