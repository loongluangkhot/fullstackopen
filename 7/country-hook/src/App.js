import React, { useState, useEffect } from "react";
import axios from "axios";
const { CancelToken, isCancel } = axios;

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) {
      return;
    }
    const source = CancelToken.source();
    const api = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;
    axios
      .get(api, { cancelToken: source.token })
      .then((res) => {
        setCountry({
          data: res.data[0],
          found: true,
        });
      })
      .catch((e) => {
        if (!isCancel(e)) {
          if (e.response && e.response.status === 404) {
            setCountry({
              found: false,
            });
          } else {
            throw e;
          }
        }
      });
    return () => source.cancel();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
