class HexGrid {
  constructor( x, y, hexSize = new HexDimensions(), hexes = new Map() ) {
    this.x = x;
    this.y = y;
    this.hexes = hexes;
  }

  draw() {
    // rect( this.x - this.w/2, this.y - this.h/2, this.w, this.h);
    for( let h of this.hexes.values() ) {
      h.hex.draw();
    }
  }
  
}

HexGrid.centerCoordinates = new CubeCoordinates(0,0,0);