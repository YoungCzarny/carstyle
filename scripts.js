// === FINAL: JavaScript (scripts.js) v5 - Corrected & Complete ===

// --- KONFIGURACJA ---
const portfolioImages = [
    "images/galeria/photo1.jpg", // Używam pierwszych 3 z galerii jako domyślne portfolio
    "images/galeria/photo2.jpg",
    "images/galeria/photo3.jpg"
    // LUB: Zostaw ["project1.jpg", "project2.jpg", "project3.jpg"] jeśli te pliki istnieją w głównym folderze
];
const galleryModalImages = [
    "images/galeria/photo1.jpg", "images/galeria/photo2.jpg", "images/galeria/photo3.jpg", "images/galeria/photo4.jpg",
    "images/galeria/photo5.jpg", "images/galeria/photo6.jpg", "images/galeria/photo7.jpg", "images/galeria/photo8.jpg",
    "images/galeria/photo9.jpg", "images/galeria/photo10.jpg", "images/galeria/photo11.jpg", "images/galeria/photo12.jpg",
    "images/galeria/photo13.jpg", "images/galeria/photo14.jpg", "images/galeria/photo15.jpg", "images/galeria/photo16.jpg",
    "images/galeria/photo17.jpg", "images/galeria/photo18.jpg", "images/galeria/photo19.jpg", "images/galeria/photo20.jpg",
    "images/galeria/photo21.jpg", "images/galeria/photo22.jpg", "images/galeria/photo23.jpg", "images/galeria/photo24.jpg",
    "images/galeria/photo25.jpg", "images/galeria/photo26.jpg", "images/galeria/photo27.jpg", "images/galeria/photo28.jpg",
    "images/galeria/photo29.jpg", "images/galeria/photo30.jpg", "images/galeria/photo31.jpg", "images/galeria/photo32.jpg",
    "images/galeria/photo33.jpg", "images/galeria/photo34.jpg", "images/galeria/photo35.jpg", "images/galeria/photo36.jpg",
    "images/galeria/photo37.jpg", "images/galeria/photo38.jpg", "images/galeria/photo39.jpg", "images/galeria/photo40.jpg"
];
const serviceImageCounts = {
    'service-paint-correction': 9,
    'service-full-wrap': 10,
    'service-dechroming': 8,
    'service-stripes-roof': 4,
    'service-interior-detailing': 4,
    'service-headlight-restoration': 6,
    'service-lamp-tinting': 1,
    'service-maxton-fitting': 5,
    'service-ppf': 0
};
const autoSlideInterval = 5000;
const pauseOnHover = true;

// --- Zmienne Globalne ---
let currentImageIndex = 0;
let currentModalImageSet = portfolioImages;
let previouslyFocusedElement = null;
let isScrolling = false;
let lastScrollTop = 0;
const headerScrollThreshold = 50;
let intersectionObserver = null;
const serviceSliderIntervals = {}; // Zmienione na obiekt do przechowywania aktywnych interwałów
let currentOpenModal = null;
let modalFocusTrapListener = null;


/* === TŁUMACZENIA (Pełne, Zaktualizowane Kontakty) === */
const translations = {
  pl: {
    home: "Strona Główna", services: "Usługi", portfolio: "Portfolio", pricing: "Cennik", contact: "Kontakt",
    heroTitle: "Twoja Wizja, Nasze Wykonanie", heroSubtitle: "Profesjonalne usługi car wrappingu i detailingu", learnMore: "Poznaj mnie",
    about: "O Mnie",
    aboutText1: "Cześć! Nazywam się Damian Kokott i specjalizuję się w car wrappingu oraz detailingu. Od lat pasjonuję się motoryzacją i dbaniem o wygląd pojazdów, dlatego postanowiłem poświęcić się temu zawodowo.",
    aboutText2: "Posiadam certyfikat 'Wrapping Master' od renomowanej firmy Wrapster, a moje doświadczenie obejmuje oklejanie aut folią wylewaną, dechroming, zabezpieczenie lakieru oraz tworzenie reklam na pojazdach. Oprócz tego mam doświadczenie w lakierowaniu samochodów, motocykli, ciężarówek i pojazdów militarnych.",
    aboutText3: "Moim celem jest dostarczanie usług na najwyższym poziomie, dlatego cały czas rozwijam swoje umiejętności i inwestuję w najlepsze materiały oraz sprzęt. W przyszłości planuję poszerzyć ofertę o folie ochronne PPF, aby jeszcze lepiej zabezpieczać samochody moich klientów.",
    aboutText4: "Jeśli szukasz kogoś, kto profesjonalnie zadba o wygląd Twojego auta – dobrze trafiłeś! Zapraszam do kontaktu i współpracy.",
    svcPaintCorrectionTitle: "Korekta lakieru",
    svcPaintCorrectionDesc1: "Twój lakier stracił blask? Na karoserii widać rysy, hologramy i zmatowienia? To naturalne, ale dobra wiadomość jest taka, że możemy to naprawić! Korekta lakieru to proces wieloetapowego polerowania, który usuwa defekty powierzchniowe i przywraca lakierowi efekt salonowej głębi. Każde auto traktujemy indywidualnie, dopasowując metodę do stanu lakieru.",
    svcPaintCorrectionTypesTitle: "Rodzaje korekty lakieru:",
    svcPaintCorrectionType1Title: "✨ One-step (jednoetapowa korekta)",
    svcPaintCorrectionType1Desc: "szybkie odświeżenie lakieru, usunięcie drobnych rys i przywrócenie blasku. Idealne rozwiązanie dla aut z lekkimi śladami użytkowania.",
    svcPaintCorrectionType2Title: "⚡ Two-step (dwuetapowa korekta)",
    svcPaintCorrectionType2Desc: "usuwamy średnie rysy i oksydację, przywracając głębię koloru. Świetne dla aut, które przez lata zbierały ślady eksploatacji.",
    svcPaintCorrectionType3Title: "⭐ Three-step (trzyetapowa korekta)",
    svcPaintCorrectionType3Desc: "maksymalna precyzja! Pełna regeneracja lakieru, eliminacja głębokich rys, hologramów i śladów po myjniach automatycznych. Efekt? Lustro na karoserii!",
    svcPaintCorrectionFact: "Wiesz, że lakier samochodowy ma grubość porównywalną do kartki papieru? Podczas korekty usuwamy jedynie cienką warstwę (zaledwie kilka mikronów), co sprawia, że proces jest bezpieczny dla powłoki. A dobrze zabezpieczony lakier może wyglądać perfekcyjnie przez lata!",
    svcFullWrapTitle: "Full Wrap",
    svcFullWrapDesc1: "Masz dość fabrycznego koloru swojego auta? A może chcesz, by Twój samochód wyróżniał się na drodze? Full Wrap to najlepszy sposób na zmianę wyglądu pojazdu bez konieczności lakierowania! Dzięki nowoczesnym foliom możesz nadać swojej maszynie dowolny styl – mat, połysk, satyna, karbon, metalik, a nawet efekt kameleona!",
    svcFullWrapDesc2: "Folia nie tylko odmienia wygląd auta, ale też chroni lakier przed drobnymi zarysowaniami, promieniami UV i chemią drogową. To świetne rozwiązanie, jeśli chcesz zabezpieczyć oryginalny lakier, a jednocześnie mieć możliwość łatwego powrotu do poprzedniego wyglądu.",
    svcFullWrapBenefit1: "✅ Ogromny wybór kolorów i wykończeń",
    svcFullWrapBenefit2: "✅ Ochrona lakieru przed kamieniami i rysami",
    svcFullWrapBenefit3: "✅ Możliwość powrotu do oryginalnego lakieru bez uszkodzeń",
    svcFullWrapBenefit4: "✅ Trwałość nawet do 7 lat przy odpowiedniej pielęgnacji",
    svcFullWrapFact: "Profesjonalnie nałożona folia wygląda jak lakier! Jeśli ktoś nie wie, że auto było oklejane, może tego nawet nie zauważyć – różnicę czuć tylko pod palcami.",
    svcDechromingTitle: "Dechroming",
    svcDechromingDesc1: "Chromowane akcenty, które kiedyś były na topie, dziś mogą wydawać się przestarzałe i przytłaczające. Dechroming to usługa, która pozwala pozbyć się niechcianych chromowanych elementów, takich jak listwy wokół szyb, grille czy wykończenia lusterek. Zamiast chromu, na ich miejscu możemy zastosować matową, połyskową lub satynową folię, która nada Twojemu autu bardziej nowoczesny, sportowy wygląd.",
    svcDechromingDesc2: "Dzięki dechromingowi Twój samochód zyska elegancki, subtelny charakter – świetnie komponuje się z ciemniejszymi kolorami aut, ale wygląda równie dobrze na jasnych karoseriach.",
    svcDechromingBenefit1: "✅ Natychmiastowa zmiana wyglądu",
    svcDechromingBenefit2: "✅ Wysoka jakość folii zapewnia długotrwały efekt",
    svcDechromingBenefit3: "✅ Folia nie tylko zmienia kolor, ale i chroni elementy przed uszkodzeniami",
    svcDechromingFact: "Dechroming to nie tylko kwestia estetyki. Zmiana chromowanych elementów na folię może sprawić, że Twoje auto będzie wyglądać na droższego i bardziej dopracowanego – minimalizm w designie jest w modzie!",
    svcStripesRoofTitle: "Pasy / Oklejanie dachów",
    svcStripesRoofDesc1: "Pasy sportowe to świetny sposób na wyróżnienie się na drodze! Możemy zastosować je na całym samochodzie lub tylko na wybranych częściach – na przykład na dachu, maskach, a nawet zderzakach. W połączeniu z odpowiednią folią, pasy mogą podkreślić dynamiczny wygląd Twojego auta i nadać mu sportowy charakter.",
    svcStripesRoofDesc2: "Oklejanie dachów to także popularna usługa. Często wybierana w połączeniu z pasami sportowymi lub w ramach częściowego oklejenia pojazdu – zmienia wygląd auta bez konieczności wykonywania kosztownego malowania. Możesz wybrać kontrastowe kolory lub subtelne wykończenia, które idealnie pasują do reszty pojazdu.",
    svcStripesRoofBenefit1: "✅ Sportowy wygląd i indywidualny styl",
    svcStripesRoofBenefit2: "✅ Łatwość zmiany designu bez ingerencji w lakier",
    svcStripesRoofBenefit3: "✅ Wybór między matową, połyskową lub satynową folią",
    svcStripesRoofFact: "Wiele luksusowych samochodów posiada dachy w kontrastowym kolorze, aby nadać im bardziej agresywnego, wyścigowego wyglądu. To hit w motoryzacyjnych trendach!",
    svcIntDetailingTitle: "Detailing wnętrza",
    svcIntDetailingDesc1: "Detailing wnętrza to kompleksowe czyszczenie i pielęgnacja wszystkich elementów kabiny pojazdu. Proces obejmuje dokładne odkurzanie, pranie tapicerki materiałowej, czyszczenie i konserwację skóry, a także usuwanie zabrudzeń z plastików, przycisków i innych detali. Wykorzystujemy specjalistyczne środki, które nie tylko usuwają brud, ale również zabezpieczają powierzchnie przed szybkim ponownym zabrudzeniem.",
    svcIntDetailingOfferTitle: "W ramach usługi oferujemy:",
    svcIntDetailingOffer1: "✔ Czyszczenie plastików, gum i elementów dekoracyjnych",
    svcIntDetailingOffer2: "✔ Pranie tapicerki materiałowej lub czyszczenie i konserwację skóry",
    svcIntDetailingOffer3: "✔ Czyszczenie podsufitki (w miarę możliwości)",
    svcIntDetailingOffer4: "✔ Mycie szyb od wewnątrz",
    svcIntDetailingOffer5: "✔ Dokładne czyszczenie detali, takich jak kratki nawiewów, przyciski i schowki",
    svcIntDetailingEffect: "Efekt? Wnętrze pojazdu odzyskuje świeżość, jest wolne od kurzu, plam i zabrudzeń, a każda powierzchnia wygląda jak nowa.",
    svcIntDetailingFactsTitle: "Ciekawostki o detailingu wnętrza",
    svcIntDetailingFact1: "🔹 Nie tylko czystość, ale i zdrowie – wnętrze auta to siedlisko kurzu, bakterii i alergenów. Regularny detailing poprawia jakość powietrza w samochodzie.",
    svcIntDetailingFact2: "🔹 Czy wiesz, że…? Kierownica samochodu może być brudniejsza niż deska klozetowa? To jedno z najczęściej dotykanych miejsc, na którym zbiera się pot, tłuszcz i bakterie.",
    svcIntDetailingFact3: "🔹 Skóra w aucie starzeje się jak ludzka skóra – bez odpowiedniej pielęgnacji zaczyna pękać, wysychać i tracić elastyczność. Regularna konserwacja to klucz do jej długowieczności.",
    svcIntDetailingFact4: "🔹 Kurz i brud w nawiewach – klimatyzacja i nawiewy często gromadzą brud i kurz, które potem krążą w kabinie. Regularne czyszczenie kratki nawiewów poprawia jakość powietrza i eliminuje nieprzyjemne zapachy.",
    svcHeadlightRestoTitle: "Regeneracja kloszy",
    svcHeadlightRestoDesc1: "Reflektory z czasem matowieją i żółkną, co nie tylko psuje wygląd samochodu, ale też ogranicza skuteczność oświetlenia i pogarsza bezpieczeństwo jazdy nocą. Regeneracja kloszy reflektorów to proces, który przywraca im pierwotną przejrzystość i poprawia efektywność świateł.",
    svcHeadlightRestoOfferTitle: "W ramach usługi wykonujemy:",
    svcHeadlightRestoOffer1: "✔ Usunięcie rys, zmatowień i przebarwień",
    svcHeadlightRestoOffer2: "✔ Wieloetapowe polerowanie kloszy",
    svcHeadlightRestoOffer3: "✔ Zabezpieczenie reflektorów specjalnym preparatem lub powłoką ochronną",
    svcHeadlightRestoEffect: "Efekt? Reflektory wyglądają jak nowe, a ich światło jest jaśniejsze i bardziej efektywne, co poprawia widoczność na drodze i estetykę auta.",
    svcLampTintingTitle: "Przyciemnianie lamp",
    svcLampTintingDesc1: "Przyciemnianie lamp to świetny sposób na nadanie samochodowi agresywnego, sportowego wyglądu. Oprócz walorów estetycznych, folia do przyciemniania lamp może również chronić reflektory przed drobnymi uszkodzeniami mechanicznymi.",
    svcLampTintingDesc2: "Oferujemy przyciemnianie lamp przy użyciu wysokiej jakości folii o różnych poziomach przyciemnienia, dostosowanych do preferencji klienta i zgodnych z przepisami drogowymi.",
    svcLampTintingOfferTitle: "W ramach usługi wykonujemy:",
    svcLampTintingOffer1: "✔ Profesjonalne oklejenie lamp folią przyciemniającą",
    svcLampTintingOffer2: "✔ Dopasowanie stopnia przyciemnienia do stylu auta i przepisów",
    svcLampTintingOffer3: "✔ Precyzyjne wykończenie bez widocznych krawędzi i pęcherzyków powietrza",
    svcLampTintingEffect: "Efekt? Nowoczesny, stylowy wygląd samochodu i dodatkowa ochrona reflektorów przed kamieniami oraz drobnymi uszkodzeniami.",
    svcLampTintingFactsTitle: "Ciekawostki o reflektorach i przyciemnianiu lamp",
    svcLampTintingFact1: "🔹 Czy wiesz, że…? Zmatowiałe reflektory mogą zmniejszyć skuteczność oświetlenia nawet o 70%, co znacząco obniża bezpieczeństwo jazdy nocą.",
    svcLampTintingFact2: "🔹 Reflektory a przegląd techniczny – matowe lampy mogą być powodem niezaliczenia przeglądu technicznego, ponieważ wpływają na jakość oświetlenia drogi.",
    svcLampTintingFact3: "🔹 Przyciemnianie lamp nie zawsze oznacza gorszą widoczność – odpowiednio dobrana folia może redukować efekt odblasków, nie osłabiając mocy świateł.",
    svcMaxtonFittingTitle: "Montaż dokładek Maxton Design",
    svcMaxtonFittingDesc1: "Dokładki Maxton Design to doskonały sposób na podkreślenie sportowego charakteru auta. Dzięki nim samochód zyskuje agresywniejszy wygląd, lepszą aerodynamikę oraz indywidualny styl. Oferujemy profesjonalny montaż dokładek, takich jak splittery, progi, dyfuzory czy spoilery, zapewniając precyzyjne dopasowanie i estetyczne wykończenie.",
    svcMaxtonFittingOfferTitle: "W ramach usługi wykonujemy:",
    svcMaxtonFittingOffer1: "✔ Dopasowanie dokładek do konkretnego modelu samochodu",
    svcMaxtonFittingOffer2: "✔ Profesjonalny montaż z dbałością o detale",
    svcMaxtonFittingOffer3: "✔ Opcjonalne zabezpieczenie elementów folią lub powłoką ochronną",
    svcMaxtonFittingEffect: "Efekt? Auto nabiera bardziej dynamicznego wyglądu, a dodatkowe elementy poprawiają jego aerodynamikę i ochronę przed uszkodzeniami.",
    svcMaxtonFittingFactsTitle: "Ciekawostki o dokładkach Maxton Design",
    svcMaxtonFittingFact1: "🔹 Czy wiesz, że…? Dokładki Maxton Design są projektowane z myślą o aerodynamice, a nie tylko o wyglądzie. Dobrze dobrane splittery mogą poprawić stabilność pojazdu przy wyższych prędkościach.",
    svcMaxtonFittingFact2: "🔹 Nie tylko tuning wizualny – dobrze zamontowane dokładki mogą minimalnie poprawić przepływ powietrza wokół auta, co wpływa na prowadzenie pojazdu.",
    svcMaxtonFittingFact3: "🔹 Materiały mają znaczenie – dokładki są najczęściej wykonane z ABS lub carbonu. ABS jest elastyczny i odporny na uszkodzenia, a carbon dodaje lekkości i unikalnego wyglądu.",
    svcMaxtonFittingFact4: "🔹 Personalizacja to klucz – dokładki można lakierować, oklejać folią lub zabezpieczać powłokami, aby lepiej komponowały się ze stylistyką pojazdu.",
    servicePpfTitle: "Folie Ochronne PPF", servicePpfDesc: "Planujemy wprowadzenie usług aplikacji bezbarwnych folii ochronnych (Paint Protection Film) na elementy karoserii najbardziej narażone na uszkodzenia (zderzak, maska, lusterka, progi).", soon: "(Wkrótce)",
    funFactTitle: "Ciekawostka:", whyWorthItTitle: "Dlaczego warto?",
    showAllPhotos: "Pokaż wszystkie zdjęcia",
    pricingTitleFull: "Cennik usług – D.Kokott Your Vision Our Execution", priceCatWrapping: "Wrapping (Oklejanie Pojazdów)", priceSubCatColorChange: "Zmiana koloru pojazdu", priceSegmentCar: "Samochód osobowy", priceSegmentSuvVan: "SUV / Van", priceSegmentMotorcycle: "Motocykl", priceSegmentTruck: "Ciężarówka / Naczepa", priceSubCatElements: "Oklejanie poszczególnych elementów", priceElementRoof: "Dach", priceElementMirrors: "Lusterka", priceElementStripes: "Pasy dekoracyjne", priceSubCatAdvertising: "Oklejanie reklamowe", priceAdDoors: "Reklama na drzwiach", priceAdHalf: "Oklejanie połowy pojazdu", priceAdFull: "Pełna reklama na pojeździe", priceSubCatTinting: "Przyciemnianie elementów", priceTintingWindows: "Przyciemnianie szyb", priceCatDetailing: "Detailing (Pielęgnacja i Korekta Lakieru)", priceSubCatWash: "Mycie detailingowe", priceWashBasic: "Podstawowe mycie detailingowe", priceWashDecon: "Mycie + dekontaminacja lakieru", priceSubCatProtection: "Ochrona lakieru", priceProtWax: "Wosk syntetyczny", priceProtCeramic1y: "Powłoka ceramiczna 1-roczna", priceProtCeramic3y: "Powłoka ceramiczna 3-letnia", priceProtCeramic5y: "Powłoka ceramiczna 5-letnia", priceIntCleaning: "Kompleksowe czyszczenie wnętrza", priceIntUpholstery: "Pranie tapicerki materiałowej", priceIntLeather: "Czyszczenie i impregnacja skóry", priceIntProtection: "Ochrona tapicerki (impregnacja)", priceSubCatRenovation: "Renowacja elementów", priceRenoWindows: "Polerowanie i zabezpieczenie szyb", priceRenoPlastics: "Ochrona plastików zewnętrznych", priceCatFitting: "Montaż dodatków (np. Maxton Design)", priceFitSplitters: "Montaż dokładek", priceFitSpoilers: "Montaż spoilerów", priceFitDiffusers: "Montaż dyfuzorów", priceFitSills: "Montaż nakładek progowych", priceIndividual: "wycena indywidualna", priceStartingFrom: "Cena od", priceService: "Usługa", priceCarSegment: "Segment", // Klucz dla mobilnych etykiet
    priceNoteFull: "Ceny są orientacyjne i mogą się różnić w zależności od pojazdu, zakresu prac oraz wybranego materiału. Zapraszamy do kontaktu w celu uzyskania indywidualnej wyceny.",
    contactDetails: "Dane Kontaktowe",
    phoneNL_new: "Numer NL 1", // Klucz dla pierwszego numeru NL
    phoneNL_whatsapp: "Numer NL 2 (WhatsApp)", // Klucz dla drugiego numeru NL (były NL)
    phonePL: "Numer PL",
    address: "Adres", location: "Lokalizacja", contactForm: "Formularz Kontaktowy", formName: "Imię i Nazwisko", formEmail: "Email", formPhone: "Telefon (opcjonalnie)", formMessage: "Wiadomość", formConsent: "Wyrażam zgodę na przetwarzanie moich danych osobowych (imię, email, telefon) przez [Damian Kokott] w celu udzielenia odpowiedzi na przesłane zapytanie. Podanie danych jest dobrowolne, ale niezbędne do przetworzenia zapytania.", formSend: "Wyślij", formSending: "Wysyłanie...", formSuccess: "Wiadomość wysłana pomyślnie!", formError: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.", formValidationError: "Proszę wypełnić wymagane pola poprawnie.", validationName: "Proszę podać imię i nazwisko.", validationEmail: "Proszę podać poprawny adres email.", validationMessage: "Proszę wpisać treść wiadomości.", validationConsent: "Zgoda na przetwarzanie danych jest wymagana.", formNamePlaceholder: "Jan Kowalski", formEmailPlaceholder: "email@example.com", formPhonePlaceholder: "+48 123 456 789", formMessagePlaceholder: "Twoja wiadomość...", gallery: "Galeria", portfolioImageAlt: "Zdjęcie z portfolio", ServiceImageAlt: "Zdjęcie usługi", noPhotosAvailable: "Brak zdjęć w galerii.", photoLoadError: "Błąd ładowania zdjęć.", footerRights: "Wszystkie prawa zastrzeżone.", privacyPolicy: "Polityka Prywatności", openMenu: "Otwórz menu", closeMenu: "Zamknij menu", enlargedPhotoTitle: "Powiększone zdjęcie", logoAlt: "Logo firmy Damian Kokott", aboutImageAlt: "Damian Kokott - specjalista car wrappingu", prevPhoto: "Poprzednie zdjęcie", nextPhoto: "Następne zdjęcie"
  },
  en: {
    home: "Home", services: "Services", portfolio: "Portfolio", pricing: "Pricing", contact: "Contact", heroTitle: "Your Vision, Our Execution", heroSubtitle: "Professional car wrapping and detailing services", learnMore: "Learn More",
    about: "About Me",
    aboutText1: "Hi! My name is Damian Kokott and I specialize in car wrapping and detailing. For years, I've been passionate about cars and taking care of their appearance, which led me to pursue this professionally.",
    aboutText2: "I hold a 'Wrapping Master' certificate from the renowned Wrapster company, and my experience includes wrapping cars with cast film, dechroming, paint protection, and creating vehicle advertising. Additionally, I have experience in painting cars, motorcycles, trucks, and military vehicles.",
    aboutText3: "My goal is to deliver services at the highest level, which is why I continuously develop my skills and invest in the best materials and equipment. In the future, I plan to expand my offer to include PPF protective films to better protect my clients' cars.",
    aboutText4: "If you're looking for someone who will professionally take care of your car's appearance – you've come to the right place! I invite you to contact me and collaborate.",
    svcPaintCorrectionTitle: "Paint Correction",
    svcPaintCorrectionDesc1: "Has your paint lost its shine? Are there scratches, holograms, and dullness on the bodywork? This is natural, but the good news is we can fix it! Paint correction is a multi-stage polishing process that removes surface defects and restores the paint's showroom depth effect. We treat each car individually, adjusting the method to the paint's condition.",
    svcPaintCorrectionTypesTitle: "Types of paint correction:",
    svcPaintCorrectionType1Title: "✨ One-step",
    svcPaintCorrectionType1Desc: "quick paint refreshment, removal of minor scratches, and restoring gloss. An ideal solution for cars with light signs of use.",
    svcPaintCorrectionType2Title: "⚡ Two-step",
    svcPaintCorrectionType2Desc: "removes medium scratches and oxidation, restoring color depth. Great for cars that have accumulated signs of use over the years.",
    svcPaintCorrectionType3Title: "⭐ Three-step",
    svcPaintCorrectionType3Desc: "maximum precision! Full paint regeneration, elimination of deep scratches, holograms, and marks from automatic car washes. The result? A mirror finish on the bodywork!",
    svcPaintCorrectionFact: "Did you know that car paint is about as thick as a sheet of paper? During correction, we only remove a thin layer (just a few microns), making the process safe for the coating. And well-protected paint can look perfect for years!",
    svcFullWrapTitle: "Full Wrap",
    svcFullWrapDesc1: "Tired of your car's factory color? Or maybe you want your car to stand out on the road? Full Wrap is the best way to change your vehicle's appearance without the need for painting! Thanks to modern films, you can give your machine any style – matte, gloss, satin, carbon, metallic, or even a chameleon effect!",
    svcFullWrapDesc2: "The film not only changes the car's appearance but also protects the paint from minor scratches, UV rays, and road chemicals. It's a great solution if you want to protect the original paint while having the option to easily revert to the previous look.",
    svcFullWrapBenefit1: "✅ Huge choice of colors and finishes",
    svcFullWrapBenefit2: "✅ Paint protection against stone chips and scratches",
    svcFullWrapBenefit3: "✅ Reversibility without damaging the original paint",
    svcFullWrapBenefit4: "✅ Durability up to 7 years with proper care",
    svcFullWrapFact: "Professionally applied film looks just like paint! If someone doesn't know the car was wrapped, they might not even notice – the difference is only felt by touch.",
    svcDechromingTitle: "Dechroming",
    svcDechromingDesc1: "Chrome accents that were once trendy may now seem outdated and overwhelming. Dechroming is a service that allows you to get rid of unwanted chrome elements like window trims, grilles, or mirror finishes. Instead of chrome, we can apply matte, gloss, or satin film to give your car a more modern, sporty look.",
    svcDechromingDesc2: "Thanks to dechroming, your car will gain an elegant, subtle character – it pairs well with darker car colors but looks equally good on light bodywork.",
    svcDechromingBenefit1: "✅ Instant visual change",
    svcDechromingBenefit2: "✅ High-quality film ensures a long-lasting effect",
    svcDechromingBenefit3: "✅ The film not only changes the color but also protects elements from damage",
    svcDechromingFact: "Dechroming isn't just about aesthetics. Replacing chrome elements with film can make your car look more expensive and refined – minimalism in design is in vogue!",
    svcStripesRoofTitle: "Stripes / Roof Wrapping",
    svcStripesRoofDesc1: "Sport stripes are a great way to stand out on the road! We can apply them to the entire car or just selected parts – for example, the roof, hoods, or even bumpers. Combined with the right film, stripes can emphasize the dynamic look of your car and give it a sporty character.",
    svcStripesRoofDesc2: "Roof wrapping is also a popular service. Often chosen in conjunction with sport stripes or as part of a partial vehicle wrap – it changes the car's appearance without costly painting. You can choose contrasting colors or subtle finishes that perfectly match the rest of the vehicle.",
    svcStripesRoofBenefit1: "✅ Sporty look and individual style",
    svcStripesRoofBenefit2: "✅ Easy design change without altering the paint",
    svcStripesRoofBenefit3: "✅ Choice between matte, gloss, or satin film",
    svcStripesRoofFact: "Many luxury cars feature roofs in a contrasting color to give them a more aggressive, racing look. It's a hit in automotive trends!",
    svcIntDetailingTitle: "Interior Detailing",
    svcIntDetailingDesc1: "Interior detailing is a comprehensive cleaning and care process for all elements inside the vehicle's cabin. The process includes thorough vacuuming, fabric upholstery washing, leather cleaning and conditioning, as well as removing dirt from plastics, buttons, and other details. We use specialized products that not only remove dirt but also protect surfaces from getting dirty again quickly.",
    svcIntDetailingOfferTitle: "Our service includes:",
    svcIntDetailingOffer1: "✔ Cleaning plastics, rubber, and decorative elements",
    svcIntDetailingOffer2: "✔ Washing fabric upholstery or cleaning and conditioning leather",
    svcIntDetailingOffer3: "✔ Headliner cleaning (where possible)",
    svcIntDetailingOffer4: "✔ Cleaning windows from the inside",
    svcIntDetailingOffer5: "✔ Detailed cleaning of elements like air vents, buttons, and compartments",
    svcIntDetailingEffect: "The result? The vehicle's interior regains freshness, is free from dust, stains, and dirt, and every surface looks like new.",
    svcIntDetailingFactsTitle: "Interior Detailing Fun Facts",
    svcIntDetailingFact1: "🔹 Not just clean, but healthy – a car's interior harbors dust, bacteria, and allergens. Regular detailing improves the air quality inside the car.",
    svcIntDetailingFact2: "🔹 Did you know...? A car's steering wheel can be dirtier than a toilet seat? It's one of the most frequently touched places, accumulating sweat, grease, and bacteria.",
    svcIntDetailingFact3: "🔹 Car leather ages like human skin – without proper care, it starts to crack, dry out, and lose elasticity. Regular conditioning is key to its longevity.",
    svcIntDetailingFact4: "🔹 Dust and dirt in air vents – air conditioning and vents often accumulate dirt and dust, which then circulates in the cabin. Regular cleaning of air vent grilles improves air quality and eliminates unpleasant odors.",
    svcHeadlightRestoTitle: "Headlight Restoration",
    svcHeadlightRestoDesc1: "Headlights tend to become dull and yellow over time, which not only spoils the car's appearance but also reduces lighting efficiency and worsens nighttime driving safety. Headlight restoration is a process that restores their original clarity and improves light performance.",
    svcHeadlightRestoOfferTitle: "Our service includes:",
    svcHeadlightRestoOffer1: "✔ Removing scratches, dullness, and discoloration",
    svcHeadlightRestoOffer2: "✔ Multi-step polishing of the lenses",
    svcHeadlightRestoOffer3: "✔ Protecting headlights with a special preparation or protective coating",
    svcHeadlightRestoEffect: "The result? Headlights look like new, and their light is brighter and more effective, improving road visibility and the car's aesthetics.",
    svcLampTintingTitle: "Lamp Tinting",
    svcLampTintingDesc1: "Lamp tinting is a great way to give a car an aggressive, sporty look. Besides aesthetic values, lamp tinting film can also protect headlights from minor mechanical damage.",
    svcLampTintingDesc2: "We offer lamp tinting using high-quality films with various tint levels, tailored to the client's preferences and compliant with road regulations.",
    svcLampTintingOfferTitle: "Our service includes:",
    svcLampTintingOffer1: "✔ Professional lamp tint film application",
    svcLampTintingOffer2: "✔ Matching the tint level to the car's style and regulations",
    svcLampTintingOffer3: "✔ Precise finish without visible edges or air bubbles",
    svcLampTintingEffect: "The result? A modern, stylish car appearance and additional protection for headlights against stone chips and minor damage.",
    svcLampTintingFactsTitle: "Headlight & Tinting Fun Facts",
    svcLampTintingFact1: "🔹 Did you know...? Dull headlights can reduce lighting efficiency by up to 70%, significantly lowering nighttime driving safety.",
    svcLampTintingFact2: "🔹 Headlights and technical inspection – dull lamps can cause failure of a technical inspection as they affect road illumination quality.",
    svcLampTintingFact3: "🔹 Lamp tinting doesn't always mean worse visibility – properly chosen film can reduce glare without weakening light output.",
    svcMaxtonFittingTitle: "Maxton Design Fitting",
    svcMaxtonFittingDesc1: "Maxton Design add-ons are an excellent way to emphasize a car's sporty character. They give the car a more aggressive look, better aerodynamics, and individual style. We offer professional installation of add-ons such as splitters, side skirts, diffusers, or spoilers, ensuring precise fit and aesthetic finish.",
    svcMaxtonFittingOfferTitle: "Our service includes:",
    svcMaxtonFittingOffer1: "✔ Fitting add-ons to the specific car model",
    svcMaxtonFittingOffer2: "✔ Professional installation with attention to detail",
    svcMaxtonFittingOffer3: "✔ Optional protection of elements with film or protective coating",
    svcMaxtonFittingEffect: "The result? The car gains a more dynamic look, and the additional elements improve its aerodynamics and protection against damage.",
    svcMaxtonFittingFactsTitle: "Maxton Design Fun Facts",
    svcMaxtonFittingFact1: "🔹 Did you know...? Maxton Design add-ons are designed with aerodynamics in mind, not just looks. Well-chosen splitters can improve vehicle stability at higher speeds.",
    svcMaxtonFittingFact2: "🔹 Not just visual tuning – properly installed add-ons can slightly improve airflow around the car, affecting vehicle handling.",
    svcMaxtonFittingFact3: "🔹 Materials matter – add-ons are most often made of ABS or carbon. ABS is flexible and damage-resistant, while carbon adds lightness and a unique look.",
    svcMaxtonFittingFact4: "🔹 Customization is key – add-ons can be painted, wrapped in film, or protected with coatings to better match the vehicle's styling.",
    servicePpfTitle: "PPF Protective Films", servicePpfDesc: "We plan to introduce application services for clear protective films (Paint Protection Film) on body elements most vulnerable to damage (bumper, hood, mirrors, sills).", soon: "(Soon)", funFactTitle: "Fun Fact:", whyWorthItTitle: "Why worth it?", showAllPhotos: "Show all photos",
    pricingTitleFull: "Price List – D.Kokott Your Vision Our Execution", priceCatWrapping: "Wrapping", priceSubCatColorChange: "Color Change", priceSegmentCar: "Car", priceSegmentSuvVan: "SUV/Van", priceSegmentMotorcycle: "Motorcycle", priceSegmentTruck: "Truck/Trailer", priceSubCatElements: "Element Wrapping", priceElementRoof: "Roof", priceElementMirrors: "Mirrors", priceElementStripes: "Stripes", priceSubCatAdvertising: "Advertising", priceAdDoors: "Doors Ad", priceAdHalf: "Half Wrap Ad", priceAdFull: "Full Wrap Ad", priceSubCatTinting: "Tinting", priceTintingWindows: "Window Tint", priceCatDetailing: "Detailing", priceSubCatWash: "Detailing Wash", priceWashBasic: "Basic Wash", priceWashDecon: "Wash+Decontamination", priceSubCatProtection: "Paint Protection", priceProtWax: "Wax", priceProtCeramic1y: "Ceramic 1y", priceProtCeramic3y: "Ceramic 3y", priceProtCeramic5y: "Ceramic 5y", priceIntCleaning: "Interior Cleaning", priceIntUpholstery: "Upholstery Wash", priceIntLeather: "Leather Care", priceIntProtection: "Upholstery Protection", priceSubCatRenovation: "Renovation", priceRenoWindows: "Glass Polishing", priceRenoPlastics: "Plastic Protection", priceCatFitting: "Add-on Fitting", priceFitSplitters: "Splitters", priceFitSpoilers: "Spoilers", priceFitDiffusers: "Diffusers", priceFitSills: "Side Sills", priceIndividual: "Individual Pricing", priceStartingFrom: "From", priceService: "Service", priceCarSegment: "Segment",
    priceNoteFull: "Prices are indicative and may vary depending on the vehicle, scope of work, and chosen material. Contact us for a personalized quote.",
    contactDetails: "Contact Details",
    phoneNL_new: "NL Number 1",
    phoneNL_whatsapp: "NL Number 2 (WhatsApp)",
    phonePL: "PL Number",
    address: "Address", location: "Location", contactForm: "Contact Form", formName: "Name", formEmail: "Email", formPhone: "Phone (Opt.)", formMessage: "Message", formConsent: "I agree to the processing of my personal data (name, email, phone) by [Damian Kokott] to respond to the submitted inquiry. Providing data is voluntary but necessary to process the inquiry.", formSend: "Send", formSending: "Sending...", formSuccess: "Message sent successfully!", formError: "Error sending message. Please try again later.", formValidationError: "Please fill in the required fields correctly.", validationName: "Please enter your name and surname.", validationEmail: "Please enter a valid email address.", validationMessage: "Please enter your message.", validationConsent: "Consent to data processing is required.", formNamePlaceholder: "John Doe", formEmailPlaceholder: "email@example.com", formPhonePlaceholder: "+44 123 456 789", formMessagePlaceholder: "Your message...", gallery: "Gallery", portfolioImageAlt: "Portfolio image", ServiceImageAlt: "Service photo", noPhotosAvailable: "No photos available in the gallery.", photoLoadError: "Error loading photos.", footerRights: "All rights reserved.", privacyPolicy: "Privacy Policy", openMenu: "Open menu", closeMenu: "Close menu", enlargedPhotoTitle: "Enlarged photo", logoAlt: "Damian Kokott Logo", aboutImageAlt: "Damian Kokott - car wrapping specialist", prevPhoto: "Previous", nextPhoto: "Next"
  },
  nl: {
    home: "Home", services: "Diensten", portfolio: "Portfolio", pricing: "Prijzen", contact: "Contact", heroTitle: "Uw Visie, Onze Uitvoering", heroSubtitle: "Professionele auto wrapping en detailing", learnMore: "Leer meer",
    about: "Over Mij",
    aboutText1: "Hallo! Mijn naam is Damian Kokott en ik ben gespecialiseerd in car wrapping en detailing. Al jaren ben ik gepassioneerd door auto's en het verzorgen van hun uiterlijk, daarom heb ik besloten hier mijn beroep van te maken.",
    aboutText2: "Ik heb een 'Wrapping Master' certificaat van het gerenommeerde bedrijf Wrapster, en mijn ervaring omvat het wrappen van auto's met gegoten folie, dechroming, lakbescherming en het maken van reclame op voertuigen. Daarnaast heb ik ervaring met het spuiten van auto's, motoren, vrachtwagens en militaire voertuigen.",
    aboutText3: "Mijn doel is om diensten op het hoogste niveau te leveren, daarom ontwikkel ik voortdurend mijn vaardigheden en investeer ik in de beste materialen en apparatuur. In de toekomst ben ik van plan mijn aanbod uit te breiden met PPF beschermfolies om de auto's van mijn klanten nog beter te beschermen.",
    aboutText4: "Als u op zoek bent naar iemand die professioneel voor het uiterlijk van uw auto zorgt – dan bent u aan het juiste adres! Ik nodig u uit om contact op te nemen en samen te werken.",
    svcPaintCorrectionTitle: "Lakcorrectie",
    svcPaintCorrectionDesc1: "Heeft uw lak zijn glans verloren? Zijn er krassen, hologrammen en dofheid op de carrosserie? Dit is normaal, maar het goede nieuws is dat we dit kunnen herstellen! Lakcorrectie is een polijstproces in meerdere stappen dat oppervlaktefouten verwijdert en de lak zijn showroomdiepte teruggeeft. We behandelen elke auto individueel en passen de methode aan de staat van de lak aan.",
    svcPaintCorrectionTypesTitle: "Soorten lakcorrectie:",
    svcPaintCorrectionType1Title: "✨ One-step",
    svcPaintCorrectionType1Desc: "snelle opfrissing van de lak, verwijdering van kleine krasjes en herstel van de glans. Ideale oplossing voor auto's met lichte gebruikssporen.",
    svcPaintCorrectionType2Title: "⚡ Two-step",
    svcPaintCorrectionType2Desc: "verwijdert medium krassen en oxidatie, herstelt de kleurdiepte. Geweldig voor auto's die in de loop der jaren gebruikssporen hebben verzameld.",
    svcPaintCorrectionType3Title: "⭐ Three-step",
    svcPaintCorrectionType3Desc: "maximale precisie! Volledige lakregeneratie, eliminatie van diepe krassen, hologrammen en sporen van automatische wasstraten. Het resultaat? Een spiegelafwerking op de carrosserie!",
    svcPaintCorrectionFact: "Wist u dat autolak ongeveer zo dik is als een vel papier? Tijdens de correctie verwijderen we slechts een dun laagje (slechts enkele microns), waardoor het proces veilig is voor de lak. En goed beschermde lak kan er jarenlang perfect uitzien!",
    svcFullWrapTitle: "Full Wrap",
    svcFullWrapDesc1: "Bent u de fabriekskleur van uw auto beu? Of wilt u misschien dat uw auto opvalt op de weg? Full Wrap is de beste manier om het uiterlijk van uw voertuig te veranderen zonder te hoeven spuiten! Dankzij moderne folies kunt u uw machine elke stijl geven – mat, glans, satijn, carbon, metallic of zelfs een kameleon-effect!",
    svcFullWrapDesc2: "De folie verandert niet alleen het uiterlijk van de auto, maar beschermt ook de lak tegen kleine krassen, UV-stralen en wegchemicaliën. Het is een geweldige oplossing als u de originele lak wilt beschermen en tegelijkertijd de mogelijkheid wilt hebben om gemakkelijk terug te keren naar het vorige uiterlijk.",
    svcFullWrapBenefit1: "✅ Enorme keuze aan kleuren en afwerkingen",
    svcFullWrapBenefit2: "✅ Lakbescherming tegen steenslag en krassen",
    svcFullWrapBenefit3: "✅ Mogelijkheid om terug te keren naar de originele lak zonder schade",
    svcFullWrapBenefit4: "✅ Duurzaamheid tot 7 jaar bij goed onderhoud",
    svcFullWrapFact: "Professioneel aangebrachte folie ziet eruit als lak! Als iemand niet weet dat de auto gewrapt is, merken ze het misschien niet eens op – het verschil voel je alleen bij aanraking.",
    svcDechromingTitle: "Dechroming",
    svcDechromingDesc1: "Chromen accenten die ooit trendy waren, lijken nu misschien verouderd en overweldigend. Dechroming is een service waarmee u ongewenste chromen elementen zoals raamlijsten, grills of spiegelafwerkingen kunt verwijderen. In plaats van chroom kunnen we matte, glanzende of satijnen folie aanbrengen om uw auto een modernere, sportievere uitstraling te geven.",
    svcDechromingDesc2: "Dankzij dechroming krijgt uw auto een elegant, subtiel karakter – het past goed bij donkere autokleuren, maar ziet er even goed uit op lichte carrosserieën.",
    svcDechromingBenefit1: "✅ Onmiddellijke visuele verandering",
    svcDechromingBenefit2: "✅ Hoogwaardige folie zorgt voor een langdurig effect",
    svcDechromingBenefit3: "✅ De folie verandert niet alleen de kleur, maar beschermt ook elementen tegen schade",
    svcDechromingFact: "Dechroming gaat niet alleen over esthetiek. Het vervangen van chromen elementen door folie kan uw auto er duurder en verfijnder uit laten zien – minimalisme in design is in de mode!",
    svcStripesRoofTitle: "Strepen / Dakwrapping",
    svcStripesRoofDesc1: "Sportstrepen zijn een geweldige manier om op te vallen op de weg! We kunnen ze op de hele auto aanbrengen of alleen op geselecteerde delen – bijvoorbeeld het dak, de motorkap of zelfs de bumpers. Gecombineerd met de juiste folie kunnen strepen de dynamische uitstraling van uw auto benadrukken en hem een sportief karakter geven.",
    svcStripesRoofDesc2: "Dakwrapping is ook een populaire service. Vaak gekozen in combinatie met sportstrepen of als onderdeel van een gedeeltelijke voertuigwrap – het verandert het uiterlijk van de auto zonder kostbaar spuitwerk. U kunt kiezen voor contrasterende kleuren of subtiele afwerkingen die perfect passen bij de rest van het voertuig.",
    svcStripesRoofBenefit1: "✅ Sportieve uitstraling en individuele stijl",
    svcStripesRoofBenefit2: "✅ Gemakkelijk ontwerp wijzigen zonder de lak aan te tasten",
    svcStripesRoofBenefit3: "✅ Keuze tussen matte, glanzende of satijnen folie",
    svcStripesRoofFact: "Veel luxe auto's hebben daken in een contrasterende kleur om ze een agressievere, race-uitstraling te geven. Het is een hit in autotrends!",
    svcIntDetailingTitle: "Interieur Detailing",
    svcIntDetailingDesc1: "Interieur detailing is een uitgebreid reinigings- en verzorgingsproces voor alle elementen in de cabine van het voertuig. Het proces omvat grondig stofzuigen, wassen van stoffen bekleding, reinigen en conditioneren van leer, evenals het verwijderen van vuil van kunststoffen, knoppen en andere details. We gebruiken gespecialiseerde producten die niet alleen vuil verwijderen, maar ook oppervlakken beschermen tegen snelle nieuwe vervuiling.",
    svcIntDetailingOfferTitle: "Onze service omvat:",
    svcIntDetailingOffer1: "✔ Reinigen van kunststoffen, rubber en decoratieve elementen",
    svcIntDetailingOffer2: "✔ Wassen van stoffen bekleding of reinigen en conditioneren van leer",
    svcIntDetailingOffer3: "✔ Hemelreiniging (waar mogelijk)",
    svcIntDetailingOffer4: "✔ Ruiten reinigen aan de binnenkant",
    svcIntDetailingOffer5: "✔ Gedetailleerde reiniging van elementen zoals ventilatieroosters, knoppen en opbergvakken",
    svcIntDetailingEffect: "Het resultaat? Het interieur van het voertuig herwint frisheid, is vrij van stof, vlekken en vuil, en elk oppervlak ziet eruit als nieuw.",
    svcIntDetailingFactsTitle: "Interieur Detailing Weetjes",
    svcIntDetailingFact1: "🔹 Niet alleen schoon, maar gezond – het interieur van een auto herbergt stof, bacteriën en allergenen. Regelmatige detailing verbetert de luchtkwaliteit in de auto.",
    svcIntDetailingFact2: "🔹 Wist u dat...? Het stuur van een auto viezer kan zijn dan een toiletbril? Het is een van de meest aangeraakte plekken, waar zweet, vet en bacteriën zich ophopen.",
    svcIntDetailingFact3: "🔹 Autoleer veroudert als menselijke huid – zonder de juiste verzorging begint het te barsten, uitdrogen en elasticiteit te verliezen. Regelmatige conditionering is de sleutel tot de levensduur.",
    svcIntDetailingFact4: "🔹 Stof en vuil in ventilatieroosters – airconditioning en ventilatieopeningen verzamelen vaak vuil en stof, dat vervolgens in de cabine circuleert. Regelmatige reiniging van de ventilatieroosters verbetert de luchtkwaliteit en elimineert onaangename geuren.",
    svcHeadlightRestoTitle: "Koplamprestauratie",
    svcHeadlightRestoDesc1: "Koplampen worden na verloop van tijd dof en geel, wat niet alleen het uiterlijk van de auto bederft, maar ook de efficiëntie van de verlichting vermindert en de veiligheid 's nachts verslechtert. Koplamprestauratie is een proces dat hun oorspronkelijke helderheid herstelt en de lichtprestaties verbetert.",
    svcHeadlightRestoOfferTitle: "Onze service omvat:",
    svcHeadlightRestoOffer1: "✔ Verwijderen van krassen, dofheid en verkleuringen",
    svcHeadlightRestoOffer2: "✔ Multi-stap polijsten van de lenzen",
    svcHeadlightRestoOffer3: "✔ Beschermen van koplampen met een speciaal preparaat of beschermende coating",
    svcHeadlightRestoEffect: "Het resultaat? Koplampen zien eruit als nieuw, en hun licht is helderder en effectiever, wat de zichtbaarheid op de weg en de esthetiek van de auto verbetert.",
    svcLampTintingTitle: "Lampen Tinten",
    svcLampTintingDesc1: "Lampen tinten is een geweldige manier om een auto een agressieve, sportieve uitstraling te geven. Naast esthetische waarden kan tintfolie voor lampen ook koplampen beschermen tegen lichte mechanische schade.",
    svcLampTintingDesc2: "Wij bieden lampen tinten aan met hoogwaardige folies in verschillende tintniveaus, afgestemd op de voorkeuren van de klant en conform de verkeersregels.",
    svcLampTintingOfferTitle: "Onze service omvat:",
    svcLampTintingOffer1: "✔ Professionele applicatie van tintfolie op lampen",
    svcLampTintingOffer2: "✔ Afstemmen van het tintniveau op de stijl van de auto en de voorschriften",
    svcLampTintingOffer3: "✔ Nauwkeurige afwerking zonder zichtbare randen of luchtbellen",
    svcLampTintingEffect: "Het resultaat? Een moderne, stijlvolle uitstraling van de auto en extra bescherming van de koplampen tegen steenslag en lichte beschadigingen.",
    svcLampTintingFactsTitle: "Koplamp & Tinten Weetjes",
    svcLampTintingFact1: "🔹 Wist u dat...? Doffe koplampen de lichtopbrengst tot 70% kunnen verminderen, wat de veiligheid 's nachts aanzienlijk verlaagt.",
    svcLampTintingFact2: "🔹 Koplampen en technische keuring – doffe lampen kunnen reden zijn voor afkeur bij de technische keuring omdat ze de kwaliteit van de wegverlichting beïnvloeden.",
    svcLampTintingFact3: "🔹 Lampen tinten betekent niet altijd slechter zicht – goed gekozen folie kan schittering verminderen zonder de lichtsterkte te verzwakken.",
    svcMaxtonFittingTitle: "Maxton Design Installatie",
    svcMaxtonFittingDesc1: "Maxton Design add-ons zijn een uitstekende manier om het sportieve karakter van een auto te benadrukken. Ze geven de auto een agressievere uitstraling, betere aerodynamica en individuele stijl. Wij bieden professionele montage van add-ons zoals splitters, sideskirts, diffusers of spoilers, waarbij we zorgen voor een precieze pasvorm en esthetische afwerking.",
    svcMaxtonFittingOfferTitle: "Onze service omvat:",
    svcMaxtonFittingOffer1: "✔ Passen van add-ons op het specifieke automodel",
    svcMaxtonFittingOffer2: "✔ Professionele montage met oog voor detail",
    svcMaxtonFittingOffer3: "✔ Optionele bescherming van elementen met folie of beschermende coating",
    svcMaxtonFittingEffect: "Het resultaat? De auto krijgt een dynamischere uitstraling, en de extra elementen verbeteren de aerodynamica en bescherming tegen schade.",
    svcMaxtonFittingFactsTitle: "Maxton Design Weetjes",
    svcMaxtonFittingFact1: "🔹 Wist u dat...? Maxton Design add-ons zijn ontworpen met aerodynamica in gedachten, niet alleen looks. Goed gekozen splitters kunnen de stabiliteit van het voertuig bij hogere snelheden verbeteren.",
    svcMaxtonFittingFact2: "🔹 Niet alleen visuele tuning – correct gemonteerde add-ons kunnen de luchtstroom rond de auto licht verbeteren, wat het rijgedrag beïnvloedt.",
    svcMaxtonFittingFact3: "🔹 Materialen zijn belangrijk – add-ons zijn meestal gemaakt van ABS of carbon. ABS is flexibel en bestand tegen beschadiging, terwijl carbon lichtheid en een unieke uitstraling toevoegt.",
    svcMaxtonFittingFact4: "🔹 Personalisatie is essentieel – add-ons kunnen worden gespoten, gewrapt met folie of beschermd met coatings om beter aan te sluiten bij de styling van het voertuig.",
    servicePpfTitle: "PPF Beschermfolies", servicePpfDesc: "We zijn van plan om applicatiediensten voor transparante beschermfolies (Paint Protection Film) te introduceren voor carrosseriedelen die het meest kwetsbaar zijn voor schade (bumper, motorkap, spiegels, dorpels).", soon: "(Binnenkort)", funFactTitle: "Leuk weetje:", whyWorthItTitle: "Waarom?", showAllPhotos: "Toon alle foto's",
    pricingTitleFull: "Prijslijst – D.Kokott Uw Visie Onze Uitvoering", priceCatWrapping: "Wrapping", priceSubCatColorChange: "Kleurverandering", priceSegmentCar: "Personenauto", priceSegmentSuvVan: "SUV/Busje", priceSegmentMotorcycle: "Motorfiets", priceSegmentTruck: "Vrachtwagen", priceSubCatElements: "Elementen Wrappen", priceElementRoof: "Dak", priceElementMirrors: "Spiegels", priceElementStripes: "Strepen", priceSubCatAdvertising: "Reclame", priceAdDoors: "Deurreclame", priceAdHalf: "Halve Wrap Ad", priceAdFull: "Volledige Wrap Ad", priceSubCatTinting: "Tinten", priceTintingWindows: "Ruiten Tinten", priceCatDetailing: "Detailing", priceSubCatWash: "Detailing Wasbeurt", priceWashBasic: "Basis Wasbeurt", priceWashDecon: "Was+Decontaminatie", priceSubCatProtection: "Lakbescherming", priceProtWax: "Wax", priceProtCeramic1y: "Keramisch 1j", priceProtCeramic3y: "Keramisch 3j", priceProtCeramic5y: "Keramisch 5j", priceIntCleaning: "Interieur Reiniging", priceIntUpholstery: "Bekleding Reinigen", priceIntLeather: "Leer Onderhoud", priceIntProtection: "Bekleding Bescherming", priceSubCatRenovation: "Renovatie", priceRenoWindows: "Glas Polijsten", priceRenoPlastics: "Kunststof Bescherming", priceCatFitting: "Add-on Installatie", priceFitSplitters: "Splitters", priceFitSpoilers: "Spoilers", priceFitDiffusers: "Diffusers", priceFitSills: "Sideskirts", priceIndividual: "Prijs op aanvraag", priceStartingFrom: "Vanaf", priceService: "Dienst", priceCarSegment: "Segment",
    priceNoteFull: "Prijzen zijn indicatief en kunnen variëren afhankelijk van het voertuig, de omvang van de werkzaamheden en het gekozen materiaal. Neem contact met ons op voor een gepersonaliseerde offerte.",
    contactDetails: "Contactgegevens",
    phoneNL_new: "NL Nummer 1",
    phoneNL_whatsapp: "NL Nummer 2 (WhatsApp)",
    phonePL: "PL Nummer",
    address: "Adres", location: "Locatie", contactForm: "Contactformulier", formName: "Naam", formEmail: "E-mail", formPhone: "Telefoon (Opt.)", formMessage: "Bericht", formConsent: "Ik ga akkoord met de verwerking van mijn persoonsgegevens (naam, e-mail, telefoon) door [Damian Kokott] om te reageren op de ingediende aanvraag. Het verstrekken van gegevens is vrijwillig maar noodzakelijk om de aanvraag te verwerken.", formSend: "Verstuur", formSending: "Verzenden...", formSuccess: "Bericht succesvol verzonden!", formError: "Fout bij het verzenden van het bericht. Probeer het later opnieuw.", formValidationError: "Vul de vereiste velden correct in.", validationName: "Voer uw naam en achternaam in.", validationEmail: "Voer een geldig e-mailadres in.", validationMessage: "Voer uw bericht in.", validationConsent: "Toestemming voor gegevensverwerking is vereist.", formNamePlaceholder: "Jan Jansen", formEmailPlaceholder: "email@voorbeeld.nl", formPhonePlaceholder: "+31 6 12345678", formMessagePlaceholder: "Uw bericht...", gallery: "Galerij", portfolioImageAlt: "Portfolio foto", ServiceImageAlt: "Dienst foto", noPhotosAvailable: "Geen foto's beschikbaar in de galerij.", photoLoadError: "Fout bij het laden van foto's.", footerRights: "Alle rechten voorbehouden.", privacyPolicy: "Privacybeleid", openMenu: "Open menu", closeMenu: "Sluit menu", enlargedPhotoTitle: "Vergrote foto", logoAlt: "Damian Kokott Logo", aboutImageAlt: "Damian Kokott - auto wrapping specialist", prevPhoto: "Vorige", nextPhoto: "Volgende"
  }
};


/* === FUNKCJE POMOCNICZE === */
function __(key, fallback = null) {
    const lang = localStorage.getItem('selectedLanguage') || 'pl';
    let translation = translations[lang]?.[key];
    // Fallback to Polish if key not found in current language (but not if current is PL)
    if (translation === undefined && lang !== 'pl') {
        translation = translations['pl']?.[key];
    }
    return translation === undefined ? (fallback !== null ? fallback : key) : translation;
}

/* === APLIKACJA TŁUMACZEŃ (Aktualizacja labeli cennika mobilnego) === */
function applyTranslations() {
    const lang = localStorage.getItem('selectedLanguage') || 'pl';
    document.documentElement.lang = lang;
    // Tłumaczenie elementów z data-translate
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const translation = __(key);
        const placeholderKey = el.getAttribute('data-translate-placeholder');

        if (placeholderKey) {
            if(el.placeholder !== __(placeholderKey)) el.placeholder = __(placeholderKey);
        } else if (el.hasAttribute('placeholder') && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
            const fbPlaceholderKey = `${key}Placeholder`;
            if(el.placeholder !== __(fbPlaceholderKey)) el.placeholder = __(fbPlaceholderKey, el.placeholder);
        }

        // Skip price value cells specifically identified
        if (el.tagName === 'TD' && el.hasAttribute('data-label') && el.getAttribute('data-label') === 'priceStartingFrom' && (el.hasAttribute('data-price') || el.innerText.toLowerCase().includes('€')) && key !== 'priceIndividual' && key !== 'soon') {
             // Do nothing, keep the price value
        } else if (el.querySelector('.soon-badge, .soon-badge-inline')) { // Handle elements with inline badges
            const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
            if (textNode && textNode.textContent.trim() !== translation.trim()) {
                textNode.textContent = translation + ' '; // Add space before badge
            } else if (!textNode && el.childNodes.length > 1) { // Maybe the text is the first node
                const firstNode = el.childNodes[0];
                 if(firstNode.nodeType === Node.TEXT_NODE && firstNode.textContent.trim() !== translation.trim()) {
                     firstNode.textContent = translation + ' ';
                 }
            }
        } else { // Handle simple text elements
            // Try finding the first text node child that has actual text
            const firstTextNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
             if (firstTextNode) {
                  // Update only if different to avoid unnecessary redraws
                  if (firstTextNode.textContent.trim() !== translation.trim()) {
                       firstTextNode.textContent = translation;
                  }
             } else if (el.children.length === 0 && el.tagName !== 'IMG' && el.tagName !== 'VIDEO' && el.tagName !== 'IFRAME') {
                  // Fallback for elements with no children, but not images/videos/iframes
                   if (el.innerText !== translation) {
                       el.innerText = translation;
                   }
             }
        }
    });

    // Tłumaczenie etykiet dla mobilnego cennika
    document.querySelectorAll('#cennik td[data-label]').forEach(td => {
        const labelKey = td.getAttribute('data-label');
        // Use translated labels for specific keys, fallback to the key itself
         if (labelKey !== 'priceService') { // 'priceService' is the main column title
            const translatedLabelText = __(labelKey, labelKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())); // Attempt auto-formatting if translation missing
            td.setAttribute('data-translated-label', translatedLabelText + ':'); // Add colon for clarity
         } else {
             td.removeAttribute('data-translated-label'); // Remove attribute for main service column
         }
    });

    updateAriaLabels();
    updateImageAlts();
}

// Aktualizacja ARIA labels
function updateAriaLabels() {
    const hamburgerButton = document.getElementById('hamburger-button');
    if (hamburgerButton) {
        const isNavOpen = document.querySelector('.page-header')?.classList.contains('nav-open');
        hamburgerButton.setAttribute('aria-label', __(isNavOpen ? 'closeMenu' : 'openMenu'));
        hamburgerButton.setAttribute('aria-expanded', isNavOpen ? 'true' : 'false');
    }
    document.querySelectorAll('#imageModal button.prev').forEach(btn => btn.setAttribute('aria-label', __('prevPhoto')));
    document.querySelectorAll('#imageModal button.next').forEach(btn => btn.setAttribute('aria-label', __('nextPhoto')));
    document.querySelectorAll('.close-modal-btn').forEach(btn => btn.setAttribute('aria-label', __('closeMenu'))); // Assuming closeMenu fits here
    // Update ARIA for service sliders
    document.querySelectorAll('.service-slider-wrapper .slider-nav.prev').forEach(btn => btn.setAttribute('aria-label', __('prevPhoto')));
    document.querySelectorAll('.service-slider-wrapper .slider-nav.next').forEach(btn => btn.setAttribute('aria-label', __('nextPhoto')));
    document.querySelectorAll('.service-slider-dots .dot').forEach((dot, index) => dot.setAttribute('aria-label', `${__('Slide', 'Slide')} ${index + 1}`)); // Need 'Slide' translation if needed
}

// Aktualizacja ALT tekstów dla obrazów
function updateImageAlts() {
    document.querySelectorAll('.logo img').forEach(img => img.alt = __('logoAlt'));
    const aboutImg = document.querySelector('.o-mnie-img img');
    if (aboutImg) aboutImg.alt = __('aboutImageAlt');

    // Slidery usług
    document.querySelectorAll('.service-item').forEach(serviceItem => {
        const serviceId = serviceItem.id;
        if (!serviceId) return;
        const serviceTitleKey = serviceId.replace('service-', 'svc') + 'Title';
        const serviceTitleText = __(serviceTitleKey, serviceId.replace('service-','').replace('-', ' ')); // Fallback title
        serviceItem.querySelectorAll('.service-slider-images img').forEach((img, index) => {
            img.alt = `${__('ServiceImageAlt', 'Service image')} ${index + 1} - ${serviceTitleText}`;
        });
    });

    // Siatka portfolio główna
    document.querySelectorAll('#portfolio .portfolio-grid .portfolio-item img').forEach((img, index) => {
         const src = img.getAttribute('src');
         const filename = src ? src.split('/').pop() : `item ${index + 1}`;
        img.alt = `${__('portfolioImageAlt', 'Portfolio image')} - ${filename}`;
    });

     // Obraz w modalu głównym (#imageModal)
    const modalImage = document.getElementById('modalImage');
    if (modalImage && modalImage.getAttribute('src')) {
         const src = modalImage.getAttribute('src');
         const filename = src ? src.split('/').pop() : '';
         // Alt jest ustawiany dynamicznie w openImageModal/changeModalImage, tutaj tylko fallback jeśli jest już widoczne
         if (!modalImage.alt || modalImage.alt === "") {
              modalImage.alt = `${__('enlargedPhotoTitle', 'Enlarged photo')} - ${filename}`;
         }
    }

    // Siatka galerii w modalu (#allPhotosGrid)
    document.querySelectorAll('#allPhotosGrid img').forEach((img, index) => {
        const src = img.getAttribute('src');
        const filename = src ? src.split('/').pop() : `gallery item ${index + 1}`;
        img.alt = `${__('gallery', 'Gallery')} - ${filename} (${index + 1}/${galleryModalImages.length})`;
    });
}

// Zmiana języka
function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    applyTranslations();
    updateLanguageButtons(lang);
    // WAŻNE: Trzeba odświeżyć slidery po zmianie języka, aby zaktualizować ALTy
    createAutoSliderContent();
}

// Aktualizacja przycisków języka
function updateLanguageButtons(activeLang) {
    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-lang') === activeLang);
    });
}


/* === HEADER BEHAVIOR === */
function handleHeaderScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.getElementById('dynamic-header');
    if (!header) return;
    // Shrink only if scrolling down past threshold
    if (scrollTop > headerScrollThreshold && scrollTop > lastScrollTop) {
        header.classList.add('header-shrunk');
    }
    // Unshrink if scrolling up or near the top
    else if (scrollTop < lastScrollTop || scrollTop <= 10) {
        header.classList.remove('header-shrunk');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}

/* === SCROLL PROGRESS BAR === */
function updateScrollProgressBar() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(scrollProgress, 100)}%`;
}


/* === NAWIGACJA & SEKCJE (Poprawiona logika show/hide Cennika) === */

// Aktualizacja aktywnego linku nawigacji (logika bez zmian)
function updateActiveNav(activeSectionId) {
    if (isScrolling) return;
    updateActiveNavBasedOnId(activeSectionId || 'hero');
}

// Ustawia klasę .active na podstawie ID sekcji
function updateActiveNavBasedOnId(id) {
    document.querySelectorAll('#main-nav a, #main-nav-mobile a').forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkSection = linkHref?.startsWith('#') ? linkHref.substring(1) : null;

        if (!linkSection) return; // Skip links without href="#..."

        let isActive = linkSection === id;

        // Specjalna obsługa dla linku "Usługi"
        if (id?.startsWith('service-') && linkSection === 'uslugi') {
            isActive = true; // Aktywuj "Usługi", gdy podsekcja usługi jest aktywna
        } else if (linkSection !== 'uslugi' && id?.startsWith('service-')) {
            // Deaktywuj inne linki (nie "Usługi") gdy podsekcja usługi jest aktywna
           // isActive jest już false z pierwszej linii, więc ok
        } else if (id === 'cennik' && linkSection === 'cennik') {
            isActive = true; // Aktywuj "Cennik" gdy sekcja cennika jest aktywna
        }

        link.classList.toggle('active', isActive);

        // Dodaj .active do rodzica (toggle) w podmenu, jeśli sublink jest aktywny
         if (isActive && link.closest('.dropdown-menu, .dropdown-menu-mobile')) {
             link.closest('li.nav-item-dropdown')?.querySelector('.dropdown-toggle, .dropdown-toggle-mobile')?.classList.add('active');
         } else if (!isActive && link.closest('.dropdown-menu, .dropdown-menu-mobile')) {
             // Sprawdź czy inny sublink nie jest aktywny przed usunięciem active z rodzica
              const parentLi = link.closest('li.nav-item-dropdown');
              if (parentLi && !parentLi.querySelector('.dropdown-menu a.active, .dropdown-menu-mobile a.active')) {
                   parentLi.querySelector('.dropdown-toggle, .dropdown-toggle-mobile')?.classList.remove('active');
              }
         }
    });
}


// Płynne przewijanie do sekcji
function scrollToSection(sectionId, event = null, offsetAdjustment = -10) {
    if (event) event.preventDefault();
    const sectionElement = document.getElementById(sectionId);
    const header = document.getElementById('dynamic-header');

    if (sectionElement && header) {
        isScrolling = true;
        const headerOffset = header.offsetHeight;
        // Ensure the section is visible before getting its position
        const wasHidden = sectionElement.style.display === 'none';
        if (wasHidden) sectionElement.style.display = 'block';

        const elementPosition = sectionElement.getBoundingClientRect().top;
        const targetScrollPosition = window.pageYOffset + elementPosition - headerOffset + offsetAdjustment;

         if (wasHidden && sectionElement.id !== 'cennik') {
            // If it was hidden but isn't the pricing section, we might not want to revert the display immediately
             // Revert only if needed after scroll? This part is tricky.
              // Maybe best handled by showSection. For now, keep it displayed if scroll happened.
        }

        window.scrollTo({ top: targetScrollPosition, behavior: "smooth" });

        // Sprawdzanie końca scrollowania
        let scrollEndCheckInterval;
        const checkScrollEnd = () => {
            if (Math.abs(window.pageYOffset - targetScrollPosition) < 5) {
                clearInterval(scrollEndCheckInterval);
                isScrolling = false;
                updateActiveNavBasedOnScroll(); // Zaktualizuj nawigację PO scrollu
            }
        };
        if (typeof scrollEndCheckInterval !== 'undefined') clearInterval(scrollEndCheckInterval);
        scrollEndCheckInterval = setInterval(checkScrollEnd, 50);

        // Timeout na wypadek, gdyby event 'scroll' się nie zakończył (np. przez inne skrypty)
        setTimeout(() => {
            clearInterval(scrollEndCheckInterval);
            if (isScrolling) {
                isScrolling = false;
                updateActiveNavBasedOnScroll(); // Zaktualizuj na wszelki wypadek
            }
        }, 1000); // Czas oczekiwania na koniec scrollowania

    } else {
        console.warn(`Section "#${sectionId}" or header not found.`);
        isScrolling = false; // Zresetuj flagę, jeśli element nie istnieje
    }
}

// Aktualizacja nawigacji podczas scrollowania (Intersection Observer to zrobi lepiej)
// Ta funkcja może służyć jako fallback lub do aktualizacji po programowym scrollu
function updateActiveNavBasedOnScroll() {
    if (isScrolling) return; // Nie aktualizuj, jeśli programowo przewijamy
    const sections = document.querySelectorAll('#main-content > .main-wrapper > .section-container[id]');
    let currentSectionId = null;
    const headerHeight = document.getElementById('dynamic-header')?.offsetHeight || 80;
    const offset = headerHeight + 30; // Threshold

    sections.forEach(sec => {
        const isVisible = window.getComputedStyle(sec).display !== 'none';
        if (!isVisible) return; // Pomiń ukryte sekcje

        const rect = sec.getBoundingClientRect();
        // Sekcja jest uznawana za aktywną, jeśli jej góra jest powyżej offsetu, a dół poniżej offsetu
        if (rect.top <= offset && rect.bottom >= offset) {
            currentSectionId = sec.id;
            // Jeśli to sekcja Usługi, sprawdź podsekcje
            if (sec.id === 'uslugi') {
                sec.querySelectorAll('.service-item[id]').forEach(item => {
                    const itemRect = item.getBoundingClientRect();
                    if (itemRect.top <= offset && itemRect.bottom >= offset) {
                        currentSectionId = item.id; // Nadpisz ID na podsekcję
                    }
                });
            }
        }
    });

    // Przypadki brzegowe: na samej górze i na samym dole
    if (!currentSectionId && window.scrollY < 100) {
        currentSectionId = 'hero';
    } else if (!currentSectionId && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
         // Znajdź ostatnią WIDOCZNĄ sekcję
        const lastVisibleSection = Array.from(sections).reverse().find(sec => window.getComputedStyle(sec).display !== 'none');
        if (lastVisibleSection) currentSectionId = lastVisibleSection.id;
    }
    updateActiveNavBasedOnId(currentSectionId || 'hero'); // Użyj 'hero' jako fallback
}


// Pokazywanie sekcji i ukrywanie innych (POPRAWIONE DLA CENNIKA)
function showSection(targetId, event = null) {
    if (event) event.preventDefault();
    const allSections = document.querySelectorAll('#main-content > .main-wrapper > section[id]');
    const isServiceSubSection = targetId.startsWith('service-');
    const mainTargetSectionId = isServiceSubSection ? 'uslugi' : targetId;
    const targetSection = document.getElementById(mainTargetSectionId);

    if (!targetSection) {
        console.warn(`Section container "#${mainTargetSectionId}" not found.`);
        return;
    }

    // Pokaż targetSection, ukryj wszystkie inne
    allSections.forEach(sec => {
        sec.style.display = (sec.id === mainTargetSectionId) ? 'block' : 'none';
    });

    // Przewiń do odpowiedniego elementu (podsekcji lub głównej sekcji)
    const elementToScrollTo = document.getElementById(targetId) || targetSection;
     if(elementToScrollTo) {
         // Dajemy małe opóźnienie przed scrollowaniem, aby DOM zdążył się zaktualizować (szczególnie jeśli sekcja była ukryta)
          setTimeout(() => {
              scrollToSection(elementToScrollTo.id);
          }, 50);
     } else {
         // Fallback - scrolluj do głównej sekcji, jeśli podsekcja nie istnieje
          setTimeout(() => {
              scrollToSection(mainTargetSectionId);
          }, 50);
     }

    updateActiveNavBasedOnId(targetId || mainTargetSectionId);
}

// Pokazywanie strony głównej (wszystko oprócz cennika)
function showHome(event = null) {
    if (event) event.preventDefault();
    document.querySelectorAll('#main-content > .main-wrapper > section[id]').forEach(sec => {
        sec.style.display = (sec.id === 'cennik') ? 'none' : 'block'; // Cennik ukryty, reszta widoczna
    });
    scrollToSection('hero');
    updateActiveNavBasedOnId('hero');
}

function scrollToTop(event = null) { // Logo click handler
    showHome(event); // Pokaż stronę główną
}

// Obsługa kliknięć w nawigacji
function handleNavClick(event) { // Dla Desktop i linków głównych mobile
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
        const sectionId = href.substring(1);
        if (sectionId === 'hero') {
            showHome(event); // Specjalna obsługa dla 'hero'
        } else {
            showSection(sectionId, event);
        }
    }
}
function handleMobileNavClick(event) { // Dla linków wewnątrz menu mobilnego
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const isSubmenuToggle = event.currentTarget.classList.contains('dropdown-toggle-mobile');

    if (href && href.startsWith('#') && !isSubmenuToggle) {
        const sectionId = href.substring(1);
        closeMobileMenu(); // Zamknij menu po kliknięciu
        if (sectionId === 'hero') {
            showHome(event);
        } else {
            showSection(sectionId, event);
        }
    } else if (isSubmenuToggle) {
        // Jeśli to toggle, obsłuży go inna funkcja (toggleMobileSubMenu)
        // Ale nadal zatrzymaj domyślną akcję
        event.stopPropagation(); // Zapobiegaj propagacji do rodziców
    }
}


/* === MOBILE MENU === */
function toggleMobileMenu() {
    const header = document.querySelector('.page-header');
    const navMobile = document.getElementById('main-nav-mobile');
    const hamburgerButton = document.getElementById('hamburger-button');
    const isNavOpen = header.classList.toggle('nav-open');
    document.body.classList.toggle('nav-open', isNavOpen);
    navMobile.setAttribute('aria-hidden', !isNavOpen);
    hamburgerButton.setAttribute('aria-expanded', isNavOpen ? 'true' : 'false');
    hamburgerButton.setAttribute('aria-label', __(isNavOpen ? 'closeMenu' : 'openMenu'));

    if (isNavOpen) {
        // Focus na pierwszym elemencie w menu mobilnym
         const focusableElements = getFocusableElements(navMobile);
         if(focusableElements.length > 0) focusableElements[0].focus();
         previouslyFocusedElement = hamburgerButton; // Zapamiętaj hamburger do powrotu
    } else {
        closeAllMobileSubMenus();
        // Focus wraca na hamburger po zamknięciu
        if(previouslyFocusedElement) previouslyFocusedElement.focus();
    }
}
function closeMobileMenu() {
    const header = document.querySelector('.page-header');
    if (header?.classList.contains('nav-open')) {
        toggleMobileMenu(); // Użyj toggle, aby zapewnić poprawny stan i focus
    }
}
function closeAllMobileSubMenus() {
    document.querySelectorAll('#main-nav-mobile .nav-item-dropdown.submenu-open').forEach(item => {
        item.classList.remove('submenu-open');
        const submenu = item.querySelector('.dropdown-menu-mobile');
        if (submenu) submenu.style.maxHeight = null; // Usuń inline style
        const toggle = item.querySelector('.dropdown-toggle-mobile');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
}
function toggleMobileSubMenu(event) {
    event.preventDefault(); // Zapobiegaj przejściu do #uslugi
    event.stopPropagation(); // Zatrzymaj propagację

    const parentLi = event.currentTarget.closest('.nav-item-dropdown');
    if (!parentLi) return;
    const submenu = parentLi.querySelector('.dropdown-menu-mobile');
    const isOpen = parentLi.classList.toggle('submenu-open');
    event.currentTarget.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    if (isOpen) {
        // Close other open submenus
        document.querySelectorAll('#main-nav-mobile .nav-item-dropdown.submenu-open').forEach(otherLi => {
            if (otherLi !== parentLi) {
                otherLi.classList.remove('submenu-open');
                const otherSubmenu = otherLi.querySelector('.dropdown-menu-mobile');
                if (otherSubmenu) otherSubmenu.style.maxHeight = null;
                const otherToggle = otherLi.querySelector('.dropdown-toggle-mobile');
                 if(otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
            }
        });
        // Open the current submenu
        submenu.style.maxHeight = submenu.scrollHeight + "px";
    } else {
        // Close the current submenu
        submenu.style.maxHeight = null;
    }
}


/* === MODALE (Zarządzanie Fokusem, Poprawiona Galeria) === */
function getFocusableElements(container) { return Array.from(container.querySelectorAll('a[href]:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), img[role="button"], [role="button"][tabindex="0"]')).filter(el => el.offsetParent !== null); }
function trapFocusInModal(e) { if (!currentOpenModal || e.key !== 'Tab') return; const focusableElements = getFocusableElements(currentOpenModal); if (focusableElements.length === 0) return; const firstFocusableElement = focusableElements[0]; const lastFocusableElement = focusableElements[focusableElements.length - 1]; const currentFocusedElement = document.activeElement; // Dodano fallback - jeśli focus jest poza modalem, traktuj jak shift+tab z pierwszego
    if (!currentOpenModal.contains(currentFocusedElement)) { e.preventDefault(); lastFocusableElement.focus(); return; } if (e.shiftKey) { if (currentFocusedElement === firstFocusableElement) { e.preventDefault(); lastFocusableElement.focus(); } } else { if (currentFocusedElement === lastFocusableElement) { e.preventDefault(); firstFocusableElement.focus(); } } }
function openModal(modalElement) { if (!modalElement) return; previouslyFocusedElement = document.activeElement; // Zapamiętaj focus
    modalElement.style.display = 'block'; document.body.classList.add('modal-open'); currentOpenModal = modalElement; modalElement.setAttribute('aria-hidden', 'false'); // Pokaż modal dla AT
    // Schowaj resztę strony dla AT
    document.querySelectorAll('body > *:not(.modal)').forEach(el => el.setAttribute('aria-hidden', 'true'));
    const focusableElements = getFocusableElements(modalElement); const elementToFocus = focusableElements.find(el => el.classList.contains('close-modal-btn')) || focusableElements[0]; if (elementToFocus) { setTimeout(() => elementToFocus.focus(), 50); } else { modalElement.setAttribute('tabindex', '-1'); setTimeout(() => modalElement.focus(), 50); } modalFocusTrapListener = trapFocusInModal; document.addEventListener('keydown', modalFocusTrapListener); }
function closeAllModals() { document.querySelectorAll('.modal').forEach(modal => { modal.style.display = 'none'; modal.setAttribute('aria-hidden', 'true'); }); document.body.classList.remove('modal-open'); // Przywróć widoczność reszty strony dla AT
    document.querySelectorAll('body > *:not(.modal)').forEach(el => el.removeAttribute('aria-hidden')); currentOpenModal = null; if(modalFocusTrapListener) { document.removeEventListener('keydown', modalFocusTrapListener); modalFocusTrapListener = null; } if (previouslyFocusedElement) { try { previouslyFocusedElement.focus(); } catch(e) { console.warn("Could not focus previous element", e)} previouslyFocusedElement = null; } }
// Otwieranie modalu obrazu (logika ALT i tytułu poprawiona)
function openImageModal(imgSrc, imageSet = portfolioImages, index = 0) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle'); // Nagłówek dla AT

    if (!modal || !modalImg || !modalTitle) return;

    currentModalImageSet = imageSet;
    currentImageIndex = index;

    // Alt i tytuł dla dostępności
    const filename = imgSrc ? imgSrc.split('/').pop() : '';
    const altText = `${__('enlargedPhotoTitle', 'Enlarged photo')} - ${filename} (${index + 1}/${imageSet.length})`;
    modalImg.src = imgSrc;
    modalImg.alt = altText;
    modalTitle.textContent = altText; // Ustaw tekst nagłówka dla czytników

    const prevBtn = modal.querySelector('.prev');
    const nextBtn = modal.querySelector('.next');

    // Pokaż/ukryj przyciski nawigacji
    if (currentModalImageSet.length > 1) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    openModal(modal); // Otwórz modal i ustaw focus
}

// Zmiana obrazu w modalu
function changeModalImage(newIndex) {
    if (!currentModalImageSet || currentModalImageSet.length === 0) return;

    currentImageIndex = (newIndex + currentModalImageSet.length) % currentModalImageSet.length;

    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');

    if (modalImg && modalTitle) {
        const newSrc = currentModalImageSet[currentImageIndex];
        modalImg.style.opacity = '0'; // Rozpocznij animację zanikania

        setTimeout(() => {
            const filename = newSrc ? newSrc.split('/').pop() : '';
             const altText = `${__('enlargedPhotoTitle', 'Enlarged photo')} - ${filename} (${currentImageIndex + 1}/${currentModalImageSet.length})`;
            modalImg.src = newSrc;
            modalImg.alt = altText;
            modalTitle.textContent = altText;
            modalImg.style.opacity = '1'; // Zakończ animację pojawiania
        }, 200); // Czas trwania przejścia (krótszy niż fade)
    }
}

// Następny/Poprzedni obraz
function nextImage() { changeModalImage(currentImageIndex + 1); }
function prevImage() { changeModalImage(currentImageIndex - 1); }

// Otwieranie modalu z całą galerią (POPRAWIONE interakcje)
function openAllPhotosModal() {
    const modal = document.getElementById('allPhotosModal');
    const grid = document.getElementById('allPhotosGrid');
    if (!modal || !grid) return;

    grid.innerHTML = ''; // Wyczyść siatkę

    if (galleryModalImages.length > 0) {
        galleryModalImages.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            const filename = imgSrc.split('/').pop();
             img.alt = `${__('gallery', 'Gallery')} - ${filename} (${index + 1}/${galleryModalImages.length})`; // Opisowy Alt
            img.loading = 'lazy';
            img.setAttribute('role', 'button');
            img.setAttribute('tabindex', '0'); // Umożliwia focus klawiaturą

            // KLIKNIĘCIE: Otwórz w głównym modalu
            img.addEventListener('click', () => {
                openImageModal(imgSrc, galleryModalImages, index);
                 // Można opcjonalnie zamknąć modal galerii po kliknięciu
                 // closeAllModals(); // Odkomentuj, jeśli chcesz zamknąć #allPhotosModal po kliknięciu
            });
             // KLAWIATURA: Enter/Spacja otwiera w głównym modalu
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openImageModal(imgSrc, galleryModalImages, index);
                     // closeAllModals(); // Opcjonalnie zamknij
                }
            });
            grid.appendChild(img);
        });
    } else {
        grid.innerHTML = `<p>${__('noPhotosAvailable')}</p>`;
    }
    openModal(modal); // Otwórz modal galerii
}


/* === FORMULARZ === */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const consentCheckbox = document.getElementById('consent');
function setFormStatus(message, isSuccess = false) { if (formStatus) { formStatus.textContent = message; formStatus.className = isSuccess ? 'success' : 'error'; } }
function showError(input, message, isCheckbox = false) { const formGroup = input.closest('.form-group'); if (!formGroup) return; input.classList.add('error'); input.setAttribute('aria-invalid', 'true'); const errorId = input.id + '-error'; const existingError = formGroup.querySelector('#' + errorId); if (existingError) existingError.remove(); const error = document.createElement('span'); error.className = 'validation-error-message'; error.id = errorId; error.textContent = message; formGroup.appendChild(error); input.setAttribute('aria-describedby', errorId); if(isCheckbox){ input.closest('.form-consent')?.querySelector('label')?.classList.add('consent-error-indicator'); }}
function clearError(input) { const formGroup = input.closest('.form-group'); if (!formGroup) return; input.classList.remove('error'); input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); const error = formGroup.querySelector('.validation-error-message'); if (error) error.remove(); if(input.type === 'checkbox'){ input.closest('.form-consent')?.querySelector('label')?.classList.remove('consent-error-indicator'); }}
function clearFormValidation() { if(formStatus) {formStatus.textContent = ''; formStatus.className = '';} document.querySelectorAll('#contactForm .error').forEach(el => clearError(el)); }
function validateForm() { let isValid = true; clearFormValidation(); // Clear previous errors
    if (!nameInput.value.trim()) { showError(nameInput, __('validationName')); isValid = false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) { showError(emailInput, __('validationEmail')); isValid = false; }
    if (!messageInput.value.trim()) { showError(messageInput, __('validationMessage')); isValid = false; }
    if (!consentCheckbox.checked) { showError(consentCheckbox, __('validationConsent'), true); isValid = false; } return isValid; }
// Add real-time validation listeners (optional but good UX)
nameInput?.addEventListener('input', () => { if (nameInput.value.trim()) clearError(nameInput); });
emailInput?.addEventListener('input', () => { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; if (emailInput.value.trim() && emailRegex.test(emailInput.value.trim())) clearError(emailInput); });
messageInput?.addEventListener('input', () => { if (messageInput.value.trim()) clearError(messageInput); });
consentCheckbox?.addEventListener('change', () => { if (consentCheckbox.checked) clearError(consentCheckbox); });
// Submit handler (simulation only)
contactForm?.addEventListener('submit', async (event) => { event.preventDefault(); if (!validateForm()) { setFormStatus(__('formValidationError'), false); const firstError = contactForm.querySelector('.error'); firstError?.focus(); return; } const submitButton = contactForm.querySelector('button[type="submit"]'); submitButton.disabled = true; submitButton.setAttribute('aria-busy', 'true'); setFormStatus(__('formSending'), false); const formData = new FormData(contactForm); const data = Object.fromEntries(formData.entries()); try { console.log("Dane formularza do wysłania (symulacja):", data); /* === PRODUCTION: Replace simulation with actual fetch === const response = await fetch('/api/send-email', { // Your backend endpoint method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), }); if (!response.ok) { let errorMessage = __('formError'); try { const errorData = await response.json(); if(errorData && errorData.message) errorMessage = errorData.message; } catch (e) { console.warn("Could not parse error response JSON");} throw new Error(errorMessage); } setFormStatus(__('formSuccess'), true); contactForm.reset(); clearFormValidation(); */ // === SIMULATION CODE START ===
        await new Promise(resolve => setTimeout(resolve, 1500)); if (Math.random() > 0.1) { // Simulate success mostly
            setFormStatus(__('formSuccess'), true); contactForm.reset(); clearFormValidation(); } else { throw new Error(__('formError')); // Simulate occasional error
        } // === SIMULATION CODE END ===
         } catch (error) { console.error('Błąd wysyłania formularza:', error); setFormStatus(error.message || __('formError'), false); } finally { submitButton.disabled = false; submitButton.removeAttribute('aria-busy'); } });

/* === WYPEŁNIANIE TREŚCI (Portfolio, Slidery) === */
// Wypełnianie siatki portfolio na stronie głównej
function fillMainPortfolioGrid(maxItems = 3) {
    const grid = document.querySelector('#portfolio .portfolio-grid');
    if (!grid) return;
    grid.innerHTML = ''; // Wyczyść

    // Użyj portfolioImages LUB pierwszych `maxItems` z galleryModalImages jako fallback
    const imagesSource = (portfolioImages && portfolioImages.length >= maxItems) ? portfolioImages : galleryModalImages;
    const imagesToShow = imagesSource.slice(0, maxItems);

    if (imagesToShow.length > 0) {
        imagesToShow.forEach((imgSrc, index) => {
            const item = document.createElement('div');
            item.className = 'portfolio-item';
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            const img = document.createElement('img');
            img.src = imgSrc;
             const filename = imgSrc ? imgSrc.split('/').pop() : `item ${index + 1}`;
             img.alt = `${__('portfolioImageAlt', 'Portfolio image')} - ${filename}`; // Opisowy alt
            img.loading = 'lazy';
            img.onerror = function() { this.closest('.portfolio-item')?.remove(); console.warn(`Cannot load portfolio image: ${this.src}`); };

            item.appendChild(img);
            item.addEventListener('click', () => openImageModal(imgSrc, imagesSource, index)); // Użyj imageSource do nawigacji
            item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openImageModal(imgSrc, imagesSource, index); } });
            grid.appendChild(item);
        });
    } else {
        grid.innerHTML = `<p>${__('noPhotosAvailable')}</p>`;
    }
}


// Generowanie sliderów usług (POPRAWIONE zarządzanie widocznością)
function createAutoSliderContent() {
    // Wyczyść poprzednie interwały PRZED przebudową sliderów
    Object.values(serviceSliderIntervals).forEach(clearInterval);

    document.querySelectorAll('.service-item').forEach(serviceItem => {
        const sliderWrapper = serviceItem.querySelector('.service-slider-wrapper');
        if (!sliderWrapper) return;
        const imagesContainer = sliderWrapper.querySelector('.service-slider-images');
        const dotsContainer = sliderWrapper.querySelector('.service-slider-dots');
        const prevNav = sliderWrapper.querySelector('.slider-nav.prev');
        const nextNav = sliderWrapper.querySelector('.slider-nav.next');

        if (!imagesContainer || !dotsContainer || !prevNav || !nextNav) return;

        const serviceId = serviceItem.id;
        const count = serviceImageCounts[serviceId] || 0;

        // Reset kontenerów
        imagesContainer.innerHTML = '';
        dotsContainer.innerHTML = '';

        // Pokaż/ukryj wrapper w zależności od liczby zdjęć
        sliderWrapper.style.display = count > 0 ? 'block' : 'none';

        if (count > 0) {
            const serviceTitleKey = serviceId.replace('service-', 'svc') + 'Title';
            const serviceTitleText = __(serviceTitleKey, serviceId.replace('service-', '').replace('-', ' '));

            for (let i = 1; i <= count; i++) {
                const img = document.createElement('img');
                 img.src = `images/services/${serviceId}/${i}.jpg`; // ZAAKŁADAM .jpg
                img.loading = 'lazy';
                img.alt = `${__('ServiceImageAlt', 'Service image')} ${i} - ${serviceTitleText}`;
                 // Prosta obsługa błędów ładowania obrazu
                img.onerror = function() {
                     console.warn(`Nie można załadować obrazu usługi: ${this.src}`);
                     this.remove(); // Usuń uszkodzony element img
                     // Sprawdź, czy po usunięciu nadal są jakieś zdjęcia
                     const remainingImages = imagesContainer.querySelectorAll('img');
                     if (remainingImages.length === 0) {
                         sliderWrapper.style.display = 'none'; // Ukryj cały slider
                         stopSlider(serviceId); // Zatrzymaj interwał, jeśli istnieje
                     } else if (remainingImages.length <= 1) {
                         // Jeśli zostało 1 zdjęcie, ukryj kropki i strzałki
                         dotsContainer.style.display = 'none';
                         prevNav.style.display = 'none';
                         nextNav.style.display = 'none';
                         stopSlider(serviceId); // Zatrzymaj interwał
                         if(remainingImages.length === 1) remainingImages[0].classList.add('active'); // Upewnij się, że jest aktywne
                     }
                     // Nie trzeba tutaj restartować slidera, `initAutoServiceSliders` zrobi to po zakończeniu pętli
                };
                if (i === 1) img.classList.add('active'); // Pierwsze zdjęcie aktywne
                imagesContainer.appendChild(img);

                if (count > 1) { // Dodaj kropki tylko jeśli jest więcej niż 1 zdjęcie
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    dot.dataset.index = i - 1;
                    dot.setAttribute('role', 'button');
                    dot.setAttribute('tabindex', '0');
                    dot.setAttribute('aria-label', `${__('Slide', 'Slide')} ${i}`);
                    if (i === 1) dot.classList.add('active');
                    dotsContainer.appendChild(dot);
                }
            }

            // Pokaż/ukryj kropki i nawigację w zależności od (aktualnej) liczby zdjęć
            const visibleImages = imagesContainer.querySelectorAll('img'); // Liczba zdjęć, które się załadowały
            dotsContainer.style.display = visibleImages.length > 1 ? 'flex' : 'none';
            prevNav.style.display = visibleImages.length > 1 ? 'block' : 'none';
            nextNav.style.display = visibleImages.length > 1 ? 'block' : 'none';

        } else {
            // Jeśli count = 0, upewnij się, że wszystko jest ukryte
            sliderWrapper.style.display = 'none';
            dotsContainer.style.display = 'none';
            prevNav.style.display = 'none';
            nextNav.style.display = 'none';
             stopSlider(serviceId); // Zatrzymaj interwał, jeśli przypadkiem działał
        }
    });

    // Reinicjalizuj slidery po zbudowaniu treści
    initAutoServiceSliders();
}


/* === AUTO-SLIDER LOGIKA (POPRAWIONE czyszczenie/inicjalizacja) === */

// Funkcja do zatrzymywania interwału dla konkretnego slidera
function stopSlider(serviceId) {
    if (serviceSliderIntervals[serviceId]) {
        clearInterval(serviceSliderIntervals[serviceId]);
        delete serviceSliderIntervals[serviceId]; // Usuń ID z obiektu aktywnych interwałów
    }
}

// Inicjalizacja lub reinicjalizacja sliderów
function initAutoServiceSliders() {
     // Najpierw zatrzymaj WSZYSTKIE istniejące interwały przed ponowną inicjalizacją
    Object.keys(serviceSliderIntervals).forEach(id => stopSlider(id));

    document.querySelectorAll('.service-item .service-slider-wrapper').forEach(sliderWrapper => {
        // Pomiń slidery, które są ukryte (np. z powodu braku zdjęć)
        if (window.getComputedStyle(sliderWrapper).display === 'none') return;

        const images = Array.from(sliderWrapper.querySelectorAll('.service-slider-images img'));
        const dots = Array.from(sliderWrapper.querySelectorAll('.service-slider-dots .dot'));
        const prevBtn = sliderWrapper.querySelector('.slider-nav.prev');
        const nextBtn = sliderWrapper.querySelector('.slider-nav.next');
        const serviceId = sliderWrapper.closest('.service-item')?.id;

        // Pomiń jeśli brak ID lub mniej niż 2 obrazy
        if (!serviceId || images.length <= 1) {
             // Upewnij się, że nawigacja jest ukryta
             if(prevBtn) prevBtn.style.display = 'none';
             if(nextBtn) nextBtn.style.display = 'none';
             if(dots.length > 0) dots[0].parentElement.style.display = 'none';
            return;
        }

        // Upewnij się, że nawigacja jest widoczna (bo mamy >1 obraz)
         if(prevBtn) prevBtn.style.display = 'block';
         if(nextBtn) nextBtn.style.display = 'block';
         if(dots.length > 0) dots[0].parentElement.style.display = 'flex';


        let currentIndex = images.findIndex(img => img.classList.contains('active'));
        if (currentIndex === -1) currentIndex = 0; // Fallback na pierwszy

        // Funkcje slidera
        const showSlide = (index) => {
            if (images.length === 0) return; // Safety check
            currentIndex = (index + images.length) % images.length;
            images.forEach((img, i) => img.classList.toggle('active', i === currentIndex));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        };
        const nextSlide = () => { showSlide(currentIndex + 1); };
        const prevSlide = () => { showSlide(currentIndex - 1); };

        // Usuń STARE listenery, aby uniknąć duplikatów
        const currentPrevHandler = sliderWrapper.__prevHandler;
        if (currentPrevHandler) prevBtn?.removeEventListener('click', currentPrevHandler);
        const currentNextHandler = sliderWrapper.__nextHandler;
        if (currentNextHandler) nextBtn?.removeEventListener('click', currentNextHandler);
         dots.forEach(dot => {
             const currentDotClickHandler = dot.__dotClickHandler;
             if (currentDotClickHandler) dot.removeEventListener('click', currentDotClickHandler);
              const currentDotKeyHandler = dot.__dotKeyHandler;
             if (currentDotKeyHandler) dot.removeEventListener('keydown', currentDotKeyHandler);
         });
         const currentPauseHandler = sliderWrapper.__pauseHandler;
         if(currentPauseHandler) sliderWrapper.removeEventListener('mouseenter', currentPauseHandler);
         const currentResumeHandler = sliderWrapper.__resumeHandler;
         if(currentResumeHandler) sliderWrapper.removeEventListener('mouseleave', currentResumeHandler);


        // Nowe handlery
        const prevSlideHandler = () => { stopSlider(serviceId); prevSlide(); };
        const nextSlideHandler = () => { stopSlider(serviceId); nextSlide(); };
        const dotClickHandler = (e) => { const index = parseInt(e.target.dataset.index, 10); stopSlider(serviceId); showSlide(index); };
        const dotKeyHandler = (e) => { if (e.key === 'Enter' || e.key === ' ') { const index = parseInt(e.target.dataset.index, 10); stopSlider(serviceId); showSlide(index); } };
        const startSlider = () => { // Start/restart
             stopSlider(serviceId); // Wyczyść poprzedni dla tego ID
             serviceSliderIntervals[serviceId] = setInterval(nextSlide, autoSlideInterval);
        };
        const pauseHandler = () => stopSlider(serviceId);
        const resumeHandler = startSlider; // restartuje interwał

         // Przypisz nowe listenery i zapisz referencje
        prevBtn?.addEventListener('click', prevSlideHandler);
        sliderWrapper.__prevHandler = prevSlideHandler;
        nextBtn?.addEventListener('click', nextSlideHandler);
        sliderWrapper.__nextHandler = nextSlideHandler;
        dots.forEach(dot => {
            dot.addEventListener('click', dotClickHandler);
            dot.__dotClickHandler = dotClickHandler;
             dot.addEventListener('keydown', dotKeyHandler);
             dot.__dotKeyHandler = dotKeyHandler;
        });

        if (pauseOnHover) {
             sliderWrapper.addEventListener('mouseenter', pauseHandler);
             sliderWrapper.__pauseHandler = pauseHandler;
             sliderWrapper.addEventListener('mouseleave', resumeHandler);
             sliderWrapper.__resumeHandler = resumeHandler;
        }

        // Pokaż pierwszy slajd i uruchom
        showSlide(currentIndex);
        startSlider();
    });
}

/* === Intersection Observer (Bez zmian) === */
function initIntersectionObserver() {
    if (intersectionObserver) intersectionObserver.disconnect();
    const sectionsAndItems = document.querySelectorAll('#main-content > .main-wrapper > .section-container[id], #uslugi .service-item[id]');
    if (!sectionsAndItems.length) return;

    const headerHeight = document.getElementById('dynamic-header')?.offsetHeight || 80;
     // rootMargin: top od dołu headera, bottom od -60% wysokości viewportu (czyli punkt aktywacji jest dość wysoko)
    const options = { root: null, rootMargin: `-${headerHeight + 30}px 0px -60% 0px`, threshold: 0 };

    const callback = (entries) => {
        if (isScrolling) return; // Ignoruj, gdy przewijamy programowo

        let bestVisibleEntry = null;
        entries.forEach(entry => {
             const isVisibleStyle = window.getComputedStyle(entry.target).display !== 'none'; // Sprawdź, czy element jest widoczny w CSS
             if (entry.isIntersecting && isVisibleStyle) {
                  // Wybierz najlepiej widoczny element (największy intersectionRatio lub najwyżej położony przy tym samym ratio)
                  if (!bestVisibleEntry || entry.intersectionRatio > bestVisibleEntry.intersectionRatio ||
                      (entry.intersectionRatio === bestVisibleEntry.intersectionRatio && entry.boundingClientRect.top < bestVisibleEntry.boundingClientRect.top)) {
                     bestVisibleEntry = entry;
                 }
            }
        });

        let activeId = null;
        if (bestVisibleEntry) {
             activeId = bestVisibleEntry.target.id;
        }

         // Poprawki dla skrajnych przypadków (góra/dół strony)
        if (window.scrollY < 100) {
             activeId = 'hero'; // Jesteśmy na górze, aktywuj hero
        } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
             // Jesteśmy blisko dołu, aktywuj ostatnią WIDOCZNĄ sekcję
             const lastVisibleSection = Array.from(sectionsAndItems).reverse().find(sec => window.getComputedStyle(sec).display !== 'none' && sec.id);
            if (lastVisibleSection) activeId = lastVisibleSection.id;
        }

        updateActiveNavBasedOnId(activeId || 'hero'); // Ustaw 'hero' jako fallback
    };

    intersectionObserver = new IntersectionObserver(callback, options);
    sectionsAndItems.forEach(el => intersectionObserver.observe(el));
}


/* === INICJALIZACJA STRONY === */
document.addEventListener('DOMContentLoaded', () => {
  // Ustaw rok w stopce
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

  // Wypełnij treści dynamiczne
  createAutoSliderContent(); // Stwórz slidery przed inicjalizacją listenerów
  fillMainPortfolioGrid();   // Wypełnij główną siatkę portfolio

  // Ustaw język
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'pl';
  document.documentElement.lang = savedLanguage;
  applyTranslations(); // Zastosuj tłumaczenia
  updateLanguageButtons(savedLanguage); // Ustaw aktywny przycisk języka

  // Wygeneruj przyciski języków
  const langSwitcher = document.querySelector('.language-switcher');
  if(langSwitcher) {
      langSwitcher.innerHTML = ''; // Wyczyść, aby uniknąć duplikatów
      ['pl', 'en', 'nl'].forEach(lang => {
           const btn = document.createElement('button');
           btn.dataset.lang = lang;
           btn.textContent = lang.toUpperCase();
           btn.addEventListener('click', () => changeLanguage(lang));
           if (lang === savedLanguage) btn.classList.add('active');
           langSwitcher.appendChild(btn);
      });
  }

  // Pokaż stronę główną (ukrywając cennik)
  showHome();

  // Inicjalizuj scroll listenery
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Ustaw stan początkowy headera
  window.addEventListener('scroll', updateScrollProgressBar, { passive: true });
  updateScrollProgressBar(); // Ustaw stan początkowy paska postępu

  // Inicjalizuj Intersection Observer
  initIntersectionObserver();

  // Ustaw główne listenery zdarzeń
  setupEventListeners();

  // Finalna aktualizacja nawigacji po załadowaniu
  setTimeout(() => {
    isScrolling = false; // Upewnij się, że flaga jest wyłączona
    updateActiveNavBasedOnScroll();
  }, 150); // Daj chwilę na renderowanie
});


/* === GŁÓWNE LISTENERY ZDARZEŃ === */
function setupEventListeners() {
    // Kliknięcie logo -> Pokaż Home
    document.querySelectorAll('.logo').forEach(logo => { logo.addEventListener('click', scrollToTop); });

    // Przycisk Hamburger
    document.getElementById('hamburger-button')?.addEventListener('click', toggleMobileMenu);

    // Nawigacja Desktop i Mobilna (linki główne i podmenu)
    document.querySelectorAll('#main-nav a[href^="#"], #main-nav-mobile a[href^="#"]').forEach(link => {
         // Dodaj warunek, by nie przypisywać listenera do toggle mobilnego podmenu tutaj
         if (!link.classList.contains('dropdown-toggle-mobile')) {
             const handler = link.closest('#main-nav-mobile') ? handleMobileNavClick : handleNavClick;
            link.addEventListener('click', handler);
         }
    });

    // Toggle podmenu mobilnego
    document.querySelectorAll('#main-nav-mobile a.dropdown-toggle-mobile').forEach(toggle => {
        toggle.addEventListener('click', toggleMobileSubMenu);
    });

    // Zamykanie Modali
    document.querySelectorAll('.close-modal-btn').forEach(btn => btn.addEventListener('click', closeAllModals));

    // Nawigacja w modalu obrazu
    document.querySelector('#imageModal .prev')?.addEventListener('click', prevImage);
    document.querySelector('#imageModal .next')?.addEventListener('click', nextImage);

    // Przycisk "Pokaż wszystkie zdjęcia"
    document.querySelector('.btn-show-all')?.addEventListener('click', openAllPhotosModal);

    // Klawisz Escape do zamykania
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (currentOpenModal) { closeAllModals(); } // Najpierw zamknij modal
            else { closeMobileMenu(); } // Jeśli nie ma modala, zamknij menu mobilne
        }
    });

    // Kliknięcie poza modalem (na tło)
    document.addEventListener('click', (event) => {
        if (event.target.matches('.modal')) { // Sprawdź czy kliknięto DOKŁADNIE na tło modala
            closeAllModals();
        }
    });

     // Listener zmiany rozmiaru okna (np. do przeliczenia offsetu headera lub IntersectionObservera)
     // window.addEventListener('resize', handleResize); // Opcjonalnie, jeśli potrzebne
}

// Opcjonalna funkcja obsługi zmiany rozmiaru okna
/*
function handleResize() {
    // Tutaj można np. ponownie zainicjować IntersectionObserver lub przeliczyć jakieś wymiary
    // Przykład: initIntersectionObserver();
    // Lub: closeMobileMenu(); // Zamknij menu mobilne przy zmianie rozmiaru, aby uniknąć problemów z layoutem
}
*/