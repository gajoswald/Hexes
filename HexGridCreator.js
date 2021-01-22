class HexGridCreator {
  constructor( centerX, centerY, width, height, hexSize ) {
    this.x = centerX;
    this.y = centerY;
    this.w = width;
    this.h = height;
    this.hexSize = hexSize;
    this.hexes = new Map();
  }

  createGrid() {
    this.createStartingHex()
    this.addNeighborsToGrid(this.startingHex, HexGrid.centerCoordinates);
    return new HexGrid( this.x, this.y, this.hexSize, this.hexes);
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
  
  static createBoundedGrid( x, y, width, height, hexSize ) {
    const creator = new HexGridCreator(x,y,width,height,hexSize);
    return creator.createGrid();
  }
}