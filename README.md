# Escaperooms – FYR 13 version 3

Denne ZIP indeholder **hele hjemmesiden** samt FYR 13 (version 3). Upload den til det eksisterende GitHub-repository `EscapeRooms`. Der skal IKKE oprettes et nyt repository.

## Upload / opdatering

1. Pak ZIP-filen ud på din computer.
2. Gå til GitHub-repositoryet `EscapeRooms` → **Add file → Upload files**.
3. Upload **indholdet af den udpakkede mappe** med alle undermapper (ikke selve ZIP-filen). Filer som `index.html` og `rooms.json` skal ligge direkte i repositoryets rod.
4. Gem med **Commit changes**. Hvis GitHub viser eksisterende filer, skal de opdateres med de nye versioner.
5. GitHub Pages bliver stående på `main` / `/(root)`. Det eksisterende link virker fortsat.

## Hvad er nyt i version 3?

- 5 områder og 16 gåder/mekanismer fordelt på 37 klikbare steder.
- **Reelle forbindelser mellem områderne:** Skipperens kurskort på kajen bruges i forhallen. Kajens serviceetiket giver grundtallet til trykventilerne i maskinrummet. En indgravering under trappen i forhallen forklarer krypteringen i arkivet. Arkivets filterjournal bruges i lanternen.
- **Tilbagevenden:** Et reparationsbilag i arkivet sender spilleren tilbage til en låst kasse på kajen. Den indeholder et nødprisme, som kræves i lanternen. Først derefter kan hovedkontakten tændes.
- Logbogen bevarer de fundne spor fra alle områder. Områdekortet gør det muligt at vende tilbage. Et uløst spor markeres i områdekortet, når bilaget findes.
- Hintsystem med tre hints pr. gåde og tre minutters ventetid mellem hints. Samme ordlyd i lærerens gennemgang.
- Gemte fremskridt bruger nu `fyr13-save-v3`; tidligere versioner kan ikke fortsættes, fordi opgaver og afhængigheder er ændret.

## Læreradgang

Læreradgangen på forsiden bruger **samme læreradgangskode som før**. De to filer i `teacher/` er krypterede; den ukrypterede walkthrough-PDF er IKKE med i ZIP-filen. Del ikke lærerkoden eller PDF'en med eleverne.

## Stemmer og lyd

Stemmeoplæsningen benytter stadig browserens indbyggede danske stemmer. Denne version fokuserer på gameplay og indhold på tværs af scenerne; indtalte stemmer er endnu ikke tilføjet. Lyd kan slås til og fra.

## Test og begrænsninger

Alle 16 gåder, den nødvendige tilbagevenden til kajen og slutningen er afprøvet i en automatiseret Chromium-gennemspilning uden JavaScript-fejl. Der er endnu ikke gennemført en elevtest af sværhedsgrad og spilletid. GitHub Pages er en statisk platform, så en teknisk dygtig elev kan stadig undersøge elevspillets svarkontrol i JavaScript, selv om selve lærerguiden er krypteret.

## Struktur

- `index.html`, `portal.js`, `styles.css`, `rooms.json`: fælles portal.
- `games/fyr13/`: spillets kode og grafik.
- `teacher/`: krypterede walkthroughs, som kræver lærerkode.
