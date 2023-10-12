const { pool } = require("../../postgresql/db");
async function createStory(description, picture, user_id, title){
  return new Promise(async(resolve, reject) => {
    try{
      const res = await pool.query(
        `Insert into Stories(description, picture, user_id, title)
        Values( '${description}', '${picture}', ${user_id}, '${title}')
        `
      )
      resolve(res)
    }catch(err){
      console.log(err)
      reject(false)
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
async function getStoriesWithLikes(id, byId = false, page, docs){
  return new Promise(async (resolve, reject) => {
    try{
      let res;
      if(!byId){
         res = await pool.query(`
         Select id, title, user_id, json_agg(liked_by_user) as liked_by_user, Count(liked_by_user) as liked_count, description, picture, count(*) over () as num_rows
         From Stories Left Join liked
         on Stories.id = liked.liked_story_id
         Group By id
         Order By id desc
         Limit ${docs}
         OFFSET ${(page-1) * docs}
      `)
      }else{
         res = await pool.query(`
         Select id, title, user_id, json_agg(liked_by_user) as liked_by_user, Count(liked_by_user) as liked_count, description, picture, count(*) over () as num_rows
          From Stories Left Join liked
          on Stories.id = liked.liked_story_id
          Group By id
          Having user_id = ${id}
          Order By id desc
          Limit ${docs}
          OFFSET ${(page-1) * docs}
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