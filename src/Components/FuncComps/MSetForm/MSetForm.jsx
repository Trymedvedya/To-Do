import React from 'react';
import Mform from '../MForm/Mform';
import Minput from '../../UI/MInput/Minput';
import st from './MSetForm.module.css'
import MButton from '../../UI/MButton/MButton';
const MSetForm = (props) => {
    return (
        <Mform onSubmit={props.sumSet}>
            {props.dat.title === '' ? <p className={st.alert}>Заполните заголовок</p> : <></>}
            <Minput
                value={props.dat.title.replace('  ', ' ').trim()}
                onChange={props.han}
                name='title'
                placeholder='Заголовок' />
            <Minput
                value={props.dat.body.replace('  ', ' ')}
                onChange={props.han}
                name='body'
                placeholder='Запись' />
            <label>Важно? <input
                checked={props.dat.imp}
                name='imp'
                type="checkbox"
                onChange={props.chHan}
            /></label>

            <Minput
                value={props.dat.cat.replace('  ', ' ')}
                
                onChange={props.han}
                name='cat'
                placeholder='Категория'

            />
            <p>Задайте дедлайн</p>
            <div className={st.time}>

                <Minput
                    style={{ width: '70px' }}
                    value={props.dat.eDays.replace(/[\D]+/g, '')}
                    maxLength='3'
                    onChange={props.han}
                    name='eDays'
                    placeholder='Дни'
                    type='number'
                />
                <Minput
                    style={{ width: '70px' }}
                    maxLength='3'
                    value={props.dat.eHours.replace(/[\D]+/g, '')}
                    onChange={props.han}
                    name='eHours'
                    placeholder='Часы'
                    type='number'
                    
                />
                <Minput
                    type='number'
                    style={{ width: '70px' }}
                    maxLength='3'
                    value={props.dat.eMinutes.replace(/[\D]+/g, '')}
                    onChange={props.han}
                    name='eMinutes'
                    placeholder='Mинуты'
                />

            </div>

            <MButton type='submit' disabled={props.dat.title === '' ? true : false} style={props.dat.title != '' ? { marginTop: '5px' } : { marginTop: '5px', opacity: '50%' }}>Записать</MButton>
        </Mform>
    );
};

export default MSetForm;