import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: "chats" })
export class ChatEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.chats)
  user: Promise<UserEntity>;
}
