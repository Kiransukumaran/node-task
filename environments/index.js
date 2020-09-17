const applicationEnv = process.env.NODE_ENV || 'dev';
// load the envrionment variables from json
const enviroment = require('./env.js');

if (applicationEnv === 'prod') {
    enviroment = enviroment.prod;
} else if (applicationEnv === 'uat') {
    enviroment = enviroment.uat;
} else {
    enviroment = enviroment.dev;
}

module.exports = enviroment;
