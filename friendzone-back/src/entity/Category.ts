import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Activity} from "./Activity";
import {Opinion} from "./Opinion";
import {Users_activity} from "./Users_activity";

@Entity("category")

export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 256, nullable: true })
    name: string
    
    @Column("varchar", { length: 256, nullable: true })
    icon: string

    @OneToMany(() => Activity, activity => activity.category)
    activity: Activity[]

    @OneToMany(() => Users_activity, users_activity => users_activity.category)
    users_activity: Users_activity[]
}