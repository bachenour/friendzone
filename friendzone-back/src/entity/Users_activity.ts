import {PrimaryColumn, Entity, JoinColumn, ManyToOne} from "typeorm";
import {User} from "./User";
import {Category} from "./Category";

@Entity("users_activity")

export class Users_activity {

    @PrimaryColumn({type:'int'})
    @ManyToOne(() => User, user => user.activity, {nullable: false})
    @JoinColumn({name:"users_id"})
    users: User

    @PrimaryColumn({type:'int'})
    @ManyToOne(() => Category, category => category.activity, {nullable: false})
    @JoinColumn({name:"category_id"})
    category: Category
}