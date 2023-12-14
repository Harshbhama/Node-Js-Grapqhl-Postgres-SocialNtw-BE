const { pool } = require("../../postgresql/db");
async function uploadInnerStory(inner_picture, story_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await pool.query(
        `Insert into Inner_Stories(inner_picture, inner_story_id)
        Values('${inner_picture}', ${story_id})
        `
      )
      resolve(res);
    } catch (err) {
      console.log(err)
      reject(false)
    }
  })
}
async function deleteInnerStory(id) {
  return new Promise(async (resolve, reject) => {
    try{
      const res = await pool.query(
        `Delete from Inner_stories where id = ${id}
        `
      )
      resolve(res);
    }catch(err){
      reject(err);
    }
  })
}
async function deleteLikedInnerStory(id){
  return new Promise(async (resolve, reject) => {
    try{
      const res = await pool.query(
        `Delete from Liked_inner_story
        Where liked_inner_story_id = ${id}
        `
      )
      resolve(res);
    }catch(err){
      reject(err);
    }
  })
}
async function innerIdLikes(id) {
  return new Promise(async (resolve, reject) => {
    try{
      const res = await pool.query(
        `Select liked_inner_story_id, json_agg(liked_by_user_inner_story) as liked_by_users from Liked_inner_story 
        Group By liked_inner_story_id
        Having liked_inner_story_id = ${id}
        `
      )
      resolve(res);
    }catch(err){
      reject(err);
    }
  })
}
async function likeInnerStory(liked_inner_story_id, liked_by_user_inner_story){
  return new Promise(async (resolve, reject) => {
    try{
      const res = await pool.query(
        `Insert Into Liked_Inner_Story (liked_inner_story_id, liked_by_user_inner_story)
        Values(${liked_inner_story_id}, ${liked_by_user_inner_story})
        `
      )
      resolve(res);
    }catch(err){
      reject(err)
    }
  })
}
async function unlikeInnerStory(liked_inner_story_id, liked_by_user_inner_story){
  return new Promise(async(resolve, reject) => {
    try{
      const res = await pool.query(
        `Delete from Liked_Inner_Story
        where (liked_inner_story_id = ${liked_inner_story_id} and liked_by_user_inner_story = ${liked_by_user_inner_story})`
      )
      resolve(res);
    }catch(err){
      reject(err)
    }
  })
}

module.exports = {
  uploadInnerStory: uploadInnerStory,
  deleteInnerStory: deleteInnerStory,
  innerIdLikes: innerIdLikes,
  deleteLikedInnerStory: deleteLikedInnerStory,
  likeInnerStory: likeInnerStory,
  unlikeInnerStory: unlikeInnerStory
}