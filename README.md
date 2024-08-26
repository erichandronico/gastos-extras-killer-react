# Gastos Extras Killer React

Importa cartolas de bancos en Chile y analiza los datos mes a mes para descubrir donde pierdes el dinero

## Versión 0.1
- Solo importa una cartola desde Itaú y la muestra en una grilla

## Categorías
- Se almacenan en itemCategories, donde se relacion el nomnre de un ítem con una categoría
- Si por el contrario, el nombre de una categoría es generico y no representa otros items, se 
asocia al codigo de referencia solo el item de la cartola en particular

## Asociar categorías a cartola
- Debe ser un hook de cartolas, useCartolas
- Para cada item, busca el codigo de referencia, si no hay, busca la categoría general

## Descubierto
- CategoryVsDate trae soo 2023 pero al parecer el problema está en la API => revisar categories
- Revisar en base de datos si categories se graba en cartolas antiguas => si
- El problema parece ser que una cartola necesita guardarse.

## Todo en API
### Agregar categoría 
- Cuando se agrega una categoría, debe ocurrir un proceso posterior que actualiza las cartolas (update)
#### Crear Procedimiento