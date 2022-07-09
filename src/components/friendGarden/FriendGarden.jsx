import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './friendGarden.css'
import Garden from '../garden/Garden'
import grass from '../../assets/img-garden/땅.png';
import sun from '../../assets/img-garden/해.png';
import cloud1 from '../../assets/img-garden/구름1.png';
import cloud2 from '../../assets/img-garden/구름2.png';
import cloud3 from '../../assets/img-garden/구름3.png';
import cloud4 from '../../assets/img-garden/구름4.png';
import cloud5 from '../../assets/img-garden/구름5.png';
import bird from '../../assets/img-garden/새.png'

const FriendGarden = () => {

    const [savedItem, setSavedItem] = useState([]);

    useEffect(() => {
          axios({
            method: 'get',
            url: 'https://localhost:8080/',
            params: {
              "Authorization": "Bearer " + localStorage.getItem("user")
            }
          }).then(response => {
            console.log(response.data.complete_subjects)
            setSavedItem(response.data.complete_subjects)
          })
        }, [])
      
        for(let i = 1; i < savedItem.length; i++){
          if(i in savedItem[i].object){
          var target = document.getElementById('img' + i);
          target.classList.remove('hide');
          target.classList.add('show');
          }
        }

  return (
    <div>
          <Garden></Garden>
    </div>
  )
}

export default FriendGarden