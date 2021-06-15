import { useEffect, useState } from "react";
import "./App.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import SearchIcon from "@material-ui/icons/Search";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { FaCompressAlt } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdDescription } from "react-icons/md";
import { BiWind } from "react-icons/bi";
import { FaAirFreshener } from "react-icons/fa";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import AOS from "aos";
import "aos/dist/aos.css";

const currentDate = new Date();
const getHours = currentDate.getHours();
const getMinutes = currentDate.getMinutes();
let amOrPm = getHours >= 12 ? "PM" : "AM";
let amOrPm2 = getHours >= 20 ? "Moon" : "Sun";
let hours = getHours % 12 || 12;

AOS.init();
// console.log(currentDate.getHours() + currentDate.getMinutes() + currentDate.getSeconds());

function App() {
  const [getData, setGetData] = useState({});
  const [input, setInput] = useState("");
  const [state, setState] = useState("Talwara");
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      const url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=c100a76ad7932fbe4e2f4a545e78f9a2`
      );
      const convertJson = await url.json();
      console.log(convertJson);
      setGetData(convertJson);
    };
    fetchApi();
  }, [state]);

  useEffect(() => {
    const getSpinner = () => {
      const timer = setTimeout(() => {
        // setSpinner(true);
       return  <ScaleLoader/>
      }, 2000);
      return () => clearTimeout(timer);
    }
    getSpinner()
  }, []);

  const submitData = (e) => {
    e.preventDefault();
    setState(input);
  };

  const kelvinToCelcius = (k) => {
    return (k - 273.15).toFixed(2);
  };

  const pageRefresh = () => {
    window.location.reload() 
  }

  if (!getData.main)
    return <div className="app__handleNoDataDiv">
    <p className="app__handleNoData">NO DATA FOUND💀</p>
    <button onClick={pageRefresh} className="app__handleError__button">Back to Weather</button>
    </div> 

  const getBackgroundImages = () => {
    if (getData.weather[0].main === "Clear") {
      return "good";
    } else if (getData.weather[0].main === "Clouds") {
      return "clouds";
    } else if (getData.weather[0].main === "Rain") {
      return "bad";
    } else {
      return "haze";
    }
  };

  return (
    // <div className={getData.weather[0].main === "Clear" ? "good" : "bad"}>
    <div className={getBackgroundImages()}>
      <div className="app">
        <div className="app__child">
          <form>
            <div
              data-aos="fade-right"
              data-aos-delay="500"
              className="app__inputDiv"
            >
              <SearchIcon className="app__searchIcon" />
              <input
                className="input"
                placeholder="Search Location"
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button type="submit" onClick={submitData} className="submit__button" disabled={!input}>
                Search
              </button>
            </div>
          </form>

          {!getData.main ? (
            <p className="app__handleNoData">NO DATA FOUND💀</p>
          ) : (
            // <div className={getData.weather[0].main === "Clear" ? "good" : "bad"}>
            <div
              data-aos="fade-left"
              data-aos-delay="600"
              className="card"
            >
              <div className="card__after">
                <h4>Current Weather</h4>
                <p className="app__time">
                  {hours + ":" + getMinutes + " " + amOrPm}
                </p>
                <p className="app__cityName">{input} Weather</p>
                {/* <p>Weather : {getData.weather[0].description}</p> */}
                <div className="app__weatherDegree">
                  {amOrPm2 === "Sun" ? (
                    <WbSunnyIcon className="app__sunIcon" />
                  ) : (
                    <NightsStayIcon className="app__moonIcon" />
                  )}
                  <p className="app__sunDegree">
                    {kelvinToCelcius(getData.main.temp)}{" "}
                    <span className="app__degree">℃</span>{" "}
                  </p>
                </div>
                <p
                  style={{
                    marginTop: 10,
                    fontSize: 25,
                    color: "white",
                    fontWeight: 700,
                    letterSpacing: 2,
                  }}
                >
                  {getData.weather[0].main}
                </p>
                {/* {getData.weather[0].main === "Clear" ? <p>Hello</p> : <p>Hi</p> } */}
              </div>

              <div
                style={{ marginTop: 15 }}
                className="app__right"
              >
                <div
                className="app__rightHoverState"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid white",
                    paddingBottom: 7,
                    
                  }}
                >
                  <p className="app__rightIcon app__rightIcon2">
                    <FaAirFreshener className="app__rightIcon " style={{ marginRight: 10 }} />
                    RealFeel Shade
                  </p>
                  <p className="app__rightIcon">{kelvinToCelcius(getData.main.feels_like)} ℃</p>
                </div>
                <div
                className="app__rightHoverState"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid white",
                    paddingBottom: 7,
                    marginTop: 10,
                  }}
                >
                  <p className="app__rightIcon app__rightIcon3" >
                    <FaCompressAlt className="app__rightIcon" style={{ marginRight: 10 }} />
                    Pressure
                  </p>
                  <p className="app__rightIcon">{kelvinToCelcius(getData.main.pressure)} mb</p>
                </div>
                <div
                className="app__rightHoverState"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid white",
                    paddingBottom: 7,
                    marginTop: 10,
                  }}
                >
                  <p className="app__rightIcon app__rightIcon3">
                    <WiHumidity className="app__rightIcon" style={{ marginRight: 10 }} />
                    Humidity
                  </p>
                  <p className="app__rightIcon">{getData.main.humidity} %</p>
                </div>

                <div
                className="app__rightHoverState"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid white",
                    paddingBottom: 7,
                    marginTop: 10,
                  }}
                >
                  <p className="app__rightIcon app__rightIcon4">
                    <MdDescription className="app__rightIcon" style={{ marginRight: 10 }} />
                    description
                  </p>
                  <p className="app__rightIcon">{getData.weather[0].description}</p>
                </div>
                <div
                className="app__rightHoverState"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid white",
                    paddingBottom: 7,
                    marginTop: 10,
                  }}
                >
                  <p className="app__rightIcon app__rightIcon5">
                    <BiWind style={{ marginRight: 10 }} />
                    Wind
                  </p>
                  <p className="tension">{getData.wind.speed}</p>
                </div>
              </div>
            </div>
            // </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
