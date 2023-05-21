import '../styles/SearchActivity.css'
import React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';

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
                activity.toLowerCase().startsWith(searchTerm.toLowerCase().slice(0, 3))
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

        const ColorButton = styled(Button)(({ theme }) => ({
            color: theme.palette.getContrastText(purple[500]),
            backgroundColor: purple[500],
            '&:hover': {
              backgroundColor: purple[700],
            },
          }));

    return (
        <>
            <div className="searchActivity">
                <label for="searchBarCity" className='searchBar'>OU ?</label>
                <input type="text" name="searchBar" id="searchBarCity" placeholder="Ville, code postal..." />
                <label for="searchBarActivity" className='searchBar'>QUOI ?</label>
                <input type="text" name="searchBar" id="searchBarActivity" placeholder="Rechercher une activité" value={searchTerm} onChange={handleChange} />
            </div>
            <div className="search__results">
            <ColorButton variant="contained">Rechercher</ColorButton>                <ul>
                    <li>
                        <li>{searchResults}</li>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SearchActivity