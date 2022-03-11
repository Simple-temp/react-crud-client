import React, { useState } from 'react';

const Form = () => {

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

    const submitForm = () =>{
        
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', info.name)
        formData.append('title', info.title)
        formData.append('msg', info.msg)
      
        fetch('https://node-crud-serve.herokuapp.com/posttodo', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          alert ("add todo")
        })
        .catch(error => {
          console.error(error)
        })
        console.log(info,file)
    }

    return (
        <form action="" className='form' onSubmit={submitForm}>
            <div className="col-12 mt-3">
                <label >Name</label>
                <input required onBlur={handleBlur} type="text" name="name" placeholder='Name' className='w-100 d-block field' />
            </div>
            <div className="col-12 mt-3">
                <label>Title</label>
                <input required onBlur={handleBlur} type="text" name="title" placeholder='Title' className='w-100 d-block field' />
            </div>
            <div className="col-12 mt-3">
                <label>Message</label>
                <textarea required onBlur={handleBlur} name="msg" id="" cols="30" rows="5" placeholder='Message' className='w-100 d-block field'></textarea>
            </div>
            <div className="col-12 mt-3 file">
                <label htmlFor="photo"> <span>upload a image</span><i class="fa-solid fa-cloud-arrow-up"></i></label>
                <input required onChange={handleChange} type="file" name="file" id="photo" style={{ display: "none" }} />
            </div>
            <input type="submit" value="Submit" className='btn btn-info text-white d-block mx-auto w-100 field mt-3' />
        </form>
    );
};

export default Form;