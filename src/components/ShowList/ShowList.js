import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const ShowList = ({ item }) => {

    const { name, title, image, msg, _id } = item

    const [selectedItem,setSelectedItem] = useState({})
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const deleteItem = (id) => {
        fetch(`http://localhost:4000/deleteitem/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    window.location.reload(false);
                    // alert("deleted succesfully")
                }
                console.log("deleted succesfully")
            })
    }

    const getItem = (id) => {
        openModal()
        fetch(`http://localhost:4000/getitem/${id}`)
            .then((response) => response.json())
            .then((data) => setSelectedItem(data));
    }

    const [info,setInfo] = useState({})
    const [file,setFile] = useState(null)

    const handleBlur = (e) =>{
        const newInfo = {...info}
        newInfo[e.target.name] = e.target.value
        setInfo(newInfo)
    }

    const handleChange = (e) =>{
        const newfile = e.target.files[0]
        setFile(newfile)
    }

    const submitForm = (id) =>{
        
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', info.name)
        formData.append('title', info.title)
        formData.append('msg', info.msg)
      
        fetch(`http://localhost:4000/updateitem/${id}`, {
          method: 'PATCH',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          alert ("Update Information")
        })
        .catch(error => {
          console.error(error)
        })

        console.log(info,file,id)
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
                        <i class="fa-solid fa-pen-to-square" onClick={() => getItem(_id)}></i>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <i class="fa-solid fa-xmark" onClick={closeModal}></i>
                            <h3 className='mt-3'>Update your information</h3>
                            <form action="" className='form' onSubmit={()=>submitForm(_id)}>
                                <div className="col-12 mt-3">
                                    <label >Name</label>
                                    <input required type="text" onBlur={handleBlur} name="name" placeholder='Name' className='w-100 d-block field' />
                                </div>
                                <div className="col-12 mt-3">
                                    <label>Title</label>
                                    <input required type="text" onBlur={handleBlur} name="title" placeholder='Title' className='w-100 d-block field' />
                                </div>
                                <div className="col-12 mt-3">
                                    <label>Message</label>
                                    <textarea required name="msg" onBlur={handleBlur} id="" cols="30" rows="5" placeholder='Message' className='w-100 d-block field'></textarea>
                                </div>
                                <div className="col-12 mt-3 file">
                                    <label htmlFor="img"> <span>upload a image</span><i class="fa-solid fa-cloud-arrow-up"></i></label>
                                    <input required onChange={handleChange} type="file" name='file' id="img" style={{ display: "none" }}/>
                                </div>
                                <input type="submit" value="Update" className='btn btn-info text-white d-block mx-auto w-100 field mt-3' />
                            </form>
                        </Modal>
                    </div>
                    <div className="delete-btn">
                        <i class="fa-solid fa-trash-can" onClick={() => deleteItem(_id)}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowList;