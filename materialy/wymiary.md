# Mieszkanie 12 (Skypoint 57) – wysokość pomieszczeń 270 cm

Plik opisuje dwa warianty w jednym układzie współrzędnych:
- **stan deweloperski** (sekcje Hol, Łazienka, Pokój dzienny, Balkon) – do trybu surowego,
- **po przebudowie** (sekcja na końcu) – nowa ścianka i sypialnia, do dwóch wykończeń.
W spacerze: tryb surowy pokazuje stan deweloperski z przełącznikiem „pokaż nową ściankę”, wykończenia zawsze pokazują wariant po przebudowie.

## Źródła (w kolejności ważności)
1. **Ten plik** – źródło prawdy dla modelu.
2. **Rzut wykonawczy A.03, skala 1:50, 28.12.2024** (`rzuty/A.03 RZUT 1 PIE╠ĘTRA (1).pdf`, 1,4 MB) – wszystkie wymiary poniżej pochodzą z niego.
3. Rzut budowlany A.03, skala 1:100, 12.09.2023, poprawki 5.12.2023 (`rzuty/A.03 RZUT 1 PIĘTRA (1).pdf`, 0,7 MB) – starszy, bez wymiarów głębokości; tylko do porównania.
4. Karta sprzedażowa – dotyczy sąsiedniego lokalu **M13** (ten sam układ), tylko jako odniesienie.
5. Koncept „Propozycja aranżacji M12” (`rzuty/F7BFDAF7-….png`) – rysunek poglądowy, nie w skali, obrócony o 180°.

Projektował: mgr inż. arch. Piotr Zwoliński (studio autorskie PUCH).
Powierzchnia użytkowa: 30,12 m² (hol 3,51 + pokój dzienny 23,47 + łazienka 3,14) + balkon 5,76 m².
Kontrola: 539 × 579,5 minus łazienka z ściankami, hol, ścianka kuchni i szacht kuchenny daje 23,50 m² pokoju (rzut: 23,47); łazienka 150 × 222 minus szacht 30 × 60 = 3,15 m² (rzut: 3,14).

## Jak czytać kierunki
Patrzymy na rzut tak, jak jest narysowany:
- **ściana wejściowa** – od korytarza klatki (góra rzutu),
- **ściana balkonowa** – zewnętrzna, z drzwiami na balkon (dół rzutu),
- **ściana lewa** – do sąsiedniego mieszkania M11, po stronie łazienki,
- **ściana prawa** – do sąsiedniego mieszkania M13, po stronie kuchni.

Wymiary wewnętrzne w cm, w świetle tynku.

## Układ współrzędnych (do modelu 3D)
- Początek (0, 0): wewnętrzny narożnik ściany wejściowej i ściany lewej (w łazience, za szachtem).
- Oś X: w prawo, wzdłuż ściany wejściowej (0 → 539).
- Oś Y: w głąb, w stronę balkonu (0 → 579,5).
- Wszystkie współrzędne niżej to lica ścian (powierzchnia tynku), w cm.

## Orientacja
**Balkon i drzwi balkonowe wychodzą na południe** (decyzja właściciela, 25.10.2026; koncept rysuje północ w stronę balkonu – nie przenosić). Kierunek +Y = południe, −Y = północ, +X = zachód, −X = wschód.

## Układ ogólny
- Szerokość mieszkania w świetle: **539**.
- Głębokość w świetle: **579,5** (lewa strona: łazienka 222 + ścianka 10 + 347,5; prawa strona: 185 + 394; karta M13: 579).
- Wysokość: **270** we wszystkich trybach (bez różnicowania grubości warstw podłogi).
- Pas od strony wejścia, od lewej: szacht 22 + ścianka 8 | łazienka 120 | ścianka 10 | hol 190 (80 + drzwi 105 + 5) | ścianka 8 | kuchnia 121 | ścianka szachtu 8 | szacht 52 = 539.
- Ściany do sąsiadów i od korytarza: 21 (tynk 1,5 + mur 18 + tynk 1,5), EI 30 / R 30.
- Ściana balkonowa (zewnętrzna): 39,5 z ociepleniem.
- W narożnikach przy ścianie wejściowej i balkonowej są słupy żelbetowe w obrysie ścian – od środka niewidoczne (otynkowane), lico jak ściana.

## Szachty instalacyjne
- **Szacht łazienkowy**: X 0–30, Y 0–60 (wnętrze 22 × 52 + ścianki 8). Piony: WŁ ø125, pPK, PK.
- **Szacht kuchenny**: X 479–539, Y 0–60 (wnętrze 52 × 52 + ścianki 8). Piony: OK ø200, PK, WK ø125.
- Oba do sufitu, otynkowane.

## Hol (12M01) – 3,51 m²
Wymiary: 190 × 185 (X 160–350, Y 0–185). Od strony salonu hol jest otwarty (bez ściany).
Ściany zgodnie z ruchem wskazówek zegara, od drzwi wejściowych:
- Ś1 ściana wejściowa: 190 – 80 od ścianki łazienki otwór drzwi wejściowych **105 × 210** (X 240–345), potem 5 do ścianki kuchni. Drzwi EI 30, skrzydło otwiera się do środka, zawiasy po stronie kuchni (X 345).
- Ś2 ścianka od kuchni (gr. 8, X 350–358): 185 – pełna.
- Ś3 strona salonu: 190 – **otwarta, bez ściany**.
- Ś4 ścianka od łazienki (gr. 10, X 150–160): 50 od ściany wejściowej otwór drzwi do łazienki **90 × 207** (Y 50–140), potem 91,5 do końca ścianki (Y 231,5 ≈ 232). Drzwi otwierają się na hol, zawiasy od strony ściany wejściowej (Y 50).
Uwagi: prostokąt ok. 70 × 50 w narożniku przy ścianie wejściowej i łazience jest tylko na starszym rzucie budowlanym; na wykonawczym go nie ma – **nie modelujemy**. Szafy w holu na razie nie ma.

## Łazienka (12M03) – 3,14 m²
Wymiary: 150 × 222 (X 0–150, Y 0–222), w narożniku szacht 30 × 60.
Ściany zgodnie z ruchem wskazówek zegara, od drzwi:
- Ś1 ścianka od holu (gr. 10): 222 – 50 od ściany wejściowej drzwi **90 × 207**, 82 do ścianki od salonu.
- Ś2 ścianka od salonu (gr. 10, Y 222–232): 150 – pełna.
- Ś3 ściana lewa: 222 – od Y 60 do 222 (162), wyżej szacht.
- Ś4 ściana wejściowa: od X 30 do 150 (120), lewiej szacht.
- Szacht: lica X 30 (Y 0–60) i Y 60 (X 0–30).
Wyposażenie (rzut + decyzja): przy ścianie wejściowej pralka 60 × 52 (X ok. 32–92) i umywalka (X ok. 92–150); WC przy ścianie lewej (oś ok. Y 100); **prysznic walk-in 90 × 80 z czarnym profilem** w narożniku przy ścianie lewej i od salonu (X 0–90, Y 142–222). Bez wanny i bez suszarki. Okno: brak.

## Pokój dzienny z aneksem (12M02) – 23,47 m²
Kształt: prostokąt 539 × 579,5 bez łazienki, holu i szachtu kuchennego, czyli litera L. Od strony salonu łazienka wystaje 47 cm dalej niż hol (Y 232 wobec 185).
Ściany zgodnie z ruchem wskazówek zegara, od przejścia z holu:
- Ś1 ścianka hol/kuchnia, od strony kuchni (gr. 8, lico X 358): 185 – pełna.
- Ś2 ściana wejściowa, odcinek kuchni: X 358–479 (121) – pełna; dalej lico szachtu X 479 (Y 0–60) i Y 60 (X 479–539).
- Ś3 ściana prawa: Y 60–579,5 (519,5) – pełna.
- Ś4 ściana balkonowa: 539 – 69,5 | **drzwi balkonowe 180 × 235** | filar 40 | **drzwi balkonowe 180 × 235** | 69,5. Przeszklenia od podłogi, światło przeszklenia 177.
- Ś5 ściana lewa: Y 232–579,5 (347,5) – pełna.
- Ś6 ścianka łazienki od strony salonu: 160 (łazienka 150 + ścianka 10) – pełna.
- Ś7 uskok, bok ścianki łazienki: X 160, Y 185–232 (47) – pełna.
- Ś8 przejście do holu: 190 – **otwarte, bez ściany**.
Aneks kuchenny wg rzutu (głębokość blatu 60, układ L wokół szachtu):
- przy ścianie wejściowej, od ścianki holu: lodówka 60 (X 358–418) | płyta z piekarnikiem 61 (X 418–479),
- przy ścianie prawej: blat X 479–539, Y 60–185, zlew ok. Y 75–135.

## Drzwi balkonowe
- Lewe: X 69,5–249,5, prawe: X 289,5–469,5; wys. 235, nadproże do sufitu 35.
- Każde drzwi: jedno skrzydło otwierane (rozwierne do środka) przy zewnętrznym ościeżu, część przy filarze stała. Lewe drzwi: skrzydło X 69,5–159,5, zawiasy X 69,5. Prawe drzwi: skrzydło X 379,5–469,5, zawiasy X 469,5.
- Okna z nawiewnikami okiennymi (nota na rzucie budowlanym).

## Grzejniki
- Po jednym grzejniku przy każdych drzwiach balkonowych. Drzwi sięgają podłogi, więc grzejnik stoi na filarku 69,5 obok skrzydła otwieranego: lewy X ok. 5–65, prawy X ok. 474–534, przy ścianie balkonowej; panel ok. 60 × 60, gr. ok. 10, 15 cm nad podłogą.
- Na ścianie lewej grzejnika nie ma (element z rzutu budowlanego nie występuje na wykonawczym).

## Balkon (12M04) – 5,76 m²
Wymiary: **400 × 144**, wyśrodkowany na ścianie balkonowej (X 69,5–469,5), od lica zewnętrznego ściany (Y 619) do Y 763. Balustrada B1, cofnięta 6,5 od krawędzi płyty. Wyjście przez obie pary drzwi.

## Elektryka – orientacyjna
Brak rzutu instalacji elektrycznej. W modelu przyjmujemy typowy układ i oznaczamy go w danych jako `orientacyjny`:
- gniazdka 30 cm nad podłogą, włączniki 110 cm, przy drzwiach od strony klamki, ok. 15 cm od ościeża,
- kuchnia: gniazdka 110 cm nad podłogą nad blatem (2 × podwójne) + gniazdka dla lodówki, płyty i zmywarki,
- łazienka: gniazdko przy umywalce (120 cm) i dla pralki, wypust oświetlenia nad lustrem,
- wypusty sufitowe na środku każdego pomieszczenia, domofon przy drzwiach wejściowych (150 cm), skrzynka rozdzielcza w holu.

## Współrzędne stanu deweloperskiego (skrót)
- Szacht łazienkowy: X 0–30, Y 0–60.
- Łazienka: X 0–150, Y 0–222; ścianka od holu X 150–160 (Y 0–232); ścianka od salonu Y 222–232 (X 0–160).
- Hol: X 160–350, Y 0–185; od Y 185 otwarty na pokój dzienny.
- Ścianka hol/kuchnia: X 350–358, Y 0–185.
- Szacht kuchenny: X 479–539, Y 0–60.
- Kuchnia: X 358–479 przy ścianie wejściowej (Y 0–60) i X 479–539 przy ścianie prawej (Y 60–185).
- Drzwi wejściowe: ściana Y 0, X 240–345, wys. 210.
- Drzwi do łazienki: ścianka X 150–160, Y 50–140, wys. 207.
- Drzwi balkonowe: ściana Y 579,5, X 69,5–249,5 oraz X 289,5–469,5, wys. 235.
- Filar między drzwiami: X 249,5–289,5.
- Balkon: X 69,5–469,5, Y 619–763.

## Po przebudowie – nowa ścianka i sypialnia
Źródło: koncept „Propozycja aranżacji M12” (sypialnia na koncepcie po prawej = tutaj po lewej, po stronie łazienki). Położenie ścianki przeliczone na wymiary z rzutu wykonawczego.

**Ścianka sypialni (wzdłuż, prostopadła do balkonu)**
- Grubość 10 (płyta g-k na profilu CW75 lub bloczek 10 cm), wysokość do sufitu 270.
- Oś na środku filara między drzwiami balkonowymi: X 264,5–274,5.
- Od ściany balkonowej (Y 579,5) do Y 222 (linia lica ścianki łazienki od strony łazienki, styk ze ścianką poprzeczną), długość 357,5.
- Każde drzwi balkonowe zachowuje 15 cm ościeża od nowej ścianki.

**Ścianka z drzwiami (poprzeczna, od strony holu)**
- Przedłużenie ścianki łazienki od salonu: Y 222–232, X 160–264,5, gr. 10, długość 104,5.
- Otwór drzwiowy 90 × 207 (skrzydło 80): X 167–257, po ok. 7 cm muru z obu stron.
- Drzwi otwierają się do sypialni, zawiasy przy nowej ściance (X 257), otwarte skrzydło przylega do ścianki.
- Dojście z holu: hol (Y 0–185) przechodzi w przedsionek X 160–264,5, Y 185–222, na końcu drzwi sypialni.

**Sypialnia (nowa)**
- Wnętrze: X 0–264,5, Y 232–579,5 → **264,5 × 347,5 = 9,19 m²**.
- Okno/wyjście: drzwi balkonowe X 69,5–249,5 (180 × 235), skrzydło otwierane X 69,5–159,5 zamiata Y ok. 489,5–579,5.
- Ściany zgodnie z ruchem wskazówek zegara, od drzwi: Ś1 od holu 264,5 (w tym 104,5 nowej ścianki z drzwiami i 160 ścianki łazienki) | Ś2 nowa ścianka 347,5 – pełna | Ś3 ściana balkonowa 264,5: 69,5 (grzejnik) | drzwi balkonowe 180 | 15 | Ś4 ściana lewa 347,5 – pełna.
- Łóżko zagłówkiem do ściany lewej (długość 200 wzdłuż X) zostawia 64,5 cm przejścia do nowej ścianki – niezależnie od szerokości 140 czy 160. Łóżko musi kończyć się przed Y ok. 485 (skrzydło drzwi balkonowych) i zaczynać za Y ok. 240.

**Salon z aneksem (po przebudowie)**
- 23,47 − 9,19 (sypialnia) − 0,46 (nowe ścianki) = **ok. 13,82 m²**.
- Wyjście na balkon: drzwi X 289,5–469,5.
- Nowa ścianka od strony salonu: 357,5 – pełna (miejsce na TV lub sofę).
- Kuchnia, hol i łazienka bez zmian.

**Różnice względem konceptu (nie przenosić do modelu)**
- Koncept podaje salon ≈15,5 m² i sypialnię ≈8,0 m²; z wymiarów rzutu wychodzi 13,82 i 9,19 m².
- Koncept rysuje okna na ścianie bocznej przy kuchni. Na rzucie to ściana do sąsiedniego mieszkania (EI 30) bez okien; jedyne okna to dwoje drzwi balkonowych.
- Koncept pokazuje wannę i suszarkę – w modelu prysznic walk-in i tylko pralka.
- Szafa w holu, przesunięta lodówka i inny układ kuchni z konceptu: pomysły do decyzji, w modelu na razie układ deweloperski.

## Historia zmian
- 25.10.2026: przejście z rzutu budowlanego 1:100 na wykonawczy 1:50. Zmiany: głębokość 569 → 579,5; łazienka 150 × 209 → 150 × 222 z szachtem 30 × 60; uskok łazienki 34 → 47; drzwi łazienki Y 60–150 → 50–140; drzwi wejściowe X 237–342 → 240–345; szacht kuchenny 58 × 25 → 60 × 60; kuchnia bez dodatkowej szafki; balkon 148 → 144 (5,76 m²); ściana balkonowa 39,5; nowa ścianka od Y 222, sypialnia 9,19 m²; orientacja: balkon na południe; grzejniki przy drzwiach balkonowych; elektryka orientacyjna.
