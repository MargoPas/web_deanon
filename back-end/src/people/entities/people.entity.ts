import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { votes } from '../../vote/entities/voting.entity';

@Entity({
  name: 'people',
})
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Last_Name: string;

  @Column()
  First_Name: string;

  @Column()
  Middle_Name: string;

  @Column()
  Description: string;

  @Column()
  Photo: string;

  @ManyToOne(() => Users, (users) => users.id)
  user_id: Users;

  @OneToMany(() => votes, (votes) => votes.user_id)
  users: Users[];
}
