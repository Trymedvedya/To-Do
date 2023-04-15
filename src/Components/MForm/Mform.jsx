import React from 'react';
import st from './Mform.module.css'

const Mform = ({children,...props}) => {
    return (
        <form {...props} className={st.Mform}>{children}</form>
    );
};



export default Mform;