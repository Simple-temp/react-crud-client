import React, { useEffect, useState } from 'react';
import ShowList from '../ShowList/ShowList';
import loading from "../../img/loading.gif"

const List = () => {

    const [todo, setTodo] = useState([])

    useEffect(() => {
        fetch(`https://crud-rl31.onrender.com/gettodo`)
            .then(res => res.json())
            .then(data => setTodo(data))
    }, [])

    return (
        <div className='row'>
            {
                todo.length === 0 ? <img src={loading} alt="" style={{width:"200px"}} className="mx-auto" /> :
                todo.map(item => <ShowList item={item} key={item._id}></ShowList>)
            }
        </div>
    );
};

export default List;
