import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne} from "typeorm"
import {User} from "./User";

@Entity("posts")
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @CreateDateColumn()
    creationDate: Date

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({name:"users_id"})
    users: User
}
