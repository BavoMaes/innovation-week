export class Car {

  constructor(_startPos, _endPos, _size, _color, _sketch) {
    this.sketch = _sketch;
    this.startPos = _startPos;
    this.endPos = _endPos;
    this.size = _size;
    this.fillColor = this.sketch.color(_color);
    this.strokeColor = this.sketch.color(this.fillColor - 20)

    this.drive = false;
    this.EventpointA = false;

    this.xTurn = -this.sketch.atan(1 / this.sketch.sqrt(2));
    this.yTurn = this.sketch.QUARTER_PI;
    this.zTurn = this.sketch.PI;

    this.maxSpeed = 10;
    this.maxForce = 0;
    this.desiredSep = this.size.x / 2;
    this.reset();
  }

  reset() {
    this.location = this.startPos
    this.acceleration = this.sketch.createVector(0, 0, 0);
    this.velocity = this.sketch.createVector(0, 0, 0);


  }

  update() {
    if (!this.drive) return;
    this.applyforces();

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw() {
    this.sketch.push();

    this.sketch.strokeWeight(2);
    this.sketch.stroke(this.strokeColor);
    this.sketch.fill(this.fillColor);
    this.sketch.translate(this.location);
    this.sketch.box(this.size);


    this.sketch.pop()

  }


  applyforces(otherCars) {
    let arrive = this.arrive(this.endPos);
    arrive.mult(1.0);
    this.applyForce(arrive);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  startCar() {
    this.drive = true;
  }


  arrive(target) {
    let desired = p5.Vector.sub(target, this.location);
    let d = desired.mag();
    desired.normalize();

    if (d < 400) this.EventpointA = true;
    if (d <= 0) this.drive = false;
    if (d < 100) {
      // slowing down
      let m = this.sketch.map(d, 0, 100, 0, this.maxSpeed);
      desired.mult(m);
    } else {
      // maxSpeed
      desired.mult(this.maxSpeed);
    }

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

}