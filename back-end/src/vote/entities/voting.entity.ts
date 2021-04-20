import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'votes',
})
export class votes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  user_id: number;

  @Column()
  people_id: number;

  @Column()
  stars: number;
}
