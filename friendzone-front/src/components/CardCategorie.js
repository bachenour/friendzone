import '../styles/CardCategorie.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from '../assets/logo_slogan_friendzone.png'
import {useEffect, useState} from "react";
import axios from "axios";
import ActivityCard from "./Activity/ActivityCard";

function CardCategorie() {
    const [activities, setActivities] = useState([])
    
    useEffect(() => {
        let isMounted = true;
        if (activities.length === 0) {
            axios.get("http://127.0.0.1:3030/activity/getActivities", {
                headers: {
                    "Cache-Control": "no-cache"}
            })
                .then(response => {
                    //limit to 6 activities
                    response.data.activities = response.data.activities.slice(0, 9);
                    setActivities(response.data.activities);
                })
        }
        return () => { isMounted = false; }
    }, []);
    
    return (
        <>
            <ul className="cards">
                {activities.map((activity) => {
                    return (
                        <>
                            <ActivityCard activity={activity} />
                        </>
                    )
                })}
            </ul>
            <div className='circleButton'>
                <a href='#' className='iconCircleButton'><KeyboardArrowDownIcon></KeyboardArrowDownIcon></a>
            </div>
            <div className='memoryBanner'>
                <p>souvenir</p>
            </div>
        </>
    )
}

export default CardCategorie