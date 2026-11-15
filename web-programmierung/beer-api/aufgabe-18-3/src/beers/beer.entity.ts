import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brewery } from '../breweries/brewery.entity';
import { CreateBeerDto } from './dto/create-beer.dto';

@Entity()
export class Beer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Stile aus dem Schema: @ZodResponse prüft den Rückgabetyp gegen BeerDto.
  // Für einen Union-Typ braucht TypeORM den Typ der Spalte
  @Column({ type: 'varchar' })
  style: CreateBeerDto['style'];

  // real: Kommazahl; number allein wird in SQLite zu integer
  @Column({ type: 'real' })
  abv: number;

  @Column()
  breweryId: number;

  // Fremdschlüssel breweryId → brewery.id: Die Datenbank prüft R2 beim
  // Löschen einer Brauerei
  @ManyToOne(() => Brewery)
  @JoinColumn({ name: 'breweryId' })
  brewery: Brewery;

  // Ohne Beschreibung steht in der Spalte null
  @Column({ type: 'varchar', nullable: true })
  description: string | null;
}
