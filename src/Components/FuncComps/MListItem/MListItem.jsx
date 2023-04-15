import React, { useEffect, useState } from 'react';
import st from './MListItem.module.css'
import MButton from '../../UI/MButton/MButton';
import { useDispatch, useSelector } from 'react-redux';
import { visible } from '../../Redux/Redux-slices/visibleSlice';
import Timer from '../../Timer/Timer';
const MListItem = (props) => {
    const [toCh, setToCh] = useState(false);
    const vis=useSelector((state) => state.visibility.value);
    const dispatch = useDispatch();
    const hCl = () => {
        setToCh(true)
    }
    const hClf = () => {
        setToCh(false)
    }
    const hClfRemove = () => {
        setToCh(false);
        props.remove()
    }
    const hClfEdit = () => {
        setToCh(false);
        props.track();
        dispatch(visible());
        props.edit();
        
    }
      useEffect(()=>{vis===true?setToCh(false):console.log('')},[vis])
    return (
        <div className={st.m_Litem}>
            <div>
                <div className={st.m_maingroup}>
                    <div className={st.m_capgroup}>
                        <p className={props.imp === false ? st.m_id : st.m_id_active}>{props.id}</p>
                        <p className={st.m_caption}>{props.title}</p>
                        {props.cat.length===0?<></>:<p className={st.m_category}>{props.cat}</p>}
                        {props.expiredate==''?<></>:<Timer  expiredate={props.expiredate}/>}
                        
                    </div>
                    <div className={st.m_bodygroup}>
                        <p className={st.m_body}>{props.body}</p>
                    </div>
                </div>
            </div>
            <div className={st.m_func_statusgroup}>
                {toCh == false ?
                    <span className={st.m_doings} onClick={hCl}>. . .</span>
                    :
                    <div className={st.m_st_gr}>

                        <MButton style={{ marginRight: '10px' }} onClick={hClf}>
                            Скрыть</MButton>
                        <MButton onClick={hClfRemove} >
                            Удалить
                        </MButton>
                        <MButton onClick={hClfEdit} style={{ marginLeft: '10px' }}>
                            Редактировать
                        </MButton>
                    </div>}
            </div>
        </div>
    );
};


export default MListItem;