import "../styles/SearchActivity.css";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";


const listActivity = [
  "Bowling",
  "Billard",
  "Restaurant",
  "shopping",
  "Cinéma",
  "Laser-game",
];

let cityResults = [];

function SearchActivity() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    let results = [];
    console.log("searchTerm : " + searchTerm);
    if (searchTerm !== "") {
      results = listActivity.filter((activity) =>
        activity.toLowerCase().startsWith(searchTerm.toLowerCase().slice(0, 3))
      );
      setSearchResults(results);
      console.log("searchResults : " + searchResults);
    } else if (searchTerm === "") {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleResultClick = (result) => {
    setSearchTerm(result);
  };

  fetch(
    "https://geo.api.gouv.fr/communes?nom=" +
      searchTerm +
      "&fields=departement&boost=population&limit=5",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((json) => (cityResults = json));
    console.log(cityResults)

  return (
    <>
      <div className="bar">
        <div className="check-out">
          <p>OU ?</p>
          <input type="text" value={searchTerm} placeholder="Ville, code postal..."></input>
        </div>
        <div className="guests">
          <p>QUOI ?</p>
          <input type="text" value={searchTerm} onChange={handleChange} placeholder="Rechercher une activité"></input>
            <button>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
      </div>
      <div className="search__results">
        {searchResults.length > 0 && searchTerm !== '' && (
                <ul>
                    {searchResults.map((suggestion, index) =>(
                        <li key={index} onClick={() => handleResultClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}             
        </div>
    </>
  );
}

export default SearchActivity;