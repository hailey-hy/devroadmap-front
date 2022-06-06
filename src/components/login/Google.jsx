import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Button from 'react-bootstrap/Button'

const clientId =
"205100228103-nvntl7cnvc3kmpouiub00ercnqhifgum.apps.googleusercontent.com";

function Google(props) {

  async function onSuccess(res) {
    const profile = res.getBasicProfile();
    const userdata = {
      email: profile.getEmail(),
      name: profile.getName(),
    }; 
    // 로그인 성공 후 실행하기 원하는 코드 작성.
  
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
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default Google;