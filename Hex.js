// https://www.redblobgames.com/grids/hexagons/
class Hex {  
  constructor(x, y, size, colour = COLOR_SCHEME.randomColor() ) {
    this.position = { x: x, y: y };
    this.size = size.constructor.name === 'HexDimensions' ? size : new HexDimensions(size); 
    this.colour = colour;
    this.x1 = this.position.x - this.size.half_w;
    this.x2 = this.position.x;
    this.x3 = this.position.x + this.size.half_w;    
    this.y1 = this.position.y - 2 * this.size.quarter_h;
    this.y2 = this.position.y - this.size.quarter_h;
    this.y3 = this.position.y + this.size.quarter_h;
    this.y4 = this.position.y + 2 * this.size.quarter_h;
    this.vertices = [ 
      {x: this.x1, y: this.y2},
      {x: this.x2, y: this.y1},
      {x: this.x3, y: this.y2},
      {x: this.x3, y: this.y3},
      {x: this.x2, y: this.y4},
      {x: this.x1, y: this.y3}
    ];
    this.boundingBox = {
      x: {min: this.x1, max: this.x3 },
      y: {min: this.y1, max: this.y4 }
    };
  }

  draw() {
    noStroke();
    fill(this.colour)
    beginShape();
    for( let v of this.vertices) {
      vertex( v.x, v.y );
    }
    endShape(CLOSE);
  }
}

class HexDimensions {
  constructor(s=5) {
    this.s = s;
    this.w = sqrt(3) * s;
    this.h = 2 * s;
    this.half_h = this.h / 2; 
    this.half_w = this.w / 2;
    this.quarter_h = this.h / 4;
  }

  get size() {
    return this.s;
  }
}