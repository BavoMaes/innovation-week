import {
  Particle
} from './particle';

export class Exhaust {
  constructor(_sketch, _car) {
    this.sketch = _sketch;
    this.car = _car;
    this.height = 0
    this.velocity = 0;
    this.particles = this.initParticles();
  }

  initParticles() {
    let particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle(this.sketch, this.car.fillColor, 3, 300));
    }
    return particles;
  }

  draw() {
    this.sketch.push();

    for (let particle of this.particles) {
      particle.draw();
    }
    this.applyForce(0.001);
    this.sketch.pop();
  }

  applyForce(force) {
    this.velocity += force;
    this.height -= this.velocity;
  }
}