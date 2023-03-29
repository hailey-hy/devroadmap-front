const MESSAGES = Object.freeze({
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

const ALERT = Object.freeze({
    MAIL_SENT : '인증 이메일 발송!',
    MAIL_SENT_SPECIFIED : '입력하신 이메일로 인증 메일이 발송되었습니다',
    LINK_CLILCK : '메일에서 인증 링크를 클릭해 주세요.'
});

module.exports = {
    MESSAGES,
    DOMAINS,
    ALERT
};