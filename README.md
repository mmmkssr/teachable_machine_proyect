# Teachable Machine Proyect

# Pintura Interactiva

A partir del video de The Coding Train - Detección de Objetos con COCO - SSD, se plantea la idea de **Pintura Interactiva**

Con un enfoque estético, la idea consiste en utilizar la cámara del dispositivo para detectar objetos en tiempo real y transformarlos en pinceladas o elementos visuales que se añaden en un lienzo digital. Cada objetos puede generar un efecto diferente, creando obras abstractas y dinámicas.

## Detección de Objetos

Con la ayuda de las bibliotecas **ML5.js** se podrá detectar los objetos para identificarlos al ser capturados por la cámara.

## Conversión en Pinceladas

Cada objeto detectado se asigna a un tipo de pincelada o efecto visual específico. Por ejemplo: Manchas de pintura circulares, trazos o combinaciones de formas, esto con la ayuda de la biblioteca **p5.js**

## Creación del Lienzo

Las pinceladas generadas se añadirían a un lienzo, el cuál puede ser dinámico o estático, para generar una interacción con el usuario.

## Personalización

El usuario puede interactuar con la pintura en tiempo real (Posibles Consideraciones: apariencia de las pinceladas, elegir paletas de colores, tamaño u opacidad, entre otros).

# Desarrollo del Proyecto

`preload()` carga el modelo de detección de objetos (CocoSSD) antes de que inicie la ejecución del programa. Cuando el modelo está listo, llama la función `modelReady()`, que notifica en la consola que el modelo se ha cargado correctamente.

`gotDetections(error,results)` si ocurre un error se imprime en la consola y se detiene la ejecución. Si no hay error, se llama a `detector.detect()` para continuar detectando en el siguiente cuadro del video.

`createGraphics` crea un lienzo secundario para superponer las pinceladas artísticas.

`drawCircularBrush(x,y)` genera un pincel circular en la posición `(x,y)` con un color aleatorio y un tamaño aleatorio.

`drawSplatterBrush(x,y)` simula un efecto de salpicaduras en la posición `(x,y)` en diferentes posiciones, con colores y tamaños aleatorios.

`drawLineBrush(x,y)` dibuja una línea desde `(x,y)` hasta una posición aleatoria, grosor y color aleatorios, simula trazos en línea.

`drawRandomShapes(x,y)` dibuja una forma aleatoria en `(x,y)`, entre rectángulos, triángulos y elipses.

`dispersionMode` controla las pinceladas

`applyBrush` evaluar el modo de dispersión y aplicar el pincel en dos puntos: único o dispersos.

`applyBrush(brushFunction, x,y)` con esta función se aplica un pincel `brushFuntion` al objeto cuando se detecta

`getColor()` devuelve un color basado en la paleta seleccionada, en cuatro variantes: tonos rojos, tonos, azules, tonos verdes y en arcoíris.

`createP()` crear un elemento, se utilizan para textos con longitud de párrafo

`switch` control de una o más sentencias de asignación de reglas, depende del valor de una expresión
