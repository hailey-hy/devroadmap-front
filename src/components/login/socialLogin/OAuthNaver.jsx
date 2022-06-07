const CLIENT_ID = "VFvNcrWzjXpxwYiNQc9y";
const STATE_STRING = "y_7EEvJ0nd";
const CALLBACK_URL = "http://localhost:3000/login/oauth2/code/naver";

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${CALLBACK_URL}`;