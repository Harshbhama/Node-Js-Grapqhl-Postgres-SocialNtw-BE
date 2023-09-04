const express = require("express");
const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const router = express.Router();
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

require('dotenv').config();

const User = mongoose.model("Login");

router.get('/', (req, res) => {
    res.json({
        error: false,
        data: "Login Controller"
    })
    console.log(req.cookies);
})

router.post('/register', async(req, res) => {
    const {email, first_name, last_name, password} = req.body

    const oldUser = await User.findOne({ email });
    if(oldUser){
        res.json({
            error: true,
            msg: "User Already Exist. Please Login"   
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
      res.json({
        error: false,
        msg: "User created successfully",
        data: user
      })
    }
    
})

router.post('/login', async(req, res) => {
    console.log(req.cookies)
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user){
      let compare = await bcrypt.compare(password, user.password);
      if(user && await bcrypt.compare(password, user.password)){
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user._doc.token = token
        res.cookie("rest_cookie","aaaaaaa", {
          httpOnly: true,
          maxAge: 1000000000
        })
        res.json({
          error: false,
          msg: "User Logged in successfully",
          data: user
        })
      }else{
        res.json({
          error: true,
          msg: "Incorrect Username or Password",
          data: null
        })
      }
    }else{
      res.json({
        error: true,
        msg: "Incorrect Username or Password",
        data: null
      })
    }   
})

module.exports = router;