var { findDao, addDao, findByIdDao, deleteOneManyDao } = require("../dao/coursesDao");
const mongoose = require("mongoose");
const CourseModel = mongoose.model("Course");
async function listService(req, res) {
  return new Promise((resolve, reject) => {
    findDao(CourseModel, true)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

function addService(req, res){
  let course = new CourseModel();
  for(var key in req.body){
    course[key] = req.body[key];
  }
  course["courseId"] = Math.ceil(Math.random() * 100000);
  return new Promise((resolve, reject) => {
    addDao(course).then(res => resolve(res)).catch(err => reject(err));
  })
}

function updateService(req, res){
  const { id } = req.body;
  return new Promise((resolve, reject) => {
    findByIdDao(CourseModel, id).then(res => resolve(res)).catch(err => reject(err))
  })
}

function deleteOneManyService(req, res){
  return new Promise((resolve, reject) => {
    deleteOneManyDao(CourseModel, req.body).then(res => resolve(res)).catch(err => reject(err));
  })
}
  

module.exports = {
  listService: listService,
  addService: addService,
  updateService: updateService,
  deleteOneManyService: deleteOneManyService
}
