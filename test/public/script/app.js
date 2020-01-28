import {
  Car
} from './Car';



let width = window.innerWidth;
let height = window.innerHeight;

let radius = 100;
let car;

function init() {
  let myp5 = new p5(s, "canvas");

}



var s = (sketch) => {

  sketch.setup = function() {
    sketch.createCanvas(width, height, sketch.WEBGL);

    sketch.background(0);
    sketch.stroke(0);
    car = new Car(sketch.createVector(-width / 2, -height / 2, 0), sketch.createVector(10, 10, 0), sketch);

  }


  sketch.draw = function() {
    sketch.background(255);
    sketch.orbitControl();

    car.update();
    car.draw();

    //sketch.fill(255, 255, 0);


    //sketch.box(100);
  }
}


init();