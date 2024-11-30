import { Entity , Column, PrimaryGeneratedColumn } from "typeorm"; 

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:Number

    @Column()
    userId:Number

    @Column()
    name:String

    @Column()
    image:String

    @Column()
    price:Number

    @Column()
    descereption:String
}
