const mongoose = require("mongoose");
const TourModel = mongoose.model("Tour");

var { addTourDao, getTourDao, getTourStatsDao, getMonthlyPlanDao } = require("../dao/coursesDao");

const addTourService = async (obj) => {
  try {
    return (await addTourDao(TourModel, obj));
  } catch (err) {
    return (err)
  }
}
const getTourService = async () => {
  try {
    return (await getTourDao(TourModel));
  } catch (err) {
    return (err)
  }
}

const getTourStats = async () => {
  try {
    return (await getTourStatsDao(TourModel));
  } catch (err) {
    return (err)
  }
}
const getTourMonthlyStats = async () => {
  try{
    return (await getMonthlyPlanDao(TourModel))
  }catch(err){
    return(err)
  }
}
  module.exports = {
    addTourService: addTourService,
    getTourService: getTourService,
    getTourStats: getTourStats,
    getTourMonthlyStats: getTourMonthlyStats
  }