import {
  Exhaust
} from './exhaust'

export class Car {

  constructor(_startPos, _endPos, _size, _color, _heightInBlocks, _sound, _sketch) {
    this.sketch = _sketch;
    this.startPos = _startPos;
    this.endPos = _endPos;

    this.size = _size;
    this.fillColor = this.sketch.color(_color);
    this.strokeColor = this.sketch.color(this.fillColor.levels[0] - 50, this.fillColor.levels[1] - 50, this.fillColor.levels[2] - 50)
    this.ghostStrokeColor = this.sketch.color(this.fillColor.levels[0], this.fillColor.levels[1], this.fillColor.levels[2], 50)

    this.drive = false;
    this.stoped = false;
    this.EventpointReached = false;

    this.maxSpeed = 25;
    this.maxForce = 0;

    this.sound = _sound;

    this.reset(_heightInBlocks);

    this.exhaust = new Exhaust(this.sketch, this, 2);
  }

  reset(heightInBlocks) {
    this.location = this.startPos
    this.acceleration = this.sketch.createVector(0, 0, 0);
    this.velocity = this.sketch.createVector(0, 0, 0);
    this.heightInBlocks = heightInBlocks;

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
    if (!this.stoped && !this.drive) return;
    this.drawBox(this.location, this.fillColor, this.strokeColor, true)
    if (!this.stoped) return
    for (let i = 1; i <= this.heightInBlocks; i++) {
      let location = this.sketch.createVector(this.location.x, this.location.y - this.size.y * i, this.location.z)
      this.drawBox(location, this.fillColor, this.ghostStrokeColor, false)
    }


  }
  drawBox(loc, fillColor, strokeColor, isMain) {
    this.sketch.push();
    this.sketch.strokeWeight(2);
    this.sketch.fill(fillColor);
    if (!isMain) this.sketch.noFill();
    this.sketch.stroke(strokeColor);
    this.sketch.translate(loc);
    if (isMain && this.stoped) this.exhaust.draw();
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
    if (!this.drive) this.sound.play();
    this.drive = true;


  }
  stopCar() {
    this.stoped = true;
  }

  arrive(target) {
    let desired = p5.Vector.sub(this.endPos, this.location);
    let d = desired.mag();
    desired.normalize();

    if (d < 600) this.EventpointReached = true;
    if (d <= 10) this.stopCar();
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