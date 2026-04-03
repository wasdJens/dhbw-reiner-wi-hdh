import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Beer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  taste: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ default: 0 })
  rating: number;
}
