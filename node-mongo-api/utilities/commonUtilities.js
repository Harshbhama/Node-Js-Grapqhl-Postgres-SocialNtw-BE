const axios = require("axios");
var jwt = require("jsonwebtoken");
async function getIndianCities() {
  let arr = []
  let temp = 1
  return new Promise(async (resolve, reject) => {
    try {
      const getToken = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
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
          if (++temp === res.data.length + 1) {
            resolve(arr);
          }
        })
        console.log(arr);
      }).catch(err => {
        console.log("Error in getting cities", err)
        reject(err);
      })
    } catch (err) {
      console.log(err)
    }
  })

}

async function getNestedCities(state_name, getToken) {
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
function convertToFirstUpper(e) {
  const lower = e.toLowerCase()
  const firstUpper = lower.charAt(0).toUpperCase() + lower.slice(1);
  return firstUpper
}
function getAuthForBooking(e) {
  const url = 'https://api.makcorps.com/auth';
  const payload = {
    username: 'harshbhama',
    password: 'harsh19971997'
  };
  const headers = {
    'Content-Type': 'application/json'
  };
  return new Promise((resolve, reject) => {
    axios.post(url, payload, { headers })
      .then(response => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
        console.error(err);
      });
  })
}
function getHotels(authToken, selectedCity) {
  const url = `https://api.makcorps.com/free/${selectedCity}`;
  const headers = {
    'Authorization': `JWT ${authToken}`
  };
  return new Promise((resolve, reject) => {
    axios.get(url, { headers })
    .then(response => {
      // console.log(response.data);
      resolve(response.data)
    })
    .catch(error => {
      console.error(error);
      reject(error);
    });
  })
 
}

const authoraziation = async(token) =>{
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_KEY , (err, dt) => {
      if (err) {     
        reject(err)
      }
      else {
        console.log(dt)
        resolve(dt);
        // req.session.userData = dt
        next()
      }
    })
  })
  
}


module.exports = {
  getIndianCities: getIndianCities,
  convertToFirstUpper: convertToFirstUpper,
  getAuthForBooking: getAuthForBooking,
  getHotels: getHotels,
  authoraziation: authoraziation
}