require("dotenv").config();
   
module.exports = {
  "development": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql"
  },  
  "test": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST, 
    "dialect": "mysql",
    "logging": false
  },   
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }    
};
 