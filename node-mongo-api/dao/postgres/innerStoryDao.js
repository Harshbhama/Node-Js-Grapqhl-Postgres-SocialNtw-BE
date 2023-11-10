const { pool } = require("../../postgresql/db");
async function uploadInnerStory(inner_picture, story_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await pool.query(
        `Insert into Inner_Stories(inner_picture, inner_story_id, liked_by_user_inner_story)
        Values('${inner_picture}', ${story_id}, null)
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

module.exports = {
  uploadInnerStory: uploadInnerStory,
  deleteInnerStory: deleteInnerStory
}