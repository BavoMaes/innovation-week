export class Grid {
    constructor(_sketch, _width, _height, _boxHeight, _parts) {
        this.sketch = _sketch;
        this.width = _width;
        this.height = _height;
        this.boxHeight = _boxHeight;
        this.parts = _parts;
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
        this.sketch.pop();

        this.sketch.push();
        this.sketch.rotateY(-this.sketch.HALF_PI);
        this.sketch.translate(0, 20, this.height / 2 + 50);
        this.sketch.text('Amount of cars', 0, 0);
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