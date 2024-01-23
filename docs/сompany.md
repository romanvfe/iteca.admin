### Company

URL для запроса - https://reg.iteca.kz/api/company/

Получаем информацию о компании

Отправляем:
```
{
    apiKey: apiKey,
    token: token,
    companycode: company code,
    exhibitioncode: exhibition code,
}
```
Получаем:
```
{
    logo: логотип выставки,
    title: название выставки,
    manager: {
        name: Имя Фамилия,
        email: email,
        phone: телефон,
        city: Город,
        country: Страна
    }
}
```
