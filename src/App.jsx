import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  async function getData(et) {
    et.preventDefault();
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4f8ed5dfda98301b6c0f0f0ce77b7279`
    );
    const finalRes = await res.json();
    console.log(finalRes);
    if (finalRes.cod == "404") {
      setData(undefined);
    } else {
      setData(finalRes);
    }
  }
  return (
    <>
      <div className="box">
        <div className="head-box">
          <h1>Weather App</h1>
        </div>
        <div className="weather-box">
          <form onSubmit={(et) => getData(et)}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
            <button>Search</button>
          </form>
          <div className="output">
            {data !== undefined ? (
              <>
                <h3>
                  {data?.name}
                  <span> {data?.sys.country}</span>
                </h3>
                <h2>{data?.main.temp}</h2>
                <img
                  src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                />
                <p className="txt">{data?.weather[0].description}</p>
              </>
            ) : (
              "No data found"
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
