import {
  AppBar,
  Button,
  Card,
  Chip,
  Divider,
  Toolbar,
} from "@mui/material";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ForumIcon from "@mui/icons-material/Forum";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ShareIcon from "@mui/icons-material/Share";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import StarRateIcon from "@mui/icons-material/StarRate";
import StyleIcon from "@mui/icons-material/Style";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import type { Route } from "./+types/landing-page";
import { Link } from "react-router";

import "./landing-page.css";

const heroHighlights = [
  {
    title: "Strukturiert erfassen",
    description: "Details wie Name, Marke, Stil und Herkunft auf einen Blick.",
  },
  {
    title: "Bewerten & teilen",
    description: "Noten vergeben, Kommentare hinzufügen und Freunde inspirieren.",
  },
  {
    title: "Motivierendes Tracking",
    description: "Statistiken, Ratings und Leaderboards sorgen für spielerischen Anreiz.",
  },
];

const featureCards = [
  {
    icon: <CollectionsBookmarkIcon fontSize="large" />,
    title: "Lieblingsbiere im Fokus",
    description:
      "Erfasse jede Sorte mit den Daten, die dir wichtig sind – so findest du Favoriten im Handumdrehen wieder.",
  },
  {
    icon: <StyleIcon fontSize="large" />,
    title: "Bewertungen & Stories",
    description:
      "Notiere Bewertungen, persönliche Eindrücke und Fotos, um dein Geschmacksprofil wachsen zu lassen.",
  },
  {
    icon: <SportsEsportsIcon fontSize="large" />,
    title: "Gamified Insights",
    description:
      "Statistiken, Badges und Leaderboards machen jeden Schluck zu einem motivierenden Erlebnis.",
  },
];

const customerPerks = [
  {
    icon: <TravelExploreIcon />,
    text: "Neue Biere bewusst entdecken und dokumentieren",
  },
  {
    icon: <ForumIcon />,
    text: "Erfahrungen teilen und gemeinsame Tastings planen",
  },
  {
    icon: <EmojiEventsIcon />,
    text: "Motivation durch Rankings und persönliche Ziele",
  },
];

export function meta({}: Route.MetaArgs) {
  return [{ title: "Beer Tracker" }];
}

export default function LandingPage() {
  return (
    <div className="landing-page-root">
      <AppBar position="sticky" className="beer-toolbar" elevation={0}>
        <Toolbar>
          <span className="logo">Beer Tracker</span>
          <span className="tagline">Dein Bier-Tagebuch</span>
          <span className="spacer" />
          <Button
            component={Link}
            to="/beers"
            variant="contained"
            color="secondary"
          >
            Kostenlos testen
          </Button>
        </Toolbar>
      </AppBar>

      <main className="landing-page">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">Für technologie-affine Bierliebhaber:innen</p>
            <h1>
              Behalte deine Lieblingsbiere, Bewertungen und den Konsum spielerisch im Blick.
            </h1>
            <p className="lead">
              Beer Tracker sammelt Name, Marke, Stil und Herkunft jeder Sorte, speichert
              Bewertungen und baut so dein persönliches Geschmacksprofil auf – perfekt, um Favoriten zu
              teilen und neue Highlights zu entdecken.
            </p>
            <div className="cta-buttons">
              <Button component={Link} to="/beers" variant="contained" color="primary">
                Kostenlos testen
              </Button>
            </div>
            <div className="hero-highlights">
              {heroHighlights.map((highlight) => (
                <div key={highlight.title}>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="hero-card">
            <p className="eyebrow">Was du festhalten kannst</p>
            <h3>Dein persönliches Bier-Dashboard</h3>
            <div className="chip-set">
              {["Marke", "Stil", "Herkunft", "Bewertung", "Notizen"].map((label) => (
                <Chip key={label} label={label} color="warning" variant="outlined" />
              ))}
            </div>
            <Divider />
            <div className="card-stat">
              <StarRateIcon />
              <div>
                <p>Geschmacksprofil</p>
                <strong>Level 4 Enthusiast</strong>
              </div>
            </div>
            <div className="card-stat">
              <LeaderboardIcon />
              <div>
                <p>Konsum pro Sorte</p>
                <strong>12 Biere · 4 Marken</strong>
              </div>
            </div>
            <div className="card-stat">
              <ShareIcon />
              <div>
                <p>Teile deine Favoriten</p>
                <strong>Mit Freund:innen & Communities</strong>
              </div>
            </div>
          </Card>
        </section>

        <section className="features">
          <h2>Was Beer Tracker so besonders macht</h2>
          <p className="section-lead">
            Für alle, die gerne entdecken, dokumentieren und spielerisch motiviert bleiben.
          </p>
          <div className="feature-grid">
            {featureCards.map((feature) => (
              <Card key={feature.title} className="feature-card">
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="customer-fit">
          <Card className="customer-card">
            <h2>Perfekt für Studierende & junge Erwachsene</h2>
            <p>
              Technologie-affine Bierfans lieben die smarte Übersicht, den Austausch mit Freund:innen
              und die kleinen Challenges, die zum Entdecken neuer Sorten anspornen.
            </p>
            <ul>
              {customerPerks.map((perk) => (
                <li key={perk.text}>
                  {perk.icon}
                  {perk.text}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="cta-final">
          <Card className="cta-card">
            <div>
              <p className="eyebrow">Bereit für dein smartes Bier-Tagebuch?</p>
              <h2>Starte heute mit Beer Tracker</h2>
              <p>
                Lege deine ersten Biere an, vergebe Bewertungen und erhalte sofort spannende
                Auswertungen.
              </p>
            </div>
            <div className="cta-actions">
              <Button component={Link} to="/beers" variant="contained" color="primary">
                Jetzt kostenlos testen
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
