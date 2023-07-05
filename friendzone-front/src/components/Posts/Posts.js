import React, {useEffect, useState} from "react";
import axios from "axios";
import Post from "./Post";
import uuid from "react-uuid";
import "./posts.scss";
import {Box, Typography} from "@mui/material";



export default function Posts() {
    const [posts, setPosts] = useState([]);
    
    
    React.useEffect(() => {
        let isMounted = true;
        if (posts.length === 0) {
            axios.get("http://127.0.0.1:3030/posts/getPosts", {
                headers: {
                    "Cache-Control": "no-cache"}
                })
                .then(response => {
                    console.log(response.data.posts);
                    setPosts(response.data.posts);
                })
        }
        return () => { isMounted = false; }
    }, []);
    
    return (
    <>
        <Box
            className="friendplace-title"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: "3rem",
            }}
        >
            <h1 className="title-fp">La FriendPlace</h1>
            <h2 className="subtitle-fp" variant="h2" >Qui vous relie</h2>
        </Box>
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
                    isComments={true}
                />
            );
        })};
    </>
    );
}