// cube coordinates
class CubeCoordinates {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(direction) {
    return new CubeCoordinates(this.x + direction.x, this.y + direction.y, this.z + direction.z);
  }

  get neighboringCoordinates() {
    let n = [];
    for (const d in CubeCoordinates.directions) {
      n.push(this.add(CubeCoordinates.directions[d]));
    }
    return n;
  }

  get string() {
    return `${this.x},${this.y},${this.z}`;
  }
}

class CubeDirection {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  clockwiseDirection() {
    if( this === CubeCoordinates.directions.X_POS ) { return CubeCoordinates.directions.Y_POS; }
    if( this === CubeCoordinates.directions.X_NEG ) { return CubeCoordinates.directions.Y_NEG; }
    if( this === CubeCoordinates.directions.Y_POS ) { return CubeCoordinates.directions.Z_POS; }
    if( this === CubeCoordinates.directions.Y_NEG ) { return CubeCoordinates.directions.Z_NEG; }
    if( this === CubeCoordinates.directions.Z_NEG ) { return CubeCoordinates.directions.X_POS; }
    if( this === CubeCoordinates.directions.Z_POS ) { return CubeCoordinates.directions.X_NEG; }
  }   
  
  counterClockwiseDirection() {
    if( this === CubeCoordinates.directions.X_POS ) { return CubeCoordinates.directions.Z_NEG; }
    if( this === CubeCoordinates.directions.X_NEG ) { return CubeCoordinates.directions.Z_POS; }
    if( this === CubeCoordinates.directions.Y_POS ) { return CubeCoordinates.directions.X_POS; }
    if( this === CubeCoordinates.directions.Y_NEG ) { return CubeCoordinates.directions.X_NEG; }
    if( this === CubeCoordinates.directions.Z_NEG ) { return CubeCoordinates.directions.Y_NEG; }
    if( this === CubeCoordinates.directions.Z_POS ) { return CubeCoordinates.directions.Y_POS; }
  }
  
  static lookup( direction ) {
    if( direction === CubeCoordinates.directions.X_POS ) { return "X_POS"; }
    if( direction === CubeCoordinates.directions.X_NEG ) { return "X_NEG"; }
    if( direction === CubeCoordinates.directions.Y_POS ) { return "Y_POS"; }
    if( direction === CubeCoordinates.directions.Y_NEG ) { return "Y_NEG"; }
    if( direction === CubeCoordinates.directions.Z_NEG ) { return "Z_NEG"; }
    if( direction === CubeCoordinates.directions.Z_POS ) { return "Z_POS"; }
  }
}


CubeCoordinates.directions = {
	X_POS: new CubeDirection(0, 1, -1),
	X_NEG: new CubeDirection(0, -1, 1),
	Y_POS: new CubeDirection(1, 0, -1),
	Y_NEG: new CubeDirection(-1, 0, 1),
	Z_NEG: new CubeDirection(-1, 1, 0),
	Z_POS: new CubeDirection(1, -1, 0)
};

CubeDirection.pixelLocationFactors = {
  X_POS: { w: -0.5, h: -0.75 },
  X_NEG: { w: 0.5, h: 0.75 },
  Y_POS: { w: 0.5, h: -0.75 },
  Y_NEG: { w: -0.5, h: 0.75 }, 
  Z_POS: { w: 1, h: 0 },
  Z_NEG: { w: -1, h: 0 }
};