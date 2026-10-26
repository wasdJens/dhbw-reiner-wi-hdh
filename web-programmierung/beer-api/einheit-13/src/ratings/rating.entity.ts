import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Beer } from '../beers/beer.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  beerId: number;

  // Fremdschlüssel beerId → beer.id; mit dem Bier fallen seine Bewertungen weg
  @ManyToOne(() => Beer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'beerId' })
  beer: Beer;

  // id des Users aus dem Token; ohne Fremdschlüssel auf user
  @Column()
  userId: number;

  @Column()
  score: number;

  @Column({ type: 'varchar', nullable: true })
  comment: string | null;

  // ISO 8601 als Text, wie in der Antwort
  @Column()
  createdAt: string;
}
