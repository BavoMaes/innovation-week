import {
  Car
} from './car';
import {
  Grid
} from './grid';

let width = window.innerWidth;
let height = window.innerHeight;
let radius = 100;
let grid;
let xTurn, yTurn;
let cars = new Array();

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

    for (let i = 0; i < 3; i++) {
      let startPos = sketch.createVector((i * 100), 0, -500);
      let dest = sketch.createVector((i * 60), 0, 250);
      let size = sketch.createVector(50, 50, 90);
      cars.push(new Car(startPos, dest, size, sketch))
    }

    grid = new Grid(sketch, 600, 600, 50, 12);
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


init();