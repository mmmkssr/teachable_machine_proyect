let video;
let detector;
let detections = [];
let canvasGraphics; //Variable para manejar las pinceladas en un lienzo

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
}

function draw() {
  //Dibuja el video en el lienzo principal
  image(video, 0, 0);

  //Superpone las pinceladas generadas
  image(canvasGraphics, 0, 0);

  //Dibuja las detecciones sobre el video
  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    let x = object.x;
    let y = object.y;
    let w = object.width;
    let h = object.height;

    stroke(0, 250, 0);
    strokeWeight(3);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(250);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);

    //Según el objeto detectado, se genera diferentes efectos
    switch (object.label) {
      case "person":
        drawCircularBrush(x + w / 2, y + h / 2);
        break;
      case "bottle":
        drawSplatterBrush(x + w / 2, y + h / 2);
        break;
      case "chair":
        drawLineBrush(x + w / 2, y + h / 2);
        break;
      default:
        drawRandomShapes(x + w / 2, y + h / 2);
        break;
    }
  }
}

//Dibujar pinceladas circulares
function drawCircularBrush(x, y) {
  canvasGraphics.noStroke();
  canvasGraphics.fill(random(255), random(255), random(255), 150);
  let size = random(20, 50);
  canvasGraphics.ellipse(x, y, size, size);
}

//Dibujar pinceladas tipo salpicaduras
function drawSplatterBrush(x, y) {
  for (let i = 0; i < 10; i++) {
    let offsetX = random(-30, 30);
    let offsetY = random(-30, 30);
    canvasGraphics.noStroke();
    canvasGraphics.fill(random(255), random(255), random(255), 100);
    canvasGraphics.ellipse(x + offsetX, y + offsetY, random(5, 15));
  }
}

//Dibujar pinceladas en línea
function drawLineBrush(x, y) {
  canvasGraphics.stroke(random(255), random(255), random(255), 150);
  canvasGraphics.strokeWeight(random(3, 8));
  canvasGraphics.line(x, y, x + random(-50, 50), y + random(-50, 50));
}

//Dibujar formas aleatorias
function drawRandomShapes(x, y) {
  let shapeType = floor(random(3));
  canvasGraphics.noStroke();
  canvasGraphics.fill(random(255), random(255), random(255), 150);

  switch (shapeType) {
    case 0: // Rectángulo
      canvasGraphics.rect(x, y, random(20, 50), random(20, 50));
      break;
    case 1: // Triángulo
      canvasGraphics.triangle(
        x,
        y,
        x + random(-30, 30),
        y + random(-30, 30),
        x + random(-30, 30),
        y + random(-30, 30)
      );
      break;
    case 2: // Elipse
      canvasGraphics.ellipse(x, y, random(20, 50), random(20, 50));
      break;
  }
}
