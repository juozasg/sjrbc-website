export class Model {

  constructor() {
    this.data = {}
  }

  async processUSGS(data) {
    console.log('process usgs');
    console.log(data);

    // throw new Error('nooope');
  }

  async processHistoric(data) {
    console.log('process historic');
    console.log(data);

    // throw new Error('nooope2');

  }

}