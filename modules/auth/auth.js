const fs = require('fs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../environments');
const crypto = require('crypto');


const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const usersList = fs.readFileSync('database/users.json', 'utf8');
        const parsedList = JSON.parse(usersList);
        const filterdUser = parsedList.find(user => user.username === username);
        if (_.isEmpty(filterdUser)) {
            return res.status(400).send({ message: "No User" });
        }

        const hashedPassword = crypto.createHmac("sha256", JWT_SECRET).update(password).digest('hex');
        if (hashedPassword === filterdUser.password) {
            const token = jwt.sign({ id: filterdUser.id }, JWT_SECRET, { expiresIn: '5s' });
            return res.status(200).send({ message: "User logged in", token });
        } else {
            return res.status(401).send({ message: "Invalid credentials" });
        }

    } catch (error) {
        next(error);
    }
}

const getProfile = async (req, res, next) => {
    try {
        const userId = req.decoded.id;
        const usersList = fs.readFileSync('database/users.json', 'utf8');
        const parsedList = JSON.parse(usersList).map(e => _.omit(e, ["password"]));
        const filterdUser = parsedList.find(user => user.id === userId);

        if (_.isEmpty(filterdUser)) {
            res.status(400).send({ profile: { message: "No profile found!" } });
        } else {
            res.status(200).send({ profile: filterdUser });
        }

    } catch (error) {
        next(error);
    }
}

module.exports = {
    loginUser,
    getProfile
}
