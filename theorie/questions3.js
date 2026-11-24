// Theorie-trainer — theoriekaartjes en extra oefenvormen per thema.
// THEORY[thema] = kaartjes { h: kop, b: tekst }, verdeeld over de lessen van dat thema.
// EXTRA[thema]  = oefeningen: match (koppelen), bucket (sorteren), gap (zin afmaken),
//                 pick (tik het goede bord), seq (volgorde). Zelf geschreven, geen CBR-materiaal.
(() => {
const match = (id, q, pairs, e) => ({ id, t: 'match', q, pairs, e });
const bucket = (id, q, labels, items, e) => ({ id, t: 'bucket', q, labels, items, e });
const gap = (id, s, a, e) => ({ id, t: 'gap', q: 'Maak de zin af', s, a, c: 0, e });
const pick = (id, q, signs, e) => ({ id, t: 'pick', q, signs, c: 0, e });
const seq = (id, q, items, e) => ({ id, t: 'seq', q, items, e });
const S = (...a) => ({ sign: a });
const MAG = ['Mag', 'Mag niet'];

window.THEORY = {
voorrang: [
  { h: 'Rechts gaat voor', b: 'Op een gelijkwaardig kruispunt (geen borden, tekens of lichten) gaan bestuurders van rechts voor. Ook fietsers zijn bestuurders. Voetgangers niet.' },
  { h: 'Twee uitzonderingen', b: 'Een tram gaat op een gelijkwaardig kruispunt altijd voor. En wie op een onverharde weg rijdt, wacht op bestuurders op de verharde weg.' },
  { h: 'Afslaan', b: 'Wie afslaat, laat verkeer voorgaan dat op dezelfde weg rechtdoor gaat: tegenliggers, maar ook de fietser of voetganger naast je. Sla je linksaf, dan gaat de tegenligger die rechtsaf slaat voor (korte bocht voor lange bocht).' },
  { h: 'Borden en haaientanden', b: 'Haaientanden en het bord met de punt naar beneden: voorrang verlenen. Stopbord: altijd stilstaan en voorrang verlenen. Het gele ruitbord: jij rijdt op een voorrangsweg.' },
  { h: 'Wat weegt het zwaarst?', b: 'Aanwijzingen van een agent of verkeersregelaar gaan boven verkeerslichten. Verkeerslichten gaan boven borden. Borden gaan boven de algemene regels.' },
  { h: 'Bijzondere manoeuvres', b: 'Bij wegrijden, achteruitrijden, keren, een uitrit uitrijden en van rijstrook wisselen laat je al het andere verkeer voorgaan, ook voetgangers.' },
  { h: 'Altijd voor laten gaan', b: 'Voorrangsvoertuigen met zwaailicht én sirene, voetgangers bij een zebrapad, blinden met een witte stok met rode ringen, en binnen de bebouwde kom een bus die van de halte wil wegrijden.' },
],
borden: [
  { h: 'De vorm zegt al veel', b: 'Rond met rode rand: verbod. Rond en blauw: gebod. Driehoek met rode rand: waarschuwing. Blauw en vierkant of rechthoekig: informatie.' },
  { h: 'Snelheidsborden', b: 'Rood omrand getal: maximumsnelheid. Hetzelfde getal in grijs met strepen: einde van die maximumsnelheid. Blauw vierkant met getal: adviessnelheid, niet verplicht.' },
  { h: 'Gesloten of eenrichting', b: 'Leeg wit bord met rode rand: gesloten in beide richtingen. Rood bord met witte balk: vanaf deze kant verboden in te rijden, er kan wel verkeer uit komen.' },
  { h: 'Parkeren en stilstaan', b: 'Blauw met rode rand en één streep: parkeerverbod, kort stoppen om iemand uit te laten stappen mag. Met een kruis: verbod stil te staan, ook dat mag dan niet.' },
  { h: 'Inhalen en tegenliggers', b: 'Twee auto\'s naast elkaar in een rode rand: motorvoertuigen mogen elkaar niet inhalen; een fietser inhalen mag wel. Bij de borden met twee pijlen is de rode pijl de richting die moet wachten.' },
  { h: 'Blauwe borden langs de weg', b: 'Autosnelweg en autoweg hebben elk een eigen blauw bord. Het plaatsnaambord geeft het begin van de bebouwde kom aan: vanaf daar 50 km/u.' },
],
snelheid: [
  { h: 'De vier basissnelheden', b: 'Binnen de bebouwde kom 50 km/u. Buiten de bebouwde kom 80. Autoweg 100. Autosnelweg 130, maar overdag (6.00–19.00 uur) meestal 100: kijk naar de borden.' },
  { h: 'Erf en zone', b: 'Op een erf rijd je stapvoets: maximaal 15 km/u. Een zonebord (bijvoorbeeld zone 30) geldt in het hele gebied, tot het bord "einde zone".' },
  { h: 'Aanhangwagen en langzame voertuigen', b: 'Met aanhangwagen: 90 km/u op autoweg en snelweg, 80 op andere wegen buiten de kom. Bromfiets 45, snorfiets 25, brommobiel 45 km/u.' },
  { h: 'Wie mag op de snelweg?', b: 'Op de autosnelweg mogen alleen motorvoertuigen die minstens 60 km/u kunnen en mogen rijden. Op de autoweg is dat 50 km/u.' },
  { h: 'Stopafstand', b: 'Stopafstand = reactieafstand + remweg. Je reactietijd is ongeveer 1 seconde; bij 50 km/u leg je dan al zo\'n 14 meter af. Rijd je twee keer zo hard, dan is je remweg ongeveer vier keer zo lang.' },
  { h: 'Afstand en aanpassen', b: 'Houd minstens 2 seconden afstand tot je voorganger, en meer bij regen. De maximumsnelheid is geen doel: je moet altijd kunnen stoppen binnen de afstand die je kunt overzien.' },
],
begrippen: [
  { h: 'Bestuurder of voetganger', b: 'Bestuurders zijn alle weggebruikers behalve voetgangers. Wie met de fiets aan de hand loopt of skatet, is een voetganger.' },
  { h: 'Rijbaan en rijstrook', b: 'De rijbaan is het deel van de weg voor rijdende voertuigen. Een rijstrook is een met strepen gemarkeerd deel daarvan. De berm hoort ook bij de weg.' },
  { h: 'Gedrag', b: 'Je mag geen gevaar of hinder veroorzaken (artikel 5). Je mag tijdens het rijden geen telefoon vasthouden. Ben je moe, dan helpt alleen rusten.' },
  { h: 'Aanwijzingen', b: 'Aanwijzingen van politie, verkeersregelaars en verkeersbrigadiers moet je opvolgen. Ze gaan boven lichten, borden en regels.' },
],
alcohol: [
  { h: 'De limieten', b: 'Beginnende bestuurders: 0,2 promille. Ervaren bestuurders: 0,5 promille. Je bent 5 jaar beginner, of 7 jaar als je je rijbewijs vóór je 18e haalt.' },
  { h: 'Alleen tijd helpt', b: 'Je lichaam breekt alcohol af in een vast tempo, ongeveer anderhalf uur per glas. Koffie, water of een douche versnellen dat niet. Ook de ochtend erna kun je nog te veel op hebben.' },
  { h: 'Medicijnen en drugs', b: 'Een gele sticker op medicijnen betekent dat ze je rijvaardigheid kunnen beïnvloeden. Rijden na drugsgebruik is verboden. Combinaties versterken elkaar.' },
],
lichten: [
  { h: 'Rood, geel, groen', b: 'Rood: stoppen. Geel: ook stoppen, tenzij je al zo dichtbij bent dat dat niet meer veilig kan. Groen: doorrijden, maar je mag het kruispunt niet blokkeren.' },
  { h: 'Knipperen of uit', b: 'Bij geel knipperlicht of uitgevallen lichten gelden de borden en haaientanden. Zijn die er niet, dan is het een gelijkwaardig kruispunt.' },
  { h: 'Boven je rijstrook', b: 'Rood kruis: de rijstrook is dicht, je mag er niet rijden. Schuine witte pijl: wissel van strook. Bij een overweg betekent rood knipperen altijd stoppen.' },
],
tekens: [
  { h: 'Strepen', b: 'Over een doorgetrokken streep mag je niet heen. Over een onderbroken streep wel. Liggen er twee naast elkaar, dan geldt de streep aan jouw kant.' },
  { h: 'Geel langs de stoeprand', b: 'Gele doorgetrokken streep: niet stilstaan. Gele onderbroken streep: niet parkeren.' },
  { h: 'Vlakken en stroken', b: 'Over verdrijvingsvlakken rijd je niet. Een busstrook is alleen voor bussen. Op een fietsstrook mag je niet parkeren of stilstaan. Groen tussen de middenstrepen: maximaal 100 km/u.' },
],
gevaar: [
  { h: 'Drie keuzes', b: 'Bij gevaarherkenning kies je steeds uit: remmen, gas loslaten of niets doen. Je beslist op wat je ziet, bij de snelheid die erbij staat.' },
  { h: 'Remmen', b: 'Remmen kies je bij direct gevaar: je moet flink snelheid minderen of stoppen. Bijvoorbeeld een kind dat de weg op rent of een voorganger die vlak voor je remt.' },
  { h: 'Gas los of niets doen', b: 'Gas loslaten kies je als er iets kán gebeuren: spelende kinderen op de stoep, een bocht die je niet overziet. Niets doen kies je als er niets verandert en je alles overziet.' },
],
plaats: [
  { h: 'Rechts houden, links inhalen', b: 'Je rijdt zo veel mogelijk rechts en haalt links in. Na het inhalen ga je terug als je de ander in je binnenspiegel ziet.' },
  { h: 'Wanneer mag rechts voorbij?', b: 'Rechts voorbijgaan mag bij een voorganger die links heeft voorgesorteerd en richting aangeeft, bij een tram, en in de file als de linkerstrook langzamer rijdt.' },
  { h: 'Niet inhalen', b: 'Niet inhalen vlak voor of op een zebrapad en niet waar je het niet kunt overzien. Geef een fietser ongeveer anderhalve meter ruimte.' },
],
afslaan: [
  { h: 'Voorsorteren', b: 'Rechtsaf: zo veel mogelijk rechts. Linksaf: tegen de middenstreep. Geef op tijd richting aan, voordat je afremt.' },
  { h: 'Rotonde', b: 'Bij het verlaten geef je altijd richting aan naar rechts. Ga je driekwart rond, dan geef je bij het oprijden links aan. Fietsers die op de rotonde rechtdoor gaan, laat je voor als je afslaat.' },
  { h: 'Turborotonde', b: 'Je kiest vóór de rotonde je rijstrook met de pijlen en borden. Op de rotonde zelf wissel je niet meer van strook.' },
],
snelweg: [
  { h: 'Wat niet mag', b: 'Op de autosnelweg en autoweg mag je niet keren en niet achteruitrijden. Stoppen mag alleen in nood. De vluchtstrook is alleen voor noodgevallen.' },
  { h: 'Pech', b: 'Alarmlichten aan, zo ver mogelijk rechts stoppen, uitstappen aan de rechterkant en achter de vangrail wachten. Werken je alarmlichten niet, dan zet je de gevarendriehoek op ongeveer 30 meter.' },
  { h: 'Stroken', b: 'Houd rechts; links is om in te halen. Een spitsstrook gebruik je alleen als hij open is. Houdt een strook op, dan rits je aan het einde om en om.' },
],
parkeren: [
  { h: 'Stilstaan of parkeren', b: 'Stilstaan is kort stoppen om iemand direct te laten in- of uitstappen of om direct te laden en lossen. Alles wat langer duurt, is parkeren.' },
  { h: 'Afstanden', b: 'Niet parkeren binnen 5 meter van een kruispunt. Niet stilstaan op een zebrapad of binnen 5 meter ervan. Bij een bushalte zonder markering niet stilstaan binnen 12 meter van het bord.' },
  { h: 'Nooit doen', b: 'Niet stilstaan op een kruispunt, overweg, in een tunnel of op een fietsstrook. Niet parkeren voor een uitrit, dubbel, of op de stoep. In een parkeerschijfzone zet je de schijf op het eerstvolgende hele of halve uur.' },
],
verlichting: [
  { h: 'Dimlicht en groot licht', b: 'Dimlicht voer je in het donker en overdag bij slecht zicht. Groot licht mag niet overdag, niet bij tegenliggers en niet als je dicht achter een ander rijdt.' },
  { h: 'Mistlicht', b: 'Het mistachterlicht mag alleen bij mist of sneeuwval met minder dan 50 meter zicht, nooit bij regen. Mistlampen vóór mogen ook bij regen die het zicht ernstig belemmert.' },
  { h: 'Signalen', b: 'Claxon en lichtsignaal gebruik je alleen om gevaar te voorkomen. Richting aangeven doe je bij wegrijden, afslaan, inhalen en van strook wisselen. Alarmlichten zijn om te waarschuwen.' },
],
bijzonder: [
  { h: 'Overweg', b: 'Rood knipperen: stoppen, ook als de bomen nog open zijn. Wit knipperen: er komt geen trein. Rijd de overweg alleen op als je er meteen helemaal overheen kunt.' },
  { h: 'Tunnel', b: 'Dimlicht aan, zonnebril af, afstand houden. Niet keren, achteruitrijden of stilstaan. Bij brand: motor uit, sleutel in de auto laten en via de vluchtroute weg.' },
  { h: 'Erf', b: 'Op een erf rijd je stapvoets, mogen voetgangers de hele weg gebruiken en parkeer je alleen op de P-plekken. Bij het uitrijden via een uitrit gaat al het andere verkeer voor.' },
],
voertuig: [
  { h: 'Banden en keuring', b: 'Minimale profieldiepte: 1,6 mm. Te zachte banden kosten brandstof en grip. Een nieuwe benzineauto gaat na 4 jaar voor het eerst naar de APK.' },
  { h: 'Gordels en kinderen', b: 'Iedereen draagt een gordel. De bestuurder is verantwoordelijk voor passagiers jonger dan 12 jaar. Kinderen kleiner dan 1,35 meter zitten in een goedgekeurd zitje.' },
  { h: 'Aanhangwagen en lading', b: 'Met rijbewijs B mag een aanhangwagen tot 750 kg altijd; zwaarder mag zolang auto en aanhangwagen samen niet boven 3500 kg komen. Lading die meer dan 1 meter achter uitsteekt, markeer je met een rood-wit bord.' },
],
milieu: [
  { h: 'Het nieuwe rijden', b: 'Vroeg opschakelen, gelijkmatig rijden en ver vooruitkijken. Laat op tijd het gas los en rol in de versnelling uit: dan gebruikt de motor geen brandstof.' },
  { h: 'Kleine dingen', b: 'Banden op spanning, geen onnodig gewicht of dakkoffer, motor uit bij langer stilstaan en niet warmdraaien. Airco kost extra brandstof.' },
],
ongeval: [
  { h: 'De volgorde', b: 'Eerst je eigen veiligheid en de plek beveiligen (alarmlichten, hesje). Dan 112 bellen. Dan hulp verlenen. Doorrijden na een ongeval is strafbaar.' },
  { h: 'Eerste hulp', b: 'Verplaats een slachtoffer alleen bij direct gevaar. Bewusteloos maar ademend: stabiele zijligging. Hevige bloeding: stevig op de wond drukken. De helm van een motorrijder laat je op.' },
  { h: 'Na de klap', b: 'Bij alleen blikschade vul je samen het Europees schadeformulier in. Een WA-verzekering is verplicht. Bij rook onder de motorkap laat je de kap dicht.' },
],
rijbewijs: [
  { h: 'Rijbewijs B', b: 'Voor auto\'s tot 3500 kg met maximaal 8 passagiers. Zelfstandig rijden mag vanaf 18 jaar. Het rijbewijs is 10 jaar geldig en je moet het bij je hebben.' },
  { h: 'Beginnersrijbewijs', b: 'De eerste 5 jaar gelden strengere regels: een lagere alcohollimiet en een puntensysteem voor ernstige overtredingen.' },
  { h: 'Het theorie-examen', b: 'Drie onderdelen: gevaarherkenning, kennis en inzicht. Je moet voor alle drie de onderdelen slagen. Controleer de actuele aantallen vragen op de website van het CBR.' },
],
};

window.EXTRA = {
voorrang: [
  bucket('xv1', 'Gelijkwaardig kruispunt. Wie laat jij voorgaan?', ['Voor laten gaan', 'Jij gaat voor'],
    [['Een fietser van rechts', 0], ['Een auto van links', 1], ['Een tram van links', 0], ['Een ambulance met zwaailicht en sirene', 0], ['Een auto die een uitrit uit komt', 1]],
    'Bestuurders van rechts, trams en voorrangsvoertuigen gaan voor. Verkeer van links en verkeer uit een uitrit wacht op jou.'),
  match('xv2', 'Koppel elk bord aan zijn betekenis', [[S('B1'), 'Voorrangsweg'], [S('B6'), 'Voorrang verlenen'], [S('B7'), 'Stoppen en voorrang verlenen'], [S('B3'), 'Voorrangskruispunt']],
    'Deze vier borden regelen de voorrang. Het stopbord en het bord met de punt naar beneden herken je ook van achteren aan hun vorm.'),
  gap('xv3', 'Op een gelijkwaardig kruispunt gaan bestuurders van ___ voor.', ['rechts', 'links', 'achteren'], 'Rechts gaat voor, tenzij borden, tekens of lichten iets anders regelen.'),
  gap('xv4', 'Aanwijzingen van een agent gaan boven verkeerslichten, en verkeerslichten gaan boven ___.', ['borden', 'aanwijzingen', 'voorrangsvoertuigen'], 'De volgorde is: aanwijzingen, verkeerslichten, borden en tekens, algemene regels.'),
],
borden: [
  pick('xb1', 'Tik het bord "verbod stil te staan" aan', [['E2'], ['E1'], ['C1'], ['C2']], 'Het kruis betekent verbod stil te staan. Eén streep is een parkeerverbod.'),
  match('xb2', 'Koppel elk bord aan zijn betekenis', [[S('E1'), 'Parkeerverbod'], [S('C2'), 'Verboden in te rijden'], [S('G1'), 'Autosnelweg'], [S('L8'), 'Doodlopende weg']], 'Vier borden die je vaak tegenkomt.'),
  pick('xb3', 'Tik het bord "einde voorrangsweg" aan', [['B2'], ['B1'], ['B6'], ['F8']], 'Het gele ruitbord met een streep erdoor: einde voorrangsweg.'),
  match('xb4', 'Koppel elk bord aan zijn betekenis', [[S('F5'), 'Jij wacht op tegenliggers'], [S('F6'), 'Tegenliggers wachten op jou'], [S('D1'), 'Rotonde'], [S('G3'), 'Autoweg']], 'Bij de pijlenborden is de rode pijl de richting die moet wachten.'),
  pick('xb5', 'Tik de adviessnelheid aan', [['A4', '60'], ['A1', '60'], ['A2', '60']], 'Blauw en vierkant: adviessnelheid. Rode rand: maximumsnelheid. Grijs met strepen: einde maximumsnelheid.'),
],
snelheid: [
  match('xs1', 'Koppel de weg aan de maximumsnelheid', [['Binnen de bebouwde kom', '50 km/u'], ['Buiten de bebouwde kom', '80 km/u'], ['Autoweg', '100 km/u'], ['Erf', '15 km/u']], 'De basissnelheden, als er geen borden staan.'),
  gap('xs2', 'Stopafstand = reactieafstand + ___.', ['remweg', 'volgafstand', 'snelheid'], 'De stopafstand is wat je aflegt tijdens het reageren plus wat je nodig hebt om te remmen.'),
  match('xs3', 'Koppel het voertuig aan zijn maximumsnelheid', [['Bromfiets op de rijbaan', '45 km/u'], ['Snorfiets', '25 km/u'], ['Auto met aanhangwagen op de snelweg', '90 km/u'], ['Auto op de snelweg, hoogste limiet', '130 km/u']], 'Handig om te weten wat anderen maximaal mogen rijden.'),
  gap('xs4', 'Rijd je twee keer zo hard, dan wordt je remweg ongeveer ___ keer zo lang.', ['vier', 'twee', 'drie'], 'De remweg neemt kwadratisch toe met de snelheid.'),
],
begrippen: [
  bucket('xa1', 'Bestuurder of voetganger?', ['Bestuurder', 'Voetganger'], [['Fietser', 0], ['Iemand met de fiets aan de hand', 1], ['Ruiter te paard', 0], ['Skater', 1], ['Bromfietser', 0]],
    'Bestuurders zijn alle weggebruikers behalve voetgangers. Lopen met de fiets en skaten telt als voetganger.'),
  gap('xa2', 'Een rijbaan kan uit meerdere ___ bestaan.', ['rijstroken', 'bermen', 'fietspaden'], 'Rijstroken zijn de met strepen gemarkeerde delen van de rijbaan.'),
],
alcohol: [
  match('xd1', 'Koppel wat bij elkaar hoort', [['Beginnend bestuurder', '0,2 promille'], ['Ervaren bestuurder', '0,5 promille'], ['Rijbewijs gehaald op je 18e', '5 jaar beginner'], ['Rijbewijs gehaald op je 17e', '7 jaar beginner']], 'De limieten en hoe lang je als beginner telt.'),
  bucket('xd2', 'Word je hier sneller nuchter van?', ['Helpt', 'Helpt niet'], [['Koffie drinken', 1], ['Een koude douche', 1], ['Wachten', 0], ['Veel water drinken', 1], ['Frisse lucht', 1]],
    'Alleen tijd helpt. Je lever breekt alcohol af in een vast tempo.'),
],
lichten: [
  match('xl1', 'Koppel elk licht aan wat je doet', [[S('LICHT', 'geel'), 'Stoppen als dat nog veilig kan'], [S('KRUIS'), 'Deze rijstrook niet gebruiken'], [S('LICHT', 'knipper'), 'Opletten: de borden gelden'], [S('SCHUIN'), 'Van rijstrook wisselen']], 'Vier lichten die je moet kunnen lezen.'),
  gap('xl2', 'Bij een overweg betekent rood knipperen altijd ___.', ['stoppen', 'doorrijden', 'toeteren'], 'Ook als de slagbomen nog open zijn.'),
],
tekens: [
  pick('xm1', 'Jij bent de blauwe auto. Tik de streep aan waar je overheen mag', [['LIJN', 'jijonder'], ['LIJN', 'door'], ['LIJN', 'jijdoor']], 'De streep aan jouw kant telt. Is die onderbroken, dan mag je erover als het veilig kan.'),
  match('xm2', 'Koppel het teken aan de betekenis', [['Gele doorgetrokken streep', 'Niet stilstaan'], ['Gele onderbroken streep', 'Niet parkeren'], ['Haaientanden', 'Voorrang verlenen'], ['Groene middenstreep', 'Maximaal 100 km/u']], 'Tekens op de weg hebben dezelfde kracht als borden.'),
],
gevaar: [
  match('xg1', 'Koppel de situatie aan je reactie', [['Direct gevaar', 'Remmen'], ['Er kan iets gebeuren', 'Gas loslaten'], ['Niets aan de hand', 'Niets doen']], 'Zo werkt gevaarherkenning: hoe groter en dichterbij het gevaar, hoe steviger je reactie.'),
  bucket('xg2', 'Remmen of gas loslaten?', ['Remmen', 'Gas loslaten'], [['Een kind rent de weg op', 0], ['Kinderen spelen op de stoep', 1], ['Je voorganger remt vlak voor je', 0], ['Een bocht die je niet kunt overzien', 1], ['Vlak voor je zwaait een portier open', 0]],
    'Remmen bij direct gevaar, gas los als er iets kán gebeuren.'),
],
plaats: [
  bucket('xp1', 'Mag je hier rechts voorbijgaan?', MAG, [['Je voorganger sorteert links voor en geeft links aan', 0], ['File: de linkerstrook rijdt langzamer', 0], ['Een langzame auto op een gewone weg', 1], ['Een tram', 0], ['Rijdend verkeer op de snelweg, geen file', 1]],
    'Rechts voorbij mag bij een linksaf-voorsorteerder, een tram en in de file. Verder haal je links in.'),
  seq('xp2', 'Je gaat inhalen. Tik de stappen aan in de goede volgorde', ['In je spiegels kijken', 'Richting aangeven', 'Over je schouder kijken', 'Naar links gaan'],
    'Eerst kijken, dan aangeven, vlak voor het uitwijken nog over je schouder kijken voor de dode hoek.'),
],
afslaan: [
  match('xr1', 'Koppel wat bij elkaar hoort', [['Rechtsaf', 'Zo veel mogelijk rechts voorsorteren'], ['Linksaf', 'Tegen de middenstreep voorsorteren'], ['Rotonde verlaten', 'Richting aangeven naar rechts'], ['Keren', 'Al het verkeer voor laten gaan']], 'Voorsorteren en richting aangeven maken duidelijk wat je gaat doen.'),
  gap('xr2', 'Wie afslaat, laat verkeer voorgaan dat op dezelfde weg ___ gaat.', ['rechtdoor', 'linksaf', 'achteruit'], 'Rechtdoor op dezelfde weg gaat voor, ook de fietser naast je.'),
],
snelweg: [
  bucket('xh1', 'Mag dit op de autosnelweg?', MAG, [['Keren', 1], ['Op de vluchtstrook stoppen bij pech', 0], ['Op de vluchtstrook stoppen om te bellen', 1], ['In de file de linkerstrook rechts voorbijrijden', 0], ['Een stukje achteruit naar de gemiste afrit', 1]],
    'De vluchtstrook is alleen voor nood. Keren en achteruitrijden mag nooit.'),
  seq('xh2', 'Je krijgt pech op de snelweg. Tik de stappen aan in de goede volgorde', ['Alarmlichten aan', 'Zo ver mogelijk rechts stoppen', 'Aan de rechterkant uitstappen', 'Achter de vangrail wachten'],
    'Waarschuw eerst het verkeer, zet de auto veilig weg en breng dan jezelf in veiligheid.'),
],
parkeren: [
  match('xk1', 'Koppel de plek aan de regel', [['Kruispunt', 'Niet parkeren binnen 5 meter'], ['Zebrapad', 'Niet stilstaan binnen 5 meter'], ['Bushalte zonder markering', 'Niet stilstaan binnen 12 meter'], ['Tunnel', 'Nooit stilstaan']], 'De afstanden die je moet kennen.'),
  bucket('xk2', 'Stilstaan of parkeren?', ['Stilstaan', 'Parkeren'], [['Iemand direct laten uitstappen', 0], ['Even koffie halen', 1], ['Direct een kast uitladen', 0], ['In de auto op een vriend wachten', 1]],
    'Alles wat langer duurt dan direct in- of uitstappen of laden en lossen, is parkeren. Ook als je in de auto blijft zitten.'),
],
verlichting: [
  bucket('xq1', 'Mag het mistachterlicht aan?', MAG, [['Mist, 30 meter zicht', 0], ['Zware regen', 1], ['Sneeuwval, 40 meter zicht', 0], ['Mist, 150 meter zicht', 1], ['Een heldere, donkere nacht', 1]],
    'Alleen bij mist of sneeuwval met minder dan 50 meter zicht. Bij regen nooit.'),
  gap('xq2', 'Je claxon gebruik je alleen bij dreigend ___.', ['gevaar', 'oponthoud', 'ongeduld'], 'Geluids- en lichtsignalen zijn er alleen om gevaar te voorkomen.'),
],
bijzonder: [
  match('xo1', 'Koppel wat bij elkaar hoort', [['Wit knipperlicht bij de overweg', 'Er komt geen trein'], ['Rood knipperlicht bij de overweg', 'Stoppen'], ['Tunnel inrijden', 'Dimlicht aan'], ['Erf', 'Stapvoets rijden']], 'Bijzondere plekken hebben eigen regels.'),
  gap('xo2', 'Bij brand in een tunnel zet je de motor uit en laat je de sleutel ___.', ['in de auto', 'thuis', 'bij de uitgang'], 'Zo kunnen hulpdiensten je auto verplaatsen.'),
],
voertuig: [
  match('xt1', 'Koppel het getal aan de regel', [['Minimale profieldiepte', '1,6 mm'], ['Kinderzitje verplicht tot', '1,35 meter'], ['Eerste APK van een benzineauto', 'Na 4 jaar'], ['Aanhangwagen die altijd mag', 'Tot 750 kg']], 'Vier getallen die vaak terugkomen.'),
  gap('xt2', 'De bestuurder is verantwoordelijk voor de gordel van passagiers jonger dan ___ jaar.', ['12', '16', '18'], 'Vanaf 12 jaar is een passagier zelf verantwoordelijk.'),
],
milieu: [
  bucket('xe1', 'Zuinig of niet zuinig?', ['Zuinig', 'Niet zuinig'], [['Vroeg opschakelen', 0], ['De motor stilstaand warm laten draaien', 1], ['Uitrollen in de versnelling', 0], ['Rijden met een lege dakkoffer', 1], ['Banden op de juiste spanning', 0]],
    'Het nieuwe rijden: vroeg schakelen, vooruitkijken en geen onnodige weerstand of gewicht.'),
],
ongeval: [
  seq('xu1', 'Je komt als eerste bij een ongeval. Tik de stappen aan in de goede volgorde', ['Zorgen voor je eigen veiligheid', 'De plek beveiligen', '112 bellen', 'Eerste hulp verlenen'],
    'Eerst veiligheid, dan alarm slaan, dan helpen.'),
  bucket('xu2', 'Doen of niet doen bij een ongeval?', ['Doen', 'Niet doen'], [['Alarmlichten aanzetten', 0], ['Een slachtoffer zonder noodzaak verplaatsen', 1], ['De helm van een motorrijder afdoen', 1], ['Op een hevige bloeding drukken', 0], ['Doorrijden', 1]],
    'Verplaats slachtoffers alleen bij direct gevaar en laat een helm op, tenzij het slachtoffer niet kan ademen.'),
],
rijbewijs: [
  match('xw1', 'Koppel wat bij elkaar hoort', [['Geldigheid rijbewijs B', '10 jaar'], ['Maximaal aantal passagiers', '8 personen'], ['Maximale massa van de auto', '3500 kg'], ['Zelfstandig rijden vanaf', '18 jaar']], 'De kerngetallen van rijbewijs B.'),
  gap('xw2', 'Het theorie-examen bestaat uit gevaarherkenning, kennis en ___.', ['inzicht', 'rijvaardigheid', 'voorrang'], 'Je moet voor alle drie de onderdelen slagen.'),
],
};
})();
