import {
  Car
} from './Car';


export class CarType {



  constructor(_startColumn, _endColumn, _rowCount, _carSize, _color, _sketch) {
    this.startColumn = _startColumn;
    this.endColumn = _endColumn;
    this.color = _color;
    this.sketch = _sketch;
    this.carSize = _carSize;
    this.size = 0;
    this.row = 4;
  }


  createCarArray(size, height) {
    let cars = new Array();
    let counter = 0;

    let startPos, dest;

    for (let y = 0; y < Math.ceil(size / this.row); y++) {
      for (let x = 0; x < this.row; x++) {
        startPos = this.sketch.createVector((x * this.carSize.x) + this.startColumn.x, this.startColumn.y, this.startColumn.z);
        dest = this.sketch.createVector((x * this.carSize.x) + this.endColumn.x, this.endColumn.y, this.endColumn.z - (y * this.carSize.z));

        if (counter++ < size) cars.push(new Car(startPos, dest, this.carSize, this.color, height, this.sketch))
      }

    }
    return cars;
  }


}