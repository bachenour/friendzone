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

    @ManyToOne(() => User, user => user.activity, {nullable: false})
    @JoinColumn({name:"users_id"})
    users: User

    @ManyToOne(() => Category, category => category.activity, {nullable: false})
    @JoinColumn({name:"category_id"})
    category: Category
}