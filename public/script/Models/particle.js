export class Particle {
    constructor(_sketch, _color, _size, _height) {
        this.sketch = _sketch;
        this.color = _color;
        this.size = _size;
        this.height = _height;
        this.lightness = parseFloat((Math.random() * (-0.2 - -0.01) + -0.01).toFixed(2));
        this.exhaust = parseFloat((Math.random() * (-0.1 - 0.1) + -0.1).toFixed(2));
        this.acceleration = this.sketch.createVector(0, this.lightness, 0);
        this.velocity = this.sketch.createVector(this.exhaust, 0, 0);
        this.position = this.sketch.createVector(0, 0, 0);
    }

    draw() {
        this.sketch.push();

        this.sketch.normalMaterial();
        this.sketch.fill(this.color);
        this.sketch.translate(this.position);
        this.sketch.sphere(this.size);
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
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 0;
        this.acceleration.x = 0;
        this.acceleration.y = this.lightness;
        this.acceleration.z = 0
        this.velocity.x = this.exhaust;
        this.velocity.y = 0
        this.velocity.z = 0;
    }
}