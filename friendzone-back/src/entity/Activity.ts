import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Category} from "./Category";
import {Users_activity} from "./Users_activity";
import {Opinion} from "./Opinion";

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
    @JoinColumn({name:"author_id"})
    user: User

    @OneToMany(() => Users_activity, users_activity => users_activity.activity)
    users_activity: Users_activity[]

    @OneToMany(() => Opinion, opinion => opinion.activity)
    opinion: Opinion[]

}