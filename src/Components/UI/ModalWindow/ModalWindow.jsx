import React from 'react';
import st from './ModalWindow.module.css'
import { invisible } from '../../Redux/Redux-slices/visibleSlice';
import { useDispatch, useSelector } from 'react-redux';

const ModalWindow = (props ) => {
    const vis = useSelector((state) => state.visibility.value);
    const dispatch = useDispatch();
    const hCltClear = () =>{
        dispatch(invisible());
        props.clearForm();
    }
    return (
        <div onClick={hCltClear} className={vis === true ? st.outside_window : st.outside_window_non_active}>
            <div onClick={(e) => e.stopPropagation()} className={st.inside_window}>
                <p className={st.title}>{props.title}</p>
                {props.children}
            </div>
        </div>
    );
};



export default ModalWindow;