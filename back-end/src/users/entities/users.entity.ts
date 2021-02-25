import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  login: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  e_mail: string;

  @Column()
  role: string
}