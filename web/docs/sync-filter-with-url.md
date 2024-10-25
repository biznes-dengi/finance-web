## sync-component-filter-with-URL

### getQueryParams(filter)
Преобразовывает filter в queryParams. В URL заносит только те значения фильтра (filter.key = filterValue) если **filterValue типа string, number или boolean**

null не надо пихать в URL как параметр, т.к это initialPage и initialState. 
* on initial page initial state (null state)
* onClick (to change filter)
* setState(newFilter) (all -> active)
* update URL

### parseQueryParams(queryString)
Просто парсит queryString и выплевывет объект filter.

### Алгоритм синхронизации компонента с URL
- компонент маунтится первый раз
- побераем фильтр с URL (изначально пустые)
- если filterFromURL пустой — сетаем defaultFilter в стейт
- если filterFromURL не пустые — сетаем filterFromURL в стейт
---
- in useEffect чекаем одинаковые ли filterFromURL и filter из state (изначально не равны).
- если не равны, значит filter более свежий, значит запихиваем его в URL
- если равны - return



