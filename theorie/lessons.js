// Theorie-trainer — lesopbouw: welke vragen bij welk theoriekaartje horen.
// Een les laat eerst de kaartjes zien en vraagt daarna alleen over die stof.
// PLAN[thema][i] = ids van de vragen bij THEORY[thema][i]. ADD vult een kaartje aan, NEW voegt kaartjes toe.
(() => {
const T = window.THEORY;
const ADD = {
  voorrang: { 3: ' Het driehoekige bord met de dikke pijl en de dunne dwarsstreep (voorrangskruispunt) betekent: bij het volgende kruispunt heb jij voorrang. Voorrang verlenen wil zeggen dat de ander ongehinderd kan doorrijden.' },
  borden: { 2: ' Een blauw bord met een witte pijl opzij is een eenrichtingsweg. Een rond bord met een getal en driehoekjes erboven en eronder: voertuigen die hoger zijn mogen er niet door.',
            3: ' Een parkeerverbod geldt aan de kant waar het bord staat, tot het volgende kruispunt. De blauwe P betekent parkeergelegenheid.',
            4: ' Het witte bord met alleen schuine strepen betekent: einde van alle verboden die met borden waren aangegeven.',
            5: ' Het ronde blauwe bord met een fiets is een verplicht fietspad; daar rijd en parkeer je niet met de auto. Het plaatsnaambord met een rode streep erdoor is het einde van de bebouwde kom.' },
  snelheid: { 0: ' Het plaatsnaambord is het begin van de bebouwde kom. Een blauw vierkant bord met een getal is een adviessnelheid en dus niet verplicht. Na het bord "einde maximumsnelheid" geldt weer de gewone limiet van die weg.',
              5: ' Onnodig langzaam rijden mag ook niet als je daarmee anderen hindert. Verlaat je de snelweg, dan rem je pas af op de uitrijstrook; op de invoegstrook maak je juist snelheid.' },
  begrippen: { 0: ' Een bromfiets en een snorfiets tellen in de regels niet als motorvoertuig.',
               2: ' Defensief rijden is rekening houden met fouten van anderen. Sociaal rijden is een ander de ruimte geven, ook als je voor mag.',
               3: ' Een voorrangsvoertuig herken je aan blauw zwaailicht én sirene samen.' },
  alcohol: { 1: ' Alcohol maakt je reactie trager en je overschat jezelf. Heb je gedronken, laat dan de auto staan.',
             2: ' Een blaastest mag je niet weigeren. Jij blijft als bestuurder verantwoordelijk, ook als een passagier je hindert.' },
  lichten: { 0: ' Je stopt voor de stopstreep. Een groene pijl geldt alleen voor die richting. Een agent die je doorwenkt gaat boven het rode licht, en voor een voorrangsvoertuig maak je ruimte, desnoods voorzichtig een stukje door rood.' },
  tekens: { 2: ' Blokmarkering (korte, brede blokken) scheidt een in- of uitvoegstrook van de doorgaande rijbaan. Sta je in een voorsorteervak, dan volg je de pijl. Haaientanden betekenen: voorrang verlenen.' },
  plaats: { 0: ' Laat je inhalen: houd rechts en versnel niet. Kijk voor je naar links gaat in je spiegels, geef richting aan en kijk over je schouder. Met de auto rijd je niet over het fietspad. Blijf uit de buurt van de achterkant van een vrachtauto: je ziet weinig en de chauffeur ziet jou niet.',
            1: ' Staat een tram bij een halte zonder vluchtheuvel, dan stop je om de passagiers te laten uitstappen.',
            2: ' Staat er aan jouw kant een hindernis op een smalle weg, dan laat jij de tegenligger eerst voorbij.' },
  afslaan: { 0: ' Slaan jij en je tegenligger allebei linksaf, dan ga je meestal voor elkaar langs. Verkeer dat naast of rechts achter je rechtdoor gaat, laat je voor. Keren is een bijzondere manoeuvre: al het andere verkeer gaat voor.',
             1: ' Staan er haaientanden voor de rotonde, dan gaat het verkeer op de rotonde voor. Ga je meteen de eerste afslag uit, dan geef je bij het oprijden al rechts aan.' },
  snelweg: { 1: ' Op de hectometerpaaltjes staat waar je bent; dat geef je door aan de hulpdienst.',
             2: ' Nader je een file, zet dan je alarmlichten aan om achterliggers te waarschuwen. In de file mag je de linkerstrook rechts voorbijrijden. In een weefvak kruisen invoegers en uitvoegers elkaar: geef elkaar de ruimte.' },
  parkeren: { 2: ' Een gehandicaptenparkeerplaats is alleen voor wie daar recht op heeft, hoe kort je ook wegblijft.' },
  verlichting: { 0: ' Alleen stadslicht is in het donker niet genoeg. Overdag bij goed zicht mag je met dagrijverlichting rijden. Word je verblind, kijk dan naar de rechterkant van de weg en minder vaart. Sta je in het donker buiten de bebouwde kom op de rijbaan, dan voer je stadslicht of parkeerlicht. Jij bent er zelf verantwoordelijk voor dat je lampen werken.' },
  bijzonder: { 0: ' Het Andreaskruis staat bij de overweg: treinen gaan voor. Valt je auto stil op het spoor, breng dan eerst iedereen in veiligheid en sla daarna alarm.',
               1: ' Bij file in de tunnel zet je je alarmlichten aan en houd je afstand.',
               2: ' Staat er bij een zebrapad een auto stil op de strook naast je, rijd die dan niet zomaar voorbij: er kan een voetganger oversteken.' },
  voertuig: { 1: ' Zet je een babyzitje achterstevoren op de voorstoel, schakel dan de airbag uit. De bovenkant van je hoofdsteun hoort op gelijke hoogte met de bovenkant van je hoofd.',
              2: ' Een aanhangwagen tot 750 kg heeft een witte plaat met het kenteken van de auto. Is hij breder dan de auto, dan heb je verbrede spiegels nodig.' },
  milieu: { 0: ' Een koude motor verbruikt en vervuilt extra: korte ritten zijn dus ongunstig.',
            1: ' Afgewerkte olie en oude accu\'s lever je in bij de garage of het afvalpunt.' },
  ongeval: { 0: ' Iedereen is verplicht naar vermogen te helpen. Trek op de snelweg een veiligheidshesje aan als je uitstapt.' },
  rijbewijs: { 0: ' Met een verlopen rijbewijs mag je niet rijden.',
               1: ' Bij zware overtredingen kan de politie je rijbewijs direct innemen.' },
};
const NEW = {
  voorrang: [{ h: 'Kruispunt vrijhouden', b: 'Je mag een kruispunt niet blokkeren: rijd het alleen op als je er helemaal overheen kunt, ook bij groen licht. Een uitvaartstoet of militaire kolonne mag je niet doorsnijden. Een rotonde zonder borden of haaientanden is een gelijkwaardig kruispunt: daar gaat rechts voor.' }],
  borden: [
    { h: 'Voorrangsborden', b: 'Het gele ruitbord: je rijdt op een voorrangsweg. Met een zwarte streep erdoor: einde voorrangsweg. De driehoek met de punt naar beneden hoort bij haaientanden: voorrang verlenen. Het achthoekige stopbord: altijd helemaal stilstaan. Op de rijbaan van een voorrangsweg buiten de bebouwde kom mag je niet parkeren.' },
    { h: 'Gebodsborden en doodlopend', b: 'Ronde blauwe borden met een witte pijl schrijven een richting voor: rechtdoor, of aan welke kant je een obstakel voorbijgaat. Drie pijlen in een cirkel: rotonde. Een blauw bord met een rode dwarsbalk bovenaan betekent doodlopende weg.' },
    { h: 'Waarschuwingsborden', b: 'In de rode driehoek zie je welk gevaar eraan komt: verkeerslichten, tegenliggers, een versmalling, een drempel of een bocht. Je past je snelheid aan voordat je er bent.' },
  ],
  snelweg: [{ h: 'Autoweg', b: 'Een autoweg lijkt op een snelweg, maar kan tegenliggers en kruispunten met verkeerslichten hebben. Je mag er alleen op met een voertuig dat minstens 50 km/u kan en mag rijden. Na lang hard rijden voelt 50 km/u langzaam: kijk op je snelheidsmeter als je de bebouwde kom inrijdt.' }],
  parkeren: [{ h: 'Erf, helling en uitstappen', b: 'Op een erf parkeer je alleen op plekken met een P. Op een helling zet je de auto ook in de versnelling of in P en draai je de wielen zo dat hij niet de weg op kan rollen. Kijk voor je uitstapt in je spiegel en over je schouder of er een fietser aankomt.' }],
  voertuig: [{ h: 'Techniek en controle', b: 'ABS voorkomt dat je wielen blokkeren, zodat je tijdens hard remmen kunt blijven sturen. Bij aquaplaning laat je het gas los en houd je het stuur recht. Een rood waarschuwingslampje betekent: zo snel mogelijk veilig stoppen. Controleer voor een lange rit je banden, verlichting, olie, koelvloeistof en ruitensproeiervloeistof.' }],
  rijbewijs: [{ h: 'Kenteken en verkoop', b: 'Een personenauto heeft voor en achter een gele kentekenplaat met zwarte tekens, die altijd goed leesbaar moet zijn. Verkoop je je auto, dan krijg je een vrijwaringsbewijs: het bewijs dat hij niet meer op jouw naam staat.' }],
};
T.complex = [
  { h: 'Stap voor stap', b: 'In een drukke situatie loop je steeds hetzelfde rijtje af. 1: geeft iemand een aanwijzing of komt er een voorrangsvoertuig aan? 2: werken de verkeerslichten? 3: staan er borden of haaientanden? 4: doe ik een bijzondere manoeuvre of kom ik van een onverharde weg of uitrit? Pas als dat allemaal niet speelt, gaat rechts voor.' },
  { h: 'Meer dan één bord', b: 'Staan er twee borden, dan gelden ze allebei. Een bord met een lagere maximumsnelheid gaat boven de algemene limiet van de weg; een adviessnelheid niet. Sommige regels hangen aan je voertuig, zoals 90 km/u met een aanhangwagen, en blijven gelden wat het bord ook zegt.' },
  { h: 'Meer weggebruikers tegelijk', b: 'Bekijk iedere weggebruiker apart: wie moet op wie wachten? Wie op niemand hoeft te wachten, gaat eerst. Wie afslaat, laat iedereen voorgaan die op dezelfde weg rechtdoor gaat: tegenliggers, de fietser naast je en voetgangers. Een tram is de uitzondering: die gaat op een gelijkwaardig kruispunt voor, ook als hij afslaat.' },
];
for (const [t, o] of Object.entries(ADD)) for (const [i, txt] of Object.entries(o)) T[t][i].b += txt;
for (const [t, cards] of Object.entries(NEW)) T[t].push(...cards);

// Thema's waarbij elke les dezelfde kaartjes herhaalt (de vragen lopen door elkaar).
window.RECAP = { gevaar: [0, 1, 2] };
const P = s => s.split(' ');
window.PLAN = {
  voorrang: [P('v1 v2 v3 xv3 v4 v30 v31'), P('v5 v6 v32'), P('v7 v8 v9 v10'), P('v12 v11 v13 v14 v34 v33 xv2'), P('v15 v16 v17 xv4'), P('v19 v20 v21'), P('v18 v22 v23 v24 v25 v26 xv1'), P('v28 v27 v29')],
  borden: [P('b38 b39 b40'), P('b5 b6 b7 xb5'), P('b8 b9 b10 b11 b36'), P('b12 b13 b14 b15 xb1 b42 b16'), P('b17 b18 b18b b19 b20 b37'), P('b21 b22 b23 b28 b29'),
           P('b1 b2 xb3 b3 b4 b41'), P('b24 b25 b26 b27 xb2 xb4'), P('b30 b31 b32 b33 b34')],
  snelheid: [P('s1 s2 s3 s4 s5 s11 s12 s13 s31'), P('s6 s21 xs1'), P('s7 s8 s36 s24 s25 s26 xs3'), P('s9 s10'), P('s14 s15 s16 s17 xs2 xs4'), P('s18 s19 s22 s23 s29 s33 s34')],
  begrippen: [P('a1 a2 a6 xa1'), P('a3 a4 a14 xa2'), P('a7 a8 a11 a12 a13'), P('a9 a10 a5')],
  alcohol: [P('d1 d2 d3 d4 xd1'), P('d5 d6 d7 xd2 d13'), P('d8 d9 d10 d11 d12')],
  lichten: [P('l1 l3 l10 l11 l5 l8 l12'), P('l2 l4'), P('l6 l7 l9 xl1 xl2')],
  tekens: [P('m1 m2 m3 m4 xm1'), P('m6 m7'), P('m8 m9 m10 m11 m5 m12 m13 m14 xm2')],
  gevaar: [P('xg1'), [], P('g1 g2 g3 g4 g8 g7 g5 xg2 g6 g13 g9 g10 g11 g12 g14 g15 g16 g17 g18 g22 g19 g20 g21 g23 g24 g27 g25 g26 g28 g29 g30')],
  plaats: [P('p1 p2 p6 p7 p8 xp2 p11 p14'), P('p3 p4 p12 xp1'), P('p5 p9 p13 p10')],
  afslaan: [P('r1 r2 r3 r4 r11 xr2 r12'), P('r5 r6 r7 r8 r9 xr1'), P('r10')],
  snelweg: [P('h1 h2 h8'), P('h3 h4 h5 h12 xh2'), P('h7 h6 h11 h9 h10 xh1'), P('h13 h14 h15')],
  parkeren: [P('k1 xk2'), P('k2 k3 k4'), P('k5 k6 k7 k8 k10 k9 k13 xk1'), P('k11 k14 k12')],
  verlichting: [P('q1 q2 q9 q13 q11 q10 q12'), P('q3 q4 q5 xq1'), P('q6 q7 q8 xq2')],
  bijzonder: [P('o1 o2 o3 o11 o4'), P('o5 o7 o6 xo2 o12'), P('o8 o9 o10 xo1')],
  voertuig: [P('t1 t2 t8'), P('t3 t4 xt2 t5 t6 t7'), P('t10 t11 t12 t9 xt1'), P('t14 t13 t15 t16')],
  milieu: [P('e1 e2 e6 e7'), P('e3 e8 e4 e5 e9 xe1 e10')],
  ongeval: [P('u2 u3 xu1 u1 u8 u12'), P('u4 u5 u6 u7 xu2'), P('u9 u11 u10')],
  complex: [P('c8 c9 c24 c2 c11 c32 c33'), P('c1 c19 c17 c18 c16 c6 c20 c21'), P('c3 c14 c23 c10 c22 c4 c5 c27')],
  rijbewijs: [P('w1 w2 w3 w4 xw1 w5 w6'), P('w9 w12'), P('w10 xw2'), P('w8 w11 w7')],
};
})();
