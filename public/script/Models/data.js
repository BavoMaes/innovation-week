export class Data {

  constructor(_sketch) {
    this.sketch = _sketch
    this.data = this.sketch.loadTable(
      './resources/data/WagenparkPerBrandstofsoort.csv',
      'csv',
      'header');
  }


  lookupTable(jaar) {
    let row = this.data.findRow(jaar.toString(), 'Jaar');

    var obj = {
      jaar: row.getString('Jaar'),
      benzine: row.getString('Benzine'),
      diesel: row.getString('Diesel'),
      hybride: row.getString('Elec+Hybride'),
      benzinePercentage: row.getString('Benzine%'),
      dieselPercentage: row.getString('Diesel%'),
      hybridPercentage: row.getString('Elec%'),
      totaal: row.getString('Totaal')
    }
    return obj;
  }

  lookupTable2(jaar) {
    let row = this.data.findRow(jaar.toString(), 'Jaar');

    var obj = {
      jaar: row.getString('Jaar'),
      benzine: row.getString('Benzine'),
      benzineVerbruik: row.getString('l/100kmBenzine'),
      diesel: row.getString('Diesel'),
      dieselVerbruik: row.getString('l/100kmDiesel'),
      hybrid: row.getString('Hybrid'),
      remiddelde: row.getString('Gemiddelde'),
      delta: row.getString('Delta')
    }
    return obj;
  }


}