import * as types from "../types";
export const fetchposts = () => async dispatch => {
  dispatch({
    type: types.GET_POSTS,
    payload: ['1st', '2nd', '3rd']
  })
}

export const loginUser = (payload) => async dispatch => {
  dispatch({
    type: types.LOGIN_USER,
    payload: payload
  })
}