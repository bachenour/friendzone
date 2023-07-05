import '../styles/MemoryActivity.css'
import cinemaMemory from '../assets/cinemaMemory.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useState} from "react";
import axios from "axios";
import {Box} from "@mui/material";
import Post from "./Posts/Post";
import uuid from "react-uuid";
import {Link} from "react-router-dom";

function MemoryActivity() {
    const [posts, setPosts] = useState([]);

    React.useEffect(() => {
        let isMounted = true;
        if (posts.length === 0) {
            axios.get("http://127.0.0.1:3030/posts/getPosts", {
                headers: {
                    "Cache-Control": "no-cache"}
            })
                .then(response => {
                    //limit to 4 posts
                    response.data.posts = response.data.posts.slice(0, 2);
                    setPosts(response.data.posts);
                })
        }
        return () => { isMounted = false; }
    }, []);
    
    return (
        <>
                {posts.map(({
                                id,
                                title,
                                content,
                                creationDate,
                                users,
                                opinion
                            }) => {
                    return (
                        <Post
                            key={uuid()}
                            id={id}
                            title={title}
                            content={content}
                            creationDate={creationDate}
                            users={users}
                            comments={opinion}
                            isComments={false}
                        />
                    );
                })};
            );
            <div className='circleButton'>
                <Link to={"/friendplace"} className='iconCircleButton'>Voir plus</Link>
            </div>
            <div className='memoryBanner'>
                <p>avis</p>
            </div>
        </>
    )
}

export default MemoryActivity