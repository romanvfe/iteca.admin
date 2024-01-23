### Document

#### Document Invoices - список счетов

URL для запроса - https://reg.iteca.kz/api/doc/invoices/

Отправляем:
```
{
    apiKey: apiKey,
    token: token,
    companycode: company code,
}
```

Получаем:
```
{
    link: Ссылка на pdf со списком счетов,
}
```

#### Document Stand - Схема стенда

URL для запроса - https://reg.iteca.kz/api/doc/stand/

Отправляем:
```
{
    apiKey: apiKey,
    token: token,
    companycode: company code,
}
```

Получаем:
```
{
    link: Ссылка на схему стенда
}
```

#### Document Certificate - Сертификат участника

URL для запроса - https://reg.iteca.kz/api/doc/сertificate/

Отправляем:
```
{
    apiKey: apiKey,
    token: token,
    companycode: company code,
}
```

Получаем:
```
{
    link: Ссылка на скачивание сертификата,
    image: Ссылка на изображение с сертификатом
}
```
