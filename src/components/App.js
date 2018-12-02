import React from "react";
import "../css/App.css";
import "../css/weather-icons.min.css";
import "../css/weather-icons-wind.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadin: true,
      cities: [],
      numberOfCities: 1,
      citiesArray: [
        3081368,
        7530858,
        756135,
        3093133,
        3083829,
        7531002,
        3102014,
        3096472,
        765876,
        769250
      ]
    };
  }

  componentDidUpdate() {
    if (!this.state.isLoadin) return;
    this.fetchData();
  }

  fetchData() {
    const { citiesArray, numberOfCities } = this.state;
    const choosenCities = citiesArray.slice(0, numberOfCities);
    const apiKey = "fde160808e360e817d6a4b0589eeffe3";
    const apiUrl = `http://api.openweathermap.org/data/2.5/group?id=${[
      ...choosenCities
    ].join(",")}&units=metric&appid=${apiKey}`;

    console.log(apiUrl);
    

    fetch(apiUrl)
      .then(r => r.json())
      .then(data =>
        this.setState({
          cities: data.list,
          isLoadin: false
        })
      )
      .catch(error => console.log("parsing failed", error));
  }

  handleButtonClick = e => {
    e.preventDefault();
    this.setState({
      numberOfCities: parseInt(e.target.value),
      isLoadin: true
    });
  };

  renderSwitch(param) {
    switch (param) {
      case "Rain":
        return "wi wi-rain-mix";
      case "Clear":
        return "wi wi-day-sunny";
      case "Clouds":
        return "wi wi-cloudy";
      case "Mist":
        return "wi wi-fog";
      case "Snow":
        return "wi wi-snow";
      default:
        return "wi wi-na";
    }
  }

  render() {
    const { cities } = this.state;

    return (
      <div className="main">
        <h2 className="title">Wybierz ilość miast</h2>
        <div className="buttons_wrapper">
          <button onClick={this.handleButtonClick} className="btn" value="1">
            1
          </button>
          <button onClick={this.handleButtonClick} className="btn" value="4">
            4
          </button>
          <button onClick={this.handleButtonClick} className="btn" value="9">
            9
          </button>
        </div>
        <div className="container">
          {cities.map(city => (
            <ul className="box" key={city.name}>
              <li className="city_title">{city.name}</li>
              <li className="occur">
                <i className={this.renderSwitch(city.weather[0].main)} />
              </li>
              <li className="list_item">
                <i className="wi wi-thermometer"> {city.main.temp}</i>
                <i className="wi wi-celsius" />{" "}
                <i className="wi wi-humidity"> {city.main.humidity}</i>{" "}
                <i className="wi wi-barometer"> {city.main.pressure}</i>
              </li>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
