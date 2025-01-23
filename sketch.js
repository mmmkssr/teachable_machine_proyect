let video;
let detector;
let detections = [];
let canvasGraphics; //Variable para manejar las pinceladas en un lienzo

//Estos parámetros podrá configurar el usuario, según el tipo de interacción
let brushType = "Circular"; //apariencia de la pincelada
let colorPalette = "Arcoíris"; // paleta de colores
let brushSize = 30; //tamaño de la pincelada
let brushOpacity = 100; // Opacidad de la pincelada
let dispersionMode = "Punto Único"; // modo de dispersión de las pinceladas

function preload() {
  //Inicializa el detector de objetos con CocoSSD
  detector = ml5.objectDetector("cocossd", modelReady);
}

function modelReady() {
  //Confirmar que el modelo se cargó correctamente
  console.log("Modelo CocoSSD cargado");
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  detections = results;
  //Continúa detectando en el próximo frame
  detector.detect(video, gotDetections);
}

function setup() {
  createCanvas(800, 600); //Lienzo principal del video

  //Lienzo secundario para las pinceladas
  canvasGraphics = createGraphics(800, 600);
  canvasGraphics.clear();

  //Captura de video desde la cámara
  video = createCapture(VIDEO);
  video.hide();
  video.size(800, 600);

  //Inicia la detección de objetos una vez que el video esté cargado
  video.elt.addEventListener("loadeddata", () => {
    //Garantizar que la detección comience solo cuando el video esté completamente cargado
    console.log("Video cargado. Iniciando detección...");
    detector.detect(video, gotDetections);
  });

  //Escoger apariencia
  createP("Apariencia de la Pincelada");
  let brushSelector = createSelect();
  brushSelector.option("Circular");
  brushSelector.option("Salpicar");
  brushSelector.option("Línea");
  brushSelector.option("Aleatorio");
  brushSelector.changed(() => {
    brushType = brushSelector.value();
  });

  //Escoger paleta de colores
  createP("Paleta de Colores");
  let paletteSelector = createSelect();
  paletteSelector.option("Arcoíris");
  paletteSelector.option("Tonos Rojos");
  paletteSelector.option("Tonos Azules");
  paletteSelector.option("Tonos Verdes");
  paletteSelector.changed(() => {
    colorPalette = paletteSelector.value();
  });

  //Elegir tamaño de la pincelada
  createP("Tamaño de la Pincelada");
  let sizeSlider = createSlider(10, 100, 30);
  sizeSlider.input(() => {
    brushSize = sizeSlider.value();
  });

  //Opacidad de pinceladas
  createP("Opacidad de Pincelada");
  let opacitySlider = createSlider(50, 255, 150);
  opacitySlider.input(() => {
    brushOpacity = opacitySlider.value();
  });

  //Elegir como se ubican las pinceladas
  let dispersionSelector = createSelect();
  dispersionSelector.option("Punto Único");
  dispersionSelector.option("Dispersas");
  dispersionSelector.changed(() => {
    dispersionMode = dispersionSelector.value();
  });
}

function draw() {
  //Dibuja el video en el lienzo principal
  image(video, 0, 0);

  //Limpiar el lienzo secundario si no hay objetos detectados
  if (detections.length === 0) {
    canvasGraphics.clear();
  }

  //Superpone las pinceladas generadas
  image(canvasGraphics, 0, 0);

  //Dibuja las detecciones sobre el video
  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    let x = object.x;
    let y = object.y;
    let w = object.width;
    let h = object.height;

    stroke(245, 242, 240);
    strokeWeight(3);
    noFill();
    rect(x, y, w, h);
    noStroke();
    fill(245, 242, 240);
    textSize(20);
    text(object.label, x + 10, y + 24);

    let centerX = x + w / 2;
    let centerY = y + h / 2;

    //Pinceladas por tipo y modo de dispersión
    switch (brushType) {
      case "Circular":
        applyBrush(drawCircularBrush, centerX, centerY);
        break;
      case "Salpicar":
        applyBrush(drawSplatterBrush, centerX, centerY);
        break;
      case "Línea":
        applyBrush(drawLineBrush, centerX, centerY);
        break;
      case "Aleatorio":
        applyBrush(drawRandomShapes, centerX, centerY);
        break;
    }
  }
}

//Aplicar pincel según el modo de dispersión
function applyBrush(brushFunction, x, y) {
  if (dispersionMode === "Punto Único") {
    brushFunction(x, y, brushSize);
  } else if (dispersionMode === "Dispersas") {
    for (let i = 0; i < 5; i++) {
      let offsetX = random(-50, 50); // Desplazamiento aleatorio en X
      let offsetY = random(-50, 50); // Desplazamiento aleatorio en Y
      brushFunction(x + offsetX, y + offsetY, brushSize);
    }
  }
}

//Dibujar pinceladas circulares
function drawCircularBrush(x, y, size) {
  canvasGraphics.noStroke();
  canvasGraphics.fill(getColor(), brushOpacity);
  canvasGraphics.ellipse(x, y, size, size);
}

//Dibujar pinceladas tipo salpicaduras
function drawSplatterBrush(x, y, size) {
  for (let i = 0; i < 10; i++) {
    let offsetX = random(-size / 2, size / 2);
    let offsetY = random(-size / 2, size / 2);
    canvasGraphics.noStroke();
    canvasGraphics.fill(getColor(), brushOpacity);
    canvasGraphics.ellipse(x + offsetX, y + offsetY, random(5, 15));
  }
}

//Dibujar pinceladas en línea
function drawLineBrush(x, y, size) {
  canvasGraphics.stroke(getColor(), brushOpacity);
  canvasGraphics.strokeWeight(random(3, 8));
  canvasGraphics.line(x, y, x + random(-size, size), y + random(-size, size));
}

//Dibujar formas aleatorias
function drawRandomShapes(x, y, size) {
  let shapeType = floor(random(3));
  canvasGraphics.noStroke();
  canvasGraphics.fill(getColor(), brushOpacity);

  switch (shapeType) {
    case 0: // Rectángulo
      canvasGraphics.rect(x, y, random(10, size), random(10, size));
      break;
    case 1: // Triángulo
      canvasGraphics.triangle(
        x,
        y,
        x + random(-size, size),
        y + random(-size, size),
        x + random(-size, size),
        y + random(-size, size)
      );
      break;
    case 2: // Elipse
      canvasGraphics.ellipse(x, y, random(10, size), random(10, size));
      break;
  }
}

//Para la paleta de colores
function getColor() {
  switch (colorPalette) {
    case "Tonos Rojos":
      return color(random(200, 255), random(0, 100), random(0, 100));
    case "Tonos Azules":
      return color(random(0, 100), random(0, 100), random(200, 255));
    case "Tonos Verdes":
      return color(random(0, 100), random(200, 255), random(0, 100));
    default:
      "Aleatorio";
      return color(random(255), random(255), random(255));
  }
}
