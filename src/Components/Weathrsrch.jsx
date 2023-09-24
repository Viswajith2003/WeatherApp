import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCloud } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import Axios

function Weathrsrch() {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted= true;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a696b90198675218b8ad99fe342bf0b5`
        );

        if (componentMounted) {
          setData(res.data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();

    return () => {
      componentMounted = false;
    };
  }, [search]);

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
                <form action="">
                  <div className="input-group  w-75 h-12 mt-4 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
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
                    Friday, September 22, 2023
                  </p>
                  <br />
                  <hr />
                  <FontAwesomeIcon icon={faCloud} className="text-8xl mt-3" />
                  <h1 className="mb-5 text-5xl font-bold">33.06 &deg;C</h1>
                  <p className="lead fw-border mb-0 font-bold">Cloud</p>
                  <p className="lead mb-4">30.01&deg;C | 35.01&deg;C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weathrsrch;
