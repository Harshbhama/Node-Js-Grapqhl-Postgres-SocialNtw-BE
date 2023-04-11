const express = require("express");
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
  res.json({
    error: false,
    data: "Learn Javascript"
  })


  /*
      // Non Primitive data types are always passed by reference.

      var k = {name: 'abc'}
      var p = JSON.parse(JSON.stringify(k)) ; // Shalow Clone
      p.name = 'ccc';

  */


  /*
      // Higher Order function
      
      function higherOrder(){
          return function(){
              return "abc"
          }
      }
      var k = higherOrder();
      console.log(k())

  */

  /* Call Method in javascript

      function sayHello (){
          return "Hello" + this.name
      }

      let obj = {name: 'test'}
      console.log(sayHello.call(obj));



      var person = {
          age: 23,
          getAge : function(){
              return this.age;
          }
      }

      let person2 = {age: 25}
      console.log(person.getAge.call(person2))
      

      // This is the way of invoking with this.

      let person3 = {age: 25 ,getAge: person.getAge}
      console.log(person3.getAge())

      //Call takes arguments

      function test(agr1, arg2){
          console.log("agr1", agr1);
          console.log("arg2",arg2)
          console.log("name", this.name);
      }
      test.call({name: "harsh"},'aaa', 'bbbb')



  */


  /*
      //Apply takes array

      function testN(agr1, arg2){
          console.log("agr1", agr1);
          console.log("arg2", arg2);
          console.log("name", this.name);
      }
      testN.apply({name: "harsh"},['aaa', 'kkk'])

  */

  /*
      //Bind the function to the object person2

      var person = {
          age: 23,
          getAge : function(){
              return this.age;
          }
      }

      let person2 = {age: 25}
      console.log(person.getAge.bind(person2)())
  */

  /*
      Closures are functions that refer to independent (free) variables. 
      In other words, the function defined in the closure ‘remembers’ 
      the environment in which it was created


      https://www.freecodecamp.org/news/lets-learn-javascript-closures-66feb44f6a44/
      
      function numberGenerator() {
          var num = 1;
          function getNum(){
              console.log(num);
          }
          num++;
          return getNum;
      }
      var number =  numberGenerator();
      number();



  */
  
})
module.exports = router;