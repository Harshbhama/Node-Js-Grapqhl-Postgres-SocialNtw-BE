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
async function getStoryByUserId(user_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await pool.query(`
        Select story_id from Login 
        Inner Join liked_by
        on Login.id = liked_by.user_id
        where user_id = ${user_id}
        `)
      resolve(res);
    } catch (err) {
      console.log(err)
    }
  })
}
async function makeLikeDao(user_id, story_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const insertIntoLikedBy = await pool.query(`
      Insert into liked_by (story_id, liked_by_user_id)
      Values(${story_id},${user_id})
      `)
      const updateLikeCount = await pool.query(`
      Update Stories 
      Set like_count = like_count + 1
      Where id = ${story_id}
      `)
      resolve(true)
    } catch (err) {
      reject(false)
    }
  })
}

async function unLikeDao(user_id, story_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteFromLikedBy = await pool.query(`
      Delete from liked_by
      where story_id = ${story_id} and liked_by_user_id = ${user_id}
      `)
      const updateLikeCount = await pool.query(`
      Update Stories 
      Set like_count = like_count - 1 
      Where id = ${story_id}
      `)
      resolve(true)
    } catch (err) {
      reject(false)
    }
  })
}

module.exports = {
  likeStoryDao: likeStoryDao,
  getStoryByUserId: getStoryByUserId,
  makeLikeDao: makeLikeDao,
  unLikeDao: unLikeDao,
}