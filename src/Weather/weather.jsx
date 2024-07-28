import axios from "axios";
import { useState } from "react";
import "./weather.css";
import cities from "./cityname.js";

const api = {
  key: "4a555af10f4f87b3601b2db9b10f0c46",
  base: "https://api.openweathermap.org/data/2.5/",
};
const WeatherApp = () => {
  const [query, setQuery] = useState("");
  const [dsp,setdsp]=useState(false)

  const [weather, setWeather] = useState({});
  const handleQuery = (e) => {
    setQuery(e.target.value);
    setdsp(true)
  };
  const search = (evt) => {
    if (evt.key === "Enter") {
      setdsp(false)
      const weatherData = async () => {
        const res = await axios.get(
          `${api.base}weather?q=${query}&units=matric&APPID=${api.key}`
        );
        setWeather(res.data);
        setQuery("");
        console.log(weather);
      };
      weatherData();
    }
  };
console.log(query,"query")
  // dropdown
console.log(dsp)
  const datebuilder = (d) => {
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Septamber",
      "october",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day},${date},${month},${year}`;
  };

  const handleClickCity=(e)=>{
    setQuery(e)
    console.log(query)
  }


  const filtercity=cities.filter((city)=>{
    return city.toLocaleLowerCase().includes(query)
  }).slice(0,10)
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.weather.temp >= 240
            ? "appbgcold"
            : "appbgwarm"
          : "weatherbg"
      }
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "100px",
          fontWeight: 700,
          textShadow:'20px 20px 20px white'
        }}
      >
        Weather App
      </h1>
      <div className="main-container">
        <div className="serarch-box">
          <div className="searchbar" style={{ padding: "5px" }}>
            <input
              type="text"
              placeholder="search..."
              onChange={handleQuery}
              value={query}
              onKeyPress={search}
            />
          </div>
         <div style={{marginLeft:"15%",borderRadius:"20px",color:"grey",backgroundColor:"white",width:"70%",overflow:"hidden",display:(dsp?'block':'none')}}>
         {filtercity.map((c)=>{
          return(
            <ul  style={{width:"100%",backgroundColor:"white",borderRadius:"10px",padding:"10px"}}>
           <li style={{listStyle:"none",fontSize:"25px",fontWeight:400,borderBottom:"1px solid grey"}} onKeyPress={search} onClick={(()=>handleClickCity(c))}>
            {c}
           </li>
            </ul>
          )
        })}
         </div>
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="location-box">
            <div className="nameof-city">
              <div className="location-name">
                {weather.name} , {weather.sys.country},
              </div>
              <div className="time">{datebuilder(new Date())}</div>
              {/* {weather} */}
              <div className="temprature_weather">
                <div className="temprature">
                  {Math.round(weather.main.temp)} °C
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default WeatherApp;
