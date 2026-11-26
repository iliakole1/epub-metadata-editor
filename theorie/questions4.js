// Theorie-trainer — extra gevaarherkenningsvragen (genoeg voor een proefexamen van 25).
// Zelf geschreven, geen officiële CBR-vragen.
(() => {
const G = ['Remmen', 'Gas loslaten', 'Niets doen'];
const gh = (id, q, c, e) => ({ id, t: 'mc', q, a: G, c, e, fixed: true });
window.THEMES.find(t => t.id === 'gevaar').qs.push(
  gh('g17', 'Je rijdt 50 km/u. Het verkeerslicht springt op geel als je er nog maar een paar meter voor bent. Wat doe je?', 2,
    'Je kunt niet meer veilig stoppen. Dan rijd je door: niets doen.'),
  gh('g18', 'Je rijdt 50 km/u. Het verkeerslicht springt op geel als je er nog zo\'n 40 meter voor bent. Wat doe je?', 0,
    'Je hebt genoeg ruimte om veilig te stoppen. Geel betekent stop: remmen.'),
  gh('g19', 'Je rijdt 80 km/u. Na een bocht rijdt vlak voor je een tractor met 25 km/u en er komt een tegenligger aan. Wat doe je?', 0,
    'Groot snelheidsverschil en je kunt niet inhalen: remmen.'),
  gh('g20', 'Je rijdt 100 km/u op de rechterrijstrook van de snelweg. Naast je op de invoegstrook wil een auto invoegen; links van je rijdt verkeer. Wat doe je?', 1,
    'Geef de invoeger ruimte door even het gas los te laten. Naar links kun je niet.'),
  gh('g21', 'Je rijdt 30 km/u in een woonwijk. Rechts staat een vuilniswagen stil, de vuilnismannen lopen eromheen. Wat doe je?', 1,
    'Er kan iemand achter de wagen vandaan stappen. Gas los en klaar zijn om te remmen.'),
  gh('g22', 'Je rijdt 50 km/u. Op de stoep loopt een volwassen voetganger van je af, ver van de stoeprand. Wat doe je?', 2,
    'Niets wijst erop dat de voetganger gaat oversteken. Niets doen.'),
  gh('g23', 'Je rijdt 50 km/u. Een loslopende hond rent vlak voor je de weg op. Wat doe je?', 0,
    'Direct gevaar vlak voor je: remmen.'),
  gh('g24', 'Je rijdt 80 km/u in de schemering door een bos. Er staat een bord dat waarschuwt voor overstekend wild. Je ziet nog niets. Wat doe je?', 1,
    'In de schemering steekt wild vaak plotseling over. Gas los, zodat je sneller kunt stoppen.'),
  gh('g25', 'Je rijdt 50 km/u achter een fietser. Verderop staat een auto geparkeerd op zijn weghelft. Wat doe je?', 1,
    'De fietser zal naar links uitwijken. Gas los en ruimte houden.'),
  gh('g26', 'Je rijdt 50 km/u op een voorrangsweg. Vlak voor je rolt een auto uit een zijstraat door, hij lijkt niet te stoppen. Wat doe je?', 0,
    'Je hebt voorrang, maar je krijgt hem niet. Remmen om een botsing te voorkomen.'),
  gh('g27', 'Je rijdt 50 km/u op een voorrangsweg. Bij een zijstraat staat een auto stil achter de haaientanden, de bestuurder kijkt naar jou. Wat doe je?', 2,
    'De ander staat stil en heeft je gezien. Niets doen.'),
  gh('g28', 'Je haalt op de snelweg een vrachtauto in. Als je er bijna naast rijdt, geeft hij links richting aan en komt hij jouw rijstrook op. Wat doe je?', 0,
    'De chauffeur heeft je niet gezien. Remmen en afstand nemen.'),
  gh('g29', 'Je rijdt 80 km/u. Het wordt mistig, je kunt nog ongeveer 100 meter ver kijken. Wat doe je?', 1,
    'Je zicht wordt korter. Gas los en met een lagere snelheid verder.'),
  gh('g30', 'Je nadert een school. Een verkeersbrigadier houdt een stopbord omhoog en kinderen steken over. Wat doe je?', 0,
    'Een stopteken van een verkeersbrigadier moet je opvolgen: remmen en stoppen.')
);
})();
