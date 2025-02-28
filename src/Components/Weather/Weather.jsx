import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Weather.scss'

const Weather = () => {
    const [data, setData] = useState({}) 
    const [location,setLocation] = useState('')

    useEffect(() => {
        const fetchDefaultLocation = async () => {
            const defaultLocation = 'Tbilisi'
            const url = 'https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=13066171d2cda7faa49f78ee21be2300'
            const response = await axios.get(url)
            setData(response.data)
        }
        fetchDefaultLocation()
    },[])
    
    const search = async() =>{
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=13066171d2cda7faa49f78ee21be2300'
        const response = await axios.get(url)

        setData (response.data)
        setLocation('')
        console.log(data)
    }

    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }
    const getWeatherIcon = (weatherType) => {
        switch(weatherType) {
            case 'Clear': return <i className='bx bxs-sun'> </i>;
            case 'Clouds': return <i className= 'bx bxs-cloud'></i>;
            case 'Rain': return <i className= 'bx bxs-cloud-rain'></i>;
            case 'Snow': return <i className='bx bxs-cloud-snow'></i>;
            case 'Thunderstorm': return <i className='bx bxs-cloud-lightning'></i>;
            case 'Haze': 
            case 'Mist': return <i className='bx bxs-cloud'></i>
            default: return <i className='bx bxs-cloud'></i>; 
        }
    }

    return (
     <div className='weather'>
        <div className="search">
            <div className="search-top">
                <i className='fa-solid fa-location-dot'> </i>
                <div className="location"> {data.name} </div>
            </div>
            <div className="search-location">
                <input type="text" placeholder="Enter Location" 
                value={location} 
                onChange={handleInputChange}/>
                <i className='fa-solid fa-magnifying-glass' onClick={search}></i>
            </div>
        </div>
        <div className="weather-data">
            {data.Weather && data.Weather[0] && getWeatherIcon(data.Weather[0].main)}
            <div className="weather-type"> {data.Weather ? data.Weather[0].main : null}</div>
            <div className="temp"> {data.main ? `${main.floor(data.main.temp)}` : null} </div>
        </div>
    </div>
    )
}

export default Weather