import React from 'react';
import Mform from '../MForm/Mform';
import Minput from '../../UI/MInput/Minput';
import MButton from '../../UI/MButton/MButton';
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
            <label>Важно? <input
                checked={props.dat.imp}
                name='imp'
                type="checkbox"
                onChange={props.chHan}
            /></label>

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