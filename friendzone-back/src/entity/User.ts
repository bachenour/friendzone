import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {Post} from "./Post";
import {Activity} from "./Activity";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number

    @Column("varchar", { length: 200 , name: "name", nullable: false })
    name: string

    @Column("varchar", { length: 200 , name: "full_name", nullable: false })
    full_name: string

    @Column("varchar", { length: 56 , name: "email", nullable: false, unique: true })
    email: string

    @Column("varchar", { length: 128 , name: "password", nullable: false })
    password: string

    @Column("int", { name: "age", nullable: false })
    age: number

    @Column("varchar", { length: 32 , name: "pseudo", nullable: true })
    pseudo: string

    @Column("varchar", { length: 128 , name: "user_address", nullable: true })
    user_address: string

    @Column("varchar", { length: 56 , name: "city", nullable: true })
    city: string

    @Column("int", { name: "postal_code", nullable: true })
    postal_code: number

    @Column("int", { name: "phone_number", nullable: true })
    phone_number: number

    @Column("varchar", { length: 256 , name: "profile_picture", nullable: true })
    profile_picture: string

    @Column("varchar", { length: 6 , name: "sex", nullable: true })
    sex: string

    @Column("boolean", { name: "is_verified", nullable: true, default: () => "'0'" })
    is_verified: boolean

    @Column("varchar", { length: 45 , name: "role", nullable: true })
    role: string
    
    token: string

    @OneToMany(() => Post, post => post.users_id)
    posts: Post[]

    @OneToMany(() => Activity, activity => activity.users_id)
    activity: Activity[]

}
