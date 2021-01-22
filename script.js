let hex;
let grid;
let COLOR_SCHEME;

function setup() {
  createCanvas(windowWidth, windowHeight);
  COLOR_SCHEME = ColorScheme.narrowColorRangeAround(200);
  const w = random(200,500);
  const h = random(200,500);
  grid = HexGridCreator.createBoundedGrid( 
    random(w/2, width-w/2),
    random(h/2,height-h/2),
    w,
    h,
    new HexDimensions(random(3,30))
  );
}

function draw() {
  background(200);
  grid.draw();
  noLoop();
}