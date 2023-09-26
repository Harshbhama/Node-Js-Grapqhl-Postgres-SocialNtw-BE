const { pool } = require("../../postgresql/db");
async function createStory(description, picture, like_count, user_id){
  return new Promise(async(resolve, reject) => {
    try{
      const res = await pool.query(
        `Insert into Stories(description, picture, like_count, user_id)
        Values('${description}', '${picture}', ${like_count}, ${user_id})
        `
      )
      resolve(res)
    }catch(err){
      reject(err)
    }
  })
}
async function deleteStoryDao(id){
  return new Promise(async (resolve, reject) => {
    try{
      const res = await pool.query(`
      Delete from Stories where ID = ${id}
      `)
      resolve(res)
    }
    catch(err){
      reject(err)
      console.log(err)
    }
  })
}
async function updateStoryDao(id, description, picture, like_count){
  return new Promise(async (resolve, reject) => {
    try{
      const res = await pool.query(`
      Update Stories 
      Set description = '${description}' , picture = '${picture}' , like_count = ${like_count} 
      Where id = ${id}
      `)
      resolve(res);
    }
    catch(err){
      reject(err)
      console.log(err)
    }
  })
}
async function getStories(id, byId = false){
  return new Promise(async (resolve, reject) => {
    try{
      if(byId){
        const res = await pool.query(`
        Select * from Stories where user_id = ${id}
        `)
        resolve(res);
      }else{
        const res = await pool.query(`
        Select * from Stories
        `)
        resolve(res);
      }
    }catch(err){
      reject(err);
    }
    
  })
}
async function getStoriesWithLikes(id, byId = false){
  return new Promise(async (resolve, reject) => {
    try{
      let res;
      if(!byId){
         res = await pool.query(`
        Select Stories.id, liked_by.story_id, like_count, user_id, title, liked_by_user_id, description, picture From Stories
        LEFT Join liked_by
        on Stories.id = liked_by.story_id
        where (liked_by_user_id = '${id}' OR liked_by_user_id is NULL)
      `)
      }else{
         res = await pool.query(`
        Select Stories.id, liked_by.story_id, like_count, user_id, title, liked_by_user_id, description, picture From Stories
        LEFT Join liked_by
        on Stories.id = liked_by.story_id
        where ((liked_by_user_id = ${id} OR liked_by_user_id is NULL) AND user_id = ${id})
      `)
      }
      resolve(res)
    }catch(err){
      reject(err)
      console.log(err)
    }
  })
}
module.exports={
  createStory: createStory,
  deleteStoryDao: deleteStoryDao,
  updateStoryDao: updateStoryDao,
  getStories: getStories,
  getStoriesWithLikes: getStoriesWithLikes
}