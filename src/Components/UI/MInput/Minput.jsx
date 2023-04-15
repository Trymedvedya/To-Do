import React from 'react';
import st from './Minput.module.css'

const Minput = ({ ...props }) => {
    return (
        <input className={st.Minput} {...props} />
    );
};



export default Minput;