class Tile {

    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.unit;
    }

    addUnit(unit) {
      if (this.unit) {
        throw 'unit déjà présente sur ' + this;
      }
      this.unit = unit;
    }

    hasUnit() {
      return this.unit === undefined ? false : true;
    }

}

export default Tile;
