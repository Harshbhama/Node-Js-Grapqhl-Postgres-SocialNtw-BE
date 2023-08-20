const mongoose = require("mongoose");
const User = mongoose.model("Login");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const resolvers = {
  getUser: async ({ id }) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      throw new Error("Error retrieving user");
    }
  },
   getUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw new Error("Error retrieving users");
    }
  },
  createUser: async ({ email, first_name, last_name, password }) => {
    const oldUser = await User.findOne({ email });
    if(oldUser){
      return({
        error: true,
        msg: "User Already Exists. Please login",
        data: {email: ""}
      })

    }else{
      let encryptedPassword = await bcrypt.hash(password, 10);
      let user = await User.create({
        email: email,
        password: encryptedPassword,
        first_name: first_name,
        last_name: last_name
      })
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user._doc.token = token
      return ({
        error: false,
        msg: "User created successfully",
        data: user
      })
      // res.json({
      //   error: false,
      //   msg: "User created successfully",
      //   data: user
      // })
    }
  },
  updateUser: async ({ id, first_name, last_name, password }) => {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { first_name, last_name, password },
        { new: true }
      );
      return user;
    } catch (err) {
      throw new Error("Error updating user");
    }
  },
  deleteUser: async ({ id }) => {
    try {
      const user = await User.findByIdAndRemove(id);
      return user;
    } catch (err) {
      throw new Error("Error deleting user");
    }
  },
};

module.exports = resolvers;