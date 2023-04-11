const express = require("express");
const router = express.Router();
var { listService, addService, updateService, deleteOneManyService } = require("../services/coursesService");
router.get('/', (req, res) => {
  res.json({
    error: false,
    data: "Course Controller2"
  })
})

router.post('/addData', async (req, res) => {
  let service = await addService(req, res);
  res.json(service)

})
router.get('/list', async (req, res) => {
  let service = await listService(req, res);
  res.json(service);
})
router.post('/update', async (req, res) => {
  let service = await updateService(req, res);
  res.json(service);
})
router.post('/deleteOneMany', async (req, res) => {
  try{
    let service = await deleteOneManyService(req, res);
    res.json(service);
  }catch(err){
    console.log("IN catch block",err);
  }
})


module.exports = router;