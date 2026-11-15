import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // Anmeldename; die Datenbank lehnt einen zweiten gleichen Namen ab
  @Column({ unique: true })
  name: string;

  // Nur der Hash, nie das Passwort; erscheint in keiner Antwort
  @Column()
  passwordHash: string;
}
