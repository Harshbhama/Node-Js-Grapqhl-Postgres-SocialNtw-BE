import React from "react";

const loginCheck = (loginDetails) => {
  if(!loginDetails?.data?.error){
    localStorage.setItem("Login_Token", loginDetails?.data?.data?.token);
  }
}
export default loginCheck