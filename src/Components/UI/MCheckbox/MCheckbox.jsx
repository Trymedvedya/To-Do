import React from 'react';
import style from './MCheckbox.module.css'
const MCheckbox = (props) => {
    return (
        <label className={style.MCheckbox_container}>
            <input className={style.MCheckbox} {...props} type="checkbox" />
            <span className={style.spin}></span>
        </label>
    );
};



export default MCheckbox;