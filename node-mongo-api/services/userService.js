var { addDao, findDao } = require("../dao/coursesDao");
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");

const addUserService = (req, res) => {
  let user = new UserModel();
  user.name = "Harsh";
  user.email = "test@xyz.com";
  user.cart = { items: []}
  return new Promise((resolve, reject) => {
    addDao(user).then(res => resolve(res)).catch(err => reject(err));
  })
}
const listUserService = (req, res) => {
  return new Promise((resolve, reject) => {
    findDao(UserModel).then(res => resolve(res)).catch(err => reject(err))
  })
}
module.exports = {
  addUserService: addUserService,
  listUserService: listUserService
}

