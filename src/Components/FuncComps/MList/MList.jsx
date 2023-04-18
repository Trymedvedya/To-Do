import React, { useEffect, useState } from 'react';
import st from './MList.module.css';
import MListItem from '../MListItem/MListItem';
import axios from 'axios';
import MButton from '../../UI/MButton/MButton';
import ModalWindow from '../../UI/ModalWindow/ModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import { invisible, visible } from '../../Redux/Redux-slices/visibleSlice';
import MSetForm from '../MSetForm/MSetForm';
import MEditForm from '../MEditForm/MEditForm';


const MList = () => {
    const [taskar, setTaskar] = useState([]);
    const [track, setTrack] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [setData, setSetData] = useState({
        title: '',
        body: '',
        imp: false,
        id: '',
        cat: '',
        eDays: '',
        eHours: '',
        eMinutes: '',
        eSeconds: '',
        expdate: ''
    })
    const [sortedTasks, setSortedTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [catTracker, setCatTracker] = useState('All');
    const inputHandler = (e) => {
        setSetData(prevState => { return { ...prevState, [e.target.name]: e.target.value } })
    }
    const inputHandlerCheck = (e) => {
        setSetData(prevState => { return { ...prevState, [e.target.name]: e.target.checked } })
    }
    const dateAnal = () => {
        if (setData.eDays === '' && setData.eHours === '' && setData.eMinutes === '' && setData.eSeconds === '' ) {
            return '';
        } else {
            return Date.now() + setData.eDays * (24 * 3600 * 1000) + setData.eHours * (3600 * 1000) + setData.eMinutes * (60 * 1000) + setData.eSeconds * 1000;
        }
    }
    const sumbitSetForm = async (e) => {
        e.preventDefault();
        let params = {
            title: setData.title.trim(),
            body: setData.body.trim(),
            imp: setData.imp,
            cat: setData.cat.trim(),
            expdate: dateAnal()
        }
        params = JSON.stringify(params)
        try {
            await axios.post(`https://todo-47438-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`, params)
            setSetData({ title: '', body: '', imp: false, cat: '', eDays: '', eHours: '', eMinutes: '', eSeconds: '' });
            dispatch(invisible());
            getTasks();
        }
        catch (e) {
            console.log(e)
        }
    }
    const sumbitEditForm = async (e) => {
        e.preventDefault();
        let params = {
            title: setData.title.trim(),
            body: setData.body.trim(),
            imp: setData.imp,
            cat: setData.cat.toLowerCase(),
            expdate: setData.expdate
        }
        params = JSON.stringify(params)
        try {
            await axios.put(`https://todo-47438-default-rtdb.europe-west1.firebasedatabase.app/tasks/${setData.id}.json`, params)
            setSetData({ title: '', body: '', imp: false, cat: '' });
            dispatch(invisible());
            getTasks();
        }
        catch (e) {
            console.log(e)
        }
    }
    useSelector((state) => state.visibility.value);
    const dispatch = useDispatch();
    const getTasks = async () => {
        try {
            const res = await axios.get('https://todo-47438-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
            let resdata = res.data;
            if (resdata === null) {
                setLoaded(false);
            }
            setTaskar(Object.entries(resdata));
            let arr = Object.entries(resdata).map(el => el[1].cat);
            setCategories(arr.filter((el, index) => { return arr.indexOf(el) === index }));
            setSortedTasks(Object.entries(resdata));
            setLoaded(true);
        } catch (e) {
            typeof e
            if (e==`TypeError: can't convert null to object`){
                console.log('There are no tasks!')
            } else console.log(e)
        }
    }
    const remove = async (id, cat) => {
        setSortedTasks(sortedTasks.filter(el => el[0] != id));
        setTaskar(taskar.filter(el => el[0] != id));
        let k = taskar.filter(task => task[1].cat === cat).length;
        if (k > 1) {
            console.log(k);
        } else {
            setCategories(categories.filter(el => el != cat));
            setCatTracker('All');
            setSortedTasks(taskar.filter(el => el[0] != id))
        }
        try {
            await axios.delete(`https://todo-47438-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`)
        } catch (e) {
            console.log(e)
        }
    }
    const edit = async (id) => {
        taskar.map(task => task[0] === id ? setSetData({ title: task[1].title, body: task[1].body, imp: task[1].imp, id: task[0], cat: task[1].cat, expdate: task[1].expdate }) : console.log('Wooosh'))
    }
    const sort = (catt) => {
        setSortedTasks(taskar.filter(task => task[1].cat === catt))
        setCatTracker(catt)
    }
    useEffect(() => {
        getTasks()
    }, []);
    const hClfSet = () => {
        setTrack('set')
        dispatch(visible());
    }

    return (
        <div className={st.m_list}>
            <ModalWindow
                title={track === 'edit' ? 'Редактировать' : 'Создать'} 
                clearForm={() => setSetData({ title: '', body: '', imp: false, cat: '', eDays: '', eHours: '', eMinutes: '', eSeconds: '' })}
            >
                {track === 'edit' ? 
                <MEditForm sumSet={sumbitEditForm} han={inputHandler} dat={setData} chHan={inputHandlerCheck} /> :
                <MSetForm sumSet={sumbitSetForm} han={inputHandler} dat={setData} chHan={inputHandlerCheck} />
                }
            </ModalWindow>
            <div className={st.categories}>
                <p className={st.cat_title}>Категории:</p>
                <p className={catTracker === 'All' ? st.category_select : st.category} onClick={() => { setSortedTasks(taskar); setCatTracker('All') }}>все</p>
                {loaded === true ? categories.map((cat) => cat.length != 0 ? <p onClick={() => sort(cat)} key={cat} className={catTracker === cat ? st.category_select : st.category}>{cat}</p> : null) : null}
            </div>
            {sortedTasks.length ?sortedTasks.map(
                    (task) => 
                        <MListItem
                            edit={() => edit(task[0])}
                            track={() => setTrack('edit')}
                            id={sortedTasks.indexOf(task) + 1}
                            remove={() => remove(task[0], task[1].cat)}
                            title={task[1].title}
                            body={task[1].body}
                            imp={task[1].imp}
                            cat={task[1].cat}
                            key={task[0]}
                            expiredate={task[1].expdate}
                        /> ) :  <h1 className={st.addd}>Добавьте задачи</h1>}
            <MButton onClick={hClfSet}>Добавить задачу</MButton>
        </div>
    );
};
export default MList;