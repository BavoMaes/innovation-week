import {
  Car
} from './car';

import {
  Grid
} from './grid';

import {
  CarType
} from './carType';

import {
  Data
} from './data'

let sets = {}

let width = window.innerWidth;
let height = window.innerHeight;
let radius = 100;
let mainGrid;
let xTurn, yTurn;
let cars = new Array();
let diesel, benzine, electrischHybride;
let font;
let myData;

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
    font = sketch.loadFont('./resources/BebasNeue-Regular.ttf');
    myData = new Data(sketch);
  }

  sketch.setup = function() {


    console.log(myData.lookupCO2(2010));
    console.log(myData.lookupWagenPark(2010));

    sketch.createCanvas(width, height, sketch.WEBGL);

    sketch.ortho();

    sketch.background(0);
    sketch.stroke(0);

    sketch.textFont(font);
    sketch.textSize(50);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);

    let carSize = sketch.createVector(sets.sketch.carsSize.X, sets.sketch.carsSize.Y, sets.sketch.carsSize.Z);

    mainGrid = new Grid(sketch, sets.sketch.grid.width, sets.sketch.grid.height, sets.sketch.carsSize.Y, sets.sketch.grid.parts);

    let startColumn1 = sketch.createVector(0, 0, -700);
    let endColumn1 = sketch.createVector(-(mainGrid.width / 2 - carSize.x * 0.5), 0, (mainGrid.width / 2 - carSize.z / 2));

    let startColumn2 = sketch.createVector(-carSize.x * 0.5, 0, -700);
    let endColumn2 = sketch.createVector(-carSize.x * 0.5, 0, (mainGrid.width / 2 - carSize.z / 2));

    let startColumn3 = sketch.createVector(0, 0, -700);
    let endColumn3 = sketch.createVector((mainGrid.width / 2 - carSize.x * 1.5), 0, (mainGrid.width / 2 - carSize.z / 2));

    diesel = new CarType(startColumn1, endColumn1, carSize, sets.sketch.colors.Diesel, sketch)
    benzine = new CarType(startColumn2, endColumn2, carSize, sets.sketch.colors.Benzine, sketch)
    electrischHybride = new CarType(startColumn3, endColumn3, carSize, sets.sketch.colors.Electrisch_Hybride, sketch)

    carsReset();

  }


  sketch.draw = function() {
    sketch.background(0);
    sketch.orbitControl();

    sketch.rotateX(xTurn);
    sketch.rotateY(yTurn);
    sketch.translate(0, 150, 0);

    mainGrid.draw();



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

  let carsReset = function() {

    cars = cars.concat(diesel.createCarArray(18, 6))
    cars = cars.concat(benzine.createCarArray(7, 4))
    cars = cars.concat(electrischHybride.createCarArray(5, 2))

    cars[0].startCar();
  }
}