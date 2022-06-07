import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Button from 'react-bootstrap/Button'
import Axios from 'axios';

const clientId =
"205100228103-nvntl7cnvc3kmpouiub00ercnqhifgum.apps.googleusercontent.com";

function Google(props) {

  async function responseGoogle(response) {
    // const profile = res.getBasicProfile();
    // const userdata = {
    //   email: profile.getEmail(),
    //   name: profile.getName(),
    // }; 
    console.log(1, response);
    let jwtToken = await Axios.post(
      "http://localhost:8080/oauth/jwt/google",
      JSON.stringify(response)
      //config
    );
    if (jwtToken.status === 200) {
      console.log(2, jwtToken.data);
      localStorage.setItem("jwtToken", jwtToken.data);
    }
  }

  const onFailure = (res) => {
    console.log("err", res);
  };

  return (
      <>
      <GoogleLogin
        clientId={clientId}
        render={renderProps => (
            <Button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn-login-select">GOOGLE</Button>
          )}
        buttonText="GOOGLE" // 버튼에 뜨는 텍스트
        onSuccess={responseGoogle}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default Google;