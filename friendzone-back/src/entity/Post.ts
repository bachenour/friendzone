import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("posts")
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    creationDate: Date
    @Column()
    users_id: number

}
