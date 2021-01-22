class ColorScheme {
  constructor(
    mode = RGB, 
    channelRanges = [
      {min: 0, max: 255},
      {min: 0, max: 255},
      {min: 0, max: 255},
      {min: 0, max: 255}
    ]
  ) {
    this.mode = mode;
    this.channelRanges = channelRanges;
    this.stringToMode = {
      "rgb":RGB,
      "hsb":HSB,
      "hsl":HSL      
    };
  }

  randomColor() {
    const savedColorMode = color(0).mode;
    colorMode(this.mode);
    const c = color( 
      random(this.channelRanges[0].min, this.channelRanges[0].max),
      random(this.channelRanges[1].min, this.channelRanges[1].max),
      random(this.channelRanges[2].min, this.channelRanges[2].max),
      random(this.channelRanges[3].min, this.channelRanges[3].max),
    )
    colorMode(savedColorMode);
    return c;
  }

  static narrowColorRangeAround( hue ) {
    const savedColorMode = color(0).mode;
    colorMode(this.mode);
    const scheme = new ColorScheme( 
      HSB, [
        {min: hue-15, max: hue+15},
        {min: 80, max: 100},
        {min: 80, max: 100},
        {min: 0, max: 1},
    ]);
    colorMode(savedColorMode);
    return scheme;
  }
}