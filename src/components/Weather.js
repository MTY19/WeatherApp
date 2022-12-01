import React, { useState } from 'react'
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from '../api/axios';

function Weather() {

    const [authenticated, setauthenticated] = useState(null);
    const [token, setToken] = useState(null);
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [city, setCity] = useState('')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')

    const tokenConfig = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const GetCoordinatesUrl = `/api/User/GetCoordinatesFromCityName?Name=${location}`
    const GetWeatherUrl = `/api/User/GetWeatherFromCoordinates?lat=${lat}&lon=${lon}`

    const searchLocation = async(event) => {
        if (event.key === 'Enter') {
            try {
                 await axios.get(GetCoordinatesUrl, tokenConfig).then((response) => {
                    setLat(response.data.value[0].lat)
                    setLon(response.data.value[0].lon)
                    setCity(response.data.value[0].name)
                    axios.get(GetWeatherUrl, tokenConfig).then((response2) => {
                        setData(response2.data.value)
                    })
                })
                setLocation('')
            } catch (err) {
                if (!err?.response) {
                    console.log(err.response)
                } else if (err.response?.status === 401) {
                    console.log('Unauthorized')
                }
            }
        }
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        const token = localStorage.getItem("token");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
            setToken(token);
        }
    }, []);

    if (authenticated == false) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div className="app">
                <div className="search">
                    <input
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        onKeyPress={searchLocation}
                        placeholder='Enter Location'
                        type="text" />
                </div>
                <div className="container">
                    <div className="top">
                        <div className="location">
                            <p>{city}</p>
                        </div>
                        <div className="temp">
                            {data.data ? <h1>{data.data[0].temp.toFixed()}°C</h1> : null}
                        </div>
                        <div className="description">
                            {data.data ? <p>{data.data[0].weather[0].main}</p> : null}
                        </div>
                    </div>
                    {data.data !== undefined &&
                        <div className="bottom">
                            <div className="feels">
                                {data.data ? <p className='bold'>{data.data[0].feels_like.toFixed()}°C</p> : null}
                                <p>Feels Like</p>
                            </div>
                            <div className="humidity">
                                {data.data ? <p className='bold'>{data.data[0].humidity}%</p> : null}
                                <p>Humidity</p>
                            </div>
                            <div className="wind">
                                {data.data ? <p className='bold'>{data.data[0].wind_speed.toFixed()} MPH</p> : null}
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    }
                    <div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Weather;
