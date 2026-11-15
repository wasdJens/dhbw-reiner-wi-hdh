// Erzeugt die fiktiven Stammdaten in daten/stand-1/ und daten/stand-2/.
// Aufruf: node werkzeuge/daten-erzeugen.mjs
// Fester Seed: Jeder Lauf erzeugt dieselben Dateien. Der Server liest nur die JSON-Dateien.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATEN = join(dirname(fileURLToPath(import.meta.url)), '..', 'daten');

// Zufall mit festem Seed (mulberry32)
let seed = 20261115;
function zufall() {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const ganz = (min, max) => min + Math.floor(zufall() * (max - min + 1));
const eins = (liste) => liste[Math.floor(zufall() * liste.length)];
const nr = (praefix, n, stellen) => `${praefix}-${String(n).padStart(stellen, '0')}`;
function datum(von, bis) {
  const a = Date.parse(von);
  const b = Date.parse(bis);
  return new Date(a + zufall() * (b - a)).toISOString().slice(0, 10);
}
function zeitpunkt(von, bis) {
  const a = Date.parse(von);
  const b = Date.parse(bis);
  const z = new Date(a + zufall() * (b - a));
  z.setUTCSeconds(0, 0);
  return z.toISOString().replace('.000Z', 'Z');
}
const stand1Zeit = () => zeitpunkt('2025-01-01T06:00:00Z', '2026-11-15T09:00:00Z');
// Alle Änderungen von Stand 2 tragen diesen Zeitpunkt
const STAND_2_ZEIT = '2026-12-01T08:00:00Z';

// ---------------------------------------------------------------------------
// Standorte und Abteilungen
// ---------------------------------------------------------------------------

const standorte = [
  ['Zentrale Heidenheim', 'Hafenstraße 12', '89518', 'Heidenheim an der Brenz'],
  ['Niederlassung Ulm', 'Am Wasserturm 4', '89073', 'Ulm'],
  ['Niederlassung Stuttgart', 'Leuchtturmweg 27', '70173', 'Stuttgart'],
  ['Niederlassung Aalen', 'Muschelgasse 8', '73430', 'Aalen'],
  ['Lager Giengen', 'Industriestraße 51', '89537', 'Giengen an der Brenz'],
  ['Schulungszentrum Augsburg', 'Korallenplatz 3', '86150', 'Augsburg'],
].map(([name, strasse, plz, ort], i) => ({
  standort_nr: nr('STO', i + 1, 2),
  name,
  strasse,
  plz,
  ort,
  land: 'DE',
  geaendert_am: stand1Zeit(),
}));

const abteilungsNamen = [
  ['Geschäftsführung', 'KST-1000'],
  ['Personal', 'KST-2100'],
  ['Finanzen und Controlling', 'KST-2200'],
  ['Vertrieb', 'KST-3100'],
  ['Einkauf', 'KST-3200'],
  ['IT', 'KST-4100'],
  ['Facility Management', 'KST-4200'],
  ['Kundenservice', 'KST-5100'],
];

// ---------------------------------------------------------------------------
// Personen
// ---------------------------------------------------------------------------

const vornamen = [
  'Lea', 'Jonas', 'Mia', 'Elias', 'Emma', 'Noah', 'Hannah', 'Paul', 'Sophia', 'Ben',
  'Lina', 'Finn', 'Marie', 'Luca', 'Clara', 'Felix', 'Ella', 'Leon', 'Ida', 'Henry',
  'Amelie', 'Theo', 'Johanna', 'Emil', 'Greta', 'Anton', 'Frieda', 'Moritz', 'Lotta', 'Jakob',
  'Nele', 'David', 'Mila', 'Samuel', 'Paula', 'Tim', 'Leonie', 'Max', 'Sarah', 'Julian',
  'Aylin', 'Can', 'Elif', 'Mehmet', 'Zeynep', 'Luka', 'Ana', 'Mateo', 'Sofia', 'Ivan',
];
const nachnamen = [
  'Brandt', 'Keller', 'Wagner', 'Hofmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf',
  'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hartmann', 'Lange', 'Werner', 'Krause', 'Lehmann',
  'Maier', 'Köhler', 'Herrmann', 'König', 'Walter', 'Mayer', 'Huber', 'Kaiser', 'Fuchs', 'Peters',
  'Lang', 'Scholz', 'Möller', 'Weiß', 'Jung', 'Hahn', 'Vogel', 'Friedrich', 'Günther', 'Roth',
  'Yılmaz', 'Kaya', 'Demir', 'Novak', 'Kovačević', 'Petrović', 'Nowak', 'Rossi', 'García', 'Haas',
];

function ascii(text) {
  return text
    .toLowerCase()
    .replaceAll('ä', 'ae').replaceAll('ö', 'oe').replaceAll('ü', 'ue').replaceAll('ß', 'ss')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replaceAll('ı', 'i')
    .replace(/[^a-z]/g, '');
}

const emails = new Set();
function email(vorname, nachname) {
  const basis = `${ascii(vorname)}.${ascii(nachname)}`;
  let kandidat = `${basis}@example.org`;
  for (let i = 2; emails.has(kandidat); i++) kandidat = `${basis}${i}@example.org`;
  emails.add(kandidat);
  return kandidat;
}

// Verteilung auf Standorte: Zentrale am größten, Lager und Schulungszentrum klein
const standortGewichte = ['STO-01', 'STO-01', 'STO-01', 'STO-02', 'STO-02', 'STO-03', 'STO-03', 'STO-04', 'STO-05', 'STO-06'];

const spaeter = (a, b) => (a > b ? a : b);
const plusJahre = (tag, jahre) => `${Number(tag.slice(0, 4)) + jahre}${tag.slice(4)}`;

function neuePerson(n) {
  const vorname = eins(vornamen);
  const nachname = eins(nachnamen);
  const geburtsdatum = datum('1962-01-01', '2004-12-31');
  // Eintritt frühestens mit 18 Jahren
  const eintritt_am = datum(spaeter(plusJahre(geburtsdatum, 18), '2008-01-01'), '2026-10-01');
  return {
    personal_nr: nr('P', n, 5),
    vorname,
    nachname,
    email: email(vorname, nachname),
    geburtsdatum,
    abteilung_nr: nr('ABT', ganz(2, 8), 2),
    standort_nr: eins(standortGewichte),
    status: 'aktiv',
    eintritt_am,
    austritt_am: null,
    geaendert_am: zeitpunkt(spaeter(eintritt_am, '2025-01-01') + 'T06:00:00Z', '2026-11-15T09:00:00Z'),
  };
}

const personen = Array.from({ length: 250 }, (_, i) => neuePerson(i + 1));
// P-00001 leitet die Geschäftsführung
personen[0].abteilung_nr = 'ABT-01';
personen[0].standort_nr = 'STO-01';

// Leitungen und Verantwortliche für Inventar: P-00001 bis P-00040, alle aktiv
const verantwortliche = personen.slice(0, 40);

// 12 Personen sind schon in Stand 1 ausgetreten
for (const p of personen.slice(200, 212)) {
  p.status = 'ausgetreten';
  p.austritt_am = datum(p.eintritt_am, '2026-10-31');
  p.geaendert_am = zeitpunkt(spaeter(p.austritt_am, '2025-01-01') + 'T06:00:00Z', '2026-11-15T09:00:00Z');
}

const abteilungen = abteilungsNamen.map(([name, kostenstelle], i) => ({
  abteilung_nr: nr('ABT', i + 1, 2),
  name,
  kostenstelle,
  leitung_nr: verantwortliche[i === 0 ? 0 : i * 4].personal_nr,
  geaendert_am: stand1Zeit(),
}));
for (const a of abteilungen) {
  personen.find((p) => p.personal_nr === a.leitung_nr).abteilung_nr = a.abteilung_nr;
}

// ---------------------------------------------------------------------------
// Räume
// ---------------------------------------------------------------------------

const raumNamen = ['Nordsee', 'Ostsee', 'Atlantik', 'Pazifik', 'Bodensee', 'Mittelmeer', 'Karibik', 'Ägäis', 'Adria', 'Biskaya'];
const raumArten = {
  besprechung: { plaetze: [4, 12], ausstattung: ['Bildschirm', 'Videokonferenz', 'Whiteboard'] },
  schulung: { plaetze: [12, 30], ausstattung: ['Beamer', 'Whiteboard', 'Flipchart', 'Lautsprecher'] },
  werkstatt: { plaetze: [2, 6], ausstattung: ['Werkbank', 'Druckluft', 'Starkstrom'] },
  lager: { plaetze: [0, 0], ausstattung: ['Regale', 'Rolltor'] },
};
const raumPlan = {
  'STO-01': ['besprechung', 'besprechung', 'besprechung', 'besprechung', 'schulung', 'schulung', 'besprechung', 'lager'],
  'STO-02': ['besprechung', 'besprechung', 'schulung', 'besprechung', 'werkstatt'],
  'STO-03': ['besprechung', 'besprechung', 'besprechung', 'schulung', 'besprechung'],
  'STO-04': ['besprechung', 'besprechung', 'werkstatt'],
  'STO-05': ['lager', 'lager', 'werkstatt'],
  'STO-06': ['schulung', 'schulung', 'schulung', 'schulung', 'besprechung', 'besprechung'],
};
const raeume = [];
for (const [standort_nr, arten] of Object.entries(raumPlan)) {
  arten.forEach((art, i) => {
    const vorgabe = raumArten[art];
    const titel = { besprechung: 'Besprechungsraum', schulung: 'Schulungsraum', werkstatt: 'Werkstatt', lager: 'Lagerfläche' }[art];
    raeume.push({
      raum_nr: nr('RAU', raeume.length + 1, 3),
      bezeichnung: `${titel} ${raumNamen[i]}`,
      art,
      standort_nr,
      etage: art === 'lager' || art === 'werkstatt' ? 0 : ganz(0, 3),
      plaetze: ganz(...vorgabe.plaetze),
      ausstattung: vorgabe.ausstattung.filter(() => zufall() < 0.7),
      status: 'verfuegbar',
      geaendert_am: stand1Zeit(),
    });
  });
}
raeume[6].status = 'gesperrt';
raeume[20].status = 'gesperrt';

// ---------------------------------------------------------------------------
// Inventar
// ---------------------------------------------------------------------------

const geraete = [
  ['Präsentationstechnik', 'Epson', 'Beamer EB-W51', 54900],
  ['Präsentationstechnik', 'BenQ', 'Beamer MW560', 49900],
  ['Präsentationstechnik', 'Logitech', 'Presenter R500s', 3990],
  ['Notebook', 'Lenovo', 'ThinkPad T14 Gen 5', 139900],
  ['Notebook', 'Dell', 'Latitude 5450', 124900],
  ['Notebook', 'Apple', 'MacBook Air 13"', 129900],
  ['Tablet', 'Apple', 'iPad 10,9"', 44900],
  ['Tablet', 'Samsung', 'Galaxy Tab S9 FE', 49900],
  ['Kamera', 'Sony', 'Alpha 6400', 89900],
  ['Kamera', 'GoPro', 'HERO12 Black', 39900],
  ['Audio', 'Jabra', 'Speak2 75', 27900],
  ['Audio', 'Rode', 'Wireless GO II', 26900],
  ['Werkzeug', 'Bosch', 'Akku-Bohrschrauber GSR 18V', 21900],
  ['Werkzeug', 'Makita', 'Akku-Schlagschrauber DTD153', 18900],
  ['Werkzeug', 'Fluke', 'Multimeter 117', 24900],
  ['Fahrzeug', 'VW', 'ID. Buzz Cargo', 5499000],
  ['Fahrzeug', 'Riese & Müller', 'Lastenrad Load 75', 849000],
  ['Messe', 'Vispronet', 'Messestand Faltdisplay', 79900],
  ['Reinigung', 'Kärcher', 'Nass-Trockensauger WD 5', 19900],
];

function neuesInventar(n, zeit) {
  const [kategorie, hersteller, modell, wert] = eins(geraete);
  const anschaffung_am = datum('2019-01-01', '2026-10-31');
  return {
    inventar_nr: nr('INV', n, 4),
    bezeichnung: `${hersteller} ${modell}`,
    kategorie,
    hersteller,
    seriennummer: `${ascii(hersteller).slice(0, 3).toUpperCase()}${ganz(100000, 999999)}`,
    standort_nr: eins(standortGewichte),
    verantwortlich_nr: eins(verantwortliche).personal_nr,
    anschaffung_am,
    anschaffungswert_cent: wert,
    status: 'in_betrieb',
    geaendert_am: zeit ?? zeitpunkt(spaeter(anschaffung_am, '2025-01-01') + 'T06:00:00Z', '2026-11-15T09:00:00Z'),
  };
}

const inventar = Array.from({ length: 200 }, (_, i) => neuesInventar(i + 1));
for (const i of [11, 57, 98, 143]) inventar[i].status = 'in_reparatur';
for (const i of [23, 76, 131, 188, 192]) inventar[i].status = 'ausgemustert';

// ---------------------------------------------------------------------------
// Artikel
// ---------------------------------------------------------------------------

// Je Kategorie: Einheit, Mehrwertsteuersatz, Artikel mit Preis in Cent
const artikelBasis = [
  ['Büromaterial', 'Stück', 19, [
    ['Kugelschreiber blau', 129], ['Kugelschreiber schwarz', 129], ['Bleistift HB', 59], ['Textmarker gelb', 149],
    ['Textmarker grün', 149], ['Radiergummi', 79], ['Lineal 30 cm', 199], ['Schere', 549], ['Tacker', 1290],
    ['Locher', 1490], ['Haftnotizen 76 × 76 mm', 249], ['Ordner A4 breit', 399], ['Ordner A4 schmal', 379],
    ['Klarsichthüllen A4 (100 Stück)', 699], ['Briefumschläge DIN lang (50 Stück)', 549],
  ]],
  ['Papier', 'Packung', 19, [
    ['Kopierpapier A4, 500 Blatt', 649], ['Kopierpapier A3, 500 Blatt', 1390], ['Recyclingpapier A4, 500 Blatt', 599],
    ['Collegeblock A4 kariert', 299], ['Collegeblock A4 liniert', 299], ['Notizblock A5', 189],
    ['Flipchart-Block, 20 Blatt', 1490], ['Etiketten A4 (100 Blatt)', 2290], ['Fotopapier A4 (50 Blatt)', 1590],
    ['Karteikarten A6 (100 Stück)', 249],
  ]],
  ['IT-Zubehör', 'Stück', 19, [
    ['USB-C-Ladegerät 65 W', 3490], ['USB-C-Kabel 1 m', 999], ['HDMI-Kabel 2 m', 1290], ['Maus kabellos', 2490],
    ['Tastatur kabellos', 4490], ['Headset USB', 5990], ['Webcam Full HD', 6990], ['USB-Stick 64 GB', 1190],
    ['SSD extern 1 TB', 8990], ['Monitor 27"', 24900], ['Dockingstation USB-C', 14900], ['Mauspad', 790],
    ['Laptopständer', 3490], ['Powerbank 20.000 mAh', 3990], ['Netzwerkkabel 5 m', 690],
  ]],
  ['Druckerzubehör', 'Stück', 19, [
    ['Toner schwarz', 8990], ['Toner cyan', 11490], ['Toner magenta', 11490], ['Toner gelb', 11490],
    ['Tintenpatrone schwarz', 2490], ['Tintenpatrone farbig', 3290], ['Trommeleinheit', 15900],
    ['Resttonerbehälter', 2190],
  ]],
  ['Getränke', 'Kiste', 7, [
    ['Mineralwasser still, 12 × 0,75 l', 899], ['Mineralwasser medium, 12 × 0,75 l', 899],
    ['Apfelschorle, 12 × 0,5 l', 1190], ['Orangensaft, 6 × 1 l', 1490], ['Cola, 12 × 0,5 l', 1690],
    ['Eistee Pfirsich, 12 × 0,5 l', 1290], ['Kaffeebohnen 1 kg', 1990], ['Espressobohnen 1 kg', 2290],
    ['Pfefferminztee (100 Beutel)', 799], ['Früchtetee (100 Beutel)', 799], ['Milch 1,5 %, 12 × 1 l', 1390],
    ['Haferdrink, 6 × 1 l', 1190],
  ]],
  ['Lebensmittel', 'Packung', 7, [
    ['Kekse gemischt 1 kg', 999], ['Müsliriegel (24 Stück)', 1290], ['Nüsse gemischt 1 kg', 1690],
    ['Obstkorb klein', 2490], ['Obstkorb groß', 3990], ['Zucker 1 kg', 149], ['Zuckersticks (500 Stück)', 899],
    ['Brezeln (20 Stück)', 1590], ['Belegte Brötchen (10 Stück)', 2990], ['Fruchtgummi 1 kg', 899],
  ]],
  ['Reinigung', 'Packung', 19, [
    ['Spülmittel 1 l', 249], ['Spülmaschinentabs (100 Stück)', 1490], ['Handseife 500 ml', 299],
    ['Papierhandtücher (20 Rollen)', 2490], ['Toilettenpapier (32 Rollen)', 1590], ['Desinfektionsmittel 1 l', 899],
    ['Müllbeutel 60 l (50 Stück)', 699], ['Glasreiniger 1 l', 349], ['Mikrofasertücher (10 Stück)', 899],
    ['Allzweckreiniger 1 l', 299],
  ]],
  ['Arbeitsschutz', 'Stück', 19, [
    ['Sicherheitsschuhe S3', 8990], ['Arbeitshandschuhe (Paar)', 499], ['Schutzbrille', 899], ['Gehörschutz', 1990],
    ['Warnweste', 399], ['Erste-Hilfe-Kasten DIN 13157', 3490], ['Feuerlöscher 6 kg', 6990],
    ['Atemschutzmasken FFP2 (20 Stück)', 1490],
  ]],
  ['Möbel', 'Stück', 19, [
    ['Bürostuhl ergonomisch', 34900], ['Schreibtisch höhenverstellbar', 59900], ['Rollcontainer', 17900],
    ['Aktenschrank', 39900], ['Besprechungstisch für 6 Personen', 44900], ['Stapelstuhl', 6990], ['Garderobe', 12900],
    ['Whiteboard 120 × 90 cm', 14900], ['Pinnwand 120 × 90 cm', 9990], ['Schreibtischlampe LED', 4990],
  ]],
  ['Werbemittel', 'Stück', 19, [
    ['Kugelschreiber mit Logo (100 Stück)', 8900], ['Baumwolltasche mit Logo', 390], ['Tasse mit Logo', 690],
    ['Notizbuch mit Logo', 790], ['Trinkflasche mit Logo', 1290], ['Visitenkarten (250 Stück)', 2490],
    ['Flyer A5 (500 Stück)', 4990], ['Roll-up-Banner', 8990], ['Aufkleber (100 Stück)', 2990],
    ['Lanyard mit Logo', 190], ['USB-Stick mit Logo', 690], ['Regenschirm mit Logo', 1490],
    ['Kapuzenpullover mit Logo', 3490], ['T-Shirt mit Logo', 990], ['Mütze mit Logo', 1190],
    ['Schlüsselanhänger mit Logo', 290], ['Wandkalender 2027', 1490], ['Mousepad mit Logo', 590],
    ['Turnbeutel mit Logo', 490], ['Powerbank mit Logo', 1990], ['Thermobecher mit Logo', 1490],
    ['Zollstock mit Logo', 390],
  ]],
];
const artikel = [];
for (const [kategorie, einheit, mwst_satz, liste] of artikelBasis) {
  for (const [bezeichnung, preis_cent] of liste) {
    artikel.push({
      artikel_nr: nr('ART', artikel.length + 1, 4),
      bezeichnung,
      kategorie,
      einheit,
      preis_cent,
      mwst_satz,
      status: 'lieferbar',
      geaendert_am: stand1Zeit(),
    });
  }
}
for (const i of [8, 37, 66, 95]) artikel[i].status = 'nicht_lieferbar';

// ---------------------------------------------------------------------------
// Feiertage Baden-Württemberg (gesetzlich), 2026 und 2027
// ---------------------------------------------------------------------------

function ostersonntag(jahr) {
  const a = jahr % 19, b = Math.floor(jahr / 100), c = jahr % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const monat = Math.floor((h + l - 7 * m + 114) / 31);
  const tag = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(jahr, monat - 1, tag);
}
const feiertage = [];
for (const jahr of [2026, 2027]) {
  const ostern = ostersonntag(jahr);
  const relativ = (tage) => new Date(ostern + tage * 86400000).toISOString().slice(0, 10);
  const liste = [
    [`${jahr}-01-01`, 'Neujahr'],
    [`${jahr}-01-06`, 'Heilige Drei Könige'],
    [relativ(-2), 'Karfreitag'],
    [relativ(1), 'Ostermontag'],
    [`${jahr}-05-01`, 'Tag der Arbeit'],
    [relativ(39), 'Christi Himmelfahrt'],
    [relativ(50), 'Pfingstmontag'],
    [relativ(60), 'Fronleichnam'],
    [`${jahr}-10-03`, 'Tag der Deutschen Einheit'],
    [`${jahr}-11-01`, 'Allerheiligen'],
    [`${jahr}-12-25`, '1. Weihnachtstag'],
    [`${jahr}-12-26`, '2. Weihnachtstag'],
  ];
  for (const [d, name] of liste.sort()) feiertage.push({ datum: d, name, bundesland: 'BW' });
}

// ---------------------------------------------------------------------------
// Stand 2: feste Änderungen gegenüber Stand 1
// ---------------------------------------------------------------------------

const kopie = (x) => structuredClone(x);
const s2 = {
  personen: kopie(personen),
  abteilungen: kopie(abteilungen),
  standorte: kopie(standorte),
  raeume: kopie(raeume),
  inventar: kopie(inventar),
  artikel: kopie(artikel),
  feiertage: kopie(feiertage),
};
const aenderungen = [];
const finde = (liste, feld, wert) => liste.find((x) => x[feld] === wert);

// Geändert: 5 Personen mit neuem Nachnamen und neuer E-Mail (Heirat), 5 mit neuem Standort
for (const [n, neuerName] of [[45, 'Sommer'], [78, 'Berger'], [112, 'Winter'], [156, 'Lorenz'], [189, 'Engel']]) {
  const p = finde(s2.personen, 'personal_nr', nr('P', n, 5));
  aenderungen.push(['Person', p.personal_nr, 'geändert', `nachname ${p.nachname} → ${neuerName}, email ${p.email} → ${email(p.vorname, neuerName)}`]);
  p.nachname = neuerName;
  p.email = [...emails].at(-1);
  p.geaendert_am = STAND_2_ZEIT;
}
for (const n of [52, 87, 121, 160, 194]) {
  const p = finde(s2.personen, 'personal_nr', nr('P', n, 5));
  const neu = p.standort_nr === 'STO-02' ? 'STO-03' : 'STO-02';
  aenderungen.push(['Person', p.personal_nr, 'geändert', `standort_nr ${p.standort_nr} → ${neu}`]);
  p.standort_nr = neu;
  p.geaendert_am = STAND_2_ZEIT;
}

// Geändert: 5 Artikel mit neuem Preis (rund 10 % teurer)
for (const n of [3, 21, 49, 70, 104]) {
  const a = finde(s2.artikel, 'artikel_nr', nr('ART', n, 4));
  const neu = Math.ceil((a.preis_cent * 1.1) / 10) * 10 - 1;
  aenderungen.push(['Artikel', a.artikel_nr, 'geändert', `preis_cent ${a.preis_cent} → ${neu}`]);
  a.preis_cent = neu;
  a.geaendert_am = STAND_2_ZEIT;
}

// Inaktiv: 8 Personen treten aus (keine Leitung, nicht verantwortlich für Inventar)
for (const n of [61, 93, 130, 147, 171, 219, 233, 247]) {
  const p = finde(s2.personen, 'personal_nr', nr('P', n, 5));
  aenderungen.push(['Person', p.personal_nr, 'inaktiv', 'status aktiv → ausgetreten, austritt_am 2026-11-30']);
  p.status = 'ausgetreten';
  p.austritt_am = '2026-11-30';
  p.geaendert_am = STAND_2_ZEIT;
}

// Inaktiv: 6 Inventar-Positionen werden ausgemustert
for (const n of [5, 34, 88, 117, 150, 176]) {
  const g = finde(s2.inventar, 'inventar_nr', nr('INV', n, 4));
  aenderungen.push(['Inventar', g.inventar_nr, 'inaktiv', `status ${g.status} → ausgemustert`]);
  g.status = 'ausgemustert';
  g.geaendert_am = STAND_2_ZEIT;
}

// Neu: 15 Personen, 10 Inventar-Positionen
for (let n = 251; n <= 265; n++) {
  const p = neuePerson(n);
  p.eintritt_am = '2026-12-01';
  p.geaendert_am = STAND_2_ZEIT;
  s2.personen.push(p);
  aenderungen.push(['Person', p.personal_nr, 'neu', `${p.vorname} ${p.nachname}`]);
}
for (let n = 201; n <= 210; n++) {
  const g = neuesInventar(n, STAND_2_ZEIT);
  g.anschaffung_am = '2026-11-27';
  s2.inventar.push(g);
  aenderungen.push(['Inventar', g.inventar_nr, 'neu', g.bezeichnung]);
}

// Gelöscht: 3 Personen (nie referenziert), 2 Räume
const geloescht = { personen: ['P-00068', 'P-00141', 'P-00226'], raeume: ['RAU-013', 'RAU-027'] };
for (const n of geloescht.personen) aenderungen.push(['Person', n, 'gelöscht', '410 Gone']);
for (const n of geloescht.raeume) aenderungen.push(['Raum', n, 'gelöscht', '410 Gone']);
s2.personen = s2.personen.filter((p) => !geloescht.personen.includes(p.personal_nr));
s2.raeume = s2.raeume.filter((r) => !geloescht.raeume.includes(r.raum_nr));

// ---------------------------------------------------------------------------
// Prüfen und schreiben
// ---------------------------------------------------------------------------

function pruefen(stand, d) {
  const aktiv = new Set(d.personen.filter((p) => p.status === 'aktiv').map((p) => p.personal_nr));
  const orte = new Set(d.standorte.map((s) => s.standort_nr));
  const abt = new Set(d.abteilungen.map((a) => a.abteilung_nr));
  const fehler = [];
  for (const p of d.personen) {
    if (!orte.has(p.standort_nr) || !abt.has(p.abteilung_nr)) fehler.push(p.personal_nr);
  }
  for (const a of d.abteilungen) if (!aktiv.has(a.leitung_nr)) fehler.push(a.abteilung_nr);
  for (const r of d.raeume) if (!orte.has(r.standort_nr)) fehler.push(r.raum_nr);
  for (const g of d.inventar) {
    if (!orte.has(g.standort_nr) || !aktiv.has(g.verantwortlich_nr)) fehler.push(g.inventar_nr);
  }
  if (new Set(d.personen.map((p) => p.email)).size !== d.personen.length) fehler.push('email doppelt');
  if (fehler.length) throw new Error(`Stand ${stand}: Verweise ungültig: ${fehler.join(', ')}`);
}

const s1 = { personen, abteilungen, standorte, raeume, inventar, artikel, feiertage };
pruefen(1, s1);
pruefen(2, s2);

for (const [stand, d, weg] of [[1, s1, { personen: [], raeume: [] }], [2, s2, geloescht]]) {
  const ordner = join(DATEN, `stand-${stand}`);
  mkdirSync(ordner, { recursive: true });
  for (const [name, liste] of Object.entries(d)) {
    writeFileSync(join(ordner, `${name}.json`), JSON.stringify(liste, null, 2) + '\n');
  }
  writeFileSync(join(ordner, 'geloescht.json'), JSON.stringify(weg, null, 2) + '\n');
}

// Änderungen von Stand 1 auf Stand 2 als Markdown-Tabelle für das Handbuch
console.log('| Ressource | Nummer | Art | Änderung |\n|---|---|---|---|');
for (const [ressource, n, art, text] of aenderungen) console.log(`| ${ressource} | \`${n}\` | ${art} | ${text} |`);
console.error(Object.entries(s1).map(([k, v]) => `${k} ${v.length}/${s2[k].length}`).join(' · '));
