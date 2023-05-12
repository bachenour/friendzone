import '../styles/SearchActivity.css'
import React from "react";

const listActivity = [
    "Bowling",
    "Billard",
    "Restaurant",
    "shopping",
    "Cinéma",
    "Laser-game"
]

let cityResults = []

function SearchActivity() {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
        let results = []
        if (searchTerm !== '') {
            results = listActivity.filter(activity =>
                activity.toLowerCase().includes(searchTerm)
            );
            setSearchResults(results);
        } else if (searchTerm === '') {
            setSearchResults([]);
        }
    }, [searchTerm]);

    fetch("https://geo.api.gouv.fr/communes?nom="+ searchTerm +"&fields=departement&boost=population&limit=5", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET"
      })

        .then(response => response.json())
        .then(json => cityResults = json);

    return (
        <>
            <div className="searchActivity">
                <label for="searchBarCity">OU ?</label>
                <input type="text" name="searchBar" id="searchBarCity" placeholder="Ville, code postal..." />
                <label for="searchBarActivity">QUOI ?</label>
                <input type="text" name="searchBar" id="searchBarActivity" placeholder="Rechercher une activité" value={searchTerm} onChange={handleChange} />
            </div>
            <div className="search__results">
                <ul>
                    <li>
                        <li></li>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SearchActivity