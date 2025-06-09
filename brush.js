let mic;
let v = 0;
let fontProg;
let te;
let sliderWidth, sliderHeight, sliderDensity;
let colorePennello, coloreSfondo;
let xSelect;
let bSave;

let sliderLength = 170.6;
let mem = 40;
let umem = 120;



function setup() {
    const canvas = createCanvas(540, 540);
    canvas.parent('canvas-container');
    frameRate(60);
    pixelDensity(4);
    te = createGraphics(width, height);
    angleMode(DEGREES);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    sliderWidth = createSlider(20, 50, 25);
    sliderHeight = createSlider(20, 50, 25);
    sliderDensity = createSlider(2, 16, 9);
    uSpinMe = createSlider(0,360,0);

    xSelect = createSelect();
    xSelect.option('Ittens');
    xSelect.option('Munari');
    xSelect.option('halftone');
    xSelect.option('square');
    

    sliderWidth.size(sliderLength);
    sliderHeight.size(sliderLength);
    sliderDensity.size(sliderLength);
    uSpinMe.size(sliderLength);
    xSelect.size(sliderLength);

    bSave = createButton("SAVE IMG");
    bSave.mousePressed(savePNG);
    bSave.size(sliderLength);

    colorePennello = createColorPicker('#003264');
    coloreSfondo = createColorPicker('#c8c8c8');

    positionUIElements();
  
    window.addEventListener('resize', positionUIElements);
    
    try {
        mic = new p5.AudioIn();
        mic.start();
    } catch(e) {
        console.log("Microphone not available");
    }
    
    te.background(200);
    te.textAlign(CENTER, CENTER);
    te.textSize(14);
    image(te, 0, 0);
}

function positionUIElements() {
  let baseX = (windowWidth / 2) - (sliderLength+30);

  xSelect.position(baseX, umem+2);
  
  sliderWidth.position(baseX, umem +(mem*2));
  sliderHeight.position(baseX, umem + (mem*3));
  sliderDensity.position(baseX, umem + (mem * 4));
  uSpinMe.position(baseX, umem + (mem * 5));
  
  colorePennello.position(baseX, umem + (mem * 7));
  coloreSfondo.position(baseX, umem + (mem * 8.5));
  
  bSave.position(baseX, umem + (mem * 11.5));
}

function draw() {
    vol(); 
    
    if(key == '1'){
        push();
        let forzaBrush = map(v, 0, 1, 10, 100);
        stroke(0, 0, 0, 10);
        strokeWeight(2);
        translate(mouseX, mouseY);
        rotate(frameCount);
        line(-forzaBrush, 0, forzaBrush, 0);
        line(0, -forzaBrush, 0, forzaBrush);
        pop();
    }
    
    if(key == '2'){
        push();
        let forzaBrush = map(v, 0, 1, 10, 100);
        stroke(25, 25, 25, 50);
        strokeWeight(1 * forzaBrush);
        line(pmouseX, pmouseY, mouseX, mouseY);
        pop();
    }
}

function keyPressed() {
    if(key == ' '){
        te.background(250);
        te.fill(coloreSfondo.value());
        image(te, 0, 0);
    }
}

function vol() {
    if (mouseIsPressed) {
        v = 1;
    } else {
        let easing = 0.2;
        let targetV = 0;
        
        if (mic) {
            try {
                targetV = mic.getLevel();
            } catch(e) {
                targetV = 0;
            }
        }
        
        targetV = map(targetV, 0, 0.4, 0, 1, true);
        let dv = targetV - v;
        v += dv * easing;
    }
}

function touchStarted() {
    if (getAudioContext) {
        getAudioContext().resume();
    }
}

function savePNG() {
  save("brush.png");
}