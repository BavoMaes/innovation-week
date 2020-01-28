export class Grid {
    constructor(_sketch, _width, _height, _parts) {
        this.sketch = _sketch;
        this.width = _width;
        this.height = _height;
        this.parts = _parts;
    }

    draw() {
        this.sketch.noFill();
        this.sketch.stroke(50);
        this.sketch.strokeWeight(1);

        this.outerLines();
        this.innerLines();
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