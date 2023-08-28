const mongoose = require("mongoose");
const User = mongoose.model("Login");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { findExistingUser, insertUser, getPassword } = require("../../dao/postgres/loginDao");

const resolvers = {
  createUser: async ({ email, first_name, last_name, password }) => {
    console.log(email);
    try{
      let user = await findExistingUser(email);
       console.log(user.rows);
      if(!(user.rows.length>0)){
        console.log("here")
        let encryptedPassword = await bcrypt.hash(password, 10);
        let user = await insertUser( email, first_name, last_name, encryptedPassword);
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        return({
          error: false,
          msg: "Data inserted",
          token: token
        })
       
      }else{
        return({
          error: true,
          msg: "User already exists"
        })
      }
    }
    catch(err){
      console.log(err)
    }
    return ({
      email: email
    })
  },
  loginUser: async ({email, password}) => {
    let queriedPass = await getPassword(email);
    let ID = queriedPass.rows[0].id
    queriedPass  = queriedPass.rows[0].password
    let compare = await bcrypt.compare(password, queriedPass);
    if(compare){
      const token = jwt.sign(
        { user_id: ID, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
        return({
          error: false,
          msg: "User logged in successfully",
          token: token,
          user_id: ID
        })
    }else{
      return({
        error: true,
        msg: "Wrong Password"
      })
    }
  }
};

module.exports = resolvers;