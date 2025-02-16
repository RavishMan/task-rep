Для развертки проекта: 

1. Скопировать `.env.example` в `.env`

## 1. Технологический стек
- **TypeScript + Vue 3**  
- **Vue Router**  
- **Pinia**  
- **SCSS/SASS** (mobile-first, резина)  
- **ESLint + Prettier**  
- **Autoprefixer** (PostCSS)  
- **Vite**  
- **Unit-тестирование** (Vitest + @vue/test-utils + @pinia/testing)

## 2. Получение данных и работа с API
- Эндпоинт: `GET https://www.thecocktaildb.com/api/json/v1/1/search.php?s=<cocktail_code>` вынес в `.env`, но на всякий оставил и параметром по дефолту
- Поддерживаемые коды коктейлей: `margarita`, `mojito`, `a1`, `kir`
- Если вернётся несколько вариантов, выводим все

## 3. Менеджер состояния (Pinia)
- Хранение загруженных коктейлей в `Map<CocktailCode, Drink[]>`
- Избавление от повторных запросов к API
- Методы `fetchCocktailsByCode` и `getCocktails`

## 4. Обработка ошибок
- Редирект на 404, если код невалиден
- Вывод `errorMessage` при ошибке сети или 500

## 5. Роутинг
- Редирект `"/"` → `"/margarita"`
- Маршрут `"/:cocktailCode"` с проверкой кода (иначе 404)
- Общий макет в `DefaultLayout.vue` (шапка, меню, `<router-view>`)
- 404-страница при неверном пути

## 6. Резиновая верстка
- Ширина: 360–1024px
- Брейкпоинты: 360px, 768px
- Центрирование контейнеров

## 7. Lazy-loading изображений
- Атрибут `loading="lazy"`
- Полифил для старых браузеров не добавлен, но если нужно - можно вручную сделать lazy-loading 

## 8. Структура проекта
- Основные файлы: `index.html`, `package.json`, `vite.config.ts` и т. д.
- Папка `src` (компоненты, страницы, роутер, стор, стили)

## 9. ESLint, Prettier, Autoprefixer
- Единообразие кода, автопрефиксы
- Настройки в `.browserslistrc` для современных браузеров

## 10. Структура проекта

```
.
├── README.md
├── app_example.png
├── description.txt
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── prettier.config.js
├── src
│   ├── App.vue
│   ├── components
│   │   ├── CocktailCard.vue
│   │   └── SideMenu.vue
│   ├── consts
│   │   └── index.ts
│   ├── layouts
│   │   └── DefaultLayout.vue
│   ├── main.ts
│   ├── pages
│   │   ├── CocktailPage.vue
│   │   └── NotFoundPage.vue
│   ├── router
│   │   └── index.ts
│   ├── store
│   │   ├── cocktails.ts
│   │   └── cocktails.types.ts
│   ├── styles
│   │   └── main.scss
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock

```
