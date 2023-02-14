import axios from "axios";
import { useState, useEffect } from "react";
import { IoMdWater } from "@react-icons/all-files/io/IoMdWater";
import { TbWind } from "react-icons/tb";
import "./App.css";

const APIKEY = "67b04955c003429358dcf393f8e08844";

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [location, setLocation] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric&lang=pt_br`
        )
        .then((response) => {
          setLocation(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [lat, lon]);

  const handleSearch = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=pt_br`
      )
      .then((response) => {
        setLocation(response.data);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="search-container">
        <h3>Confira o clima em outra Cidade:</h3>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="weather-info-container">
        {location.length !== 0 ? (
          <>
            <div className="section1">
              <h2>{location.name}</h2>
              <img
                crossOrigin="anonymous"
                src={`https://countryflagsapi.com/png/${location.sys.country}`}
                alt="1"
              />
            </div>
            <h3>{location.weather[0].description}</h3>
            <div className="section2">
              <img
                src={`http://openweathermap.org/img/w/${location.weather[0].icon}.png`}
                alt="2"
              />
              <h3>{parseInt(location.main.temp)}°C</h3>
            </div>
            <div className="section3">
              <p>Máxima: {parseInt(location.main.temp_max)}°C</p>
              <p>Mínima: {parseInt(location.main.temp_min)}°C</p>
            </div>
            <div className="section4">
              <p className="section5" title="Humidade">
                <IoMdWater />{location.main.humidity}%
              </p>
              <p className="section5" title="Velocidade do vento">
                <TbWind />{location.wind.speed}km/h
              </p>
            </div>
          </>
        ) : (
          <h3>Carregando...</h3>
        )}
        {error && <h3>Cidade não encontrada</h3>}
      </div>
    </div>
  );
}

export default App;
