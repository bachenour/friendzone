import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    full_name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    age: number

    @Column()
    pseudo: string

    @Column()
    user_address: string

    @Column()
    city: string

    @Column()
    postal_code: number

    @Column()
    phone_number: number

    @Column()
    profile_picture: string

    @Column()
    sexe: string

    @Column()
    is_verified: boolean

    @Column()
    role: string

}
