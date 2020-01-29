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

    for (let i = 0; i < sets.sketch.carsCount; i++) {
      let startPos = sketch.createVector((i * 60), 0, -500 + sketch.random(10, 100));
      let dest = sketch.createVector((i * 60) + 200, 0, 250);
      let size = sketch.createVector(50, 50, 90);
      let color = sets.sketch.colors.Benzine
      cars.push(new Car(startPos, dest, size, color, sketch))
    }
    for (let i = 0; i < sets.sketch.carsCount; i++) {
      let startPos = sketch.createVector((i * 60), 0, -500 + sketch.random(10, 100));
      let dest = sketch.createVector((i * 60) - 50, 0, 250);
      let size = sketch.createVector(50, 50, 90);
      let color = sets.sketch.colors.Diesel
      cars.push(new Car(startPos, dest, size, color, sketch))
    }
    for (let x = 0; x < sets.sketch.carsCount; x++) {
      //for (let y = 0; y < 2; y++) {
      let startPos = sketch.createVector((x * 60), 0, -500 + sketch.random(10, 100));
      let dest = sketch.createVector((x * 60) - 255, 0, 250);
      let size = sketch.createVector(50, 50, 90);
      let color = sets.sketch.colors.Electrisch_Hybride
      cars.push(new Car(startPos, dest, size, color, sketch))
      //}
    }

    grid = new Grid(sketch, 600, 600, 50, 9);
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