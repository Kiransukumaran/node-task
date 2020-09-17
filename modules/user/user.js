const fs = require('fs');
const _ = require('lodash');
const { validationResult } = require('express-validator')

// Get details of all users
const getAllUsers = (req, res, next) => {
    try {
        const usersList = fs.readFileSync('database/users.json', 'utf8');
        res.status(200).send({ users: JSON.parse(usersList) });
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

        if (_.isEmpty(filterdUser)) {
            res.status(400).send({ user: { message: "No user found!" } });
        } else {
            res.status(200).send({ user: filterdUser });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getUser
}
