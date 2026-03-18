Реальная дата - 2026-03-17 вечер.

Добавила тесты для расчёта достижений пользователя. https://github.com/Nastya-Student/rss-fe-final-project/pull/39

Данные генерировал chatGPT по такому промпту:

сгенерируй 6 наборов тестовых данных по шаблону с количеством JSON объектов в наборе равным 15:  
{ "id": "s1", "userId": "u1", "topicId": "core-js", "topicTitle": "Core JS", "answers": [ { "widgetId": "w1", "isCorrect": true, "timeSpent": 12 }, { "widgetId": "w2", "isCorrect": true, "timeSpent": 8 } ], "score": 85, "startedAt": "2026-02-22T10:00:00", "completedAt": "2026-02-22T10:10:00" }, { "id": "s2", "userId": "u1", "topicId": "algorithms", "topicTitle": "Algorithms", "answers": [{ "widgetId": "w4", "isCorrect": true, "timeSpent": 20 }], "score": 70, "startedAt": "2026-02-23T11:00:00", "completedAt": "2026-02-23T11:15:00" }, { "id": "s3", "userId": "u2", "topicId": "core-js", "topicTitle": "Core JS", "answers": [{ "widgetId": "w1", "isCorrect": false, "timeSpent": 15 }], "score": 0, "startedAt": "2026-02-22T12:00:00", "completedAt": "2026-02-22T12:05:00" }, { "id": "s4", "userId": "u3", "topicId": "typescript", "topicTitle": "Typescript", "answers": [ { "widgetId": "w6", "isCorrect": true, "timeSpent": 10 }, { "widgetId": "w7", "isCorrect": true, "timeSpent": 12 } ], "score": 100, "startedAt": "2026-02-22T09:00:00", "completedAt": "2026-02-22T09:20:00" }  
"userId" везде должен быть u1. 
"topicId" со значениями: Core JS, Algorithms, Typescript, HTML  
id возрастает на 1.  
в "answers" в объект добавь difficulty со значением 1, 2 или 3.  
"widgetId" со значениями: w1, w2, w3, w4, w5, w6, w7.  
"startedAt" возрастает с 2026-02-23 до 2026-03-09.  
"completedAt" больше "startedAt" на 1 - 20 минут.  
Количество ответов в каждой записи различается (1-10 ответа)  
наборы должны быть для следующих тестовых случаев:  
1. сумма всех значений с результатом isCorrect: true равна 9,
2. сумма всех значений с результатом isCorrect: true равна 10, но общее количество полей isCorrect равно 21,
3.  сумма всех значений с результатом isCorrect: true равна 10, общее количество полей isCorrect равно 20, общее количество всех полей с результатом isCorrect: true и "difficulty": 2 равно 0, общее количество всех полей с результатом isCorrect: true и "difficulty": 3 равно 0,
4.  сумма всех значений с результатом isCorrect: true равна 10, общее количество полей isCorrect равно 20, общее количество всех полей с результатом isCorrect: true и "difficulty": 2 равно 2, общее количество всех полей с результатом isCorrect: true и "difficulty": 3 равно 0,
5.  сумма всех значений с результатом isCorrect: true равна 20, общее количество полей isCorrect равно 28, общее количество всех полей с результатом isCorrect: true и "difficulty": 2 равно 6, общее количество всех полей с результатом isCorrect: true и "difficulty": 3 равно 4,
6.  сумма всех значений с результатом isCorrect: true равна 30, общее количество полей isCorrect равно 31, общее количество всех полей с результатом isCorrect: true и "difficulty": 2 равно 12, общее количество всех полей с результатом isCorrect: true и "difficulty": 3 равно 15,


но что-то явно пошло не так, быстрее было отредактировать руками. Но было бы круто, если бы не пришлось.

Подумала, что можно сначала добавить небольшой график со статусами вместо количества решенных задач.

Заметила, что прошел уже месяц разработки. Как всегда, у меня всё делается в последний момент.

нашла себе ещё одну проблему: как хранить картинки для деплоя. пока не знаю. 

Посмотрела бодрыми глазами на свою систему достижений. Поняла, что не хватает промежутка времени для расчета.  Наверное, пусть будет последние 3 дня тренировки. Это реальное время для решения 30 задач. 
