// Theorie-trainer — thema "Complexe situaties": combinaties van borden, lichten en meerdere weggebruikers.
// Zelf geschreven oefenvragen, geen officiële CBR-vragen. signs = meerdere borden naast elkaar; sign + scene mag samen.
(() => {
const GREEN = '#2f9e44';
const you = (f, g) => ({ id: 'you', k: 'you', f, g, n: 'Jij' });
const car = (f, g, n = 'De rode auto', id = 'C', c = '#e03131') => ({ id, k: 'car', f, g, c, n });
const bike = (f, g) => ({ id: 'B', k: 'bike', f, g, n: 'De fietser' });
const tram = (f, g) => ({ id: 'T', k: 'tram', f, g, n: 'De tram' });
const ped = { id: 'P', k: 'ped', at: [207, 226], to: [207, 84], n: 'De voetganger' };
window.THEMES.push({ id: 'complex', name: 'Complexe situaties', icon: '🧩', color: '#ae3ec9', ch: 'Alles door elkaar', qs: [
  // stap voor stap: wat weegt het zwaarst
  { id: 'c8', t: 'mc', signs: [['LICHT', 'knipper'], ['B6']], q: 'De verkeerslichten knipperen geel en je ziet dit bord. Wat geldt?',
    a: ['Voorrang verlenen aan het kruisende verkeer', 'Rechts gaat voor', 'Je mag doorrijden, de lichten staan uit'], c: 0,
    e: 'Bij geel knipperlicht zijn de lichten buiten gebruik. Dan gelden de borden: het bord met de punt naar beneden betekent voorrang verlenen.' },
  { id: 'c9', t: 'yn', signs: [['LICHT', 'groen'], ['B7']], q: 'Het licht is groen en er staat ook een stopbord. Moet je stoppen?', c: false,
    e: 'Werkende verkeerslichten gaan boven borden. Bij groen rijd je door; het stopbord geldt alleen als de lichten uit zijn of knipperen.' },
  { id: 'c24', t: 'mc', sign: ['LICHT', 'groen'], q: 'Je hebt groen. Van rechts nadert een ambulance met zwaailicht en sirene, en achter je toetert iemand. Wat doe je?',
    a: ['Wachten tot de ambulance voorbij is', 'Doorrijden, je hebt groen', 'Snel oversteken voordat hij er is'], c: 0,
    e: 'Een voorrangsvoertuig gaat altijd voor, ook als jij groen hebt. Laat je niet opjagen door het verkeer achter je.' },
  { id: 'c2', t: 'mc', sign: ['B1'], scene: { yield: 'EW', v: [you('S', 's'), car('E', 's')] }, q: 'Je rijdt op een voorrangsweg. De rode auto komt van rechts. Wie gaat eerst?',
    a: ['Jij', 'De rode auto'], c: 0,
    e: 'Borden gaan boven de regel "rechts gaat voor". Jij rijdt op de voorrangsweg; de auto heeft haaientanden en wacht.' },
  { id: 'c11', t: 'mc', scene: { unpaved: 'S', v: [you('S', 's'), bike('W', 's')] }, q: 'Jij komt van een onverharde weg. De fietser komt van links over de verharde weg. Wie gaat eerst?',
    a: ['De fietser', 'Jij'], c: 0,
    e: 'Wie van een onverharde weg komt, laat bestuurders op de verharde weg voorgaan. Dat de fietser van links komt, doet er dan niet toe.' },
  { id: 'c32', t: 'mc', q: 'Je rijdt een uitrit uit. Van links komt een fietser en van rechts een auto. Wie laat je voorgaan?',
    a: ['Allebei', 'Alleen de auto van rechts', 'Niemand, zij moeten wachten'], c: 0,
    e: 'Een uitrit uitrijden is een bijzondere manoeuvre. Je laat al het andere verkeer voorgaan, van links én van rechts.' },
  { id: 'c33', t: 'mc', q: 'Je rijdt achteruit een parkeervak uit. Achter je loopt een voetganger en er nadert een auto. Wie laat je voorgaan?',
    a: ['Allebei', 'Alleen de auto', 'Alleen de voetganger'], c: 0,
    e: 'Achteruitrijden is een bijzondere manoeuvre: al het andere verkeer gaat voor, ook voetgangers.' },
  // meer dan één bord
  { id: 'c1', t: 'num', unit: 'km/u', signs: [['H1', 'Zevenhuizen'], ['A1', '30']], q: 'Je passeert deze twee borden. Hoe hard mag je maximaal?', c: 30,
    e: 'Binnen de bebouwde kom geldt normaal 50 km/u, maar een bord met een lagere maximumsnelheid gaat daarboven.' },
  { id: 'c19', t: 'num', unit: 'km/u', signs: [['H1', 'Zevenhuizen'], ['A4', '30']], q: 'Je passeert deze twee borden. Hoe hard mag je maximaal?', c: 50,
    e: 'Het blauwe vierkante bord is een adviessnelheid. De maximumsnelheid blijft die van de bebouwde kom: 50 km/u.' },
  { id: 'c17', t: 'num', unit: 'km/u', signs: [['G3'], ['A1', '80']], q: 'Je rijdt hier met een personenauto. Hoe hard mag je maximaal?', c: 80,
    e: 'Op een autoweg mag je normaal 100 km/u, maar het bord met 80 gaat voor.' },
  { id: 'c18', t: 'num', unit: 'km/u', signs: [['G1'], ['A1', '130']], q: 'Je rijdt hier met een aanhangwagen achter je auto. Hoe hard mag je maximaal?', c: 90,
    e: 'Met een aanhangwagen mag je op de autosnelweg maximaal 90 km/u, wat er ook op het bord staat.' },
  { id: 'c16', t: 'mc', signs: [['A1', '80'], ['J2']], q: 'Je ziet deze twee borden. Hoe hard rijd je de bocht in?',
    a: ['Zo hard als veilig kan; dat kan minder dan 80 zijn', 'Precies 80 km/u', 'Minstens 80 km/u'], c: 0,
    e: 'De maximumsnelheid is geen doel. Het waarschuwingsbord vertelt je dat je je snelheid aan de bocht moet aanpassen.' },
  { id: 'c6', t: 'yn', sign: ['F1'], q: 'Na dit bord rijdt een bromfietser met 40 km/u voor je. Mag je hem inhalen?', c: true,
    e: 'Het inhaalverbod geldt voor motorvoertuigen onderling. Een bromfiets telt niet als motorvoertuig, dus inhalen mag als het veilig kan.' },
  { id: 'c20', t: 'yn', sign: ['E2'], q: 'Hier geldt dit bord. Het verkeer voor je staat vast in de file. Mag je stilstaan?', c: true,
    e: 'Stilstaan omdat het verkeer dat vraagt, zoals in een file of voor een rood licht, mag altijd. Het verbod gaat over zelf stoppen.' },
  { id: 'c21', t: 'yn', sign: ['F5'], q: 'Bij een smalle doorgang staat dit bord. Van de andere kant nadert alleen een fietser. Moet je wachten?', c: true,
    e: 'Je mag niet doorrijden als er verkeer uit de tegengestelde richting nadert. Een fietser is ook verkeer.' },
  // meer weggebruikers tegelijk
  { id: 'c3', t: 'mc', scene: { yield: 'S', v: [you('S', 's'), bike('E', 's'), car('W', 's', 'De groene auto', 'C', GREEN)] }, q: 'Voor jou liggen haaientanden. Wie moet je voor laten gaan?',
    a: ['De fietser en de groene auto', 'Alleen de fietser, die komt van rechts', 'Alleen de groene auto'], c: 0,
    e: 'Haaientanden: voorrang verlenen aan alle bestuurders op de kruisende weg, van links en van rechts.' },
  { id: 'c14', t: 'mc', scene: { v: [you('S', 'r'), bike('S', 's'), ped] }, q: 'Je slaat rechtsaf. Naast je rijdt een fietser rechtdoor en een voetganger steekt de straat over die jij inrijdt. Wie laat je voorgaan?',
    a: ['Allebei', 'Alleen de fietser', 'Alleen de voetganger'], c: 0,
    e: 'Wie afslaat, laat verkeer voorgaan dat op dezelfde weg rechtdoor gaat. Dat geldt voor de fietser naast je en voor de voetganger.' },
  { id: 'c23', t: 'mc', sign: ['B6'], scene: { yield: 'S', v: [you('S', 's'), tram('W', 's'), car('E', 's')] }, q: 'Je moet voorrang verlenen. Wanneer mag jij oversteken?',
    a: ['Als de tram én de rode auto voorbij zijn', 'Na de tram; de auto moet wachten', 'Meteen, als je voorzichtig rijdt'], c: 0,
    e: 'Je verleent voorrang aan al het verkeer op de kruisende weg. De tram en de auto hinderen elkaar niet, jij wacht op allebei.' },
  { id: 'c10', t: 'mc', scene: { v: [you('S', 's'), tram('N', 'l')] }, q: 'Gelijkwaardig kruispunt. De tram komt je tegemoet en slaat linksaf, jij gaat rechtdoor. Wie gaat eerst?',
    a: ['De tram', 'Jij'], c: 0,
    e: 'De regel dat een afslaande bestuurder rechtdoorgaand verkeer voor laat gaan, geldt niet voor de tram. Op een gelijkwaardig kruispunt gaat de tram voor.' },
  { id: 'c22', t: 'order', scene: { arms: 'ESW', v: [you('S', 'l'), car('W', 's'), bike('E', 's')] }, order: ['B', 'you', 'C'],
    q: 'T-kruising zonder borden. Jij komt uit de zijstraat en slaat linksaf. Tik aan in welke volgorde jullie mogen rijden.',
    e: 'De fietser komt voor jou van rechts en gaat eerst. De rode auto komt van links en moet op jou wachten. De fietser en de auto hinderen elkaar niet.' },
  { id: 'c4', t: 'order', scene: { v: [you('S', 'l'), car('N', 's'), bike('E', 's')] }, order: ['C', 'B', 'you'],
    q: 'Gelijkwaardig kruispunt. Jij slaat linksaf. Tik aan in welke volgorde jullie mogen rijden.',
    e: 'De rode auto heeft niemand rechts van zich en gaat eerst. De fietser wacht op de auto (die komt voor hem van rechts). Jij wacht op de tegenligger die rechtdoor gaat en op de fietser van rechts.' },
  { id: 'c5', t: 'order', sign: ['B7'], scene: { yield: 'S', v: [you('S', 'r'), bike('S', 's'), car('W', 's')] }, order: ['C', 'B', 'you'],
    q: 'Je staat bij een stopbord en slaat rechtsaf. Naast je staat een fietser die rechtdoor gaat. Tik aan in welke volgorde jullie mogen rijden.',
    e: 'De rode auto rijdt op de kruisende weg en gaat eerst. Daarna de fietser, want die gaat rechtdoor terwijl jij afslaat. Jij gaat als laatste.' },
  { id: 'c27', t: 'order', sign: ['B1'], scene: { yield: 'EW', v: [you('S', 'l'), car('N', 's'), bike('E', 's')] }, order: ['C', 'you', 'B'],
    q: 'Je rijdt op een voorrangsweg en slaat linksaf. De fietser heeft haaientanden. Tik aan in welke volgorde jullie mogen rijden.',
    e: 'De tegenligger gaat rechtdoor op dezelfde weg en gaat voor jou. De fietser heeft haaientanden en wacht op jullie allebei.' },
] });
})();
