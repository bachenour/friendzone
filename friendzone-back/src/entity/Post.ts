import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany} from "typeorm"
import {User} from "./User";
import {Opinion} from "./Opinion";

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

    @OneToMany(() => Opinion, opinion => opinion.post, {nullable: true})
    opinion: Opinion[]
}
