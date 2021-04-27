import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { People } from '../../people/entities/people.entity';
import { JoinColumn } from 'typeorm/browser';
import { votes } from '../../vote/entities/voting.entity';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  login: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  e_mail: string;

  @Column()
  role: string;

  @OneToMany(() => People, (people) => people.id)
  people: People[];

  @OneToOne(() => votes, (votes) => votes.people_id)
  votes: votes;
}
