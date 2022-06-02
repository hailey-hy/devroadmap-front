//네이버
import React from 'react'

const href = window.location.href;
let params = new URL(document.location).searchParams;
let code = params.get("code");
let state = params.get("state");

const Naver = async () => {
    try {
      const result = await axios.get(
        `${NAVER_AUTH_URL}/api/v1/oauth2/authorization/naver?code=${code}&state=${state}`
      );
    } catch (error) {
      console.log("error", error);
    }
    return (
        result
    )
}

export default Naver