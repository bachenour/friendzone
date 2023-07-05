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
                "x-access-token": localStorage.getItem("token") ?? "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9tYXJAd2FubnYyLmNvbSIsInBzZXVkbyI6IlBoaWxseSBGbGluZ28iLCJpYXQiOjE2ODg1NTAwNTYsImV4cCI6MTY4ODU2MDg1Nn0.tvtWvERP17lG0N78L72DnhB3uQWWacy8DZX4ANiJkr7RILetUJNwTlIv98NauEfGDzT-E0cBswsY-gYfh5V-vvYuWrN3kzkCRqw2iNf-vdpa6SRoSrKDGAqjNASm5E8sHCMAHW1DYdSqD6fCpwWLkEbgj0YjSwGeg5UVfYMrjZCuux5vWmKCfg7si92iLQkDkXCbpM-gwkpzFmAUR2Ett6haEFaa4J_QmHe7HYLjvVixNm_hsB48u79AYjXu031lBrAZkBkMbI_ky_jXXCkJhXT4ojD5AgDd-EvrATUMF_LY-ZegsO6NFciYCDgOk1APYex_kGaOxdTZ3LwrisKrjEaFbOZI224xLOd1p6xlZc4ZVIBiDARSfEJxx17TvAsGXgDzhacXbNowPnG8Imi_H2dPyZSUBDrnajk2k2mxuKCjrjkShL_wIbkFAOUNaJJbDCo6R15oeHbmJ2Zx_sluy50c87tCN4i_80ePHPBfOw9HSgiO8HPAlIFL132Rnlxpugwz6rV8H5AIxe4OCYr-LafZc-8NTvBXsTDc8WWUe2jwVlyY4LVNZ-WlrxOU21w9WbeiK4d0WaGPZXy_BEsIwbQL0jqKv55A9sQkH9tiy2Io046S_v1BaTBXUp-B1_ZvZXdma6n595Jk0xZJdCu_L387UpbbosAnDzYROZbfr0Y",
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