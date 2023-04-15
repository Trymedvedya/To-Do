import React, { useEffect, useState } from 'react';
import st from './Timer.module.css'

const Timer = ({expiredate}) => {
    const [over, setOver]=useState(false);
    const [data, setData]=useState({
        d: Math.floor((expiredate-Date.now())/(1000 * 60 * 60 * 24)) ,
        h: Math.floor((expiredate-Date.now())/(1000 * 60 * 60)% 24) ,
        m: Math.floor((expiredate-Date.now())/(1000 * 60)% 60) ,
        s: Math.floor((expiredate-Date.now())/(1000)% 60) 
        
    })
   
    
    const tick =()=>{
        if(data.d===0 && data.h===0 && data.m===0 && data.s===0){
            setOver(true);
        }else if (data.h===0 && data.m===0 && data.s===0){
            setData({d:data.d-1,h:59,m:59,s:59})
        }else if (data.m===0 && data.s===0){
            setData({d:data.d,h:data.h-1,m:59,s:59});
        }else if (data.s===0){
            setData({d:data.h,h:data.h,m:data.m-1,s:59})
        }else {
            setData({d:data.d,h:data.h,m:data.m,s:data.s-1})
        }
        
    }
    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
      });
    return (
        <div>
            <p className={st.timerst}>{over===true? '  Потрачено':`${data.d}д ${data.h}ч ${data.m}м ${data.s}с`}</p>
        </div>
    );
};



export default Timer;