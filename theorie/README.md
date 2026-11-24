# 🚗 Theorie-trainer (rijbewijs B)

Een Duolingo-achtige oefen-app voor het Nederlandse theorie-examen auto (B). Alles in het Nederlands,
gemaakt voor de telefoon; de voortgang wordt alleen op het apparaat zelf bewaard (`localStorage`).

- **Leerpad** per thema met korte lessen (± 8 vragen), XP, dagdoel, reeks (dagen op rij) en combo's
- **Vraagtypen**: meerkeuze, ja/nee, getal invullen en "tik de volgorde aan" bij een kruispunt
- **Uitleg** na elk antwoord; foute vragen komen in dezelfde les terug en belanden bij "zwakke punten"
- **Plaatjes**: verkeersborden en kruispunten worden in de app zelf getekend (SVG), geen foto's
- **"Klopt niet?"** markeert een vraag; de lijst is op het startscherm te kopiëren

De thema-indeling volgt het ANWB-theorieboek personenauto: 18 thema's, 42 lessen, 305 vragen. De vragen
staan in `questions.js` en `questions2.js` en zijn zelf geschreven oefenvragen, geen officiële
CBR-vragen; er kunnen fouten in zitten. `index.html#overzicht` toont alle tekeningen op één pagina.

Nog te doen: een proefexamen in CBR-opzet.
