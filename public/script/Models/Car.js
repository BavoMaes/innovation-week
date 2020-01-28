export class Car {

  constructor(_startPos, _endPos, _size, _sketch) {
    this.sketch = _sketch;
    this.startPos = _startPos;
    this.endPos = _endPos;
    this.size = _size;
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


    this.sketch.strokeWeight(2);
    this.sketch.stroke(this.strokeColor);
    this.sketch.fill(this.fillColor);
    this.sketch.translate(this.location);

    this.sketch.box(this.size);


    this.sketch.pop()

  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  reset() {
    this.location = this.startPos
    this.acceleration = this.sketch.createVector(0, 0, 0);
    this.velocity = this.sketch.createVector(0, 0, 0);
    this.maxspeed = 8;
    this.maxForce = 0;
    this.fillColor = this.sketch.color(255, 110, 99)
    this.strokeColor = this.sketch.color(205, 60, 49)
    this.xTurn = -this.sketch.atan(1 / this.sketch.sqrt(2));
    this.yTurn = this.sketch.QUARTER_PI;
    this.zTurn = this.sketch.PI;
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.location);
    let d = desired.mag();
    desired.normalize();
    if (d < 100) {
      // slowing down
      let m = this.sketch.map(d, 0, 100, 0, this.maxspeed);
      desired.mult(m);
    } else {
      // maxspeed
      desired.mult(this.maxspeed);
    }

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  separate(otherCars) {
    let self = this;
    let steer = self.sketch.createVector(0, 0);
    let count = 0;

    otherCars.forEach(function(other) {
      let dist = self.location.dist(other.location);
      if ((dist > 0) && (dist < self.desiredSep)) {
        let pos = self.sketch.createVector(self.location.x, self.location.y);
        let diff = pos.sub(other.location);
        diff.normalize();
        diff.div(dist);
        steer.add(diff);
        count++;
      }
    })

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(self.maxSpeed);
      steer.sub(self.velocity);
      steer.limit(self.maxForce);

    }
    return steer;
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

}