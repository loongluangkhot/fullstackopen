import React, { useState, useEffect } from "react";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const nullNotif = {
    type: "none",
    message: null,
  };
  const [notif, setNotif] = useState(nullNotif);

  useEffect(() => {
    personsService.getAll().then((res) => setPersons(res));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let existedPerson = persons.find((person) => person.name === newName);
    if (existedPerson) {
      handleUpdate(existedPerson);
      return;
    }

    handleCreate({
      name: newName,
      number: newNum,
    });
  };

  const handleCreate = (person) => {
    personsService.create(person).then((res) => {
      setPersons(persons.concat(res));
      setNewName("");
      setNewNum("");
      showNotif({
        type: "success",
        message: `Added ${res.name} to the phonebook!`,
      });
    });
  };

  const handleUpdate = (existedPerson) => {
    if (
      window.confirm(
        `${existedPerson.name} already exists in the phonebook. Would you like to update the record?`
      )
    ) {
      personsService
        .update(existedPerson.id, {
          ...existedPerson,
          number: newNum,
        })
        .then((res) => {
          setPersons(
            persons.map((person) =>
              person.id === existedPerson.id ? res : person
            )
          );
          setNewName("");
          setNewNum("");
          showNotif({
            type: "success",
            message: `Updated the number of ${res.name} in the phonebook!`,
          });
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleFilterChange = (event) => {
    let input = event.target.value;
    setNewFilter(input);
  };

  const handleDelete = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      personsService
        .remove(personToRemove.id)
        .then((res) => {
          setPersons(
            persons.filter((person) => person.id !== personToRemove.id)
          );
          showNotif({
            type: "success",
            message: `Successfully removed ${personToRemove.name} from the phonebook!`,
          });
        })
        .catch((err) => {
          showNotif({
            type: "error",
            message: `${personToRemove.name} does not exist in the phonebook!`,
          });
        });
    }
  };

  const showNotif = (notifData) => {
    setNotif(notifData);
    setTimeout(() => {
      setNotif(nullNotif);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notif} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  newName,
  handleNameChange,
  newNum,
  handleNumChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNum} onChange={handleNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, newFilter, handleDelete }) => {
  const getFilteredPersons = () => {
    let filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    );
    return filteredPersons.map((person) => (
      <div key={person.name}>
        {person.name} {person.number}{" "}
        <button type="button" onClick={() => handleDelete(person)}>
          Delete
        </button>
      </div>
    ));
  };
  return <div>{getFilteredPersons()}</div>;
};

const Notification = ({ data }) => {
  const notifStyle = {
    success: {
      backgroundColor: "#EAEAEA",
      border: "2px solid green",
      borderRadius: "10px",
      color: "green",
      padding: "10px",
      margin: "10px"
    },
    error: {
      backgroundColor: "#EAEAEA",
      border: "2px solid red",
      borderRadius: "10px",
      color: "red",
      padding: "10px",
      margin: "10px"
    },
    none: {
      hidden: true,
    },
  };

  return <div style={notifStyle[data.type]}>{data.message}</div>;
};

export default App;
