const express = require("express")
const axios = require("axios");
const router = express.Router()
var {insertIntoDbService, getAllCitiesService, getSearchCitiesService, getAuthBooking} = require("../services/countriesService");

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
router.post("/getHotels", async (req, res) => {
  try{
    const {selectedCity} = req.body
    let service = await getAuthBooking(req, res, selectedCity);
    res.json(service);
  }catch(err){
    res.json(err)
  }
})
module.exports = router;