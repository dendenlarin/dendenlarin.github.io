# Статический блог для GitHub Pages

Это простой статический блог для GitHub Pages, созданный с использованием HTML и CSS. Блог не требует серверной части или базы данных, все страницы представляют собой статичные HTML-файлы.

## Структура проекта

```
dendenlarin.github.io/
├── css/
│   └── style.css           # Основные стили сайта
├── posts/                  # Папка с отдельными статьями
│   ├── first-post.html     # Пример первой статьи
│   └── second-post.html    # Пример второй статьи
├── index.html              # Главная страница
├── posts.html              # Страница со списком всех статей
├── about.html              # Страница "Обо мне"
└── README.md               # Документация по проекту
```

## Как использовать

1. Клонируйте репозиторий на свой компьютер
2. Настройте GitHub Pages в настройках вашего репозитория
3. Адаптируйте содержимое под свои нужды:
   - Измените имя и личную информацию в `about.html`
   - Добавьте свои статьи в папку `posts/`
   - Обновите список статей на страницах `index.html` и `posts.html`

## Как добавить новую статью

1. Создайте новый HTML-файл в папке `posts/` (например, `my-new-post.html`)
2. Скопируйте структуру одного из существующих постов как шаблон
3. Заполните контент вашей статьи
4. Обновите ссылки на главной странице и странице статей, добавив новую статью

## Настройка

### Изменение оформления

Для изменения цветов и стилей отредактируйте файл `css/style.css`. Основные цвета заданы как CSS-переменные в начале файла:

```css
:root {
    --primary-color: #5D4037;
    --secondary-color: #8D6E63;
    --text-color: #333;
    --background-color: #f9f7f5;
    --card-bg: #fff;
}
```

### Персонализация

- Замените «Мой блог» на название вашего блога в заголовках всех страниц
- Обновите информацию на странице «Обо мне»
- Добавьте собственный логотип или фото при необходимости

## Рекомендации по ведению блога

- Регулярно публикуйте новые статьи
- Используйте теги для категоризации контента
- Добавляйте ссылки на релевантные ресурсы в ваших статьях
- Не забывайте обновлять список статей на главной странице и странице статей

## Дополнительно

При желании вы можете добавить следующие функции:

- Форму подписки на обновления (через сторонние сервисы)
- Счетчик посещений (через Google Analytics или аналогичные сервисы)
- Комментарии (через Disqus или подобные сервисы)
- RSS-ленту

## Лицензия

Вы можете свободно использовать, модифицировать и распространять этот шаблон. 