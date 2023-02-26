import axios from 'axios'
import { loginUser } from '../actions/postAction'
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

