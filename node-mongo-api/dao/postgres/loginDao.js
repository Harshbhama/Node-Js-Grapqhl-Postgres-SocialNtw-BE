const { pool } = require("../../postgresql/db");

async function findExistingUser(email){
  return new Promise(async (resolve, reject) => {
    try{
      const res = await pool.query(
        `Select from Login where Email = '${email}'`
      );
      resolve(res);
    }
    catch(err){
      console.log(err)
      reject(err)
    }
  })
}
async function insertUser(email, first_name, last_name, password){
  return new Promise(async(resolve, reject) => {
    try{
      const res = await pool.query(
        `INSERT INTO LOGIN (email, first_name, last_name, password)
        VALUES ('${email}','${first_name}','${last_name}','${password}');`
      )
      resolve(res);
    }catch(err){
      console.log(err)
      reject(err)
    }
  })
}

async function getPassword(email, password){
  return new Promise(async (resolve, reject) => {
    try{
      const res = await pool.query(
        `Select Password, ID from Login where Email = '${email}'`
      )
      console.log("res",res);
      resolve(res);
    }catch(err){
      reject(err)
    }
  })
}

module.exports = {
  findExistingUser: findExistingUser,
  insertUser: insertUser,
  getPassword: getPassword
}