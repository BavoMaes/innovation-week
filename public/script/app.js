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

    grid = new Grid(sketch, 600, 600, 50, 6);
    let size = sketch.createVector(sets.sketch.carsSize.X, sets.sketch.carsSize.Y, sets.sketch.carsSize.Z);
    for (let x = 0; x < sets.sketch.carsCount; x++) {
      for (let y = 0; y < 2; y++) {

        let startPos = sketch.createVector(0, size.y * 2, -(grid.width - size.z / 2) - (cars.length * size.z));
        let dest = sketch.createVector((x * size.x) + (grid.width / 2 - size.x * 1.5), size.y * 2, (grid.width / 2 - size.z / 2) - (y * size.z));
        let color = sets.sketch.colors.Benzine
        cars.push(new Car(startPos, dest, size, color, sketch))
      }
    }
    for (let x = 0; x < sets.sketch.carsCount; x++) {
      for (let y = 0; y < 2; y++) {

        let startPos = sketch.createVector(0, size.y * 2, -(grid.width - size.z / 2) - (cars.length * size.z));
        let dest = sketch.createVector((x * size.x) - size.x * 0.5, size.y * 2, (grid.width / 2 - size.z / 2) - (y * size.z));

        let color = sets.sketch.colors.Diesel
        cars.push(new Car(startPos, dest, size, color, sketch))
      }
    }
    for (let x = 0; x < sets.sketch.carsCount; x++) {
      for (let y = 0; y < 2; y++) {

        let startPos = sketch.createVector((x * 60), size.y * 2, -(grid.width - size.z / 2) - (cars.length * size.z));
        let dest = sketch.createVector((x * size.x) - (grid.width / 2 - size.x * 0.5), size.y * 2, (grid.width / 2 - size.z / 2) - (y * size.z));

        let color = sets.sketch.colors.Electrisch_Hybride
        cars.push(new Car(startPos, dest, size, color, sketch))
      }
    }


  }


  sketch.draw = function() {
    sketch.background(0);
    sketch.orbitControl();

    sketch.rotateX(xTurn);
    sketch.rotateY(yTurn);

    grid.draw();

    cars.forEach(function(car) {
      car.update();
      car.draw();
    })
  }

}