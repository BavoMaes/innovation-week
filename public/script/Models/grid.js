export class Grid {
  constructor(_sketch, _width, _height, _boxHeight, _parts) {
    this.sketch = _sketch;
    this.width = _width;
    this.height = _height;
    this.boxHeight = _boxHeight;
    this.parts = _parts;
    this.fillColor1;
  }

  draw() {
    this.drawLabels();

    this.sketch.push();

    this.sketch.translate(0, this.boxHeight / 2);
    this.sketch.noFill();
    this.sketch.stroke(50);
    this.sketch.strokeWeight(1);

    this.outerLines();
    this.innerLines();

    this.sketch.push();
    this.sketch.rotateZ(this.sketch.HALF_PI);
    this.sketch.translate(-this.height / 2, -this.height / 2, 0);
    this.outerLines();
    this.innerLines();
    this.sketch.pop();

    this.sketch.push();
    this.sketch.rotateX(this.sketch.HALF_PI);
    this.sketch.translate(0, -this.height / 2, this.height / 2);
    this.outerLines();
    this.innerLines();
    this.sketch.pop();

    this.sketch.pop();
  }

  drawLabels() {
    this.sketch.fill(255);

    this.sketch.push();
    this.sketch.translate(0, 20, this.height / 2 + 50);
    this.sketch.text('Type of fuel', 0, 0);

    this.sketch.noStroke();
    this.sketch.textSize(20);

    this.sketch.push();
    this.fillColor1 = this.sketch.color("#84e6ca");
    this.sketch.fill(this.fillColor1);
    this.sketch.stroke(this.sketch.color(this.fillColor1.levels[0] - 50, this.fillColor1.levels[1] - 50, this.fillColor1.levels[2] - 50));
    this.sketch.text('Benzine', 5, 50);
    this.sketch.translate(-50, 50, 0);
    this.sketch.rotateY(this.sketch.frameCount / 50 + this.sketch.HALF_PI);
    this.sketch.rotateX(this.sketch.frameCount / 50 + this.sketch.HALF_PI);
    this.sketch.box(15);
    this.sketch.pop();

    this.sketch.push();
    this.fillColor1 = this.sketch.color("#D851C7");
    this.sketch.fill(this.fillColor1);
    this.sketch.stroke(this.sketch.color(this.fillColor1.levels[0] - 50, this.fillColor1.levels[1] - 50, this.fillColor1.levels[2] - 50));
    this.sketch.text('Diesel', 0, 75);
    this.sketch.translate(-50, 75, 0);
    this.sketch.rotateY(this.sketch.frameCount / 50 + this.sketch.QUARTER_PI);
    this.sketch.rotateX(this.sketch.frameCount / 50 + this.sketch.QUARTER_PI);
    this.sketch.box(15);
    this.sketch.pop();

    this.sketch.push();
    this.fillColor1 = this.sketch.color("#284fc6");
    this.sketch.fill(this.fillColor1);
    this.sketch.stroke(this.sketch.color(this.fillColor1.levels[0] - 50, this.fillColor1.levels[1] - 50, this.fillColor1.levels[2] - 50));
    this.sketch.text('Electrisch/Hybride', 44, 100);
    this.sketch.translate(-50, 100, 0);
    this.sketch.rotateY(this.sketch.frameCount / 50);
    this.sketch.rotateX(this.sketch.frameCount / 50);
    this.sketch.box(15);
    this.sketch.pop();

    this.sketch.pop();

    this.sketch.push();
    this.sketch.rotateY(-this.sketch.HALF_PI);
    this.sketch.translate(0, 20, this.height / 2 + 50);
    this.sketch.text('Amount of cars', 0, 0);

    this.sketch.noStroke();
    this.sketch.textSize(20);
    this.sketch.text(': 12 500 cars', 40, 40);
    this.sketch.translate(-20, 40, 10);
    this.sketch.stroke('#000000');
    this.sketch.fill('#ffffff');
    this.sketch.rotateY(this.sketch.frameCount / 50);
    this.sketch.rotateX(this.sketch.frameCount / 50);
    this.sketch.box(15);

    this.sketch.pop();

    this.sketch.push();
    this.sketch.rotateZ(-this.sketch.HALF_PI);
    this.sketch.translate(this.height / 2, this.height / 2 + 20, -this.height / 2);
    this.sketch.text('CO2 emission', 0, 0);
    this.sketch.textSize(20);
    this.sketch.text('(g/km)', 0, 40);
    this.sketch.pop();

    this.sketch.push();
    this.sketch.translate(-this.height / 2, -50, -this.height / 2);
    this.sketch.textSize(10);
    this.sketch.fill('#999999');
    this.sketch.text('110', -20, 10);
    this.sketch.text('120', -20, -40);
    this.sketch.text('130', -20, -90);
    this.sketch.text('140', -20, -140);
    this.sketch.text('150', -20, -190);
    this.sketch.text('160', -20, -240);
    this.sketch.pop();

  }

  outerLines() {
    this.sketch.box(this.width, 1, this.height);
  }

  innerLines() {
    this.sketch.line(-this.width / 2, 0, 0, -this.width / 2, 0, 0);
    for (let i = 0; i < this.parts / 2; i++) {
      this.sketch.line(-this.width / 2, 0, this.width / this.parts * i, this.width / 2, 0, this.width / this.parts * i);
      this.sketch.line(-this.width / 2, 0, -this.width / this.parts * i, this.width / 2, 0, -this.width / this.parts * i);
    }

    this.sketch.line(0, 0, -this.height / 2, 0, 0, this.height / 2);
    for (let i = 0; i < this.parts / 2; i++) {
      this.sketch.line(this.height / this.parts * i, 0, -this.height / 2, this.height / this.parts * i, 0, this.height / 2);
      this.sketch.line(-this.height / this.parts * i, 0, -this.height / 2, -this.height / this.parts * i, 0, this.height / 2);
    }
  }
}