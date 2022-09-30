/**
 * DB에 저장된 프로필 값이 null이라면 기본 프로필 사진으로 return하는 함수
 * @param profile DB에 저장된 프로필 값
 * @returns profile이 null이라면 기본 프로필 사진을, !null이라면 profile을 return
 */

import basicImg from '../assets/basic-profile.png'

export const profileCheck = (profile) => {
    if (profile == null || profile.length == 0){
        return basicImg
    }
    else{
        return profile
    }
}