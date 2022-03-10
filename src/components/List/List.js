import React, { useEffect, useState } from 'react';

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

function ShowList({ item }) {

    const { name, title, image, msg, _id} = item

    const deleteItem = (id) =>{
        fetch(`http://localhost:4000/deleteitem/${id}`,{
            method : "DELETE"
        })
        .then(res=>res.json())
        .then(data => {
            if(data)
            {
                window.location.reload(false);
                // alert("deleted succesfully")
            }
            console.log("deleted succesfully")
        })
    }

    const updateItem = () =>{

    }

    return (
        <div className="col-lg-6 col-md-6 col-12">
            <div className="todo">
                <div className="img-box">
                    <img src={`data:image/png;base64,${image.img}`} alt="" className='img-fluid' />
                </div>
                <div className="todo-body">
                    <h4>{name}</h4>
                    <p>{title}</p>
                </div>
                <div className="todo-msg">
                    <p>{msg}</p>
                </div>
                <div className="todo-footer d-flex justify-content-between">
                    <div className="edit-btn">
                        <i class="fa-solid fa-pen-to-square" onClick={updateItem}></i>
                    </div>
                    <div className="delete-btn">
                        <i class="fa-solid fa-trash-can" onClick={()=>deleteItem(_id)}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;
/**gettodo */