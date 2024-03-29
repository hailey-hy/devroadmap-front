import axios from 'axios';


//axios 모듈화

if(localStorage.getItem("user")){
    var instance = axios.create({
        baseURL: "https://localhost:8080/",
        // baseURL: "https://osikxvzfbu.us19.qoddiapp.com/",
        params: {
            Authorization: "Bearer " + localStorage.getItem("user")
        },
        method: 'get'
    })
} else {

    //회원 가입, 로그인 api 요청시 JWT 토큰 미포함

    var instance = axios.create({
        baseURL: "https://localhost:8080/",
        // baseURL: "https://osikxvzfbu.us19.qoddiapp.com/",
        method: 'get'
    })
}


export default instance
