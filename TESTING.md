# TESTING.md


## Testing

Фреймворк: vitest

### Как запустить

```bash
npm test
```

### Участники

#### @atikin132

Что тестирую: все методы сервисов: PracticeSessionService, TopicProgressService, TopicService, UserService, WidgetService

| Файл | Описание |
|------|----------|
| `test/practice-session.service.spec.ts` | Проверка `getPracticeSessions`, `getPracticeSessionsByUserId`, `getPracticeSessionsByTopicId` и `getAll` |
| `test/topic-progress.service.spec.ts` | Проверка `getTopicProgress`, `getTopicProgressByUserId`, `getTopicProgressByTopicId` и `getAll` |
| `test/topic.service.spec.ts` | Проверка `getTopics`, `getTopicById` и `getAll` |
| `test/user.service.spec.ts` | Проверка `getUsers`, `getUserById` и `getAll` |
| `test/widget.service.spec.ts` | Проверка `getWidgets`, `getWidgetsByTopicId` и `getAll` |

PR с тестами: https://github.com/Nastya-Student/rss-fe-final-project/pull/36

#### @amelur

Что тестирую: API-сервис, хук авторизации

| Файл | Описание |
|------|----------|
| `test/login.page.test.ts` | Рендер формы логина и наличие полей email/password |
| `test/login.page.test.ts` | Вызов login API при отправке формы |
| `test/login.page.test.ts` | Редирект на Dashboard после успешного логина |
| `test/login.page.test.ts` | Переключение видимости пароля|
| `test/login.page.test.ts` | Блокировка кнопки submit при пустых полях|


PR с тестами: https://github.com/Nastya-Student/rss-fe-final-project/pull/29

#### @ulya10

Что тестирую: вид компонентов лендинга

| Файл | Описание |
|------|----------|
| `test/landing-page.test.ts` | Проверка количества карточек |
| `test/landing-page.test.ts` | Проверка количества тем |
| `test/landing-page.test.ts` | Проверка количества секций |
| `test/landing-page.test.ts` | Проверка количества заголовков h1 |
| `test/landing-page.test.ts` | Проверка содержимого карточек |

PR с тестами: https://github.com/Nastya-Student/rss-fe-final-project/pull/37

#### @nastya-student

Что тестирую: функции для расчёта достижений на странице профиля

| Файл | Описание |
|------|----------|
| `test/profile.test.ts` | успешных попыток слишком мало для student |
| `test/profile.test.ts` | процент успешных попыток слишком маленький для student |
| `test/profile.test.ts` | процент успешных попыток со сложностью 2  слишком маленький для student |
| `test/profile.test.ts` | выполняются условия для student |
| `test/profile.test.ts` | выполняются условия для top-performer |
| `test/profile.test.ts` | выполняются условия для expert |


PR с тестами: https://github.com/Nastya-Student/rss-fe-final-project/pull/39
