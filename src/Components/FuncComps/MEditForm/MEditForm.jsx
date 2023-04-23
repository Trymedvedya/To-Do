import React from 'react';
import Mform from '../MForm/Mform';
import Minput from '../../UI/MInput/Minput';
import MButton from '../../UI/MButton/MButton';
import MCheckbox from '../../UI/MCheckbox/MCheckbox';
import st from './MEditForm.module.css'
const MEditForm = (props) => {
    return (
        <Mform onSubmit={props.sumSet}>
            <Minput
                value={props.dat.title}
                onChange={props.han}
                name='title'
                placeholder='Редактировать заголовок' />
            <Minput
                value={props.dat.body}
                onChange={props.han}
                name='body'
                placeholder='Редактировать запись' />
            <label className={st.check}>Не Важно <MCheckbox
                    checked={props.dat.imp}
                    name='imp'
                    onChange={props.chHan}
            />Важно</label>

            <Minput
                value={props.dat.cat}
                onChange={props.han}
                name='cat'
                placeholder='Редактировать категорию'
            />
            <MButton type='submit' style={{ marginTop: '5px' }}>Записать</MButton>
        </Mform>
    );
};

export default MEditForm;