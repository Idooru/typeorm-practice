import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChatEntity } from "./ChatEntity";
import { IsEmail, IsNumber, IsString } from "class-validator";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsEmail()
  @Column({ type: "varchar", length: 23, nullable: false, unique: true })
  email: string;

  @IsString()
  @Column({ type: "varchar", length: 10 })
  firstName: string;

  @IsString()
  @Column({ type: "char", nullable: false })
  lastName: string;

  @IsNumber()
  @Column({ type: "int" })
  age: number;

  @OneToMany(() => ChatEntity, (chat) => chat.user)
  chats: Promise<ChatEntity[]>;
}
