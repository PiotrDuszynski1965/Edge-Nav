# Garmin Edge PWA — Instrukcja wgrania na home.pl

## Zawartość paczki

```
edge-app/
├── index.html          ← główna aplikacja (komputer rowerowy)
├── manifest.json       ← konfiguracja PWA (ikona, nazwa, tryb fullscreen)
├── sw.js               ← Service Worker (działa offline po pierwszym załadowaniu)
├── apple-touch-icon.png  ← ikona 180×180 (iPhone ekran główny)
├── icon-120.png        ← ikona 120×120 (iPhone Retina)
├── icon-152.png        ← ikona 152×152 (iPad)
├── icon-192.png        ← ikona 192×192 (Android / PWA)
├── icon-512.png        ← ikona 512×512 (splash screen)
└── README.txt          ← ta instrukcja
```

---

## KROK 1 — Kup hosting w home.pl

1. Zaloguj się na https://home.pl
2. Kliknij "Hosting" → "Zamów hosting"
3. Wybierz plan **Home S** (~5 zł/mies.)
4. Podczas zakupu przypisz swoją domenę do hostingu

---

## KROK 2 — Pobierz FileZilla (FTP)

Pobierz bezpłatnie: https://filezilla-project.org/download.php?type=client

---

## KROK 3 — Dane FTP z home.pl

1. Zaloguj się na home.pl → Panel klienta
2. Kliknij swój hosting → "Dostęp FTP"
3. Zapisz:
   - **Serwer FTP:** ftp.twoja-domena.pl (lub podany w panelu)
   - **Login:** (podany w panelu)
   - **Hasło:** (ustaw w panelu)
   - **Port:** 21

---

## KROK 4 — Wgraj pliki przez FileZilla

1. Otwórz FileZilla
2. Wpisz dane FTP w górnym pasku → "Szybkie połączenie"
3. Po połączeniu po prawej stronie zobaczysz serwer
4. Wejdź do folderu **public_html**
5. Przeciągnij WSZYSTKIE pliki z tej paczki do public_html:
   ```
   index.html
   manifest.json
   sw.js
   apple-touch-icon.png
   icon-120.png
   icon-152.png
   icon-192.png
   icon-512.png
   ```
6. Poczekaj aż wszystkie pliki się wgrają

---

## KROK 5 — Sprawdź że działa

Otwórz w przeglądarce: https://twoja-domena.pl

Powinien załadować się Garmin Edge.

---

## KROK 6 — Zainstaluj na iPhone jako aplikacja

1. Otwórz Safari na iPhonie
2. Wejdź na https://twoja-domena.pl
3. Naciśnij przycisk **Udostępnij** (kwadrat ze strzałką w górę)
4. Przewiń w dół i naciśnij **"Dodaj do ekranu głównego"**
5. Naciśnij **"Dodaj"**

Gotowe! Na ekranie głównym pojawi się ikona "Edge Nav".
Aplikacja uruchamia się w trybie pełnoekranowym jak natywna.

---

## WAŻNE: HTTPS wymagane dla GPS

home.pl automatycznie daje darmowy certyfikat SSL (HTTPS).
GPS i nawigacja działają TYLKO na HTTPS — nie na http://.

Jeśli strona ładuje się przez http://, w panelu home.pl włącz:
Hosting → SSL → Let's Encrypt → Aktywuj

---

## Aktualizacja aplikacji

Gdy Claude przygotuje nową wersję:
1. Wgraj nowy index.html przez FileZilla (nadpisz stary)
2. W pliku sw.js zmień: `const CACHE_NAME = 'edge-nav-v2';` (zwiększ numer)
3. Wgraj nowy sw.js

iPhone automatycznie pobierze aktualizację przy następnym uruchomieniu.

---

Pytania? Zapytaj Claude — wie wszystko o tej aplikacji :)
