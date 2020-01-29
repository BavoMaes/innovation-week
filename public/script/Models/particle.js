export class Particle {
    constructor(_sketch, _color, _size, _height, _offset) {
        this.sketch = _sketch;
        this.color = _color;
        this.size = _size;
        this.height = _height;
        this.lightness = this.sketch.random(-0.2, -0.01);
        this.acceleration = this.sketch.createVector(0, this.lightness, 0);
        this.velocity = this.sketch.createVector(0, 0, 0);
        this.position = this.sketch.createVector(this.sketch.random(-_offset, _offset), this.sketch.random(-_offset, _offset), 0);
    }

    draw() {
        this.sketch.push();

        this.sketch.normalMaterial();
        this.sketch.fill(this.color);
        this.sketch.translate(this.position);
        this.sketch.box(this.size);
        this.applyForce(this.acceleration);
        this.checkMaxHeight();

        this.sketch.pop();
    }

    applyForce(force) {
        this.velocity.add(force);
        this.position.add(this.velocity);
    }

    checkMaxHeight() {
        if (this.position.y < -this.height) {
            this.reset();
        }
    }

    reset() {
        this.position.y = 0;
        this.acceleration.x = 0;
        this.acceleration.y = this.lightness;
        this.acceleration.z = 0
        this.velocity.x = this.exhaust;
        this.velocity.y = 0
        this.velocity.z = 0;
    }
}