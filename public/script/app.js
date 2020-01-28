import { Car } from './car';
import { Grid } from './grid';

let width = window.innerWidth;
let height = window.innerHeight;
let radius = 100;
let car, grid;
let xTurn, yTurn;


function init() {
  let myp5 = new p5(s, "canvas");
}

var s = (sketch) => {
  xTurn = -sketch.atan(1 / sketch.sqrt(2));
  yTurn = sketch.QUARTER_PI;

  sketch.setup = function() {
    sketch.createCanvas(width, height, sketch.WEBGL);
    sketch.ortho();

    sketch.background(0);
    sketch.stroke(0);

    car = new Car(sketch.createVector(0, 0, -500), sketch.createVector(0, 0, 0), sketch);
    grid = new Grid(sketch, 600, 600, 50, 12);
  }


  sketch.draw = function() {
    sketch.background(0);
    sketch.orbitControl();

    sketch.rotateX(xTurn);
    sketch.rotateY(yTurn);
    
    grid.draw();

    car.update();
    car.draw();
  }
}

init();