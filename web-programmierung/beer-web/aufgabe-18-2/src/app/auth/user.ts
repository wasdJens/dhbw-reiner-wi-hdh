// Client-Modell: angemeldeter User mit Rollen
export interface User {
  id: number;
  name: string;
  roles: string[];
  isAdmin: boolean;
}

// Eingaben der Formulare Anmelden und Registrieren
export interface Credentials {
  name: string;
  password: string;
}
