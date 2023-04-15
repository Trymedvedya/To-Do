import React from 'react';
import st from './MButton.module.css'
const MButton = ({children,...props}) => {
    return (
        <button className={st.MButton} {...props}>{children}</button>
    );
};

export default MButton;