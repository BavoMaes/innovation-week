import {
  Car
} from './Car';

import {
  Grid
} from './grid';
import {
  CarType
} from './CarType';

let sets = {}

let width = window.innerWidth;
let height = window.innerHeight;
let radius = 100;
let grid;
let xTurn, yTurn;
let cars = new Array();
let font;

let settingrequest = new XMLHttpRequest();
settingrequest.open('GET', './settings', true);
settingrequest.onload = function() {
  //load settings
  const settings = JSON.parse(this.response);
  sets = settings;
  //start viz
  init();
}
settingrequest.send();


function init() {
  let myp5 = new p5(s, sets.Id);
}

var s = (sketch) => {
  xTurn = -sketch.atan(1 / sketch.sqrt(2));
  yTurn = sketch.QUARTER_PI;

  sketch.preload = function() {
    font = sketch.loadFont('./resources/Roboto-Bold.ttf');
  }

  sketch.setup = function() {
    sketch.createCanvas(width, height, sketch.WEBGL);

    sketch.ortho();

    sketch.background(0);
    sketch.stroke(0);

    sketch.textFont(font);
    sketch.textSize(40);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);

    let carSize = sketch.createVector(sets.sketch.carsSize.X, sets.sketch.carsSize.Y, sets.sketch.carsSize.Z);

    let startColumn1 = sketch.createVector(0, 0, -700);
    let endColumn1 = sketch.createVector(-(grid.width / 2 - carSize.x * 0.5), 0, (grid.width / 2 - carSize.z / 2));

    let startColumn2 = sketch.createVector(-carSize.x * 0.5, 0, -700);
    let endColumn2 = sketch.createVector(-carSize.x * 0.5, 0, (grid.width / 2 - carSize.z / 2));

    let startColumn3 = sketch.createVector(0, 0, -700);
    let endColumn3 = sketch.createVector((grid.width / 2 - carSize.x * 1.5), 0, (grid.width / 2 - carSize.z / 2));

    let Diesel = new CarType(startColumn1, endColumn1, carSize, sets.sketch.colors.Diesel, sketch)
    let Benzine = new CarType(startColumn2, endColumn2, carSize, sets.sketch.colors.Benzine, sketch)
    let Electrisch_Hybride = new CarType(startColumn3, endColumn3, carSize, sets.sketch.colors.Electrisch_Hybride, sketch)

    grid = new Grid(sketch, sets.sketch.grid.width, sets.sketch.grid.height, sets.sketch.carsSize.Y, sets.sketch.grid.parts);
  }


  sketch.draw = function() {
    sketch.background(0);
    sketch.orbitControl();

    sketch.rotateX(xTurn);
    sketch.rotateY(yTurn);
    sketch.translate(0, 150, 0);

    grid.draw();



    for (let i = 1; i < cars.length; i++) {
      if (cars[i - 1].EventpointReached) cars[i].startCar()
    }

    cars.forEach(function(car) {
      car.update();
      car.draw();
    })
  }

  sketch.keyPressed = function() {
    if (keyCode === SPACE) {

    }
  }

  let carsReset = function(DieselData, BenzineData, Electrisch_HybrideData) {

    cars = cars.concat(Diesel.createCarArray(18, 6))
    cars = cars.concat(Benzine.createCarArray(7, 4))
    cars = cars.concat(Electrisch_Hybride.createCarArray(5, 2))

    cars[0].startCar();
  }
}