let video;
let detector;
let detections = [];

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
  createCanvas(400, 400);

  //Captura de video desde la cámara
  video = createCapture(VIDEO);
  video.hide();
  video.size(400, 400);

  //Inicia la detección de objetos una vez que el video esté cargado
  video.elt.addEventListener("loadeddata", () => {
    //Garantizar que la detección comience solo cuando el vide esté completamente cargado
    console.log("Video cargado. Iniciando detección...");
    detector.detect(video, gotDetections);
  });
}

function draw() {
  //Video en el canvas
  image(video, 0, 0);

  //Dibuja las detecciones sobre el video
  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 250, 0);
    strokeWeight(3);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(250);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}
