import '../styles/SearchActivity.css'
import React, {useEffect} from "react";
import axios from "axios";
import {Autocomplete, Box, TextField} from "@mui/material";

const listActivity = [
    {nom: "Bowling"},
    {nom: "Billard"},
    {nom: "Restaurant"},
    {nom: "shopping"},
    {nom: "Cinéma"},
    {nom: "Laser-game"}
]


function SearchActivity() {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [activitiesList, setActivitiesList] = React.useState([]);
    
    const [cityTerm, setCityTerm] = React.useState("");
    const [cityResults, setCityResults] = React.useState([]);
    

    React.useEffect(() => {
        //Ile de france departements array
        let departement = ["75", "77", "78", "91", "92", "93", "94", "95", "13", "69", "972", "971"];
        let cityList = [];
        
        //if no city in cityResults
        if (cityResults.length === 0) {
            //for each departement get cities
            departement.map((departement) => {
                axios.get("https://geo.api.gouv.fr/departements/" + departement + "/communes")
                    .then(response => {
                        //for each city add if not in cityList
                        response.data.map((city) => {
                            if (!cityList.includes(city)) {
                                cityList.push(city);
                            }
                        })
                    })
            })
            setCityResults(cityList);
        }
        
        //if activitiesList is empty
        if (activitiesList.length === 0) {
            axios.get("http://127.0.0.1:3030/category/getCategories")
                .then(response => {
                    setActivitiesList(response.data.categories);
                })
        }
        
    }, []);
    
    return (
        <>
            <div className="searchActivity">
                <Autocomplete
                    id="country-select-demo"
                    sx={{ width: 300 }}
                    options={activitiesList}
                    autoHighlight
                    getOptionLabel={(option) => option.name }
                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                            key={`${option.name}-${option.id}`}
                            {...props}>
                            {option.name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Une activité ?"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
                <Autocomplete
                    id="country-select-demo"
                    sx={{ width: 300 }}
                    options={cityResults}
                    autoHighlight
                    getOptionLabel={(option) => option.nom + " - " + option.code}
                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                            key={`${option.nom}-${option.code}`}
                            {...props}>
                            {option.nom}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choisis une ville"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            </div>
        </>
    )
}

export default SearchActivity