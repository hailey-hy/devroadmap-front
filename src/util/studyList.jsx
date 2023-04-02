//프로젝트 전체에서 쓰이는 프론트/백 별 로드맵 항목을 반환하는 함수
import { STUDY_LIST } from "../components/UI/Constants"

export const studyList  = (field) => {
    if (field === 'front'){
        return STUDY_LIST.FRONT
    }
    else{
        return STUDY_LIST.BACK
    }
}