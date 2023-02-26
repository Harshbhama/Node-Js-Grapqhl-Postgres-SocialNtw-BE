const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const CourseModel = mongoose.model("Course");

router.get('/', (req, res) => {
    res.json({
        error: false,
        data: "Course Controller2"
    })
})


router.post('/addData', (req, res) => {
    var course = new CourseModel();
    for(var key in req.body){
        course[key] = req.body[key]
    }
    course["courseId"] = Math.ceil(Math.random() * 100000);
    course.save((err, doc) => {
        err = err ? res.json({
            error: true,
            data: "Error while adding data to database", err
        }) : 
        res.json({
            error: false,
            data: `Data added successfully ${course}`
        })
    })
})

router.get('/list', (req, res) => {
    CourseModel.find((err, docs) => {
        if(err){
            res.json({
                error: true,
                data: err
            })
        }else{
            res.json({
                error: false,
                data: docs
            })
        }
    })
    
})

module.exports = router;