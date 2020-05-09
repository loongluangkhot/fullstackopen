import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const WEATHERSTACK_API_KEY = "a46abcf73b65e79e2d3e18b81160b65d";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };

  const matches =
    search.length === 0
      ? []
      : countries.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <CountrySearch search={search} handleSearchChange={handleSearchChange} />
      <CountrySearchResult
        matches={matches}
        handleSearchChange={handleSearchChange}
      />
    </div>
  );
}

const CountrySearch = ({ search, handleSearchChange }) => {
  const handleOnChange = (event) => {
    handleSearchChange(event.target.value);
  };
  return (
    <div>
      find countries{" "}
      <input type="text" value={search} onChange={handleOnChange} />
    </div>
  );
};

const CountrySearchResult = ({ matches, handleSearchChange }) => {
  const handleClick = (event) => {
    handleSearchChange(event.target.value);
  };

  if (matches.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (matches.length > 1) {
    return (
      <div>
        {matches.map((match) => (
          <div key={match.name}>
            {match.name}{" "}
            <button type="button" onClick={handleClick} value={match.name}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  } else if (matches.length === 1) {
    return <CountryInfo country={matches[0]} />;
  } else {
    return null;
  }
};

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({
    temp: "loading...",
    weather_icons: [],
    wind: "loading...",
  });

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: WEATHERSTACK_API_KEY,
          query: country.capital,
        },
      })
      .then((response) => {
        let data = response.data.current;
        setWeather({
          temp: data.temperature,
          weather_icons: data.weather_icons,
          wind: `${data.wind_speed} mph direction ${data.wind_dir}`,
        });
      });
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
      </div>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img
        style={{ height: "100px" }}
        src={country.flag}
        alt={`flag of ${country.name}`}
      />
      <h2>Weather in {country.capital}</h2>
      <div>
        <b>temperature: </b>
        {`${weather.temp} Celcius`}
      </div>
      <div>
        {weather.weather_icons.map((icon_url) => (
          <img src={icon_url} alt="weather icon" />
        ))}
      </div>
      <div>
        <b>wind: </b>
        {weather.wind}
      </div>
    </div>
  );
};

export default App;
