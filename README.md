# Teachable Machine Proyect

# Pintura Interactiva

A partir del video de The Coding Train - Detección de Objetos con COCO - SSD, se plantea la idea de **Pintura Interactiva**

Con un enfoque estético, la idea consiste en utilizar la cámara del dispositivo para detectar objetos en tiempo real y transformarlos en pinceladas o elementos visuales que se añaden en un lienzo digital. Cada objetos puede generar un efecto diferente, creando obras abstractas y dinámicas.

## Detección de Objetos

Con la ayuda de las bibliotecas **ML5.js** se podrá detectar los objetos para identificarlos al ser capturados por la cámara.

## Conversión en Pinceladas

Cada objeto detectado se asigna a un tipo de pincelada o efecto visual específico. Por ejemplo: Manchas de pintura circulas, trazos o combinaciones de formas, esto con la ayuda de la biblioteca **p5.js**

## Creación del Lienzo

Las pinceladas generadas se añadirían a un lienzo, el cuál puede ser dinámico o estático, para generar una interacción con el usuario.

## Personalización

El usuario puede interactuar con la pintura en tiempo real (Posibles Consideraciones: apariencia de las pinceladas, elegir paletas de colores, tamaño u opacidad, sincronización con música, entre otros).
