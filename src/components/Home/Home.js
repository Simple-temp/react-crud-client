import React, { useState } from 'react';
import Form from '../Form/Form';
import List from '../List/List';


const Home = () => {

    const allDelete = () => {

        fetch(`https://node-crud-serve.herokuapp.com/deleteAllItem`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    window.location.reload(false);
                    // alert("deleted succesfully")
                }
                console.log("delete all done!")
            })

    }

    return (
        <div className='container home'>
            <div className="home-title text-center">
                <h1>Crud operation</h1>
                <p>Add something it will be saved database, and also update and delete them.</p>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-12">
                    <div className="right-side">
                        <Form />
                        <hr />
                        <input type="submit" value="Clear All" onClick={allDelete} className='btn btn-danger d-block mx-auto w-100 field' />
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-12 list">
                    <List />
                </div>
            </div>
        </div>
    );
};

export default Home;