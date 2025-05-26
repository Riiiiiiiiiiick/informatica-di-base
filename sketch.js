let sliderWidth, sliderHeight, sliderDensity;
let coloreLettera, coloreSfondo;

function setup() {
  createCanvas(540, 540);
  pixelDensity(4);
  angleMode(DEGREES);
  
  sliderWidth = createSlider(20, 50, 30);
  sliderHeight = createSlider(20, 50, 30);
  sliderDensity = createSlider(2, 16, 1);

  coloreSfondo = createColorPicker('#323232'); // 
  coloreLettera = createColorPicker('#dcdcdc');  // 

  sliderWidth.position(10, height + 10);
  sliderHeight.position(10, height + 40);
  sliderDensity.position(10, height + 70);
  coloreLettera.position(200, height + 10);
  coloreSfondo.position(200, height + 40);
}

function draw() {
  background(coloreSfondo.color());
  
    let dens = sliderDensity.value();
    if (dens % 2 !== 0) {
    dens--;
  }

  for (let i = 0; i < xy.length; i += dens) {
    push();
    translate(xy[i], xy[i + 1]);
    rotate(frameCount);

    let w = sliderWidth.value();
    let h = sliderHeight.value();
    let shadowLines = 10;
    stroke(coloreSfondo.color());
    strokeWeight(1);

    for (let j = -h / 2; j <= h / 2; j += h / shadowLines) {
      let len = sqrt(1 - sq(j / (h/3))) * (w/2);
      line(len, j + 10, -len, j + 10);
      for (let k = -h / 2; k <= h / 2; k += h / shadowLines) {
      let len = sqrt(1 - sq(k / (h/3))) * (w/2);
      line(-len, k + 15, len, k + 15);
    }
    }
    
    

    noStroke();
    fill(coloreLettera.color());
    ellipse(0, 0, h, w);

    pop();
  }
}

function keyPressed() {
  if (key == 's') {
    save("image.png");
  }
}
