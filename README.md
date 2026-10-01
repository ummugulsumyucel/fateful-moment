# Fateful Moment

Fateful Moment, kullanıcıların farklı senaryolar üzerinden kararlar aldığı ve bu kararların sonucunda kişiselleştirilmiş bir **Decision DNA** profili oluşturduğu interaktif bir React Native simülasyon uygulamasıdır.

Kullanıcı bir senaryo seçer, video briefing'leri takip eder ve iki aşamalı karar verir. Kararlar lokal olarak analiz edilerek kullanıcının liderlik arketipi, davranışsal pattern'leri, Blind Spot alanı ve altı boyutlu Decision DNA profili oluşturulur.

## Teknolojiler

* React Native — Expo SDK 57
* TypeScript — Strict Mode
* Expo Video
* React Native SVG
* Lucide React Native
* React Native Safe Area Context
* Expo Screen Orientation
* EAS Build

Uygulamada backend bağlantısı bulunmamaktadır. Authentication, senaryolar, kararlar ve Decision DNA verileri demo amacıyla lokal/dummy data kullanılarak çalışmaktadır.

## Kurulum

Gereksinimler:

* Node.js 18+
* npm 9+
* Expo geliştirme ortamı

Projeyi klonladıktan sonra:

```bash
npm install
npx expo start
```

Android native build için:

```bash
npx expo run:android
```

iOS native build için:

```bash
npx expo run:ios
```

## Android APK

APK oluşturmak için EAS Build kullanılabilir:

```bash
eas build -p android --profile preview
```

## Uygulama Akışı

```text
Sign In / Sign Up
        ↓
Home
        ↓
Scenario Selection
        ↓
Simulation Intro
        ↓
Video Briefing
        ↓
Decision 1
        ↓
Video Briefing
        ↓
Decision 2
        ↓
Video Briefing
        ↓
Decision DNA
```

Decision DNA sonucu aşağıdaki boyutlar üzerinden oluşturulur:

* Vision
* Courage
* Risk
* Control
* Empathy
* Ethics

Sonuç ekranında liderlik arketipi, davranışsal pattern'ler, Blind Spot, yansıtıcı içgörü ve radar grafik gösterilir.

## Proje Yaklaşımı

Proje, sorumlulukların ayrıştırılması ve tekrar kullanılabilir component yapısı dikkate alınarak geliştirilmiştir.

* `screens/` — Ekranların ana yapısı ve akışı
* `components/` — Tekrar kullanılabilir UI bileşenleri
* `hooks/` — State ve simülasyon mantığı
* `data/` — Lokal/dummy veriler
* `types/` — TypeScript tipleri
* `theme/` — Tasarım değişkenleri
* `constants/` — Ortak sabitler

Uygulamanın mevcut kapsamı için navigation ve state yönetimi `App.tsx` içerisinde state-based olarak ele alınmıştır. Ek bir navigation/state management kütüphanesine ihtiyaç duyulmamıştır.

## AI Destekli Geliştirme

Geliştirme sürecinde:

* Kiro
* Cursor
* GPT

araçlarından yararlanılmıştır.

AI desteği; component mimarisi, React Native/TypeScript geliştirme, Figma tasarımının uygulanması, responsive layout, keyboard davranışları, hata ayıklama, refactoring ve dokümantasyon süreçlerinde kullanılmıştır.

AI tarafından önerilen çözümler doğrudan kabul edilmek yerine mevcut Figma tasarımı, case gereksinimleri ve proje mimarisiyle karşılaştırılarak kontrol edilmiş ve gerekli düzenlemeler yapılarak uygulanmıştır.

## Notlar

* Proje, **Jr. Frontend Developer Candidate Program – Fateful Moment Case** kapsamında geliştirilmiştir.
* Backend entegrasyonu case kapsamı dışında bırakılmıştır.
* Authentication ve uygulama verileri demo amaçlı lokal olarak çalışmaktadır.
* Arayüz, verilen Figma tasarımına mümkün olduğunca sadık kalınarak geliştirilmiştir.
* iOS ve Android platformları hedeflenmiştir.
