import * as types from '../types';
const initialState = {
  loginDetails:{}
}
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      let newDataObject = Object.assign(state.loginDetails, {...action.payload});
      return {
        ...state,
        ...newDataObject
      }
    default:
      return state;
  }
}