export class Car {

  constructor(_startPos, _endPos, _sketch) {
    this.sketch = _sketch;
    this.startPos = _startPos;
    this.endPos = _endPos;
    this.reset();
  }

  update() {
    this.arrive(this.endPos);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw() {
    this.sketch.push();
    this.sketch.ortho();

    this.sketch.strokeWeight(2);
    this.sketch.stroke(this.strokeColor);
    this.sketch.fill(this.fillColor);
    this.sketch.translate(this.location);

    this.sketch.rotateX(this.xTurn);
    this.sketch.rotateY(this.yTurn);

    this.sketch.box(50, 50, 90);
    //this.sketch.box(60, 10, 10);

    this.sketch.pop()

  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  reset() {
    this.location = this.startPos
    this.acceleration = this.sketch.createVector(0, 0, 0);
    this.velocity = this.sketch.createVector(0, 0, 0);
    this.maxspeed = 10;
    this.maxForce = 0.2;
    this.fillColor = this.sketch.color(255, 110, 99)
    this.strokeColor = this.sketch.color(205, 60, 49)
    this.xTurn = -this.sketch.atan(1 / this.sketch.sqrt(2));
    this.yTurn = this.sketch.QUARTER_PI
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.location);
    let d = desired.mag();
    desired.normalize();

    if (d < 100) {
      // slowing down
      let m = this.sketch.map(d, 0, 100, 0, this.maxspeed);
      desired.mult(m);
      console.log("slowing")
    } else {
      // maxspeed
      desired.mult(this.maxspeed);
    }

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

}