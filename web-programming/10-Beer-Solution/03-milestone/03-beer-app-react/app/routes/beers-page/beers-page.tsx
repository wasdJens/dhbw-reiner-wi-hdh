import { Button, Card, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import StarRateIcon from "@mui/icons-material/StarRate";
import type { Route } from "./+types/beers-page";
import { Link, useLoaderData } from "react-router";

import {
  type BeerResponseDto,
  getAllBeers,
} from "~/services/beers-service";

import "./beers-page.css";

export async function loader({}: Route.LoaderArgs) {
  const beers = await getAllBeers();
  return { beers };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Beer Tracker – Übersicht" }];
}

export default function BeersPage() {
  const { beers } = useLoaderData<{ beers: BeerResponseDto[] }>();

  return (
    <div className="beers-page-root">
      <main className="beers-page">
        <section className="page-header">
          <div>
            <p className="eyebrow">Deine Sammlung</p>
            <h1>Alle bekannten Biere im Überblick</h1>
            <p className="lead">
              Hier siehst du alles, was die API bereits zu deinen Favoriten kennt – Name, Marke, Stil,
              Menge und Bewertungen.
            </p>
            <div className="header-actions">
              <Button component={Link} to="/beers/create" variant="contained" color="primary">
                Neues Bier anlegen
              </Button>
            </div>
          </div>
          <Card className="summary-card">
            <h3>Aktuelles Inventar</h3>
            <Divider />
            <div className="summary-stat">
              <Inventory2Icon />
              <div>
                <p>Gespeicherte Biere</p>
                <strong>{beers.length}</strong>
              </div>
            </div>
            <div className="summary-stat">
              <CheckCircleIcon />
              <div>
                <p>Bewertungen gepflegt</p>
                <strong>Automatisch aus der API</strong>
              </div>
            </div>
          </Card>
        </section>

        {beers.length > 0 ? (
          <>
            <section className="beers-grid">
              {beers.map((beer) => (
                <Card key={beer.id} className="beer-card">
                  <div className="beer-card__header">
                    <div>
                      <p className="label">Name</p>
                      <h3>{beer.name}</h3>
                    </div>
                    <div className="rating">
                      <StarRateIcon fontSize="small" />
                      <span>{beer.rating}</span>
                    </div>
                  </div>
                  <Divider />
                  <div className="beer-card__body">
                    <div>
                      <p className="label">Marke</p>
                      <p>{beer.brand}</p>
                    </div>
                    <div>
                      <p className="label">Stil</p>
                      <p>{beer.taste}</p>
                    </div>
                    <div>
                      <p className="label">Getrunken</p>
                      <p>{beer.amount} Flaschen</p>
                    </div>
                  </div>
                  <div className="beer-card__actions">
                    <Button component={Link} to={`/beers/${beer.id}`} variant="text" color="primary">
                      Details anzeigen
                    </Button>
                  </div>
                </Card>
              ))}
            </section>

            <section className="create-guide">
              <Card className="guide-card">
                <h2>Mehr Geschmacksmomente festhalten</h2>
                <p>Dokumentiere neue Biere in weniger als einer Minute:</p>
                <ol>
                  <li>Namen, Marke und Stil eintragen</li>
                  <li>Kurz deine Eindrücke beschreiben</li>
                  <li>Sichern und mit Freund:innen teilen</li>
                </ol>
                <div className="guide-actions">
                  <Button component={Link} to="/beers/create" variant="contained" color="primary">
                    Neues Bier erfassen
                  </Button>
                  <Button component={Link} to="/" variant="outlined" color="secondary">
                    Zur Landing Page
                  </Button>
                </div>
              </Card>
            </section>
          </>
        ) : (
          <section className="empty-state">
            <Card className="empty-card">
              <div className="empty-card__content">
                <p className="eyebrow">Noch keine Einträge</p>
                <h2>Lege jetzt dein erstes Bier an</h2>
                <p>Die Liste ist noch leer? Kein Problem! So startest du dein persönliches Bier-Tagebuch.</p>
                <ol>
                  <li>Tippe auf „Erstes Bier anlegen”.</li>
                  <li>Trage Name, Marke und Stil ein.</li>
                  <li>Speichere deine Eindrücke und Bewertungen.</li>
                </ol>
                <div className="empty-card__actions">
                  <Button component={Link} to="/beers/create" variant="contained" color="primary">
                    Erstes Bier anlegen
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}
