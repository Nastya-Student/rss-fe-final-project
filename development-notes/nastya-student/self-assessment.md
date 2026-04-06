# Self-Assessment

## Personal Features

| Фича | Ссылка на код / PR | Баллы |
|----------------|-----------|---------|
| Rich UI Screen: Profile Page | [PR#39](https://github.com/Nastya-Student/rss-fe-final-project/pull/39), [PR#92](https://github.com/Nastya-Student/rss-fe-final-project/pull/92) | +20 |
| Rich UI Screen: Results screen | [PR#59](https://github.com/Nastya-Student/rss-fe-final-project/pull/59), [PR#72](https://github.com/Nastya-Student/rss-fe-final-project/pull/72) | +20 |
| Rich UI Screen: Dashboard (обработка данных для отображения) | [PR#92](https://github.com/Nastya-Student/rss-fe-final-project/pull/92), [PR#59](https://github.com/Nastya-Student/rss-fe-final-project/pull/59), [PR#72](https://github.com/Nastya-Student/rss-fe-final-project/pull/72) | +20 |
| Leaderboard: Result screen | [PR#92](https://github.com/Nastya-Student/rss-fe-final-project/pull/92) | +5 |
| Responsive | [PR#39](https://github.com/Nastya-Student/rss-fe-final-project/pull/39), [PR#92](https://github.com/Nastya-Student/rss-fe-final-project/pull/92), [PR#59](https://github.com/Nastya-Student/rss-fe-final-project/pull/59), [PR#72](https://github.com/Nastya-Student/rss-fe-final-project/pull/72) | +5 |
| Auto-deploy | [PR#42](https://github.com/Nastya-Student/rss-fe-final-project/pull/42), [PR#44](https://github.com/Nastya-Student/rss-fe-final-project/pull/44), [PR#54](https://github.com/Nastya-Student/rss-fe-final-project/pull/54)| +5|
| API Layer (localstorage)| [PR#92](https://github.com/Nastya-Student/rss-fe-final-project/pull/92), [PR#59](https://github.com/Nastya-Student/rss-fe-final-project/pull/59), [PR#72](https://github.com/Nastya-Student/rss-fe-final-project/pull/72) | +10|
| Unit Tests (Basic)| [PR#39](https://github.com/Nastya-Student/rss-fe-final-project/pull/39)| +10|
  

**Итоговая оценка:** 95/250


## Описание работы ##

Настройка гитхаб репозитория и доски в Jira.  
В репозитории поставила защиту для веток main и develop от прямого push с правилами lint, test, approve от не менее 2 участников.

Конфигурация проекта.  
Вносила правки в commitlint и validate-branch-name, чтобы добавить исключения для веток develop и development-notes.  

Автодеплой.  
Использовала Vercel. Создала два yml файла для окружения production (push в main) и preview (push в остальные ветки), добавила lint job и test job.  
Особого опыта с такими технологиями у меня не было. Ранее использовала gh-pages, Netlify и Jenkins для настройки тестового окружения.  
Поэтому Vercel выбрала для опыта и разнообразия.  Для понимания работы проводила наблюдение, читала документацию, смотрела youtube и консультировалась c AI.  

Разработка feature компонентов.  
Планировала разработать страницу профиля с изменением настроек и один из сложных виджетов.  
Позже поняла, что в проекте нет никаких состояний для объектов юзера, истории сессий и прогресса, текущей сессии.  
Реализация авторизации и хранения (и возможной обработки) данных в supabase оказалась под вопросом.  
Поэтому взялась за реализацию методов работы с localstorage и общей логики обработки этих объектов  для актуального отображения в дашборде, на странице профиля и в окне результатов.  
В итоге страница настроек профиля осталась недоработанной, а виджет удалён из приложения как второстепенные задачи.  
Для хранения картинок юзера и отправки уведомлений на почту пыталась создать очень простой сервер на nodejs, но в проекте он не внедрился, так как не было времени, чтобы разобраться и протестировать эту работу.  
Из технологий использовала chartjs для изображения линейной диаграммы на странице профиля. Были проблемы с контролем размеров и положения при адаптиве.  
Были сложности с пониманием чужого кода, основной архитектурой занимался другой участник.  Отводила много времени, чтобы разобраться и внести нужные изменения.  

Организация работы команды.  
Ни у кого из участников опыта работы на проекте не было.  У меня был небольшой опыт стажировки на позицию автотестировщика.  
Поэтому взялась довести до остальных правила поведения в Jira и гитхаб и культуры code-review.  
Инициировала созвоны и обсуждение проблем и планов.  


## Feature components ## 

### Страница профиля ###

Страница включает автарку, имя пользователя, статус достижения, диаграмму с количеством правильно решённых задач по дням, кнопку для перехода в окно настроек.

Для отображения статуса разработана система достижений со следующими условиями:  

общее условие - не менее 3 дней непрерывной тренировки. Один день перерыва сбрасывает прогресс
 novice - стартовый статус

| Статус               | 1   |  2  |  3 | 4   |  5  | 
|-----------------------|-----|-----|----|-----|-----|
|student              | 10 | 50 |     |  10 |     |
| top-performer | 20 | 70 |    |  30  |20 |
| expert               | 30 | 95 |    |  40  |50 |

1 - минимум успешных попыток
2 - % успешных попыток от всех попыток
3 - % успешных попыток с difficulty = 1 от всех успешных попыток
4 - % успешных попыток с difficulty = 2 от всех успешных попыток
5 - % успешных попыток с difficulty = 3 от всех успешных попыток  

При достижении статуса expert пользователь видит уведомление "ты готов к интервью".



### Страница результатов ###

Для отображения страницы результатов создала кастомную версию методов CRUD для работы с объектами в localstorage:  
current-user, user-sessions, progress, current-session,  
а также внедрила в widget-engine сбор результатов тренировки.  
Реализовала подкапотную логику для обновления результатов для страниц дашборда и профиля.  
Реализовала отрисовку страницы результатов по завершении сессии тренировки.  
Из-за большого объёма предварительной работы считаю компонент сложным.