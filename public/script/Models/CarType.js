import {
  Car
} from './Car';


export class CarType {



  constructor(_startColumn, _endColumn, _carSize, _color, _sketch) {
    this.startColumn = _startColumn;
    this.endColumn = _endColumn;
    this.color = _color;
    this.sketch = _sketch;
    this.carSize = _carSize;
    this.size = 0;

  }

  createCarArray(size) {
    let sizeIsEven = false;
    let cars = new Array();
    if (size % 2 == 0) sizeIsEven = true;
    for (let x = 0; x < 2; x++) {
      if (!sizeIsEven) {
        for (let y = 0; y < size / 2; y++) {
          if (x != 1 || y != Math.round(size / 2) - 1) {
            console.log("cars");
            let startPos = this.sketch.createVector((x * this.carSize.x) + this.startColumn.x, this.startColumn.y, this.startColumn.z);
            let dest = this.sketch.createVector((x * this.carSize.x) + this.endColumn.x, this.endColumn.y, this.endColumn.z - (y * this.carSize.z));
            cars.push(new Car(startPos, dest, this.carSize, this.color, this.sketch))
          }
        }
      } else {
        for (let y = 0; y < size / 2; y++) {
          console.log("cars");
          let startPos = this.sketch.createVector((x * this.carSize.x) + this.startColumn.x, this.startColumn.y, this.startColumn.z);
          let dest = this.sketch.createVector((x * this.carSize.x) + this.endColumn.x, this.endColumn.y, this.endColumn.z - (y * this.carSize.z));
          cars.push(new Car(startPos, dest, this.carSize, this.color, this.sketch))
        }
      }
    }
    return cars;
  }


}