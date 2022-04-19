
// https://github.com/jkeller52/ACCAD-5102

var buttons = []
var mouseloc = [];
let Montserrat; // Font
let particles = []; // an array to add multiple particles

function preload() {
  Montserrat = loadFont('../assets/Montserrat-Light.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }
  
  //   Create button objects //
  buttons.push(new Button("Home","625","50","https://jkeller52.github.io/ACCAD-5102"));
  buttons.push(new Button("Portfolio","800", "50","https://jkeller52.github.io/Portfolio"));
  buttons.push(new Button("Contact", "1000", "50", "https://jkeller52.github.io/Contact"));
}

// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(1,8);
    this.xSpeed = random(-1,2);
    this.ySpeed = random(-1,.5);
  }

// creation of a particle.
  createParticle() {
    noStroke();
    fill('rgba(28,22,147,100)');
    circle(this.x,this.y,this.r);
  }
  
  
  repelParticle() {
    
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        stroke('rgba(255,255,255,0.04)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

class Button {
  constructor(text,x,y) {
    this.x = x; // text box x and y coords for mousePressed()
    this.y = y;
    this.text = text;
    this.color = color(255,100);
  }
  
  display() {
//    textFont(Montserrat); //why is this breaking it?
    textSize(30);
    fill(this.color)
    text(this.text,this.x,this.y);
  }
  
  buttonclicked() {
    var d = dist(mouseX, mouseY, this.x,this.y);
    // if (d < )
    this.color = color(255,0,100)
    
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

  
// pulled example from https://happycoding.io/examples/p5js/input/clickable-text
// function mousePressed() {
//     if (mouseInText(this.text,this.x,this.y) {
//         print("Hi!")
//         }
    
//   }
  
  // for (var i = 0; i < buttons.length; i++) {
  //   buttons[i].buttonclicked();
  // }
  
function mouseInText() {
      const buttonwidth = textWidth(this.text);
      const buttonTop = textHeight(this.text);
      const buttonButtom = textHeight(this.text) - textSize(this.text);
}
  
  
function draw() {
  let mousePos = createVector(mouseX, mouseY);
  windowResized();
  background(15);
  // particle operations
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
  
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].display();
    }
  
  var loc = {
    x: mouseX,
    y: mouseY
  }
  // push mouse location into array, updating location
  mouseloc.push(loc)
  
  if (mouseloc.length > 10) {
    mouseloc.splice(1,2);
  }
  
  //draws mouse trail effect
  for (var i = 0; i < mouseloc.length; i++) {
     // Draw an ellipse for each element in the arrays. 
     // Color and size are tied to the loop's counter: i.
    noStroke();
    fill(255-i*5);
    ellipse(mouseloc[i].x,mouseloc[i].y,i,i);
  }
}
