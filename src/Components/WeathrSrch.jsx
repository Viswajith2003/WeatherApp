import React, { useState, useEffect } from "react";
import {
  FaSistrix,
  FaCloud,
  FaCloudBolt,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaSnowflake,
  FaSmog,
} from "react-icons/fa6";
import axios from "axios";
import "../css/WeathrSrch.css"; // Import your CSS file here
import VideoBg from "../assets/Sunset.mp4";

function WeathrSrch() {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState({
    name: "",
    weather: [{ main: "" }],
    main: { temp: 0, temp_max: 0, temp_min: 0 },
  });
  const [input, setInput] = useState("");
  const [emojiComponent, setEmojiComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a696b90198675218b8ad99fe342bf0b5`
      );
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [search]);

  useEffect(() => {
    let emoji = null;
    switch (data.weather[0].main) {
      case "Clouds":
        emoji = <FaCloud />;
        break;
      case "Thunderstorm":
        emoji = <FaCloudBolt />;
        break;
      case "Drizzle":
        emoji = <FaCloudRain />;
        break;
      case "Rain":
        emoji = <FaCloudShowersHeavy />;
        break;
      case "Snow":
        emoji = <FaSnowflake />;
        break;
      default:
        emoji = <FaSmog />;
    }
    setEmojiComponent(emoji);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  };

  const formatDate = () => {
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: "long" });
    let day = d.toLocaleString("default", { weekday: "long" });
    return `${day}, ${month} ${date}, ${year}`;
  };

  const formatTime = () => {
    let d = new Date();
    return d.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="main flex flex-col justify-center items-center h-screen">
      <video className="absolute" autoPlay loop muted>
        <source src={VideoBg} type="video/mp4" />
      </video>
      <div className="container mt-3 lg:mt-24 relative">
        <div className="row justify-center items-center">
          <div className="col-md-4 mt-16">
            <div className="card bg-dark text-white text-center border-0 rounded">
              <img
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                className="cardImg rounded"
                alt="Weather condition"
                onError={(e) =>
                  (e.target.src = "https://source.unsplash.com/600x900/?nature")
                }
              />
              <div className="card">
                <form onSubmit={handleSubmit}>
                  <div className="input-group w-75 h-12 mt-4 mx-auto">
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
                      <b>
                        <FaSistrix className="text-3xl" />
                      </b>
                    </button>
                  </div>
                </form>
                <br />
                <div className="mt-5 bg-dark bg-opacity-50 py-3 rounded ml-2 mr-2">
                  <h1 className="card-title text-4xl mt-2 font-bold">
                    {data.name}
                  </h1>
                  <p className="card-text text-xl">
                    {formatDate()}
                    <br />
                    {formatTime()}
                  </p>
                  <br />
                  <hr />
                  {emojiComponent && (
                    <div className="text-9xl mt-3 ml-40">{emojiComponent}</div>
                  )}
                  {data.main && (
                    <h1 className="mb-5 text-5xl font-bold">
                      {Math.round(data.main.temp - 273.15)}&deg;C
                    </h1>
                  )}
                  {data.weather[0] && (
                    <p className="lead fw-border mb-0 font-bold">
                      {data.weather[0].main}
                    </p>
                  )}
                  {data.main && (
                    <p className="lead mb-4">
                      {Math.round(data.main.temp_max - 273.15)}&deg;C |{" "}
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
