import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Die Klasse beschreibt die Tabelle brewery, ein Objekt eine Zeile
@Entity()
export class Brewery {
  // Die Datenbank vergibt die id beim Einfügen
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  country: string;
}
