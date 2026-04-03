import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Divider,
  LinearProgress,
  MenuItem,
  Slider,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import StarRateIcon from "@mui/icons-material/StarRate";
import type { Route } from "./+types/beer-detail-page";
import { Link, useLoaderData } from "react-router";

import {
  type BeerResponseDto,
  type UpdateBeerDto,
  getBeerById,
  updateBeer,
} from "~/services/beers-service";

import "./beer-detail-page.css";

const tasteOptions = ["Pils", "IPA", "Weizen", "Helles", "Stout", "Bock", "Craft Mix"];

type FormState = {
  name: string;
  brand: string;
  taste: string;
  amount: string;
  rating: number;
};

type TouchedState = Record<"name" | "brand" | "taste" | "amount", boolean>;

export async function loader({ params }: Route.LoaderArgs) {
  const idParam = params.id;
  const beerId = Number(idParam);

  if (!idParam || Number.isNaN(beerId)) {
    throw new Response("Beer not found", { status: 404 });
  }

  const beer = await getBeerById(beerId);
  return { beer };
}

export function meta({ data }: Route.MetaArgs) {
  const beer = (data as { beer?: BeerResponseDto } | undefined)?.beer;
  return [{ title: beer ? `Beer Tracker – ${beer.name}` : "Beer Tracker – Details" }];
}

function validateText(value: string, field: "name" | "brand") {
  if (!value.trim()) {
    return field === "name" ? "Name ist erforderlich." : "Marke ist erforderlich.";
  }
  if (value.length > 120) {
    return "Maximal 120 Zeichen.";
  }
  return "";
}

function validateTaste(value: string) {
  return value ? "" : "Bitte wähle einen Stil.";
}

function validateAmount(value: string) {
  if (value === "" || value === null) {
    return "Anzahl ist erforderlich.";
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return "Bitte gib eine gültige Zahl ein.";
  }
  if (parsed < 0) {
    return "Anzahl darf nicht negativ sein.";
  }
  return "";
}

export default function BeerDetailPage() {
  const { beer } = useLoaderData<{ beer: BeerResponseDto }>();
  const [formState, setFormState] = useState<FormState>(() => ({
    name: beer.name,
    brand: beer.brand,
    taste: beer.taste,
    amount: String(beer.amount),
    rating: beer.rating,
  }));
  const [touched, setTouched] = useState<TouchedState>({
    name: false,
    brand: false,
    taste: false,
    amount: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormState({
      name: beer.name,
      brand: beer.brand,
      taste: beer.taste,
      amount: String(beer.amount),
      rating: beer.rating,
    });
    setTouched({ name: false, brand: false, taste: false, amount: false });
    setSuccessMessage(null);
    setErrorMessage(null);
  }, [beer]);

  const errors = useMemo(() => ({
    name: validateText(formState.name, "name"),
    brand: validateText(formState.brand, "brand"),
    taste: validateTaste(formState.taste),
    amount: validateAmount(formState.amount),
  }), [formState]);

  const updateField = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof TouchedState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleRatingChange = (_: Event, value: number | number[]) => {
    setFormState((prev) => ({ ...prev, rating: Array.isArray(value) ? value[0] : value }));
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, brand: true, taste: true, amount: true });

    if (Object.values(errors).some(Boolean) || isSaving) {
      return;
    }

    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const payload: UpdateBeerDto = {
        name: formState.name.trim(),
        brand: formState.brand.trim(),
        taste: formState.taste,
        amount: Number(formState.amount) || 0,
        rating: formState.rating,
      };
      await updateBeer(beer.id, payload);
      setSuccessMessage("Bier erfolgreich aktualisiert!");
    } catch {
      setErrorMessage("Aktualisierung fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setIsSaving(false);
    }
  };

  const amountDisplay = formState.amount && !Number.isNaN(Number(formState.amount))
    ? Number(formState.amount)
    : 0;

  return (
    <div className="detail-page-root">
      <main className="detail-page">
        <div className="beer-illustration" aria-hidden="true">
          <svg viewBox="0 0 500 600">
            <defs>
              <linearGradient id="krugFoam" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fffef5" />
                <stop offset="100%" stopColor="#ffe6c0" />
              </linearGradient>
              <linearGradient id="krugBeer" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffe48a" />
                <stop offset="45%" stopColor="#ffbf36" />
                <stop offset="100%" stopColor="#cb7100" />
              </linearGradient>
              <linearGradient id="krugShine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
              </linearGradient>
            </defs>

            <path className="krug-handle" d="M360 140h50c42 0 74 28 74 72v130c0 44-32 72-74 72h-50z" />
            <path
              className="krug-handle-inner"
              d="M390 180h18c20 0 32 12 32 32v80c0 20-12 32-32 32h-18z"
            />

            <rect className="krug-body" x="120" y="90" width="240" height="360" rx="50" ry="50" />
            <rect className="krug-beer" x="140" y="130" width="200" height="320" rx="35" fill="url(#krugBeer)" />

            <g className="krug-dimples">
              <ellipse cx="190" cy="190" rx="38" ry="48" />
              <ellipse cx="260" cy="190" rx="38" ry="48" />
              <ellipse cx="190" cy="270" rx="38" ry="48" />
              <ellipse cx="260" cy="270" rx="38" ry="48" />
              <ellipse cx="190" cy="350" rx="38" ry="48" />
              <ellipse cx="260" cy="350" rx="38" ry="48" />
            </g>

            <path
              className="krug-foam"
              d="M100 140c0-55 55-85 150-85s170 15 170 85c0 40-30 65-65 65-45 0-60-30-110-30s-80 30-130 30c-35 0-60-25-60-65z"
              fill="url(#krugFoam)"
            />
            <circle className="foam-bubble" cx="180" cy="125" r="18" />
            <circle className="foam-bubble" cx="240" cy="105" r="14" />
            <circle className="foam-bubble" cx="300" cy="125" r="12" />

            <path className="krug-outline" d="M120 90h240v320c0 85-40 150-120 150s-120-65-120-150z" />
            <path className="krug-base" d="M90 420h300v60c-35 45-90 70-150 70s-115-25-150-70z" />
            <path className="krug-shine" d="M150 150h45v240c0 45-12 80-40 100" />
            <circle className="shine" cx="165" cy="210" r="65" fill="url(#krugShine)" />

            <circle className="bubble" cx="210" cy="290" r="10" />
            <circle className="bubble" cx="250" cy="340" r="8" />
            <circle className="bubble" cx="220" cy="380" r="6" />
            <circle className="bubble" cx="270" cy="310" r="7" />
            <circle className="bubble" cx="200" cy="330" r="5" />
          </svg>
        </div>
        <Card className="detail-card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Bierprofil</p>
              <h1>{formState.name || beer.name}</h1>
              <p className="meta">
                {formState.brand || beer.brand} · {formState.taste || beer.taste} · Bereits getrunken: {amountDisplay} Biere
              </p>
            </div>
            <div className="header-actions">
              <Button component={Link} to="/beers" variant="outlined" color="secondary" startIcon={<ArrowBackIcon />}>
                Zurück zur Übersicht
              </Button>
            </div>
          </div>
          <Divider />
          <div className="readout">
            <div className="stat">
              <StarRateIcon />
              <div>
                <p>Bewertung</p>
                <strong>{formState.rating.toFixed(1)} / 5</strong>
              </div>
            </div>
            <div className="stat">
              <SportsBarIcon />
              <div>
                <p>Bereits getrunken</p>
                <strong>{amountDisplay} Biere</strong>
              </div>
            </div>
          </div>
          <form className="detail-form" onSubmit={save} noValidate>
            <div className="form-grid">
              <TextField
                label="Name"
                name="name"
                value={formState.name}
                onChange={updateField("name")}
                onBlur={handleBlur("name")}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name ? errors.name : ""}
                autoComplete="off"
                fullWidth
              />
              <TextField
                label="Marke / Brauerei"
                name="brand"
                value={formState.brand}
                onChange={updateField("brand")}
                onBlur={handleBlur("brand")}
                error={touched.brand && Boolean(errors.brand)}
                helperText={touched.brand ? errors.brand : ""}
                autoComplete="off"
                fullWidth
              />
              <TextField
                select
                label="Stil / Geschmack"
                name="taste"
                value={formState.taste}
                onChange={updateField("taste")}
                onBlur={handleBlur("taste")}
                error={touched.taste && Boolean(errors.taste)}
                helperText={touched.taste ? errors.taste : ""}
                fullWidth
              >
                {tasteOptions.map((taste) => (
                  <MenuItem key={taste} value={taste}>
                    {taste}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Bereits konsumiert"
                name="amount"
                type="number"
                inputProps={{ min: 0 }}
                value={formState.amount}
                onChange={updateField("amount")}
                onBlur={handleBlur("amount")}
                error={touched.amount && Boolean(errors.amount)}
                helperText={touched.amount ? errors.amount : ""}
                fullWidth
              />
            </div>
            <div className="rating-control">
              <label>Bewertung aktualisieren</label>
              <div className="slider-row">
                <Slider
                  min={0}
                  max={5}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                  value={formState.rating}
                  onChange={handleRatingChange}
                />
                <span className="rating-value">{formState.rating.toFixed(1)} / 5</span>
              </div>
            </div>
            {isSaving && <LinearProgress />}
            <div className="form-actions">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disabled={isSaving}
              >
                Änderungen speichern
              </Button>
              <Button component={Link} to="/beers" variant="outlined" color="secondary">
                Abbrechen
              </Button>
            </div>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </Card>
      </main>
    </div>
  );
}
