import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("category")

export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 256, nullable: true })
    name: string
    
    @Column("varchar", { length: 256, nullable: true })
    icon: string
}