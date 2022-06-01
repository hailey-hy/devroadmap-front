// 카카오
import React from 'react'

const href = window.location.href;
let params = new URL(document.location).searchParams;
let code = params.get("code");

const Kakao = (props) => async () => {
    try {
      const result = await axios.get(
        `${KAKAO_AUTH_URL}/api/v1/oauth2/authorization/kakao?code=${code}`
      );
    } catch (error) {
      console.log("error", error);
    }
  return (
    result
  )
}

export default Kakao