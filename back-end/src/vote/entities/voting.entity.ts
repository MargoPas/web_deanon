import {
  Column,
  Entity, JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  TableForeignKey,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { People } from '../../people/entities/people.entity';

@Entity({
  name: 'votes',
})
export class votes {
  @PrimaryGeneratedColumn()
  id: number;

  //@Column({
  //unique: true,
  //})
  //user_id: number;

  //@Column()
  //people_id: number;

  @Column()
  stars: number;

  @OneToOne(() => Users, (users) => users.id)
  @JoinColumn()
  user_id: Users;

  @ManyToOne(() => People, (people) => people.id)
  @JoinColumn()
  people_id: People;
}
