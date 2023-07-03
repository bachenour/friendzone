import React, {useEffect, useState} from "react";
import axios from "axios";
import Post from "./Post";
import uuid from "react-uuid";
import "./posts.scss";



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
                    setPosts(response.data.posts);
                })
        }
        return () => { isMounted = false; }
    }, []);
    
    return (
    <>
        {posts.map(({
            _id,
            title,
            content,
            creationDate,
            users,
            opinion
        }) => {
            return (
                <Post
                    key={uuid()}
                    _id={_id}
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