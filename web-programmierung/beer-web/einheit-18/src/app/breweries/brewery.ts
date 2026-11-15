// Client-Modell: Brauerei mit Ort für die Anzeige
export interface Brewery {
  id: number;
  name: string;
  city: string;
  country: string;
  location: string;
}

// Eingaben des Formulars Brauerei
export interface BreweryInput {
  name: string;
  city: string;
  country: string;
}
