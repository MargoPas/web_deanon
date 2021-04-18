import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
