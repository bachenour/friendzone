import moment from "moment";
import React, {useState} from "react";
import {Avatar, Divider, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../../styles/Comment.css";
import axios from "axios";


function Comments({comments, postId}){
    const [text, setText] = useState("");
    const [commentsList, setCommentsList] = useState(comments);

    const handleClick = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3030/opinion/addOpinion", {
            text: text,
            post_id: postId,
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token") ?? "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9tYXJAd2FubnYyLmNvbSIsInBzZXVkbyI6IlBoaWxseSBGbGluZ28iLCJpYXQiOjE2ODg0MTY3NzAsImV4cCI6MTY4ODQyNzU3MH0.LEAgoSj-4FVT7IQ6I1QO-epYfqW9hWcr5fTru3JwLqXmDo5RbocIIdjcMv2ZYPV4jaOMfhcKXj9oZOkNLO0XNn7hHL8jwcQW80njsY6zFOEqvZHAMxg2cZuony5s4xzfKc8TzkCbYPfoSM03yjzRExYVKC7Jdumvkr-yhvwYj7wdMhR_z2zVmmWtU9y5hBohP-MsHbzxOwqru8aleK_DlvadzxOt8UkPfKn78I3QZrQemWSBiJjthGHgdbB7jbhxJviZoqjgxX3RFjIqjexGmNBWRgEmT90OJ5HyVJnBrC-QLlKNZROl6Y9dGOBqZtcY-nwtlK_AEGM3-sYyimaJTUVmwVwAsZvrvj7RovAFJ-m4YsHescYI9pIvKEgYWVpLNhs46SefuUwkBWyD5Dp0k7ps3VkV--H8QR50_8uLZBOIUQUfpIs2C9J_XcUAJEneecu5cXYcBD8CGdrJD0E6Du7diHP0XvhWU8hJdHvxuni_RZ7vHCp7AuLKapZIlyeOnTIYPlz79toWUJHErw16T3r8jVYCEQ4pIkzbA456YmsMRq-xq5m240D1DyI-V1spSjQrkKhk99wWaZlILUb2MFV11TxxaSD8pZ7K8wV_79ErkIYSk-mE1rnc8-ztJxbdv3i5BpXoZRso1ovafUFsMy6BH2v3XbxiEJ1QrpWNhy8",
            },
        }).then((response) => {
            //commentList.push(response.data);
            //new opinion on top commentList
            commentsList.unshift({
                text: text,
                creationDate: moment().format("YYYY-MM-DD HH:mm:ss"),
                user: {
                    pseudo: "Phily Flingo"
                }
            });
            setCommentsList(commentsList);
            setText("")
        }).catch((error) => {
            console.log(error);
        });
            
        
    };


    return (
        <div className="comments">
            <Grid container spacing={2} className="write">
                <Grid xs={12}  className="inLineForm" >
                    <Grid container={true} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar className="avatar">H</Avatar>
                        <TextField id="outlined-basic" className="commentField" label="Votre commentaire" variant="outlined" value={text} onChange={(e) => setText(e.target.value)} style={{width:"80%"}}/>
                        <Button className="sendComment" onClick={handleClick} variant="text">Envoyer</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider variant="middle" style={{"margin-bottom": "5%"}}/>
            <div className="commentList">
            {commentsList.map((comment) => (
            <Grid className="comment" container spacing={2} key={comment.id} sx={{ justifyContent: 'center' }} >
                <Grid xs={1} item>
                    <Avatar>T</Avatar>
                </Grid>
                <Grid className="info" xs={8} item>
                    <span className="pseudoComment">Anonymous</span>
                    <p className="commentText">{comment.text}</p>
                </Grid>
                <Grid className="date" xs={2} item>
                    <em>{moment(comment.createdAt).fromNow()}</em>
                </Grid>
            </Grid>
            ))}
            </div>
        </div>
    );
}
export default Comments;