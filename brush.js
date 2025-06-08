let mic;
let v = 0;
let fontProg;
let te;

function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('canvas-container');
    frameRate(60);
    pixelDensity(2);
    te = createGraphics(width, height);
    angleMode(DEGREES);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    
    try {
        mic = new p5.AudioIn();
        mic.start();
    } catch(e) {
        console.log("Microphone not available");
    }
    
    te.background(250);
    te.fill(0, 0, 0, 40);
    te.textAlign(CENTER, CENTER);
    te.textSize(14);
    te.text("Press the Keys 1,2,3,4 in order to use the brushes", width/2, height/2);
    image(te, 0, 0);
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
        te.fill(0, 0, 0, 35);
        te.textAlign(CENTER, CENTER);
        te.textSize(14);
        te.text("Press the Keys 1,2,3,4 in order to use the brushes", width/2, height/2);
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