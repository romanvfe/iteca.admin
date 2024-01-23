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
