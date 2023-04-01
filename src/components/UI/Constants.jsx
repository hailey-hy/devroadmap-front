// 회원 가입
const JOIN_MESSAGES = Object.freeze({
    JOIN_1 : '회원 가입 (1/2)',
    JOIN_2 : '회원 가입 (2/2)',
    JOIN : '회원 가입',
    EMAIL : '이메일',
    EMAIL_AUTH : '이메일 인증',
    GO_BACK : '뒤로 가기'
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
    MAIL_SENT_TITLE : '인증 이메일 발송!',
    MAIL_SENT_BODY : '인증 메일이 발송되었습니다. \n 메일에서 인증 링크를 클릭해 주세요. ',
    DONE_TITLE : '회원 가입 완료!',
    DONE_BODY : '회원가입이 완료되었어요.',
    FAIL_TITLE : '회원가입 양식 미완성!',
    FAIL_BODY : '정상적인 회원가입을 위해 모든 항목을 완료해 주세요.',
});

const JOIN_USER_INPUT = Object.freeze({
    NICKNAME : '닉네임',
    NICK_OK : '사용 가능한 닉네임입니다.',
    NICK_FAIL : '다른 닉네임을 사용해 주세요.',
    NICK_RULE : '닉네임은 2~8자리 한글, 영문 소문자, 숫자만 포함 가능해요.',
    NICK_PLACEHOLDER : '2~8자리 한글, 영문 소문자',
    TYPE : '공부 분야',
    EMAIL : '이메일',
    PW : '비밀번호',
    PW_CHECK : '비밀번호 확인',
    PW_CHECK_OK : '비밀번호 확인 완료',
    PW_CHECK_FAIL : '비밀번호가 일치하지 않아요.',
    PW_RULE : '4~10자리 영문 소문자, 숫자를 사용해 주세요.',
})

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
    JOIN_USER_INPUT,
    LOGIN_MSSAGES,
    LOGIN_PLACE_HOLDERS
};