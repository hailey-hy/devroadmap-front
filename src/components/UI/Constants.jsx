// 회원 가입
const JOIN_MESSAGES = Object.freeze({
    JOIN_1 : '회원 가입 (1/2)',
    JOIN_2 : '회원 가입 (2/2)',
    EMAIL : '이메일',
    EMAIL_AUTH : '이메일 인증'
});

const DOMAINS = Object.freeze({
    AT : '@',
    CHOOSE : '선택',
    NAVER : 'naver',
    GOOGLE : 'google',
    DAUM : 'daum',
    KAKAO : 'kakao',
    USER_INPUT : '직접 입력'
});

const JOIN_ALERT = Object.freeze({
    MAIL_SENT : '인증 이메일 발송!',
    MAIL_SENT_SPECIFIED : '인증 메일이 발송되었습니다. \n 메일에서 인증 링크를 클릭해 주세요. '
});

// 로그인
const LOGIN_MSSAGES = Object.freeze({
    LOGIN : '로그인',
    JOIN : '회원 가입'
});

const LOGIN_PLACE_HOLDERS = Object.freeze({
    EMAIL : '이메일',
    PW : '비밀번호'
});

module.exports = {
    JOIN_MESSAGES,
    DOMAINS,
    JOIN_ALERT,
    LOGIN_MSSAGES,
    LOGIN_PLACE_HOLDERS
};