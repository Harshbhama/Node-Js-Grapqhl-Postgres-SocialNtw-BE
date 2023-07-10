const axios = require("axios");
async function getIndianCities () {
  let arr = []
  let temp = 1
  return new Promise (async (resolve, reject) => {
    try{
      const getToken = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken",{
        headers: {
          "Accept": "application/json",
          "api-token": "__3IraJdwU8icPd83q07nEabZ10R1aZsIbr_6pP4clFBoGIJW3-c-nBVCRJDfkqvgYg",
          "user-email": "harshbhama96@gmail.com"
        }
      })
      const data = await axios.get("https://www.universal-tutorial.com/api/states/India", {
        headers: {
          "Authorization": `Bearer ${getToken?.data?.auth_token}`,
          "Accept": "application/json"
        }
      }).then(res => {
        console.log(res.data.length)
        res.data.forEach(async (val, index) => {
            let cities = await getNestedCities(val?.state_name, getToken);
            arr = [...arr, ...cities.data]
            // console.log(++temp);
            if(++temp === res.data.length + 1){
              resolve(arr);
            }
        })
        console.log(arr);
      }).catch(err => {
        console.log("Error in getting cities", err)
        reject(err);
      })
    }catch(err){
      console.log(err)
    }
  })
  
}

async function getNestedCities (state_name, getToken){
  let cities = await axios.get(`https://www.universal-tutorial.com/api/cities/${state_name}`,
    {
      headers: {
        "Authorization": `Bearer ${getToken?.data?.auth_token}`,
        "Accept": "application/json"
      }
    }
  ) 
  return cities;
}
function convertToFirstUpper(e){
  const lower = e.toLowerCase()
  const firstUpper = lower.charAt(0).toUpperCase() + lower.slice(1);
  return firstUpper
}

module.exports = {
  getIndianCities: getIndianCities,
  convertToFirstUpper: convertToFirstUpper
}