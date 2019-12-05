require("dotenv").config();

module.exports = {
  "development": {
    "username": "root",
    "password": "yourRootPassword",
    "database": "game",
    "host": "localhost",
    "dialect": "mysql"
   
  },
  "test": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
};
