const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const { addTourService, getTourService, getTourStats, getTourMonthlyStats, getTourIdService } = require("../services/tourService");


router.post('/addTour', async (req, res) => {
    console.log(req.body);
    try{
        let service = await addTourService(req.body);
        res.json(service);
    }catch(err){
        res.json(err);
    }
})

router.post('/getTours', async (req, res) => {
    try{
        let service = await getTourService();
        res.json(service);
    }catch(err){
        res.json(err);
    }
})

router.post('/getToursId', async (req, res) => {
    try{
        let service = await getTourIdService(req.body.id);
        res.json(service)
    }catch(err){
        res.json(err)
    }
})

router.post('/getTourStats', async (req, res) => {
    try{
        let service = await getTourStats();
        res.json(service);
    }catch(err){
        res.json(err);
    }
})
router.post('/getMonthlyStats', async (req, res) => {
    try{
        let service = await getTourMonthlyStats();
        res.json(service);
    }catch(err){
        res.json(err);
    }
})


module.exports = router;