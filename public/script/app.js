import {
  Car
} from './car';

import {
  Grid
} from './grid';



let sets = {}


let width = window.innerWidth;
let height = window.innerHeight;
let radius = 100;
let grid;
let xTurn, yTurn;
let cars = new Array();
let waitingQue = new Array();

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

  sketch.setup = function() {
    sketch.createCanvas(width, height, sketch.WEBGL);
    sketch.ortho();

    sketch.background(0);
    sketch.stroke(0);


    let size = sketch.createVector(sets.sketch.carsSize.X, sets.sketch.carsSize.Y, sets.sketch.carsSize.Z);
    grid = new Grid(sketch, 600, 600, size.y, 6);
    for (let x = 0; x < sets.sketch.carsCount; x++) {
      for (let y = 0; y < 2; y++) {

        let startPos = sketch.createVector((x * size.x) + (grid.width / 2 - size.x * 1.5), 0, -900);
        let dest = sketch.createVector((x * size.x) + (grid.width / 2 - size.x * 1.5), 0, (grid.width / 2 - size.z / 2) - (y * size.z));
        let color = sets.sketch.colors.Benzine
        cars.push(new Car(startPos, dest, size, color, sketch))
      }
    }
    for (let x = 0; x < sets.sketch.carsCount; x++) {
      for (let y = 0; y < 2; y++) {

        let startPos = sketch.createVector((x * size.x) - size.x * 0.5, 0, -900);
        let dest = sketch.createVector((x * size.x) - size.x * 0.5, 0, (grid.width / 2 - size.z / 2) - (y * size.z));

        let color = sets.sketch.colors.Diesel
        cars.push(new Car(startPos, dest, size, color, sketch))
      }
    }
    for (let x = 0; x < sets.sketch.carsCount; x++) {
      for (let y = 0; y < 2; y++) {

        let startPos = sketch.createVector((x * size.x) - (grid.width / 2 - size.x * 0.5), 0, -900);
        let dest = sketch.createVector((x * size.x) - (grid.width / 2 - size.x * 0.5), 0, (grid.width / 2 - size.z / 2) - (y * size.z));

        let color = sets.sketch.colors.Electrisch_Hybride
        cars.push(new Car(startPos, dest, size, color, sketch))
      }
    }
    cars[0].startCar();

  }


  sketch.draw = function() {
    sketch.background(0);
    sketch.orbitControl();

    sketch.rotateX(xTurn);
    sketch.rotateY(yTurn);

    grid.draw();

    console.log(cars[0])

    for (let i = 1; i < cars.length; i++) {
      if (cars[i - 1].EventpointReached) cars[i].startCar()
    }

    cars.forEach(function(car) {
      car.update();
      car.draw();
    })
  }

}