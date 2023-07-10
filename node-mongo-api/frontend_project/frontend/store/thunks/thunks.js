import axios from 'axios'
import { loginUser, getCityDetal } from '../actions/postAction'
export const loginThunk = (payload) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      let body = {
        email: payload?.username,
        password: payload?.password
      }
      axios.post('http://localhost:4000/authentication/login',body).then(async res => {
        console.log(res)
        dispatch(loginUser(res))
    
        resolve(true)
      }).catch(err => {
        console.log(err)
        reject(false)
      })
    })
}
export const getCitiesDetailsThunk = (payload) => (dispatch) => {
  let string  = payload?.string;
  return new Promise(async (resolve, reject) => {
    let body = {
      string: string
    }
    axios.post("http://localhost:4000/countries/searchCities", body).then(async res => {
      console.log(res)
      dispatch(getCityDetal(res))
      resolve(true)
    }).catch(err => {
      console.log(err)
      reject(false)
    })
  })
}
