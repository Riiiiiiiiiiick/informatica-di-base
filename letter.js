let sliderWidth, sliderHeight, sliderDensity;
let coloreLettera, coloreSfondo;
let bSave, bSaveSVG;
let exportSVG=false;

let xy=[];

function setup() {
  const canvas = createCanvas(540, 540);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  
  sliderWidth = createSlider(20, 50, 30);
  sliderHeight = createSlider(20, 50, 30);
  sliderDensity = createSlider(2, 16, 1);
  uSpinMe = createSlider(0,360,18);
  bSave= createButton("SAVE IMG")
  bSave.mousePressed(savePNG);
  bSaveSVG= createButton("SAVE SVG")
  bSaveSVG.mousePressed(saveSVG);

  coloreSfondo = createColorPicker('#003264');
  coloreLettera = createColorPicker('#c8c8c8');

  sliderWidth.position(10, height + 10);
  sliderHeight.position(10, height + 40);
  sliderDensity.position(10, height + 70);
  uSpinMe.position(10, height+100)
  coloreLettera.position(200, height + 10);
  coloreSfondo.position(200, height + 40);
  bSave.position(430, height+10);
  bSaveSVG.position(430, height +40);
}

function draw() {
  background(coloreSfondo.color());
  
  
  if (exportSVG==true){
    beginRecordSVG(this, "x.svg");
    
    stroke(255,0,0);
    rect(width, height, 0,0);
  }
  
    let dens = sliderDensity.value();
    if (dens % 2 !== 0) {
    dens--;
  }
  
  xy=xy0;

  for (let i = 0; i < xy.length; i += dens) {
    push();
    translate(xy[i], xy[i + 1]);
    rotate(uSpinMe.value());

    let w = sliderWidth.value();
    let h = sliderHeight.value();
    let shadowLines = 5;
    stroke(coloreSfondo.color());
    strokeWeight(1);

    for (let j = -h; j <= h; j += h / shadowLines) {
      let len = sqrt(1 - sq(j / (h/2))) * (w/2);
      line(1*len, j + 15, -len, j + 15);
    }
    
    noStroke();
    fill(coloreLettera.color());
    ellipse(0, 0, h, w);
    pop();
  }
  
  if (exportSVG){
    endRecordSVG();
    exportSVG=false;
  }
}

function savePNG() {
  save("x.png");
}

function saveSVG(){
  exportSVG=true;
}

