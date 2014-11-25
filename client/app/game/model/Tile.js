class Tile {

    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.unit;
    }

    addUnit(unit) {
      if (this.unit) {
        throw 'unit déjà présente sur ' + tile;
      }
      this.unit = unit;
    }

}

export default Tile;
