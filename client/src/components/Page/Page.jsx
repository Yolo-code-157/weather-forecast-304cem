import React, { Fragment, useState, useEffect } from 'react';

import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Forecast';
import axios from 'axios';

import useForecast from '../../hooks/useForecast';

import styles from './Page.module.css';

const Page = () => {

    const [weathers, setWeathers] = useState([
        {
          localTitle: '',
          localType: '',
          localLatLon: '',
          wheaStatus: '',
          wheaStatusDesc: '',
          wheaIcon: '',
          wheaPressure: '',
          wheaHumid: ''
        }
      ])
    
    useEffect( async () => {
        const config ={
            headers: {
                "Content-type": "application/json",
            },
        };

        await fetch('http://localhost:5000/weathers', config)
        .then(res=>{
            if(res.ok){
              return res.json()
            }
          })
        .then((jsonRes) => {
            setWeathers(jsonRes);
        })
        .catch((err) => {
            console.log(err);
        });
    },[])
    
    const { isError, isLoading, forecast, submitRequest } = useForecast();

    const onSubmit = value => {
        submitRequest(value);
    };

    function deleteWeather(id){
        // console.log(id);
        axios.delete('/delete/' + id);
        alert("Selected weather profile is deleted");
        window.location.reload(false);
    }

    return (
        <Fragment>
            <br/>
            {!forecast && (
                <>
                <div className={`${styles.box} position-relative`}>
                    {/* Form */}
                    {!isLoading && <Form submitSearch={onSubmit} />}
                    {/* Error */}
                    {isError && <Error message={isError} />}
                    {/* Loader */}
                    {isLoading && <Loader />}
                </div>
                <br/>
                <h1 className={styles.light}>
                    <span className={styles.heading}>Search</span> History
                </h1>
              
                <div className={`${styles.grid}`}>
                {weathers && weathers.map(weather => {
                     return(  
                    <>
                    {/* console.log(weather) */}
                    <div className={`${styles.card} position-relative`}>
                        
                        <div className={`${styles.box1} position-relative`}>
                            <div>
                                <img src={`http://openweathermap.org/img/wn/${weather.wheaIcon}@2x.png`}alt="imgicon"/>
                                <h1>{weather.localTitle}, {weather.wheaCount}</h1>
                                <p>Type: {weather.localType}</p>
                                <p>Coord: <br/>{weather.localLatLon}</p> 
                            </div>
                            <div className={`${styles.box3} position-relative`}>

                            </div>
                            <div className={`${styles.box2} position-relative`}>
                                <p>Status:<br/>{weather.wheaStatusDesc}</p>
                                <p>Pressure:<br/>{weather.wheaPressure}mb</p>
                                <p>Humid:<br/>{weather.wheaHumid}%</p>
                                
                                <div>
                                    <button className={styles.button} onClick={() => deleteWeather(weather._id)}>Delete</button>
                                </div>
                                <br/>
                            </div>
                        </div>    
                    </div>
                    </> 
                    )  
                })} 
                </div>
                </>
            )}
            {/* Forecast */}
            {forecast && <Forecast forecast={forecast} />}
        </Fragment>
    );
};

export default Page;
