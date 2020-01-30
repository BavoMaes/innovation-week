export class Data {

  constructor(_sketch) {
    this.sketch = _sketch
    this.WagenparkPerBrandstofsoort = this.sketch.loadTable(
      './resources/data/WagenparkPerBrandstofsoort.csv',
      'csv',
      'header');

    this.CO2UitstoorPerBrandstofsoort = this.sketch.loadTable(
      './resources/data/CO2UitstoorPerBrandstofsoort.csv',
      'csv',
      'header');
  }


  lookupWagenPark(jaar) {

    let row = this.WagenparkPerBrandstofsoort.findRow(jaar.toString(), 'Jaar');
    var obj = {
      jaar: row.getString("Jaar"),
      benzine: row.getString('Benzine'),
      diesel: row.getString('Diesel'),
      hybrid: row.getString('Hybrid'),
      totaal: row.getString('Totaal')
    }
    return obj;
  }

  lookupCO2(jaar) {
    let row = this.CO2UitstoorPerBrandstofsoort.findRow(jaar.toString(), 'Jaar');
    var obj = {
      jaar: row.getString('Jaar'),
      benzine: row.getString('Benzine'),
      diesel: row.getString('Diesel'),
      hybrid: row.getString('Hybrid')

    }
    return obj;
  }

  getBlockSize(jaar) {
    let returnVal = new Array();

    let newDataCars = this.lookupWagenPark(jaar);
    let newDataCO2 = this.lookupCO2(jaar);



    let benzine = {
      name: "Benzine",
      co2: newDataCO2.benzine > 90 ? Math.round((newDataCO2.benzine - 90) / 5) : 1,
      amount: Math.round(newDataCars.benzine / 12500)
    }
    let diesel = {
      name: "Diesel",
      co2: newDataCO2.diesel > 90 ? Math.round((newDataCO2.diesel - 90) / 5) : 1,
      amount: Math.round(newDataCars.diesel / 12500)
    }
    let hybrid = {
      name: "Hybrid",
      co2: newDataCO2.hybrid > 90 ? Math.round((newDataCO2.hybrid - 90) / 5) : 1,
      amount: Math.round(newDataCars.hybrid / 12500)
    }
    returnVal.push(benzine, diesel, hybrid);
    return returnVal;
  }


}