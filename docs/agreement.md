## backPath in PageHeader
Везде где точно известем backPath - прокидывали его и все ок, где нет - просто на шаг назад

## Box component
* Для задания структуры страницы по мелким частям (для отступов)
* Для DRY отступов, когда isMobile, isTablet, isDesktop
* 
- **box нужен для отступов**

  Нужен, т.к. isMobile isDesktop в 1 месте кондишен сделал и везде стили применились

    - отступы для мобилки
    - отступы для таблета
    - отступы для десктопа

  куча одинаковых ифоф по системе — гиганское дублирование кода, которое захэндлю инкапсуляцией

  > Супер div для консистентных отступов + DRY для брейкпоинтов с дефолтными пропсами для отступов (для консистентности UI)
  >

## Сard
card нужен для title, titleButton, titleInCard

## Импорты внутри модуля делать отностельными
* import from /shared/api/httpClient to /shared/api/goal
* httpClient -- private объект, который будет использоваться только внутри /shared/api