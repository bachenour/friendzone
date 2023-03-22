import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Category} from "./Category";

@Entity("activity")

export class Activity {

    @PrimaryGeneratedColumn({name: "id"})
    id: number

    @Column("varchar", { length: 256, nullable: true })
    subject: string

    @Column("int", { nullable: true })
    max_person: number

    @Column("datetime", { nullable: true })
    date_activity: Date

    @Column("varchar", { nullable: true })
    address: string

    @Column("varchar", { nullable: true })
    city: string

    @Column("int", { nullable: true })
    postal_code: number

    @ManyToOne(() => Category, category => category.activity, {nullable: false})
    @JoinColumn({name:"category_id"})
    category: Category

    @ManyToOne(() => User, user => user.activity, {nullable: false})
    @JoinColumn({name:"users_id"})
    users: User
}