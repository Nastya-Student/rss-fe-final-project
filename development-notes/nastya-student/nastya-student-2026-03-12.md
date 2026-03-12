## Что сделано: ##

Читала про разницу в модулях nodenext и esnext.
В проекте возник конфликт, для работы с supabase потребовался moduleResolution bundler
и module: esnext, а мы сначала использовали module:nodenext. 
Решили поменять эти конфиги.
Вряд ли мы будем использовать node.js в этом проекте.

Установила Vitest и добавила шаг test в yml.
Это более производительный и быстрый фреймворк для запуска модульных и компонентных тестов 
c режимом отслеживания изменений,
может использовать конфигурацию vite,
имеет имеет также браузерный режим, 
может совмещаться с другими фреймворками.
Vitest в команде выбрали путём голосования.

Продолжаю копаться в коде коллег.
Спасибо им за терпение.

https://github.com/Nastya-Student/rss-fe-final-project/pull/17

https://github.com/Nastya-Student/rss-fe-final-project/pull/29

https://github.com/Nastya-Student/rss-fe-final-project/pull/28


