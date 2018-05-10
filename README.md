# STUDENT LOST IN NY (SLNY)

## PALABRAS CLAVE

* API Google Maps
* Retención de datos
* Visualización

## DATASETS
### NY Districts geoshapes
#### LINK
https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson
#### TIPO DE DATO
geoJSON
#### UTILIDAD
Se utilizó el archivo JSON para obtener los puntos vértices de los polígonos para graficar en el API de Google Maps todos los distritos de Nueva York (En una versión posterior se hará el filtro a los distritos habitables)

### Neighborhood Names GIS
#### LINK
https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD
#### TIPO DE DATO
JSON
#### UTILIDAD
En esta entrega este dataset no ha sido utilizado,sin embargo, se planeó e implementó la forma en al que los datos serían optimamente guardados.

## DESCRIPCION DE LA ENTREGA

En esta entrega se presenta la API de Google Maps funcional; en ella se encuentra un nuevo estilo retro implementado con la documentación oficial de Google; se grafican los distritos de NY con la función de geoJSON ya implementada en el API de Google Maps, además, se añadió una característica adicional, la cual consiste en el aumento del ancho de los vertices del poligono al pasar el mouse y el cambio de color a 'green' al hacer click sobre un distrito; esta función también fue implementada con la documentación oficial de Google.

## NAVEGADORES UTILIZADOS

* Google Chrome
* Mozilla Firefox

## 