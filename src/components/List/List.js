import React, { useEffect, useState } from 'react';
import ShowList from '../ShowList/ShowList';


const List = () => {

    const [todo, setTodo] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/gettodo`)
            .then(res => res.json())
            .then(data => setTodo(data))
    }, [])

    return (
        <div className='row'>
            {
                todo.map(item => <ShowList item={item} key={item._id}></ShowList>)
            }
        </div>
    );
};

export default List;
