import {
  Particle
} from './particle';

export class Exhaust {
  constructor(_sketch, _car, _particleAmount) {
    this.sketch = _sketch;
    this.car = _car;
    this.particleAmount = _particleAmount;
    this.height = 0
    this.velocity = 0;
    this.particles = this.initParticles(this.particleAmount);
  }

  initParticles(particleAmount) {
    let particles = [];
    for (let i = 0; i < particleAmount; i++) {
      particles.push(new Particle(this.sketch, this.car.fillColor, this.sketch.random(0, 2), (this.car.heightInBlocks * this.car.size.y) - this.car.size.y * 0.5, this.car.size.x / 2));
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