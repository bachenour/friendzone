import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, OneToOne} from "typeorm"
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

    @OneToOne(() => User)
    @JoinColumn()
    users_id: number
}
