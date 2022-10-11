
import React, {} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import instance from '../../api';
import './roadmap.css'

const Objects = (props) => {


  const field = useSelector(state => state.field);

  const dispatch = useDispatch();

    const onCheck = (index) => {
      const target = document.getElementById(index);
      if(target.classList.contains('un-checked')){
        target.classList.remove('un-checked');
        target.classList.add('checked');
        add(index);
      } else {
        target.classList.add('un-checked');
        target.classList.remove('checked');
        withdraw(index);
      }

    }

    const add = (index) => {
      console.log(index)
      //튤립, 민들레, 토끼풀은 함께 처리
      if(index == 11) {
        var targetId = 'img' + 11;
        var target = document.getElementById(targetId);
        target.classList.remove('hide');

        var targetId = 'img' + 12;
        var target = document.getElementById(targetId);
        target.classList.remove('hide');

        var targetId = 'img' + 13;
        var target = document.getElementById(targetId);
        target.classList.remove('hide');

        var subject = index + 1
      } else {
        if(index == 21 && field == 'front') {
          var targetId = 'img' + 6;
        }
        else if(index < 10){
          var targetId = 'img' + (index );
          var subject = index + 1
        }else if(index > 11 && field == 'back'){
          var targetId = 'img' + (index + 2);
          var subject = index + 1
        }
        else if(index > 11){
          var targetId = 'img' + (index + 2);
          var subject = index + 1
        }
        var target = document.getElementById(targetId);
        target.classList.remove('hide');
      }

      //정원사, 사다리
      const ladder = document.getElementById('img16');
      const gardener = document.getElementById('img18');
      const sittingGardener = document.getElementById('img22');

      if(!ladder.classList.contains('hide') 
        && !gardener.classList.contains('hide')){
          ladder.classList.add('hide');
          gardener.classList.add('hide');
          sittingGardener.classList.remove('hide');
      }
      instance({
        url: '/subject/complete/add',
        params: {
          "subject": subject - 1
        }
      }).then(response => {
        console.log('체크 성공');
      }).catch(err => {
        console.error(err);
      });

      setTimeout(() => {
        instance({
        url: '/progressrate',
      }).then(response => {
        dispatch({type: 'load-progress', progress: response.data.progressRate})
      })
      }, 500)
      }

    const withdraw = (index) => {
      if(index == 10) {
        var targetId = 'img' + 11;
        var target = document.getElementById(targetId);
        target.classList.add('hide');

        var targetId = 'img' + 12;
        var target = document.getElementById(targetId);
        target.classList.add('hide');

        var targetId = 'img' + 13;
        var target = document.getElementById(targetId);
        target.classList.add('hide');

        var subject = index + 1
      } else {
        if(index == 21 && field == 'front') {
          var targetId = 'img' + 6;
        }
        else if(index < 10){
          var targetId = 'img' + (index + 1);
          var subject = index + 1
        }else if(index >= 11){
          var targetId = 'img' + (index + 3);
          var subject = index + 1
        }
        var target = document.getElementById(targetId);
        target.classList.add('hide');
      }

      const ladder = document.getElementById('img16');
      const gardener = document.getElementById('img18');
      const sittingGardener = document.getElementById('img22');

      if(!sittingGardener.classList.contains('hide') 
        && index == 15){
          ladder.classList.remove('hide');
          sittingGardener.classList.add('hide');
      } else if (!sittingGardener.classList.contains('hide') 
        && index == 13){
          gardener.classList.remove('hide');
          sittingGardener.classList.add('hide');
        } 

      instance({
        url: '/subject/complete/withdraw',
        params: {
          'subject': subject - 1
        }
      }).then(response => {
        console.log('체크 해제');
      })

      setTimeout(() => {
        instance({
        url: '/progressrate',
      }).then(response => {
        console.log(response.data)
        dispatch({type: 'load-progress', progress: response.data.progressRate})
      })
      }, 500)
    }

  return (
        <div className='bubble-object un-checked' id={props.number} tabindex='1' onClick={() => {
            onCheck(props.number);
        }}>
            <h5>{props.number}</h5>
            <h5 className='bubble-subject'>{props.name}</h5>
        </div>
  )
}

export default Objects