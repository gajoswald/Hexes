class HexGrid {
  constructor( x, y, w, h, hexSize ) {
    this.hexSize = hexSize;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hexes = new Map();
    const MAX_HEXES_PER_ROW = w / hexSize.w;
    const MAX_HEX_ROWS = h / hexSize.h;
    this.createGrid();
  }

  createGrid() {
    this.createStartingHex()
    this.addNeighborsToGrid(this.startingHex, HexGrid.centerCoordinates);
  }

  createStartingHex() {
    this.startingHex = new Hex(this.x,this.y,this.hexSize);
    this.hexes.set( HexGrid.centerCoordinates.string, {
      hex: this.startingHex,
      loc: HexGrid.centerCoordinates
    }); 
  }  

  addNeighborsToGrid(hex, coordinates) {
    const neighboringHexes = Object.keys(CubeDirection.pixelLocationFactors)
    .map( key => { // create a hex, location pair in each direction
      const f = CubeDirection.pixelLocationFactors[key]; 
      const c = coordinates.add(CubeCoordinates.directions[key]);
      return {
        hex: new Hex(
          hex.position.x + f.w * this.hexSize.w,
          hex.position.y + f.h * this.hexSize.h,
          this.hexSize
        ), 
        loc: c
      }; 
    }) 
    .filter( neighbor => // make sure the hex is inside the bounding box
      neighbor.hex.boundingBox.x.min > this.x - this.w/2 &&
      neighbor.hex.boundingBox.x.max < this.x + this.w/2 &&
      neighbor.hex.boundingBox.y.min > this.y - this.h/2 &&
      neighbor.hex.boundingBox.y.max < this.y + this.h/2
    );
    for( let neighbor of neighboringHexes ) {
      const k = neighbor.loc.string;
      if( !this.hexes.has( k ) ) {
        this.hexes.set( k, neighbor );
        this.addNeighborsToGrid(neighbor.hex, neighbor.loc);
      }
    }
  }

  draw() {
    rect( this.x - this.w/2, this.y - this.h/2, this.w, this.h);
    for( let h of this.hexes.values() ) {
      h.hex.draw();
    }
  }
  
}

HexGrid.centerCoordinates = new CubeCoordinates(0,0,0);