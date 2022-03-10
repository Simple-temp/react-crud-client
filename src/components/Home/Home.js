import React from 'react';
import Form from '../Form/Form';
import List from '../List/List';


const Home = () => {
    return (
        <div className='container home'>
            <div className="home-title text-center">
                <h1>Crud operation</h1>
                <p>Add something it will be saved database, and also update and delete them.</p>
            </div>
            <div className="row">
                <div className="col-lg-8 col-md-8 col-12 list">
                    <List/>
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                    <Form/>
                    <hr />
                    <input type="submit" value="Clear All" className='btn btn-danger d-block mx-auto w-100 field' />
                </div>
            </div>
        </div>
    );
};

export default Home;