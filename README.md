# Escaperooms – fælles spilportal

En samlet, selvstændig portal med originale digitale escape rooms på dansk. **Ét GitHub-repository** og én indgang til alle spillene.

## Læg portalen på GitHub Pages

1. Opret **ét nyt repository** på GitHub, fx `escaperooms` (offentligt).
2. Pak `Escaperooms_GitHub.zip` ud på din computer. Upload **indholdet** til repositoryets rod – `index.html`, `rooms.json`, `portal.js`, `styles.css`, mapperne `games/` og `teacher/`. Upload **ikke** ZIP-filen i sig selv.
3. Gå til **Settings → Pages**.
4. Vælg **Deploy from a branch**, derefter `main` og `/(root)`, og gem.
5. Vent på, at GitHub Pages har udgivet hjemmesiden. Åbn adressen `https://DITBRUGERNAVN.github.io/escaperooms/`.

> Test via det rigtige GitHub Pages-link (eller en lokal webserver). Åbning af `index.html` som `file://` kan ikke hente spiloversigten og de krypterede guider.

## Sådan er portalen organiseret

```text
escaperooms/
  index.html                         Fælles forside
  styles.css                         Design
  portal.js                          Spiloversigt + læreradgang
  rooms.json                         Registrering af spil
  games/
    fyr13/
      index.html                     Spil 1 (FYR 13)
      game.js
      game-data.js
      styles.css
      assets/
  teacher/
    fyr13-guide.enc.json             Krypteret lærerguide (kan læses på siden med kode)
    fyr13-walkthrough-pdf.enc.json   Krypteret PDF (kan downloades efter oplåsning)
```

Spillet tilgås fx på `.../escaperooms/games/fyr13/`. FYR 13 har 20 gåder i 5 områder. Lærerens walkthrough indeholder alle gåder og **de samme 60 hinttekster** som spillet. Der er tre minutters ventetid mellem hints i elevspillet.

## Læreradgang og sikkerhed

Tryk **Læreradgang** på forsiden, og indtast den separate lærerkode, som blev leveret med den færdige portal. Koden **ligger ikke i dette repository**, og guiderne er krypteret med AES-256-GCM (nøglen afledes med PBKDF2-SHA256). Både den læsbare HTML-guide og den downloadable PDF er krypteret i repositoryet. Lærere kan bruge den samme kode.

- **Læg ikke koden i repositoryet, i en README på GitHub eller i kodefilerne.**
- Oplåsningen varer kun, så længe portalsiden holdes åben. Tryk **Lås igen** efter brug.
- Denne løsning er egnet til privatdeling af lærervejledninger mellem kollegaer, men ikke til eksamenssikkerhed eller personfølsomme oplysninger. En delt kode kan videresendes; der er ingen personlige lærerbrugere, ingen tilbagekaldelse af enkelte personer, og en krypteret fil kan i princippet angribes offline med kodegæt.
- **Vigtigt:** Elevspillene er JavaScript, der kører i browseren. Spillets svar kan i sidste ende findes af teknisk kyndige elever i spillets kode. Krypteringen beskytter walkthrough-dokumenterne, **ikke** de svar, som browseren skal bruge til at kontrollere opgaver. Stærkere beskyttelse af spilsvar kræver en serverløsning/backend.
- Den oprindelige PDF ligger **ikke ukrypteret** i ZIP-filen.

## Tilføj flere spil senere

Opret en ny mappe under `games/`, fx `games/nytmysterium/`, med spillets egne HTML-, CSS-, JS-, billed- og lydfiler. Tilføj en post til arrayet `rooms` i `rooms.json` med titel, coverbillede, sti, antal gåder m.m. Der kan være mange spil med helt forskellig opbygning og grafisk stil; kun forside og lærerindgang er fælles.

Fremtidige lærerwalkthroughs skal krypteres **før** de lægges i den offentlige `teacher/`-mappe og skal registreres i `rooms.json`. Brug samme lærerkode, hvis kollegaerne skal kunne åbne alle guider med én kode. Tilføj **aldrig** ukrypterede facitfiler i det offentlige repository.

## Gemte fremskridt

FYR 13 gemmer fremskridt lokalt med browserens `localStorage` under `fyr13-save-v1`. Hvert kommende spil skal have sin egen nøgle. Eleverne skal fortsætte på samme browser og enhed og må ikke rydde webstedsdata. Der er ingen central elevsporing eller login.

Version: samlet portal og krypteret læreradgang, november 2026.
