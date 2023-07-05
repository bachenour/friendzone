import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Activity} from "./Activity";
import {Opinion} from "./opinion";
import {Users_activity} from "./users_activity";

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
}