function findDao(model, fromCourse) {
  return new Promise((resolve, reject) => {
    if(fromCourse){
      model.find()
      // .select('courseName')
      .populate('userID')
      .then(res => resolve({ error: false, data: res })).catch(err => reject({ error: true, data: err }))
    }else{
      model.find().then(res => resolve({ error: false, data: res })).catch(err => reject({ error: true, data: err }))
    }
  })
}

function addDao(model){
  return new Promise((resolve, reject) => {
    model.save((err, docs) => {
      if(err){
        reject({error: true, data: err })
      }else{
        resolve({err: false, data: docs});
      }
    })
  })
}

function findByIdDao(model, id){
  return new Promise((resolve, reject) => {
    model.findById(id).then(res => resolve({error: false, data: res})).catch(err => reject({error: true, data: err}));
  })
}

function deleteOneManyDao(model, body){
  return new Promise((resolve, reject) => {
    if(body["delete_condition"]=== 'one'){
      delete body.delete_condition
    }else{
      delete body.delete_condition
      model.deleteMany(body).then(res => resolve({error: false, data: res})).catch(err => reject({error: true, data: err}))
    }
  })
}

function findOne(model, name){
  return new Promise((resolve, reject) => {
    model.findOne({videoName: name}).then(res => resolve({error: false, data: res})).catch(err => reject({error: true, data: err}))
  })
}

function listAllData(model, obj){

  return new Promise((resolve, reject) => {
    model.find(obj).then(res => resolve({error: false, data: res})).catch(err => reject({error: true, data: err}))
  })
}

function addTourDao(model, obj){
  return new Promise((resolve, reject) => {
    model.create(obj).then(res => resolve(res)).catch(err => reject(err))
  })
}
function getTourDao(model){
  return new Promise(async (resolve, reject) => {
    
    const query = model.find({})
    //query.then(res => resolve(res)).catch(err => reject(err))
    //Filtering
    
    // model.find()
    // .where('duration')
    // .equals(5)
    // .where('difficulty')
    // .equals('easy').then(res => resolve(res)).catch(err => reject(err))

    // model.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // }).then(res => resolve(res)).catch(err => reject(err))

    //sorting

    //query.sort("-price duration").then(res => resolve(res)).catch(err => reject) ---- -ve sign is for changing the order
    
    // Field limiting

    // query.select('name duration difficulty price').then(res => resolve(res)).catch(err => reject)
    // query.select('-name -duration').then(res => resolve(res)).catch(err => reject)  --- -ve sign is to exclude from select


    // Pagination

    // const page = 2, limit = 3;
    // const skip = (page-1)*limit;

    // const numTours = await model.countDocuments(); //To find number
    // console.log(numTours);

    //page=2&limit=3

    // query.skip(skip).limit(limit).then(res => resolve(res)).catch(err => reject)
    
  })
}
  function getTourStatsDao(model){
    return new Promise((resolve, reject) => {
      const stats = model.aggregate([
        {
          $match: { ratingsAverage : {$gte: 4.5} }
        },
       { 
        $group: {
          _id: '$difficulty', 
          numTours: {$sum: 1}, // Each document going through the pipeline, num will be added --- just like k = k+ 1
          numRatings: { $sum: '$ratingsQuantity'},
          avgRating: { $avg: '$ratingsAverage'},
          avgPrice: { $avg: '$price'},
          minPrice: { $min: '$price'},
          maxPrice: { $max: '$price'}
        }
      },
      {
        $sort: { avgPrice: 1} // For ascending sort as 1, for descending sort as -1
      }
      ]).then(res => resolve(res)).catch(err => reject(err))
    })
  }
  function getMonthlyPlanDao(model) {
    return new Promise((resolve, reject) => {
      let year = 2021;
      const plan = model.aggregate([
        {
          $unwind: '$startDates' //splits array and converts it into documents
        },
        {
          $match: {
            startDates: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`)}
          }
        },
        {
          $group: {
            _id: { $month : '$startDates'}, // month is the aggregate operator -- To get month from date
            numTours: {$sum: 1},
            tours: { $push: '$name'} // push is used to add into array
          }
        },
        {
          $addFields: { month: '$_id'} // To add field
        },
        {
          $project: {
            _id: 0 // id no longer shows up.
          }
        },
        {
          $sort: { numTours: -1}
        },
        {
          $limit: 12 // To have only 12 outputs
        }
      ]).then(res => resolve(res)).catch(err => reject(err))
    })
  }

module.exports = {
  findDao: findDao,
  addDao: addDao,
  findByIdDao: findByIdDao,
  deleteOneManyDao: deleteOneManyDao,
  findOne:findOne,
  listAllData: listAllData,
  addTourDao: addTourDao,
  getTourDao: getTourDao,
  getTourStatsDao: getTourStatsDao,
  getMonthlyPlanDao: getMonthlyPlanDao
}