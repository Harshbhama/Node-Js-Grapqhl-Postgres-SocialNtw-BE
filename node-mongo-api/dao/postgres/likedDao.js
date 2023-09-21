const { pool } = require("../../postgresql/db");
async function likeStoryDao(user_id, story_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await pool.query(`
        Insert into liked_by (story_id, user_id)
        Values ('${story_id}', '${user_id}')
        `)
      resolve(res);
    } catch (err) {
      reject(err);
    }
  })
}
async function getStoryByUserId(user_id){
  return new Promise(async (resolve, reject) => {
    try{
      const res = await pool.query(`
        Select story_id from Login 
        Inner Join liked_by
        on Login.id = liked_by.user_id
        where user_id = ${user_id}
        `)
        resolve(res);
    }catch(err){
      console.log(err)
    }
  })
}
module.exports = {
  likeStoryDao: likeStoryDao,
  getStoryByUserId: getStoryByUserId
}