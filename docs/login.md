## Руководство ITECA API

URL - https://reg.iteca.kz/api/

### Login

URL для запроса - https://reg.iteca.kz/api/login/

login - "ZGJAaXRlY2Eua3o="

password - "aXRlY2E3MTc3"

Отправляем:
```
{
    apiKey: apiKey,
    login: login | email
    pass: password
}
```

Получаем:
```
{
    token: token,
    company: company name,
    companycode: company code,
    exhibition: exhibition name,
    exhibitioncode: exhibition code
}
```

### Exhibition

URL для запроса - https://reg.iteca.kz/api/pre-exhibition/

Получаем список предыдущих выставок

Отправляем:
```
{
    apiKey: apiKey,
    token: token,
    companycode: company code,
    lang: lang
}
```

Получаем Массив Объктов:
```
[{
    exhibitioncode: exhibition code,
    title: title,
    logo: logo,
    image_profile: profile-img,
    logomax: logo max-size
}]
```

URL для запроса - https://reg.iteca.kz/api/next-exhibition/

Получаем список будующих выставок

Отправляем:
```
{
    apiKey: apiKey,
    token: token,
    companycode: company code,
    lang: lang
}
```
Получаем Массив Объктов:
```
[{
    title: название выставки,
    logo: логотип выставки,
    link: ссылка на сайт выставки
}]
```

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
