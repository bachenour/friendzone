import moment from "moment";
import React, {useState} from "react";
import {Avatar, Divider, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../../styles/Comment.css";


function Comments({comments}){
    console.log(comments)
    const [text, setText] = useState("");


    return (
        <div className="comments">
            <Grid container spacing={2} className="write">
                <Grid xs={12}  className="inLineForm" >
                    <Grid container={true} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar className="avatar">H</Avatar>
                        <TextField id="outlined-basic" className="commentField" label="Votre commentaire" variant="outlined" defaultValue={text} onChange={(e) => setText(e.target.value)} style={{width:"80%"}}/>
                        <Button className="sendComment" variant="text">Envoyer</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider variant="middle" style={{"margin-bottom": "5%"}}/>
            <div className="commentList">
            {comments.map((comment) => (
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