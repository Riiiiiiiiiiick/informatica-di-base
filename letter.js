let sliderWidth, sliderHeight, sliderDensity;
let coloreLettera, coloreSfondo;
let bSave, bSaveSVG;
let xSelect;
let exportSVG=false;

let xy=[];


let sliderLength = 170.6;
let mem = 40;
let umem = 120;

function setup() {
  const canvas = createCanvas(540, 540);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  
  sliderWidth = createSlider(20, 50, 25);
  sliderHeight = createSlider(20, 50, 25);
  sliderDensity = createSlider(2, 16, 9);
  uSpinMe = createSlider(0,360,0);

  xSelect = createSelect();
  xSelect.option('x.a');
  xSelect.option('x.b');
  xSelect.option('x.c');

  
  sliderWidth.size(sliderLength);
  sliderHeight.size(sliderLength);
  sliderDensity.size(sliderLength);
  uSpinMe.size(sliderLength);
  xSelect.size(sliderLength);
  
  bSave = createButton("SAVE IMG");
  bSave.mousePressed(savePNG);
  bSaveSVG = createButton("SAVE SVG");
  bSaveSVG.mousePressed(saveSVG);

  coloreSfondo = createColorPicker('#003264');
  coloreLettera = createColorPicker('#c8c8c8');

  positionUIElements();
  
  window.addEventListener('resize', positionUIElements);
}

function positionUIElements() {
  let baseX = (windowWidth / 2) - (sliderLength+30);

  xSelect.position(baseX, umem+2);
  
  sliderWidth.position(baseX, umem +(mem*2));
  sliderHeight.position(baseX, umem + (mem*3));
  sliderDensity.position(baseX, umem + (mem * 4));
  uSpinMe.position(baseX, umem + (mem * 5));
  
  coloreLettera.position(baseX, umem + (mem * 7));
  coloreSfondo.position(baseX, umem + (mem * 8.5));
  
  bSave.position(baseX, umem + (mem * 11.5));
  bSaveSVG.position(baseX+92,  umem + (mem * 11.5));
}

function setSliderLength(newLength) {
  sliderLength = newLength;
  sliderWidth.size(sliderLength);
  sliderHeight.size(sliderLength);
  sliderDensity.size(sliderLength);
  uSpinMe.size(sliderLength);
  positionUIElements();
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
  
  let selectedOption = xSelect.selected();
  if (selectedOption === 'x.a') {
    xy = xy0;
  } else if (selectedOption === 'x.b') {
    xy = xyb;
  } else if (selectedOption === 'x.c') {
    xy = xyf;
  }
  

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

function windowResized() {
  positionUIElements();
}