// https://github.com/jkeller52/ACCAD-5102

var buttons = [];
var mouseloc = [];
let particles = []; // an array to add multiple particles

// ASSETS //
let Montserrat; // Font
let home; //home button
let portfolio; //portfolio button
let contact; //contact button

function preload() {
  Montserrat = loadFont('assets/Montserrat-Light.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rand_r = random(0,255)
  rand_g = random(0,255)
  rand_b = random(0,255)
  
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }
  //   Create button objects //
  buttons.push(new Button("Home","625","50","https://jkeller52.github.io/ACCAD-5102"));
  buttons.push(new Button("Portfolio","800", "50","https://jkeller52.github.io/Portfolio"));
  buttons.push(new Button("Contact", "1000", "50", "https://jkeller52.github.io/Contact"));
}


// a rework inspried by https://p5js.org/examples/simulate-particles.html
//added several functions, vectors, mouse interactivity
class Particle {
  constructor(){
  this.x = random(0,width);
  this.y = random(0,height);
  this.pos = createVector(this.x,this.y);
  
  this.xSpeed = random(-.1,2);     // particle x and y speeds
  this.ySpeed = random(-1,.5);
    
  
  this.vel = createVector(this.xSpeed,this.ySpeed);
  this.acc = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
  }
  
  display() {
    point(mouseX,mouseY);
    strokeWeight(1);
    stroke(rand_r,rand_g,175);
    ellipse(this.pos.x, this.pos.y, 7,7)
    fill(255);
  }
  
  detectEdge() {
  if(this.pos.x < 0 || this.pos.x > width) {
    this.vel = createVector(15);
    this.acc = createVector(15);
  }
    
  if(this.pos.y < 0 || this.pos.y > height) {
    this.vel = createVector(15);
    this.acc = createVector(15);
    }
  }
  
  //concept for joinParticles() adapted from https://p5js.org/examples/simulate-particles.html
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.pos.x,this.pos.y,element.x,element.y);
      if(dis<85) {
        stroke('rgba(0,0,0,0.08)');
        line(this.pos.x,this.pos.y,element.x,element.y);
      }
    });
  }
  
  update() {  
    let mousePos = createVector(mouseX, mouseY);
    let mouseForce = p5.Vector.sub(this.pos,mousePos);
    let distSq = mouseForce.magSq();
    let gravity = 100
    let mag = gravity / distSq;
    mouseForce.setMag(mag)
    
    this.acc = mouseForce
    this.vel.limit(2);
    this.pos.x+=this.vel.x;
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.y+=this.vel.y;
  }
}

function draw() { 
  background(255);
  for(let i = 0;i<particles.length;i++) {
      particles[i].display();
      particles[i].detectEdge();
      particles[i].update();
      particles[i].joinParticles(particles)
  }
  
  
  // displays button text 
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].display();
    }
  
  var loc = {
    x: mouseX,
    y: mouseY
  }
  // push mouse location into 'loc' array, updating location
  mouseloc.push(loc)
  
  if (mouseloc.length > 10) {
    mouseloc.splice(1,2);
  }
  
  //loop to draw mouse trail effect
  for (var i = 0; i < mouseloc.length; i++) {
     // Draw an ellipse for each element in the arrays. 
     // Color and size are tied to the loop's counter: i.
    noStroke();
    fill(rand_r,rand_g,rand_b); //randomly sets cursor trail color in setup
    ellipse(mouseloc[i].x,mouseloc[i].y,i,i);
  }
}

class Button {
  constructor(text,x,y,link) {
    this.x = x; // text box x and y coords for mousePressed()
    this.y = y;
    this.text = text;
    this.color = color(0);
    this.link = link; // link field for mousePressed() event

    this.rect_x = this.x - 10;
    this.rect_y = this.y-25;
    this.rect_w = 120;
    this.rect_h = 40;
    rect(this.rect_x,this.rect_y,this.rect_w,this.rect_h);
  }
  
  display() {
//    textFont(Montserrat); //why is this breaking it?
    textSize(30);
    // noStroke(); //remove this later
    fill(215);
    fill(this.color);
   // textFont(Montserrat);
    let textobj = text(this.text,this.x,this.y);
    //adds hover effect for rectangle
    if ((mouseX>this.rect_x) && (mouseX<this.rect_x+this.rect_w) && (mouseY>this.rect_y) && (mouseY<this.rect_y+this.rect_h)){
    textobj.textSize(35);
    text(this.text,this.x,this.y);
    }
  }
  
  buttonclicked() {
    var d = dist(mouseX, mouseY, this.x,this.y);
    if (d < 10) {
      this.color = color(255,0,100)
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}
  