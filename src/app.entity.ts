import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:Number;

  @Column()
  name:String;

  @Column({unique:true})
  email:String;
  
  @Column()
  password:String;

} 
















