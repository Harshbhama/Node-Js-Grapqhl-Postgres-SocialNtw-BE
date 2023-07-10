const express = require("express")
const router = express.Router()
var {insertIntoDbService, getAllCitiesService, getSearchCitiesService} = require("../services/countriesService");

router.post("/addCountriesToDb", async(req, res) => {
  try{
    let service = await insertIntoDbService(req, res)
    res.json(service);
  }catch(err){
    res.json(err);
  }
})
router.get("/getCountries", async (req, res) => {
  let conditionForDelete  =  req.body.delete
  try{
    let service = await getAllCitiesService(req, res, conditionForDelete)
    res.json(service);
  }catch(err){
    res.json(err);
  }
})
router.post("/searchCities", async (req, res) => {
  let string = req.body.string
  try{
    let service = await getSearchCitiesService(req, res, string)
    res.json(service)
  }
  catch(err){
    res.json(err);
  }
})
module.exports = router;