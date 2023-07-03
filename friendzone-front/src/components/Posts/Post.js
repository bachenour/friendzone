import {Avatar, Box, Divider, Grid, IconButton, Typography} from "@mui/material";
import React, {useState} from "react";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    MoreHorizOutlined,
    ShareOutlined
} from "@mui/icons-material";
import FlexBetween from "../Utils/FlexBetween";
import WidgetWrapper from "../Utils/WidgetWrapper";
import uuid from "react-uuid";
import {Link} from "react-router-dom";
import moment from "moment";
import Comments from "../Comments/Comments";
import Home from "../Home";
import "./post.scss";
import {Stack} from "@mui/system";


function Post({
    _id, 
    title, 
    content, 
    creationDate,
    users,
    comments,
    isComments = true,
}){
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const isLiked = false;
    
    return (
        <div className="post">
            <Grid className="container">
                <Grid xs={12} className="user" spacing={4}>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: 'center'}}>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                            <Avatar>N</Avatar>
                            <Typography className="details">
                                <span className="name">{users.pseudo}</span>
                                <span className="date"> {moment(creationDate).fromNow()}</span>
                            </Typography>
                        </Grid>
                        <MoreHorizOutlined className="outlineMenu" onClick={() => setMenuOpen(!menuOpen)} />
                        {menuOpen && users.pseudo === "DyFlow" && (
                            <button>delete</button>
                        )}
                        
                    </Stack>
                </Grid>
                <div className="content">
                    <h3>{title}</h3>
                    <Divider />
                    <p>{content}</p>
                </div>
                <div className="info">
                    <IconButton>
                        {isLiked ? (
                            <FavoriteOutlined sx={{ color: "black" }} />
                        ) : (
                            <FavoriteBorderOutlined />
                        )}
                    </IconButton>
                    <IconButton className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <ChatBubbleOutlineOutlined />
                        <span className="seeComments">See Comments</span>
                    </IconButton>
                    <IconButton>
                        <ShareOutlined />
                        <span className="seeComments">
                            Share
                        </span>
                    </IconButton>
                </div>
                {commentOpen && <Comments comments={comments} />}
            </Grid>
        </div>
    );
    
}

export default Post;