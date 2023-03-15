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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };
  

  return (
    <main className="App">
      <div className="header-container">
        <header>Weather App</header>
        <section className="search-container">
          <input
            type="text"
            placeholder="Digite o nome de uma cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && handleSearch();
            }}
          />
          
          <button onClick={handleSearch}><img className="lupa-img" src="./src/assets/1093183.svg" alt="" /></button>
        </section>
      </div>
      <div className="weather-info-container">
        {location.length !== 0 ? (
          <>
            <div className="location-name">
              <img src="./src/assets/pin.svg" alt="" />
              <h2>{location.name}</h2>
            </div>
            <div className="weather-info">
              <div className="main-temp">
              <h3>{parseInt(location.main.temp)}</h3>
              <div className="main-temp-info">
              <div className="celsius">°C</div>
              <img
                src={`http://openweathermap.org/img/w/${location.weather[0].icon}.png`}
                alt="2"
              />
              </div>
              </div>
              <div className="max-min-temp">
                {parseInt(location.main.temp_max)}°
                <span>{parseInt(location.main.temp_min)}°</span>
              </div>
            </div>
            <div className="additional-informations">
              <div className="info-boxs" title="Humidade">
                <img src="./src/assets/chuva.png" alt="" />
                <div className="humidity">
                <p>Umidade</p>
                <p>{location.main.humidity} %</p>
                </div>
              </div>
              <div className="info-boxs" title="Velocidade do vento">
                <img src="./src/assets/weather.png" alt="" />
                <div className="wind">
                  <p>Vento</p>
                  <p>{location.wind.speed} km/h</p>
                </div>
              </div>
              <div className="weather-description info-boxs">
              <img src={`http://openweathermap.org/img/w/${location.weather[0].icon}.png`}/>
              <p>{location.weather[0].description}</p>
              </div>
            </div>
          </>
        ) : (
          <h3 className="loading">Carregando...</h3>
        )}
        {error && <h3 className="error-message">Cidade não encontrada</h3>}
      </div>
    </main>
  );
}

export default App;
