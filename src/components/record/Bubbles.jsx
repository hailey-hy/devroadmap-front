import React from 'react'
import './record.css'
import seed from '../../assets/img-record/씨앗.png'
import long from '../../assets/img-record/쟁기질 줄 긴버전.png'
import medium from '../../assets/img-record/쟁기질 줄 중간버전.png'
import short from '../../assets/img-record/쟁기질 줄 짧은 버전.png'
import gardener from '../../assets/img-record/정원사 호미.png'
import { useSelector } from 'react-redux'


const Bubbles = ({record, loading, first}) => {
    const frontList = useSelector(state => state.frontList);
    const backList = useSelector(state => state.backList);
    const field = useSelector(state => state.field);
    const item = []
    console.log(record)

    if(record.length >= 1){
        for(let i = 0; i < record.length; i++){
            // 항목명
            var subject_num = record[i].object;
            console.log(record[i].user_field)
            
            if(field === 'front'){
                var subject = frontList[subject_num - 1];
            }else{
                var subject = backList[subject_num - 1];
            }
            console.log(subject);

            // 저장해뒀던 first를 이용하여 가장 최신 항목에 정원사 표시
            if(record[i] === first){
                var imgGardener = 'show gardener'
            } else {
                var imgGardener = 'hide gardener'
            }

            item.push(
                <div className="container-content">
                <div className='gardener-container'>
                    <div>
                    <img src={gardener} alt="" className={imgGardener}/>
                    </div>
                    <img src={seed} alt="seed" className='seed'/>
                </div>
                <div className="record-bubble">
                    <div className='container-bubble'>

                        <h5 className='record-date'>{record[i].completedate}</h5>
                        
                            <h5 className='record-subject'>{subject}</h5>
                        
                    </div>
                </div>
            </div>
            )}

  return (
    <>
        {loading && <div> <h5>loading... </h5></div>}
        {item}
    </>
  )} else {
      return(
        <>
            <br></br>
            <br></br><br></br>
            <h5>아직 기록이 없어요.</h5>
        </>
      )
  }
}

export default Bubbles;