# 🚗 Theorie-trainer (rijbewijs B)

Een Duolingo-achtige oefen-app voor het Nederlandse theorie-examen auto (B). Alles in het Nederlands,
gemaakt voor de telefoon; de voortgang wordt alleen op het apparaat zelf bewaard (`localStorage`).

- **Leerpad** per thema met korte lessen (± 8 vragen), XP, dagdoel, reeks (dagen op rij) en combo's
- **Theoriekaartjes** vóór elke les, en per thema na te lezen via het 📘-knopje (`questions3.js`)
- **Vraagtypen**: meerkeuze, ja/nee, getal invullen, volgorde bij een kruispunt, koppelen, sorteren,
  zin afmaken, het goede bord aantikken en stappen op volgorde zetten
- **Uitleg** na elk antwoord; foute vragen komen in dezelfde les terug en belanden bij "zwakke punten"
- **Plaatjes**: verkeersborden en kruispunten worden in de app zelf getekend (SVG), geen foto's
- **"Klopt niet?"** markeert een vraag; de lijst is op het startscherm te kopiëren

De thema-indeling volgt het ANWB-theorieboek personenauto: 18 thema's, 42 lessen, 347 oefeningen en
64 theoriekaartjes. De vragen staan in `questions.js`, `questions2.js` en `questions3.js` en zijn zelf geschreven oefenvragen, geen officiële
CBR-vragen; er kunnen fouten in zitten. `index.html#overzicht` toont alle tekeningen op één pagina.

Nog te doen: een proefexamen in CBR-opzet.
