# ФИНАЛЬНЫЙ ПРОМПТ — вставить в Cursor / Claude Code

> Вставьте этот промпт целиком. Убедитесь что файл `PROMPT_Landing_ANG_Crown_SvelteKit.md` лежит в корне проекта.

---

Прочитай файл `PROMPT_Landing_ANG_Crown_SvelteKit.md` в корне проекта — это полное техзадание на лендинг ANG Crown (малая авиация, Кипр). Там описана дизайн-система, палитра, шрифты, структура всех 8 секций, тексты и технические требования.

Теперь выполни по порядку:

## Шаг 1 — Инициализация проекта

```bash
npm create svelte@latest . -- --template skeleton --types typescript
npm install
```

Если проект уже инициализирован — пропусти, просто проверь что `svelte.config.js` и `package.json` на месте.

## Шаг 2 — Подключение шрифтов

В `src/app.html` в `<head>` добавь Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet">
```

Добавь мета-теги SEO:
```html
<meta name="description" content="ANG Crown — персональный самолёт по цене автомобиля премиум-класса. Официальный дистрибьютор на Кипре. Crown Aero Group.">
<meta property="og:title" content="ANG Crown · Малая авиация на Кипре">
<meta property="og:description" content="Пятиместный самолёт нового поколения. 370 км/ч. Расход 8–10 л/100 км. Баллистический парашют.">
```

## Шаг 3 — Глобальные стили

Создай `src/app.css` с CSS-переменными из ТЗ:
```css
:root {
  --color-bg-dark: #0a1628;
  --color-bg-light: #f7f4ef;
  --color-bg-white: #ffffff;
  --color-gold: #c6a36b;
  --color-gold-dim: rgba(198,163,107,0.4);
  --color-text-dark: #1a2a3a;
  --color-text-body: #555555;
  --color-text-muted: #999999;
  --color-text-light: rgba(255,255,255,0.75);
  --font-display: 'Playfair Display', serif;
  --font-body: 'Cormorant Garamond', serif;
  --font-ui: 'Montserrat', sans-serif;
}
```
Плюс CSS reset (margin, box-sizing, smooth scroll).

## Шаг 4 — Svelte action для скролл-анимаций

Создай `src/lib/actions/reveal.ts`:
- Intersection Observer, threshold 0.15
- Добавляет класс `.revealed` при появлении в viewport
- Поддерживает параметр `delay` для staggered-анимации
- CSS: элементы стартуют с `opacity: 0; transform: translateY(30px)`, при `.revealed` — плавный transition 0.8s

## Шаг 5 — Компоненты секций

Создай все компоненты в `src/lib/components/`:

1. **Hero.svelte** — полноэкранный блок (100vh), фоновое изображение самолёта с overlay-градиентом, заголовок ANG Crown, подзаголовок, CTA-кнопка «Узнать цену», scroll-индикатор. Плейсхолдер для фото: `<div>` с gradient-фоном `linear-gradient(135deg, #0a1628, #1a3a5a)` и комментарий `<!-- REPLACE: background-image: url('/images/hero.jpg') -->`.

2. **Advantages.svelte** — 3 карточки (370 км/ч, 8–10 л, 2500+ км). Светлый фон. Staggered reveal.

3. **Safety.svelte** — 3 блока безопасности (парашют, Garmin Safe Glide, посадка на грунт). Тёмный фон. Иконки ✦ в золотых кружках.

4. **CyprusRoutes.svelte** — таблица маршрутов из Кипра (8 направлений с временем и стоимостью топлива). Тёмная карточка. Данные хранить в массиве:
```typescript
const routes = [
  { city: 'Тель-Авив', time: '≈ 1 ч', fuel: '~ €36' },
  { city: 'Бейрут', time: '≈ 0,5 ч', fuel: '~ €18' },
  { city: 'Афины', time: '≈ 2,5 ч', fuel: '~ €91' },
  { city: 'Каир', time: '≈ 1,5 ч', fuel: '~ €55' },
  { city: 'Стамбул', time: '≈ 2,5 ч', fuel: '~ €87' },
  { city: 'Тбилиси', time: '≈ 3,5 ч', fuel: '~ €127' },
  { city: 'Рим', time: '≈ 5,5 ч', fuel: '~ €200' },
  { city: 'Барселона', time: '≈ 7 ч', fuel: '~ €255' },
];
```

5. **Comparison.svelte** — визуальное сравнение «Автомобиль vs ANG Crown». Светлый фон. Две колонки.

6. **Specs.svelte** — технические характеристики в аккордеоне (Svelte 5 `$state` для toggle). Минималистично.

7. **CTA.svelte** — финальный блок с телефоном +357 991 02 991 (ссылка `tel:`), кнопка «Связаться». Тёмный фон, заголовок золотом.

8. **Footer.svelte** — копирайт, Crown Aero Group, тонкая золотая линия сверху.

## Шаг 6 — Главная страница

`src/routes/+page.svelte` — импортирует и рендерит все секции по порядку:
Hero → Advantages → Safety → CyprusRoutes → Comparison → Specs → CTA → Footer

## Шаг 7 — Запуск и проверка

```bash
npm run dev
```

Открой http://localhost:5173, убедись что:
- Все секции рендерятся
- Scroll-анимации работают
- Адаптив на мобильных (проверь 375px)
- Шрифты загружены
- Нет ошибок в консоли

---

**ВАЖНО:**
- Весь код сразу, без вопросов — не спрашивай уточнений, бери тексты из ТЗ
- Svelte 5 runes синтаксис (`$state`, `$derived`, `$effect`), НЕ stores
- Scoped стили в каждом компоненте, глобальные переменные в `app.css`
- Фото-плейсхолдеры: gradient-фоны + комментарии где заменить на реальные изображения
- Production-ready код с комментариями на русском
- Мобильная адаптация обязательна

Начинай. Создай все файлы по порядку, от шага 2 до шага 6. Потом запусти dev-сервер.
