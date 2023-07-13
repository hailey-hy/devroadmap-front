// 헤더 (Header)
const HEADER = Object.freeze({
    TITLE : '개발 정원'
})

// 푸터 (Footer)
const FOOTER = Object.freeze({
    BACK : 'Backend Developer',
    BACK_NAME : '양정민',
    BACK_EMAIL : 'wjdals0814@naver.com',
    FRONT : 'Frontend Developer',
    FRONT_NAME : '전해연',
    FRONT_EMAIL : 'lillyine.hy@gmail.com',
    ILLUST : 'Illustrator',
    ILLUST_NAME : '한유나',
    ILLUST_EMAIL : 'yunahan914@gmail.com',
    COPYRIGHT : 'Copyright 2022.Team Gardener all rights reserved.'
})

// 회원 가입 (Join, JoinMail)
const JOIN_MESSAGES = Object.freeze({
    JOIN_1 : '회원 가입 (1/2)',
    JOIN_2 : '회원 가입 (2/2)',
    JOIN : '회원 가입',
    EMAIL : '이메일',
    EMAIL_AUTH : '이메일 인증',
    GO_BACK : '뒤로 가기'
});

const JOIN_ALERT = Object.freeze({
    MAIL_SENT_TITLE : '인증 이메일 발송!',
    MAIL_SENT_BODY : '인증 메일이 발송되었습니다. \n 메일에서 인증 링크를 클릭해 주세요. ',
    DONE_TITLE : '회원 가입 완료!',
    DONE_BODY : '회원가입이 완료되었어요.',
    FAIL_TITLE : '회원가입 양식 미완성!',
    FAIL_BODY : '정상적인 회원가입을 위해 모든 항목을 완료해 주세요.',
});

// 로그인 (Login)
const LOGIN_MSSAGES = Object.freeze({
    LOGIN : '로그인',
    JOIN : '회원 가입'
});

const LOGIN_PLACE_HOLDERS = Object.freeze({
    EMAIL : '이메일',
    PW : '비밀번호'
});

const LOGIN_ALERT = Object.freeze({
    TITLE : '로그인 실패',
    BODY : '이메일 또는 비밀번호를 확인해 주세요.'
})
// 진도율 (Status)
const STATUS = Object.freeze({
    STUDY_FRONT : '공부를 시작한지 ',
    STUDY_BACK : '일',
    RATE : '전체 진도율 ',
    PERCENT : '%'
});

//내브바 (Nav)
const  NAV = Object.freeze({
    USER : '님',
    LOGIN : '로그인',
    LOGOOUT : '로그아웃',
    MAIN : '메인',
    RECORD : '정원 기록',
    FRIEND : '친구 목록',
    NOTE : '방명록',
    EDIT : '회원 정보 수정',
    DELETE : '회원 탈퇴'
});

const NAV_ALERT = Object.freeze({
    DEL_TITLE : '회원 탈퇴',
    DEL_BODY : '정말 회원을 탈퇴할까요?',
    DEL_DONE_TITLE : '회원 탈퇴 완료!',
    DEL_DONE_BODY : '회원 탈퇴되었어요.',
});

// 방명록 (Note, Memo)
const NOTE = Object.freeze({
    TITLE : '방명록'
});

const MEMO = Object.freeze({
    NO_MEMO : '아직 작성된 방명록이 없어요.'
});

// 회원 정보 수정 (Edit)
const EDIT = Object.freeze({
    TITLE : '회원 정보 수정',
})

const EDIT_ALERT = Object.freeze({
    DONE_TITLE : '회원 정보 수정 완료!',
    DONE_BODY : '입력하신 정보로 회원 정보가 수정되었어요.',
    FAIL_TITLE : '회원정보 수정 양식 미완성!',
    FAIL_BODY : '확인되지 않은 항목이 있어요.',
})

// 친구의 정원 (FrinedGarden)
const FR_GARDEN = Object.freeze({
    TITEL : '님의 정원입니다.',
    ADD_NOTE : '방명록 남기기',
})

const FR_GARDEN_ALERT = Object.freeze({
    ADD_NOTE_TITLE : '님께 방명록 남기기',
    ADD_NOTE_PLACEHOLDER : '200자 이하의 메시지만 남길 수 있습니다.',
    ADD_NOTE_TEXT_COUNT : '0/200',
    DONE_NOTE_TITLE : '방명록 작성 완료!',
    DONE_NOTE_BODY : '방명록을 남겼어요.',
})

// 정원 기록 (Record, Bubbles)
const RECORD = Object.freeze({
    TITLE : '정원 기록',
    NONE : '아직 기록이 없어요.'
})

// 친구 목록 (FrinedList, FriendItem, FriendAddList, SearchResult, RandomFrinedBack, RandomFriendFront)
const FRIEND = Object.freeze({
    TITLE : '친구 목록',
    SEARCH : '정원사 검색',
    TOUR : '다른 정원 둘러보기',
    NO_FRIEND : '아직 친구가 없어요.',
    ACCEPT : '수락',
    DECLINE : '거절',
    NO_ADD : '아직 친구 신청이 없어요.',
    ACCEPT_OK : '수락 완료!',
    DECLINE_OK : '거절 완료!',
    ADD_OK : '신청 완료!',
    NO_RESULT : '검색 결과가 없어요.',
    PROCESSING : '친구 신청 대기 중입니다.'
})

const FRIEND_TOOLTIP = Object.freeze({
   CHECK : '친구 신청을 확인해 보세요!',
   SEARCH_FAIL : '검색할 정원사의 이름을 입력해 주세요.'
})

const FRIEND_ALERT = Object.freeze({
    ADD_LIST_TITLE : '친구 신청 목록',
    SEARCH_LIST_TITLE : '정원사 검색 결과',
    SEARCH_LIST_BODY : '정원사 검색 결과',
    DEL_TITLE : '친구 삭제',
    DEL_BODY : '님을 삭제할까요?',
    DEL_DONE_TITLE : '친구 삭제',
    DEL_DONE_BODY : '삭제되었어요.',
})

// 공용 사용 목록

const STUDY_LIST = Object.freeze({
    FRONT : ['인터넷', 'HTML', 'CSS', 'JS', '버전관리', '웹 보안 지식', '패키지 관리자', 'CSS설계', 'CSS전처리기', '빌드 툴', '프레임워크', 'CSS in JS', '타입 체커', 'CSS프레임워크', '테스트', '서버 사이드 렌더링', '그래프 QL', '정적 사이드 생성기'],
    BACK : ['인터넷', '프론트 기본 지식', 'OS', '언어', '버전관리', 'DB', 'API', '캐시', '웹 보안 지식', '테스트', 'CI/CD', '개발 설계 원칙', '아키텍처 패턴', '검색엔진', '메시지 브로커', '컨테이너화 vs 가상화', '그래프 QL', '웹서버', '확장성 있는 구축']
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

const USER_INPUT = Object.freeze({
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
    PROFILE : '프로필 사진',
})

// 버튼 (BUTTON)
const BUTTON = Object.freeze({
    OK : '확인',
    CLOSE : '닫기',
    SEARCH : '검색',
    ADD : '남기기',
    DEL : '삭제',
    CANCLE : '취소'
})

module.exports = {
    HEADER,
    FOOTER,
    JOIN_MESSAGES,
    DOMAINS,
    JOIN_ALERT,
    USER_INPUT,
    LOGIN_MSSAGES,
    LOGIN_PLACE_HOLDERS,
    LOGIN_ALERT,
    STATUS,
    NAV,
    NAV_ALERT,
    NOTE,
    MEMO,
    EDIT,
    EDIT_ALERT,
    BUTTON,
    FR_GARDEN,
    FR_GARDEN_ALERT,
    RECORD,
    STUDY_LIST,
    FRIEND,
    FRIEND_TOOLTIP,
    FRIEND_ALERT
};