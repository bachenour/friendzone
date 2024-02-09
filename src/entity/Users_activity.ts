import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Activity} from "./Activity";

@Entity("users_activity")

export class Users_activity {
    
    @PrimaryGeneratedColumn({name: "id"})
    id: number

    @ManyToOne(() => User, user => user.activity, {nullable: false})
    @JoinColumn({name:"users_id"})
    users: User

    @ManyToOne(() => Activity, activity => activity.users_activity, {nullable: false})
    @JoinColumn({name:"activity_id"})
    activity: Activity
}