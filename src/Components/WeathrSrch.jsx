import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCloud, faSun } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import Axios

function WeathrSrch() {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState({
    name: "",
    weather: [{ main: "" }],
  });

  const [input, setInput] = useState("");

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a696b90198675218b8ad99fe342bf0b5`
      );
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    fetchWeather();
  }, [search]);

  // //Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let dat = d.toLocaleString("default", { weekday: "long" });

  // //Time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  };

  return (
    <div className="">
      <div className="container mt-3 lg:mt-24">
        <div className="row justify-center items-center">
          <div className="col-md-4 mt-16 ">
            <div className="card bg-dark text-white text-center border-0 rounded">
              <img
                src="https://source.unsplash.com/600x900/?nature,water"
                className="cardImg rounded"
                alt="cardimage"
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group  w-75 h-12 mt-4 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="search input-group-text bg-gray-400"
                      id="basic-addon2"
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </form>
                <br />
                <div className="mt-5 bg-dark bg-opacity-50 py-3 rounded ml-2 mr-2">
                  <h1 className="card-title text-4xl mt-2 font-bold">
                    {data.name}
                  </h1>
                  <p className="card-text text-xl">
                    {dat}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>
                  <br />
                  <hr />

                  <FontAwesomeIcon icon={faCloud} className="text-8xl mt-3" />

                  {data.main && (
                    <h1 className="mb-5 text-5xl font-bold">
                      {Math.round(data.main.temp - 273.15)}&deg;C
                    </h1>
                  )}

                  <p className="lead fw-border mb-0 font-bold">
                    {data.weather && data.weather[0] && (
                      <p className="lead fw-border mb-0 font-bold">
                        {data.weather[0].main}
                      </p>
                    )}
                  </p>

                  {data.main && (
                    <p className="lead mb-4">
                      {Math.round(data.main.temp_max - 273.15)}&deg;C |
                      {Math.round(data.main.temp_min - 273.15)}&deg;C
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WeathrSrch;