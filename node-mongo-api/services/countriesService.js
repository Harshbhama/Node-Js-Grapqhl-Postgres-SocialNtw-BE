var { insertCountriesDb, getAllCitiesDb, fetchSearchDb } = require("../dao/coursesDao");
var {getIndianCities} = require("../utilities/commonUtilities");

const mongoose = require("mongoose");
const CountryModel = mongoose.model("Countries");

async function insertIntoDbService(req, res) {
  let cities = await getIndianCities();
  if(req.body.cities){
    cities = req.body.cities
  }
  return new Promise((resolve, reject) => {
    insertCountriesDb(CountryModel, cities).then(resolve(res)).catch(err => reject(err))
  })
}

async function getAllCitiesService(req, res, delete_condition) {
  return new Promise((resolve, reject) => {
    getAllCitiesDb(CountryModel, delete_condition).then(res => resolve(res)).then(err => reject(err))
    // insertCountriesDb(CountryModel, cities).then(resolve(res)).catch(err => reject(err))
  })
}
async function getSearchCitiesService(req, res, string){
  return new Promise((resolve, reject) => {
    fetchSearchDb(CountryModel, string).then(res => resolve(res)).then(err => reject(err))
  })
}
module.exports = {
  insertIntoDbService: insertIntoDbService,
  getAllCitiesService: getAllCitiesService,
  getSearchCitiesService: getSearchCitiesService
}