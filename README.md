# Escaperooms – FYR 13 (point-and-click, version 4)

Dette er hele din GitHub Pages-hjemmeside inklusive Escaperooms-forside, FYR 13 og den krypterede læreradgang.

## Udgiv på GitHub

1. Pak ZIP-filen ud på computeren.
2. Åbn dit eksisterende offentlige repository `EscapeRooms` på GitHub.
3. Vælg **Add file → Upload files**, og træk hele indholdet af den udpakkede mappe ind (IKKE selve mappen som en ekstra topmappe).
4. Vælg **Commit changes**. Filer med samme sti skal erstattes.
5. GitHub Pages skal stadig være indstillet til `main` / `/(root)`. Åbn derefter hjemmesiden og genindlæs (evt. Ctrl+F5).

**Du skal ikke oprette et nyt repository.**

## Spillet

- 5 sammenhængende miljøer, 16 mekanismer og 103 undersøgelsessteder (herunder flere blindgyder).
- Genstande undersøges direkte i billederne. Der er ikke synlige markeringer som standard.
- Man kan kigge ned i beholdere, åbne skuffer/vinduer, løfte genstande og finde skjulte dokumenter.
- Spor kan være relevante i andre områder og gøre det nødvendigt at vende tilbage.
- Logbog, rygsæk, tidslåste hints og automatisk lagring (på samme enhed/browser) er med.
- På små skærme kan man stryge vandret gennem en scene for at se hele området.
- Brug **Brug blik for detaljer** hvis man vil se undersøgelsessteder markeret i kort tid.
- Oplæsning bruger stadig browserens stemmer. Den er et midlertidigt tilgængelighedsvalg, indtil der er indtalte lydfiler. Baggrundslyd er slået fra som standard.

## Lærerguide

Den komplette walkthrough og PDF ligger KUN i krypterede filer under `teacher/`. Den tidligere kode til lærerområdet fungerer stadig. Del aldrig den ukrypterede PDF via det offentlige GitHub-repository.

## Spilstatus / tekniske begrænsninger

Denne version bruger en ny gemmenøgle (`fyr13-save-v4`), så tidligere V3-fremskridt flyttes ikke automatisk med. Browserlagring virker ikke på tværs af computere eller inkognito-sessioner. Grafik viser fotografiske scener med programmerede nærvisninger og animerede handlinger; der er ikke tale om en egentlig 3D-spilmotor. Der er ingen server, så en teknisk kyndig spiller vil kunne inspicere klientkoden.

## Nye spil

Læg hvert nyt spil i sin egen mappe under `games/` og tilføj det til `rooms.json`. Samme forside kan vise alle spil.
