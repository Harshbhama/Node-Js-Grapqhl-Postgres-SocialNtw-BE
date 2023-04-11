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

module.exports = {
  findDao: findDao,
  addDao: addDao,
  findByIdDao: findByIdDao,
  deleteOneManyDao: deleteOneManyDao
}