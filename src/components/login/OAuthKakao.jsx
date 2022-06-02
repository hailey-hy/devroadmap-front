const CLIENT_ID = "99753ded86a228fda53902f70c39dee4";
const REDIRECT_URI = "http://localhost:3000/login/oauth2/code/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;