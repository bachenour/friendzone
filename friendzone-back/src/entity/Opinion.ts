import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Activity} from "./Activity";
import {Post} from "./Post";

@Entity("opinion")

export class Opinion {

    @PrimaryGeneratedColumn({name: "id"})
    id: number

    @Column("varchar", { nullable: true })
    text: string

    @ManyToOne(() => User, user => user.activity, {nullable: false})
    @JoinColumn({name:"users_id"})
    users: User
    
    @ManyToOne(() => Post, post => post.opinion, {nullable: true})
    @JoinColumn({name:"post_id"})
    post:  Post
    
    @ManyToOne(() => Activity, activity => activity.opinion, {nullable: true})
    @JoinColumn({name:"activity_id"})
    activity:  Activity
}