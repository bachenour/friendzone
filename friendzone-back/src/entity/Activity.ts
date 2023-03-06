import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Category} from "./Category";

@Entity("activity")

export class Activity {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 256, nullable: true })
    subject: string

    @Column("int", { nullable: true })
    max_person: string

    @Column("datetime", { nullable: true })
    date_activity: string

    @Column("varchar", { nullable: true })
    address: string

    @Column("varchar", { nullable: true })
    city: string

    @Column("int", { nullable: true })
    postal_code: string

    @ManyToOne(() => Category, category => category.activity)
    @JoinColumn({name:"category_id"})
    category_id: Category

    @ManyToOne(() => User, user => user.activity)
    @JoinColumn({name:"users_id"})
    users_id: User
}