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
let myData, mySound;
let year;
let settingrequest = new XMLHttpRequest();
let sketchInit, createCarTypeInit;
let carsReset, carUpdate, sketchUpdate
let carSize;

settingrequest.open('GET', './settings', true);
settingrequest.onload = function() {
  //load settings
  const settings = JSON.parse(this.response);
  sets = settings;
  init();
}
settingrequest.send();

function init() {
  let myp5 = new p5(s, sets.Id);
}

document.getElementById("minus").addEventListener("click", minusYear);
document.getElementById("plus").addEventListener("click", plusYear);

function minusYear() {
  let currentYear = parseInt(document.getElementById("year").innerHTML);
  if (currentYear <= 2002) {
    console.error("Year can't be smaller than 2002");
  } else {
    changeYear(currentYear, -1);
  }
}

function plusYear() {
  let currentYear = parseInt(document.getElementById("year").innerHTML);
  if (currentYear >= 2018) {
    console.error("Year can't be bigger than 2018");
  } else {
    changeYear(currentYear, 1);
  }
}

function changeYear(currentYear, change) {
  let newYear = currentYear + change;
  document.getElementById("year").innerHTML = newYear;
  carsReset(newYear);
}

var s = (sketch) => {
  year = 2002;
  xTurn = -sketch.atan(1 / sketch.sqrt(2)) + 0.05;
  yTurn = sketch.QUARTER_PI;

  sketch.preload = function() {
    font = sketch.loadFont('./resources/BebasNeue-Regular.ttf');
    myData = new Data(sketch);

    sketch.soundFormats('wav', 'ogg');
    mySound = sketch.loadSound('./resources/woosh.wav');
  }

  sketch.setup = function() {
    sketchInit();
    carSize = sketch.createVector(sets.sketch.carsSize.X, sets.sketch.carsSize.Y, sets.sketch.carsSize.Z);
    mainGrid = new Grid(sketch, sets.sketch.grid.width, sets.sketch.grid.height, sets.sketch.carsSize.Y, sets.sketch.grid.parts);
    createCarTypeInit()
    carsReset(year)
  }

  sketch.draw = function() {
    sketchUpdate();
    mainGrid.draw();
    carUpdate();
  }

  sketchInit = () => {
    mySound.setVolume(0.5);
    sketch.createCanvas(width, height, sketch.WEBGL);
    sketch.ortho();

    sketch.background(0);
    sketch.stroke(0);

    sketch.textFont(font);
    sketch.textSize(50);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
  }

  createCarTypeInit = () => {
    let startColumn1 = sketch.createVector(0, 0, -700);
    let endColumn1 = sketch.createVector(-(mainGrid.width / 2 - carSize.x * 0.5), 0, (mainGrid.width / 2 - carSize.z / 2));

    let startColumn2 = sketch.createVector(-carSize.x, 0, -700);
    let endColumn2 = sketch.createVector(-carSize.x - carSize.x * 0.5, 0, (mainGrid.width / 2 - carSize.z / 2));

    let startColumn3 = sketch.createVector(0, 0, -700);
    let endColumn3 = sketch.createVector((mainGrid.width / 2 - carSize.x * 3.5), 0, (mainGrid.width / 2 - carSize.z / 2));

    diesel = new CarType(startColumn1, endColumn1, sets.sketch.columnCount, carSize, sets.sketch.colors.Diesel, mySound, sketch)
    benzine = new CarType(startColumn2, endColumn2, sets.sketch.columnCount, carSize, sets.sketch.colors.Benzine, mySound, sketch)
    electrischHybride = new CarType(startColumn3, endColumn3, sets.sketch.columnCount, carSize, sets.sketch.colors.Electrisch_Hybride, mySound, sketch)
  }

  sketchUpdate = () => {
    sketch.background(0);
    sketch.orbitControl();

    sketch.rotateX(xTurn);
    sketch.rotateY(yTurn);
    sketch.translate(0, 100, 0);
  }

  carUpdate = () => {
    for (let i = 1; i < cars.length; i++) {
      if (cars[i - 1].EventpointReached && !cars[i].drive) cars[i].startCar()
    }

    cars.forEach(function(car) {
      car.update();
      car.draw();
    })
  }
  carsReset = (jaar) => {
    let carData = myData.getBlockSize(jaar);
    cars.length = 0
    cars = cars.concat(diesel.createCarArray(carData[0].amount, carData[0].co2))
    cars = cars.concat(benzine.createCarArray(carData[1].amount, carData[1].co2))
    cars = cars.concat(electrischHybride.createCarArray(carData[2].amount, carData[2].co2))
    //cars = cars.concat(diesel.createCarArray(2, 10))
    cars[0].startCar();
  }
}