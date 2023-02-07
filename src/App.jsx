import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css'

const APIkey = '67b04955c003429358dcf393f8e08844';

function App() {

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [location, setLocation] = useState([]);
  const [city, setCity] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);


  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=pt_br`)
        .then((response) => {
          setLocation(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [lat, lon]);

  const handleSearch = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric&lang=pt_br`)
      .then((response) => {
        setLocation(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  return (
    <div className="App">
      <h1>Weather App</h1>
        <div>
          <h3>Confira o clima em outra Cidade:</h3>
          <input 
            type="text"
            placeholder="Digite o nome da cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
           />
          <button onClick={handleSearch} >Buscar</button>
          {
            location.length !== 0 ? (
              <div>
                <h2>{location.name}</h2>
                <img crossOrigin="anonymous" src={`https://countryflagsapi.com/png/${location.sys.country}`} alt='country flag' />
                <h3>{location.main.temp}°C</h3>
                <h3>{location.weather[0].description}</h3>
                <img src={`http://openweathermap.org/img/w/${location.weather[0].icon}.png`} alt="weather icon" />
                <p>Humidade: {location.main.humidity}%</p>
                <p>Velocidade do Vento: {location.wind.speed}m/s</p>
              </div> ) : (
              <h3>Carregando...</h3>
            )}
        </div>
    </div>
  )
}

export default App
