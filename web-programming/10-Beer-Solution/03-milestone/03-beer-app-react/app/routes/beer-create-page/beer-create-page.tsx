import { useState } from "react";
import { Button, Card, LinearProgress, MenuItem, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import type { Route } from "./+types/beer-create-page";
import { Link, useNavigate } from "react-router";

import { createBeer } from "~/services/beers-service";

import "./beer-create-page.css";

const tasteOptions = ["Pils", "IPA", "Weizen", "Helles", "Stout", "Bock", "Craft Mix"];

type FormState = {
  name: string;
  brand: string;
  taste: string;
};

type TouchedState = Record<keyof FormState, boolean>;

function validateField(field: keyof FormState, value: string) {
  if (!value.trim()) {
    return field === "taste" ? "Bitte wähle einen Stil aus." : "Bitte gib einen Wert ein.";
  }
  if (value.length > 120) {
    return "Maximal 120 Zeichen erlaubt.";
  }
  return "";
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Beer Tracker – Neues Bier" }];
}

export default function BeerCreatePage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>({ name: "", brand: "", taste: "" });
  const [touched, setTouched] = useState<TouchedState>({ name: false, brand: false, taste: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const errors = {
    name: validateField("name", formState.name),
    brand: validateField("brand", formState.brand),
    taste: validateField("taste", formState.taste),
  };

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, brand: true, taste: true });

    if (Object.values(errors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await createBeer({
        name: formState.name.trim(),
        brand: formState.brand.trim(),
        taste: formState.taste,
      });
      navigate("/beers");
    } catch {
      setErrorMessage("Erstellen fehlgeschlagen. Bitte versuche es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-page-root">
      <main className="create-page">
        <section className="intro">
          <p className="eyebrow">Neuer Eintrag</p>
          <h1>Füge ein neues Bier zu deinem Tagebuch hinzu</h1>
          <p className="lead">
            Trage Name, Marke und Geschmack ein – schon landet dein Fund in der Beer-Tracker-Sammlung.
          </p>
        </section>

        <section className="create-layout">
          <Card className="form-card">
            <form onSubmit={submit} noValidate>
              <div className="form-grid">
                <TextField
                  label="Name des Bieres"
                  name="name"
                  value={formState.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  placeholder="z.B. Hopfenblüte Spezial"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name ? errors.name : ""}
                  autoComplete="off"
                  fullWidth
                />
                <TextField
                  label="Marke / Brauerei"
                  name="brand"
                  value={formState.brand}
                  onChange={handleChange("brand")}
                  onBlur={handleBlur("brand")}
                  placeholder="z.B. Craft Kollektiv"
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
                  onChange={handleChange("taste")}
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
              </div>

              {isSubmitting && <LinearProgress className="progress" />}

              <div className="form-actions">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  disabled={isSubmitting}
                >
                  Bier speichern
                </Button>
                <Button component={Link} to="/beers" variant="outlined" color="secondary">
                  Abbrechen
                </Button>
              </div>

              {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
          </Card>

          <Card className="helper-card">
            <TipsAndUpdatesIcon />
            <h3>Schnelle Tipps</h3>
            <ul>
              <li>Nutze eindeutige Namen, damit du Biere leichter wiederfindest.</li>
              <li>Der Stil hilft beim Filtern in der Übersicht.</li>
              <li>Nach dem Speichern gelangst du automatisch zurück zur Liste.</li>
            </ul>
            <Button component={Link} to="/beers" variant="text" color="primary">
              Zurück zur Übersicht
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
}
