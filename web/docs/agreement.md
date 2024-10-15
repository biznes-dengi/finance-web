## backPath in PageHeader
Везде где точно известем backPath - прокидывали его и все ок, где нет - просто на шаг назад

## Box component
* Для задания структуры страницы по мелким частям (для отступов)
* Для DRY отступов, когда isMobile, isTablet, isDesktop

## Импорты внутри модуля делать отностельными
* import from /shared/api/httpClient to /shared/api/goal
* httpClient -- private объект, который будет использоваться только внутри /shared/api