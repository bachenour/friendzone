import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity("like")

export class Like {

    @PrimaryGeneratedColumn({name: "id"})
    id: number

    @ManyToOne(() => User, user => user.likes, {nullable: false})
    @JoinColumn({name:"users_id"})
    user: User

    @ManyToOne(() => Post, post => post.likes, {nullable: false})
    @JoinColumn({name:"post_id"})
    post:  Post
}