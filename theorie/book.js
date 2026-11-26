// Theorie-trainer — het theorieboek: indeling in categorieën, en per theoriekaartje een voorbeeld en plaatjes.
// BOOK[thema][i] hoort bij THEORY[thema][i]. img: borden ([code, tekst]) of { q: 'vraag-id' } voor een kruispunt.
(() => {
const X = (ex, ...img) => ({ ex, img });
window.BOOKCATS = [
  { name: 'Regels en voorrang', icon: '🔀', themes: ['begrippen', 'voorrang', 'afslaan', 'plaats'] },
  { name: 'Borden, lichten en tekens', icon: '🛑', themes: ['borden', 'lichten', 'tekens'] },
  { name: 'Snelheid en soorten wegen', icon: '🛣️', themes: ['snelheid', 'snelweg', 'bijzonder', 'parkeren'] },
  { name: 'Jij en je auto', icon: '🚗', themes: ['alcohol', 'verlichting', 'voertuig', 'milieu'] },
  { name: 'Gevaar, ongevallen en examen', icon: '🚑', themes: ['gevaar', 'complex', 'ongeval', 'rijbewijs'] },
];
window.BOOK = {
voorrang: [
  X('Je rijdt een kruispunt in een woonwijk op. Van rechts komt een fietser. Jij wacht, de fietser gaat eerst.', { q: 'v1' }),
  X('Een tram komt van links op een gelijkwaardig kruispunt. Toch wacht jij: de tram gaat voor.', { q: 'v5' }),
  X('Je slaat linksaf, de tegenligger slaat rechtsaf dezelfde straat in. Hij maakt de korte bocht en gaat voor.', { q: 'v8' }),
  X('Bij een stopbord sta je helemaal stil, ook als je de weg kunt overzien en er niemand aankomt.', ['B6'], ['B7'], ['B1']),
  X('Het licht is groen, maar een verkeersregelaar steekt zijn hand op. Je stopt.', ['LICHT', 'groen']),
  X('Je rijdt achteruit je oprit af. Over de stoep loopt een voetganger. Jij wacht.'),
  X('Binnen de bebouwde kom knippert een bus bij de halte naar links. Je houdt in en laat hem wegrijden.'),
],
borden: [
  X('Zie je in de verte een rond bord met een rode rand, dan weet je al dat er iets niet mag, nog voordat je het plaatje kunt lezen.', ['C1'], ['D4'], ['J37'], ['E4']),
  X('Na het bord "einde 50" buiten de bebouwde kom geldt weer 80 km/u.', ['A1', '50'], ['A2', '50'], ['A4', '60']),
  X('Bij het rode bord met de witte balk mag jij de straat niet in, maar er kan wel een auto uit komen.', ['C1'], ['C2']),
  X('Bij één streep mag je je passagier snel laten uitstappen. Bij het kruis mag ook dat niet.', ['E1'], ['E2']),
  X('Bij een inhaalverbod mag je een fietser inhalen, maar een tractor niet.', ['F1'], ['F5'], ['F6']),
  X('Rijd je het plaatsnaambord voorbij, dan ga je naar 50 km/u, ook als er geen snelheidsbord staat.', ['G1'], ['G3'], ['H1', 'Zevenhuizen']),
],
snelheid: [
  X('Op een snelweg zonder borden mag je om 20.00 uur 130 km/u. Staat er een bord met 100, dan geldt dat bord.', ['A1', '100']),
  X('Rijd je een zone 30 in en sla je daarna twee keer af, dan geldt die 30 nog steeds.', ['A1', '30']),
  X('Met een caravan achter de auto rijd je op de snelweg maximaal 90 km/u.'),
  X('Een brommobiel (45 km/u) mag niet op de autoweg en niet op de autosnelweg.', ['G1'], ['G3']),
  X('Bij 50 km/u ben je na 1 seconde reactietijd al 14 meter verder, en dan begin je pas met remmen.'),
  X('Tel "eenentwintig, tweeëntwintig" nadat je voorganger een lantaarnpaal passeert. Ben jij er eerder, dan zit je te dichtbij.'),
],
begrippen: [
  X('Iemand loopt met zijn fiets aan de hand over het zebrapad. Dat is een voetganger, en die laat je voorgaan.'),
  X('Een snelweg met drie stroken per richting heeft per richting één rijbaan met drie rijstroken.'),
  X('Je telefoon in een houder mag je gebruiken, maar je mag hem tijdens het rijden niet in je hand houden.'),
  X('Een verkeersregelaar bij een evenement wenkt je door rood. Je rijdt door.', ['LICHT', 'rood']),
],
alcohol: [
  X('Voor een beginnend bestuurder is één glas bier al te veel.'),
  X('Na zes glazen op een avond ben je de volgende ochtend om acht uur waarschijnlijk nog niet nuchter.'),
  X('Hooikoortstabletten met een gele sticker: lees eerst de bijsluiter voordat je gaat rijden.'),
],
lichten: [
  X('Het licht springt op geel als je er 40 meter voor bent en 50 km/u rijdt. Je kunt veilig stoppen, dus je stopt.', ['LICHT', 'rood'], ['LICHT', 'geel'], ['LICHT', 'groen']),
  X('De lichten knipperen geel en voor jou liggen haaientanden. Je verleent voorrang aan het kruisende verkeer.', ['LICHT', 'knipper']),
  X('Boven je rijstrook verschijnt een schuine pijl en verderop een rood kruis. Je wisselt meteen van strook.', ['SCHUIN'], ['KRUIS']),
],
tekens: [
  X('Jij rijdt rechts van een dubbele streep. Aan jouw kant is hij onderbroken: jij mag erover, de tegenligger niet.', ['LIJN', 'door'], ['LIJN', 'onder'], ['LIJN', 'jijonder']),
  X('Langs de stoeprand ligt een gele onderbroken streep. Je mag er iemand laten uitstappen, maar niet parkeren.'),
  X('Tussen de twee middenstrepen is de weg groen. Je mag hier maximaal 100 km/u.', ['LIJN', 'groen']),
],
gevaar: [
  X('Bij elke situatie staat je snelheid. Kijk daar altijd eerst naar: bij 30 km/u reageer je anders dan bij 100.'),
  X('Tussen geparkeerde auto\'s rolt een bal de weg op. Er kan een kind achteraan komen: remmen.'),
  X('Op de stoep spelen kinderen die niet op het verkeer letten. Er is nog niets aan de hand, maar je laat het gas los.'),
],
plaats: [
  X('Je hebt een vrachtauto ingehaald. Zodra je hem helemaal in je binnenspiegel ziet, ga je terug naar rechts.'),
  X('In de file rijdt de linkerstrook 20 km/u en jouw strook 40. Je mag de auto\'s links van je voorbijrijden.'),
  X('Voor je fietst iemand en er komt een tegenligger aan. Je blijft erachter tot je anderhalve meter ruimte kunt geven.'),
],
afslaan: [
  X('Je wilt linksaf. Je geeft richting aan, gaat tegen de middenstreep rijden en remt dan pas af.'),
  X('Je neemt de derde afslag op een rotonde. Bij het oprijden geef je links aan, na de tweede afslag rechts.', ['D1']),
  X('Op een turborotonde wil je linksaf. Je kiest vóór de rotonde de linkerstrook en blijft daarop.'),
],
snelweg: [
  X('Je hebt je afrit gemist. Je rijdt door naar de volgende afrit en keert daar.', ['G1']),
  X('Je motor valt uit. Alarmlichten aan, uitrollen naar de vluchtstrook, rechts uitstappen en achter de vangrail wachten.'),
  X('De rechterstrook houdt op. Je rijdt door tot het einde en voegt daar om en om in.'),
],
parkeren: [
  X('Je wacht in de auto op een vriend die nog boven is. Dat is parkeren, ook al zit je achter het stuur.'),
  X('Je wilt parkeren vlak naast een zebrapad. Dat mag niet: je houdt minstens 5 meter afstand.', ['E4']),
  X('Je komt om 10.10 uur aan in een blauwe zone. Je zet de parkeerschijf op 10.30 uur.', ['E1'], ['E2']),
],
verlichting: [
  X('Het is overdag gaan misten en je ziet nog zo\'n 200 meter ver. Je zet je dimlicht aan.'),
  X('Het regent heel hard. Je mistachterlicht blijft uit, want dat verblindt de bestuurder achter je.'),
  X('Een auto dreigt achteruit tegen je aan te rijden. Nu mag je toeteren.'),
],
bijzonder: [
  X('De trein is voorbij, maar de lichten blijven rood knipperen. Je wacht: er kan nog een trein komen.'),
  X('Je rijdt een tunnel in. Zonnebril af, dimlicht aan en afstand houden.'),
  X('Op een erf loopt een moeder met een kinderwagen midden op de weg. Jij rijdt stapvoets achter haar aan.'),
],
voertuig: [
  X('Steek een muntje van 1 euro in het profiel. Zie je de gouden rand, dan zijn je banden aan vervanging toe.'),
  X('Je neemt je neefje van 8 mee. Jij moet ervoor zorgen dat hij goed vastzit in een passend zitje.'),
  X('Je vervoert planken die 1,5 meter achter je auto uitsteken. Je hangt er een rood-wit gestreept bord aan.'),
],
milieu: [
  X('Je ziet in de verte een rood licht. Je laat het gas los en rolt in de versnelling uit.'),
  X('Je wacht voor een open brug. Je zet de motor uit.'),
],
ongeval: [
  X('Je komt als eerste bij een ongeval. Je zet je auto veilig weg, doet je alarmlichten aan en belt 112.'),
  X('Een slachtoffer zit aanspreekbaar in de auto en er is geen brand. Je laat hem zitten en blijft bij hem.'),
  X('Je hebt een geparkeerde auto geraakt en de eigenaar is er niet. Je laat je gegevens achter of meldt het bij de politie.'),
],
rijbewijs: [
  X('Met rijbewijs B mag je een busje besturen met 8 passagiers, maar niet met 9.'),
  X('Je hebt drie jaar je rijbewijs. Je bent nog beginnend bestuurder, dus voor jou geldt 0,2 promille.'),
  X('Je haalt gevaarherkenning en kennis, maar niet inzicht. Dan ben je gezakt: alle drie de onderdelen moeten voldoende zijn.'),
],
};
})();
