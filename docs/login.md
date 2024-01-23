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
