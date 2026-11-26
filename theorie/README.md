# 🚗 Theorie-trainer (rijbewijs B)

Een Duolingo-achtige oefen-app voor het Nederlandse theorie-examen auto (B). Alles in het Nederlands,
gemaakt voor de telefoon. De voortgang staat op het apparaat (`localStorage`) en wordt daarnaast bewaard in
de Firebase-database van het Sinterklaasboek, in een eigen vak `theorie` (één gebruiker, geen login; de
regels staan in `sinterklaas/database.rules.json`). Is de cloud niet bereikbaar, dan werkt alles lokaal door.

- **Leerpad** per thema met korte lessen (± 8 vragen), XP, dagdoel, reeks (dagen op rij) en combo's
- **Theoriekaartjes** vóór elke les, en per thema na te lezen via het 📘-knopje (`questions3.js`)
- **Vraagtypen**: meerkeuze, ja/nee, getal invullen, volgorde bij een kruispunt, koppelen, sorteren,
  zin afmaken, het goede bord aantikken en stappen op volgorde zetten
- **Bijzondere knopen** op het pad: een memory of een bliksemronde (45 seconden) na de eerste les van een
  thema, en een schatkist met bonus-XP aan het eind
- **Animaties**: een weg met decor door het pad, voertuigen die na je antwoord in de goede volgorde
  wegrijden, binnenglijdende vragen, combo-meldingen; uit bij "verminder beweging"
- **Winkel**: munten (verdiende XP min uitgaven) voor boosts (dubbele XP, hint, reeksbevriezing) en
  skins voor de pylon; uitgeven verlaagt je XP of reeks niet
- **Uitleg** na elk antwoord; foute vragen komen in dezelfde les terug en belanden bij "zwakke punten"
- **Plaatjes**: verkeersborden en kruispunten worden in de app zelf getekend (SVG), geen foto's
- **"Klopt niet?"** markeert een vraag; de lijst is op het startscherm te kopiëren

De thema-indeling volgt het ANWB-theorieboek personenauto: 18 thema's, 42 lessen, 347 oefeningen en
64 theoriekaartjes. De vragen staan in `questions.js`, `questions2.js` en `questions3.js` en zijn zelf geschreven oefenvragen, geen officiële
CBR-vragen; er kunnen fouten in zitten. `index.html#overzicht` toont alle tekeningen op één pagina.

**Proefexamen** in CBR-opzet: gevaarherkenning (25 vragen, 13 goed, 8 seconden per vraag), kennis (12, 10 goed)
en inzicht (28, 25 goed), met de uitslag per onderdeel en een overzicht van de fouten aan het eind.
