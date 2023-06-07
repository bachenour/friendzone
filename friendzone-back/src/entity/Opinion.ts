import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Category} from "./Category";

@Entity("opinion")

export class Opinion {

    @PrimaryGeneratedColumn({name: "id"})
    id: number

    @Column("varchar", { length: 256, nullable: true })
    subject: string

    @Column("varchar", { nullable: true })
    text: string

    @ManyToOne(() => User, user => user.opinion, {nullable: false})
    @JoinColumn({name:"users_id"})
    users: User
}